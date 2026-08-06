const PRODUCTS = [
  {
    id: 1,
    name: "Rose Attar",
    price: 1500,
    category: "Rose",
    image: "asset/images/rose.png",
    desc: "Pure and long-lasting Rose Attar made from natural ingredients.",
  },
  {
    id: 2,
    name: "Musk Attar",
    price: 1800,
    category: "Musk",
    image: "asset/images/musk.png",
    desc: "Original Musk fragrance inspired by tradition.",
  },
  {
    id: 3,
    name: "Oud",
    price: 3000,
    category: "Oud",
    image: "asset/images/oud.png",
    desc: "Premium Oud scent for special occasions.",
  },
  {
    id: 4,
    name: "Black Musk",
    price: 2200,
    category: "Musk",
    image: "asset/images/Black Musk.jpg",
    desc: "Strong and bold fragrance. Deeply connected to tradition.",
  },
  {
    id: 5,
    name: "Pure Sandalwood",
    price: 2500,
    category: "Sandalwood",
    image: "asset/images/Pure Sandalwood.jpg",
    desc: "Soft, woody, and calming scent. Famous for its purity.",
  },
  {
    id: 6,
    name: "Kashmiri Saffron",
    price: 3500,
    category: "Saffron",
    image: "asset/images/Kashmiri Saffron.jpg",
    desc: "Exotic and luxurious spicy fragrance. A premium choice.",
  },
];

function getAdminProducts() {
  return JSON.parse(localStorage.getItem("adminProducts")) || [];
}
function getAllProducts() {
  return [...PRODUCTS, ...getAdminProducts()];
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId) {
  const product = getAllProducts().find((p) => Number(p.id) === Number(productId));
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((i) => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  }
  saveCart(cart);
  const btn = document.querySelector(`[data-cart-id="${productId}"]`);
  if (btn) {
    btn.innerText = "✅ Added!";
    btn.style.background = "#ccc";
    btn.style.color = "#000";
    setTimeout(() => {
      btn.innerText = "Add to Cart";
      btn.style.background = "";
      btn.style.color = "";
    }, 1500);
  }
}

function removeFromCart(productId) {
  saveCart(getCart().filter((i) => Number(i.id) !== Number(productId)));
  renderCartItems();
}

function updateCartUI() {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const el = document.getElementById("cartCount");
  const tel = document.getElementById("cartTotal");
  if (el) el.innerText = count;
  if (tel) tel.innerText = "Rs. " + total.toLocaleString();

  const dbInput = document.getElementById("dbTotalAmount");
  if (dbInput) {
    dbInput.value = total;
  }
}

function renderCartItems() {
  const cartDiv = document.getElementById("cartItems");
  if (!cartDiv) return;
  const cart = getCart();
  if (cart.length === 0) {
    cartDiv.innerHTML =
      '<p style="text-align:center;color:#888;padding:20px;">Your cart is empty.</p>';
    updateCartUI();
    return;
  }
  cartDiv.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div><strong>${item.name}</strong><br>
            <span>Rs. ${item.price.toLocaleString()} × ${item.qty}</span></div>
            <button onclick="removeFromCart(${item.id})" class="remove-btn">✕</button>
        </div>`,
    )
    .join("");
  updateCartUI();
}

function toggleCart() {
  const s = document.getElementById("cartSidebar");
  const o = document.getElementById("cartOverlay");
  if (!s) return;
  if (s.classList.contains("open")) {
    s.classList.remove("open");
    o.classList.remove("open");
  } else {
    s.classList.add("open");
    o.classList.add("open");
    renderCartItems();
  }
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Open tab synchronously to bypass popup blocker
  const newTab = window.open("", "_blank");

  // Send AJAX request to checkout.php
  const formData = new FormData();
  formData.append("execute_checkout", "1");
  formData.append("total_amount", total);
  formData.append("cart_items", JSON.stringify(cart));
  formData.append("user_name", getCurrentUser() || "Guest");

  fetch("checkout.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      // 1. Clear Cart
      saveCart([]);
      renderCartItems();

      // 2. Open WhatsApp
      const lines = cart
        .map(
          (i) => `• ${i.name} x${i.qty} = Rs.${(i.price * i.qty).toLocaleString()}`,
        )
        .join("\n");
      const msg = `Hi! I want to order:\n\n${lines}\n\nTotal: Rs. ${total.toLocaleString()}\nOrder ID: ORD-${data.order_id || Date.now()}`;
      newTab.location.href = "https://wa.me/923359764831?text=" + encodeURIComponent(msg);

      alert(`✅ Order placed! ${data.message}`);
    } else {
      newTab.close();
      alert(`❌ Error: ${data.message}`);
    }
  })
  .catch(error => {
    console.error("Error during checkout:", error);
    newTab.close();
    alert("❌ Error placing order. Please try again.");
  });
}

function getAvgRating(productId) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const pr = reviews.filter((r) => r.productId === productId);
  if (pr.length === 0) return null;
  const avg = pr.reduce((s, r) => s + r.stars, 0) / pr.length;
  return { avg: avg.toFixed(1), count: pr.length };
}

function renderStars(avg) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += `<span style="color:${i <= Math.round(avg) ? "#FFB703" : "#ddd"}">★</span>`;
  }
  return html;
}

