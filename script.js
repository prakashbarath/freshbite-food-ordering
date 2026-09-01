// ==================== FOOD ITEMS DATA (₹ RUPEES) ====================
const foodItems = [
  { id: 1, name: "Margherita Pizza", price: 299, category: "Pizza", veg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400" },
  { id: 2, name: "Crispy Chicken Burger", price: 189, category: "Burgers", veg: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
  { id: 3, name: "Hyderabadi Dum Biryani", price: 349, category: "Biryani", veg: false, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400" },
  { id: 4, name: "Paneer Butter Masala Roll", price: 149, category: "Burgers", veg: true, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400" },
  { id: 5, name: "Chocolate Lava Cake", price: 129, category: "Desserts", veg: true, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400" },
  { id: 6, name: "Farmhouse Veggie Pizza", price: 329, category: "Pizza", veg: true, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" }
];

// ==================== RESTAURANTS DATA ====================
const restaurants = [
  { id: 101, name: "Bella Italia Trattoria", cuisine: "Italian", rating: 4.8, deliveryTime: "25-35 mins", priceRange: "₹250 - ₹500", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500" },
  { id: 102, name: "Burger Garage & Grill", cuisine: "American", rating: 4.3, deliveryTime: "20-30 mins", priceRange: "₹150 - ₹300", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500" },
  { id: 103, name: "The Royal Biryani House", cuisine: "Indian", rating: 4.9, deliveryTime: "30-45 mins", priceRange: "₹200 - ₹450", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500" },
  { id: 104, name: "Sweet Crumb Bakehouse", cuisine: "Bakery", rating: 4.6, deliveryTime: "15-25 mins", priceRange: "₹100 - ₹250", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500" },
  { id: 105, name: "Spice Garden Deluxe", cuisine: "Indian", rating: 4.2, deliveryTime: "35-50 mins", priceRange: "₹300 - ₹600", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500" },
  { id: 106, name: "Napoli Woodfire Oven", cuisine: "Italian", rating: 4.7, deliveryTime: "25-40 mins", priceRange: "₹250 - ₹450", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" }
];

// ==================== STATE ====================
let cart = JSON.parse(localStorage.getItem('freshbite_cart')) || [];
let activeCategory = 'all';
let vegOnly = false;

// ==================== DOM REFERENCES ====================
const menuGrid = document.getElementById('menuGrid');
const restaurantGrid = document.getElementById('restaurantGrid');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartItemsList = document.getElementById('cartItemsList');
const cartCount = document.getElementById('cartCount');
const subtotalPrice = document.getElementById('subtotalPrice');
const deliveryFee = document.getElementById('deliveryFee');
const totalPrice = document.getElementById('totalPrice');
const clearCartBtn = document.getElementById('clearCartBtn');
const cartToast = document.getElementById('cartToast');
const filterBtns = document.querySelectorAll('.filter-btn');
const vegOnlyToggle = document.getElementById('vegOnlyToggle');

const cuisineFilter = document.getElementById('cuisineFilter');
const ratingFilter = document.getElementById('ratingFilter');
const priceFilter = document.getElementById('priceFilter');

const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeModal = document.getElementById('closeModal');
const checkoutForm = document.getElementById('checkoutForm');

const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const closeAuthModal = document.getElementById('closeAuthModal');
const tabLoginBtn = document.getElementById('tabLoginBtn');
const tabRegisterBtn = document.getElementById('tabRegisterBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const contactForm = document.getElementById('contactForm');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// ==================== TOAST HELPER ====================
function showToast(message) {
  if (!cartToast) return;
  cartToast.textContent = message;
  cartToast.classList.add('show');
  setTimeout(() => cartToast.classList.remove('show'), 2200);
}
// ==================== RESTAURANT RENDER FUNCTION ====================
function renderRestaurants() {
  const restaurantGrid = document.getElementById('restaurantGrid');
  const cuisineFilter = document.getElementById('cuisineFilter');
  const ratingFilter = document.getElementById('ratingFilter');
  const priceFilter = document.getElementById('priceFilter');

  if (!restaurantGrid) return;

  const selectedCuisine = cuisineFilter ? cuisineFilter.value : 'all';
  const selectedRating = ratingFilter ? parseFloat(ratingFilter.value) : 0;
  const selectedPrice = priceFilter ? priceFilter.value : 'all';

  const filtered = restaurants.filter(r => {
    const matchCuisine = selectedCuisine === 'all' || r.cuisine === selectedCuisine;
    const matchRating = r.rating >= selectedRating;
    const matchPrice = selectedPrice === 'all' || r.priceRange === selectedPrice;
    return matchCuisine && matchRating && matchPrice;
  });

  restaurantGrid.innerHTML = '';

  if (filtered.length === 0) {
    restaurantGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 2rem; color: #777;">No restaurants found.</p>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <span class="rating-badge"><i class="fa-solid fa-star"></i> ${item.rating.toFixed(1)}</span>
      </div>
      <div class="restaurant-card-body">
        <div class="restaurant-card-header">
          <h3>${item.name}</h3>
        </div>
        <div class="restaurant-meta">
          <span class="cuisine-tag">${item.cuisine}</span>
          <span class="delivery-time"><i class="fa-regular fa-clock"></i> ${item.deliveryTime}</span>
        </div>
        <div class="restaurant-card-footer">
          <span class="price-range">${item.priceRange}</span>
          <a href="#menu" class="btn-primary card-action-btn">View Menu</a>
        </div>
      </div>
    `;
    restaurantGrid.appendChild(card);
  });
}
// ==================== MENU RENDER ====================
function renderMenu() {
  if (!menuGrid) return;
  menuGrid.innerHTML = '';

  const filtered = foodItems.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesVeg = !vegOnly || item.veg === true;
    return matchesCat && matchesVeg;
  });

  if (filtered.length === 0) {
    menuGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 2rem;">No dishes found matching your criteria.</p>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="food-card-body">
        <h4>${item.name} ${item.veg ? '🟢' : '🔴'}</h4>
        <p>Freshly prepared delicious ${item.category.toLowerCase()} dish.</p>
        <div class="food-card-footer">
          <span class="price">₹${item.price}</span>
          <button class="btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}
// ==================== CART OPERATIONS ====================
window.addToCart = function(id) {
  const product = foodItems.find(item => item.id === id);
  if (!product) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  showToast(`Added "${product.name}" to cart!`);
};

window.updateQuantity = function(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(c => c.id !== id);
  }

  saveCart();
  renderCart();
};

window.removeFromCart = function(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
};

function saveCart() {
  localStorage.setItem('freshbite_cart', JSON.stringify(cart));
}

function renderCart() {
  if (!cartItemsList) return;
  cartItemsList.innerHTML = '';
  let subtotal = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="empty-cart-msg">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Your cart is empty.</p>
      </div>
    `;
    if (deliveryFee) deliveryFee.textContent = "₹0";
    if (subtotalPrice) subtotalPrice.textContent = "₹0";
    if (totalPrice) totalPrice.textContent = "₹0";
    if (cartCount) cartCount.textContent = "0";
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    totalItems += item.quantity;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${itemTotal}</span>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
        <span class="qty-count">${item.quantity}</span>
        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        <button class="remove-item-btn" onclick="removeFromCart(${item.id})" title="Remove item">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;
    cartItemsList.appendChild(div);
  });

  const delivery = 40;
  const finalTotal = subtotal + delivery;

  if (cartCount) cartCount.textContent = totalItems;
  if (subtotalPrice) subtotalPrice.textContent = `₹${subtotal}`;
  if (deliveryFee) deliveryFee.textContent = `₹${delivery}`;
  if (totalPrice) totalPrice.textContent = `₹${finalTotal}`;
}

// ==================== EVENT BINDINGS ====================
if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  });
}

if (closeCart) {
  closeCart.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  });
}

if (cartOverlay) {
  cartOverlay.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  });
}

if (clearCartBtn) {
  clearCartBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    if (confirm("Are you sure you want to clear your cart?")) {
      cart = [];
      saveCart();
      renderCart();
    }
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    renderMenu();
  });
});

if (vegOnlyToggle) {
  vegOnlyToggle.addEventListener('change', (e) => {
    vegOnly = e.target.checked;
    renderMenu();
  });
}

if (cuisineFilter) cuisineFilter.addEventListener('change', renderRestaurants);
if (ratingFilter) ratingFilter.addEventListener('change', renderRestaurants);
if (priceFilter) priceFilter.addEventListener('change', renderRestaurants);

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    checkoutModal.classList.add('open');
  });
}