function renderProductCard(product) {
  const rating = getAvgRating(product.id);
  const ratingHTML = rating
    ? `<div class="product-rating">${renderStars(rating.avg)} <small>(${rating.count})</small></div>`
    : `<div class="product-rating" style="color:#bbb;font-size:12px;">No reviews yet</div>`;
  return `
        <div class="product-card" data-category="${product.category || "Other"}">
            <a href="products.html">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='asset/images/logo.png'">
                <h3>${product.name}</h3>
                <p>Rs. ${product.price.toLocaleString()} PKR</p>
            </a>
            <p style="font-size:13px;color:#666;margin-bottom:6px;">${product.desc || ""}</p>
            ${ratingHTML}
            <div class="button-group">
                <a href="#" class="add-cart-btn" data-cart-id="${product.id}"
                   onclick="event.preventDefault();addToCart(${product.id})">Add to Cart</a>
                <a href="#" class="buy-now-btn"
                   onclick="event.preventDefault();buyNow(${product.id},'${product.name}')">Buy Now</a>
            </div>
        </div>`;
}

function buyNow(productId, productName) {
  const product = getAllProducts().find((p) => Number(p.id) === Number(productId));
  if (!product) return;

  // Open tab synchronously to bypass popup blocker
  const newTab = window.open("", "_blank");

  const formData = new FormData();
  formData.append("execute_checkout", "1");
  formData.append("total_amount", product.price);
  formData.append("product_id", product.id);
  formData.append("user_name", getCurrentUser() || "Guest");

  fetch("checkout.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      const msg = `Hi! I want to order: ${productName}\nPrice: Rs. ${product.price.toLocaleString()}\nOrder ID: ORD-${data.order_id}`;
      newTab.location.href = "https://wa.me/923359764831?text=" + encodeURIComponent(msg);
      alert(`✅ Order placed! ${data.message}`);
    } else {
      newTab.close();
      alert(`❌ Error: ${data.message}`);
    }
  })
  .catch(error => {
    console.error("Error during buy now checkout:", error);
    newTab.close();
    alert("❌ Error placing order. Please try again.");
  });
}

const homeGrid = document.getElementById("homeProductGrid");
if (homeGrid)
  homeGrid.innerHTML = getAllProducts()
    .slice(0, 6)
    .map(renderProductCard)
    .join("");

function renderAllProducts(list) {
  const grid = document.getElementById("allProductGrid");
  if (!grid) return;
  grid.innerHTML =
    list.length === 0
      ? '<p style="text-align:center;color:#888;padding:40px;">No products found.</p>'
      : list.map(renderProductCard).join("");
}

let activeCategory = "All";

function filterByCategory(cat) {
  activeCategory = cat;
  document.querySelectorAll(".cat-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.cat === cat);
  });
  applyFilters();
}

function applyFilters() {
  const query = (
    document.getElementById("searchInput")?.value || ""
  ).toLowerCase();
  const sort = document.getElementById("sortSelect")?.value || "";
  let list = getAllProducts();
  if (activeCategory !== "All")
    list = list.filter((p) => p.category === activeCategory);
  if (query)
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.desc || "").toLowerCase().includes(query),
    );
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  renderAllProducts(list);
}

function filterProducts() {
  applyFilters();
}

if (document.getElementById("allProductGrid"))
  renderAllProducts(getAllProducts());

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "auth.php";
}

function updateAuthNav() {
  const ab = document.getElementById("authButtons");
  const as = document.getElementById("accountSection");
  const username = getCurrentUser();

  if (!ab || !as) return;

  if (username) {
    ab.style.display = "none";
    as.style.display = "block";
    as.innerHTML = `<div class="account-box">👤 ${username}
            <button onclick="logoutUser()" class="logout-btn">Logout</button></div>`;
  } else {
    ab.style.display = "flex";
    as.style.display = "none";
  }
}

function getReviews() {
  return JSON.parse(localStorage.getItem("reviews")) || [];
}
function saveReviews(r) {
  localStorage.setItem("reviews", JSON.stringify(r));
}

function hasPurchased(email, productId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  return orders.some(
    (o) => o.customer === email && o.items.some((i) => i.id === productId),
  );
}

function renderReviewSection(productId) {
  const container = document.getElementById(`review-section-${productId}`);
  if (!container) return;
  const reviews = getReviews().filter((r) => r.productId === productId);
  const email = getCurrentUser();
  const already = reviews.find((r) => r.email === email);
  const purchased = email ? hasPurchased(email, productId) : false;

  let formHTML = "";
  if (!email) {
    formHTML = `<p style="color:#888;font-size:13px;"><a href="auth.html" style="color:#1A535C;font-weight:600;">Login</a> to leave a review.</p>`;
  } else if (!purchased) {
    formHTML = `<p style="color:#888;font-size:13px;">Purchase this product to leave a review.</p>`;
  } else if (already) {
    formHTML = `<p style="color:#1A7A4A;font-size:13px;">✅ You have already reviewed this product.</p>`;
  } else {
    formHTML = `
        <div class="review-form">
            <p style="font-weight:600;margin-bottom:8px;">Write a Review:</p>
            <div class="star-select" id="stars-${productId}">
                ${[1, 2, 3, 4, 5]
                  .map(
                    (n) =>
                      `<span class="star-opt" data-val="${n}" onclick="selectStar(${productId},${n})">★</span>`,
                  )
                  .join("")}
            </div>
            <textarea id="review-text-${productId}" placeholder="Your comment..." rows="3"
                style="width:100%;padding:10px;border:1.5px solid #ddd;border-radius:8px;font-size:14px;margin:10px 0;resize:none;"></textarea>
            <button onclick="submitReview(${productId})"
                style="background:#1A535C;color:#fff;border:none;padding:9px 20px;border-radius:8px;cursor:pointer;font-size:14px;">
                Submit Review</button>
        </div>`;
  }

  const reviewsHTML =
    reviews.length === 0
      ? `<p style="color:#bbb;font-size:13px;margin-top:10px;">No reviews yet.</p>`
      : reviews
          .map(
            (r) => `
            <div class="review-card">
                <div>${renderStars(r.stars)} <strong style="font-size:13px;">${r.name}</strong>
                <span style="color:#aaa;font-size:11px;margin-left:8px;">${r.date}</span></div>
                <p style="font-size:13px;color:#555;margin-top:4px;">${r.comment}</p>
            </div>`,
          )
          .join("");

  container.innerHTML = `
        <div class="review-section">
            <h4 style="color:#1A535C;margin-bottom:12px;">⭐ Customer Reviews</h4>
            ${formHTML}
            <div style="margin-top:16px;">${reviewsHTML}</div>
        </div>`;
}

let selectedStars = {};
function selectStar(productId, val) {
  selectedStars[productId] = val;
  document.querySelectorAll(`#stars-${productId} .star-opt`).forEach((s) => {
    s.style.color = parseInt(s.dataset.val) <= val ? "#FFB703" : "#ddd";
  });
}

function submitReview(productId) {
  const email = getCurrentUser();
  const stars = selectedStars[productId];
  const comment = document
    .getElementById(`review-text-${productId}`)
    ?.value.trim();
  if (!stars) {
    alert("Please select a star rating.");
    return;
  }
  if (!comment) {
    alert("Please write a comment.");
    return;
  }
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  const reviews = getReviews();
  reviews.push({
    productId,
    email,
    stars,
    comment,
    name: user?.name || email,
    date: new Date().toLocaleDateString(),
  });
  saveReviews(reviews);
  alert("✅ Review submitted! Thank you.");
  renderReviewSection(productId);
  if (document.getElementById("allProductGrid")) applyFilters();
  if (document.getElementById("homeProductGrid"))
    document.getElementById("homeProductGrid").innerHTML = getAllProducts()
      .slice(0, 6)
      .map(renderProductCard)
      .join("");
}

function saveContactMessage(name, email, message, city) {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push({
    name,
    email,
    message,
    city,
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

document.addEventListener("DOMContentLoaded", function () {
  updateAuthNav();
  updateCartUI();

  const loginForm = document.getElementById("loginFormNew");
  const signupForm = document.getElementById("signupFormNew");
  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");

  if (showSignup && loginForm && signupForm) {
    showSignup.addEventListener("click", () => {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
    });
  }

  if (showLogin && loginForm && signupForm) {
    showLogin.addEventListener("click", () => {
      signupForm.style.display = "none";
      loginForm.style.display = "block";
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const msg = document.getElementById("message").value.trim();
      const city = document.querySelector("select[name='city']")?.value || "";
      saveContactMessage(name, email, msg, city);
      alert(`✅ Thank you, ${name}! Your message has been saved.`);
      contactForm.reset();
    });
  }

  if (document.getElementById("allProductGrid")) {
    getAllProducts().forEach((p) => {
      const el = document.getElementById(`review-section-${p.id}`);
      if (el) renderReviewSection(p.id);
    });
  }
});