if (closeModal) closeModal.addEventListener('click', () => checkoutModal.classList.remove('open'));

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("🎉 Order placed successfully! Delivery will arrive in 30-40 minutes.");
    cart = [];
    saveCart();
    renderCart();
    checkoutModal.classList.remove('open');
  });
}

if (loginBtn) loginBtn.addEventListener('click', () => authModal.classList.add('open'));
if (closeAuthModal) closeAuthModal.addEventListener('click', () => authModal.classList.remove('open'));

if (tabLoginBtn) {
  tabLoginBtn.addEventListener('click', () => {
    tabLoginBtn.classList.add('active');
    tabRegisterBtn.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  });
}

if (tabRegisterBtn) {
  tabRegisterBtn.addEventListener('click', () => {
    tabRegisterBtn.classList.add('active');
    tabLoginBtn.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginBtn.textContent = 'Account (Demo)';
    alert('👋 Logged in successfully!');
    authModal.classList.remove('open');
  });
}

if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginBtn.textContent = 'Account (Demo)';
    alert('🎉 Account created and logged in!');
    authModal.classList.remove('open');
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✉️ Thank you for contacting FreshBite! We will get back to you soon.');
    contactForm.reset();
  });
}

if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
}

// Initial Calls on Page Load
renderMenu();
renderRestaurants();
renderCart();