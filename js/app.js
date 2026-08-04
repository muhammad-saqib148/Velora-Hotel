/**
 * Velora Grand Hotel & Spa - Main Frontend Logic
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Theme
  initTheme();

  // Initialize Navbar
  initNavbar();

  // Render Core Sections if containers exist
  renderRooms();
  renderExperiences();
  renderDiningMenu('breakfast');
  renderSpaServices();
  renderOffers();
  renderGallery('all');
  renderReviews();
  renderFaqs();

  // Initialize Page Specific Logic
  initRoomDetailsPage();
  initBookingSystem();
  initMyBookingsPage();

  // Initialize Event Listeners
  initEventListeners();
});

/* ==========================================================================
   Theme & Utility Functions
   ========================================================================== */

function initTheme() {
  const savedTheme = localStorage.getItem("velora_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("velora_theme", newTheme);
  updateThemeIcon(newTheme);
  showToast("Theme Updated", `Switched to ${newTheme} mode.`);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (icon) {
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

function showToast(title, message, type = "success") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const toastId = "toast-" + Date.now();
  const bgClass = type === "error" ? "bg-danger text-white" : "bg-dark-emerald text-white border-gold";

  const toastHTML = `
    <div id="${toastId}" class="toast align-items-center ${bgClass}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
      <div class="d-flex">
        <div class="toast-body">
          <strong class="text-gold d-block mb-1">${title}</strong>
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML("beforeend", toastHTML);
  const toastEl = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  toastEl.addEventListener("hidden.bs.toast", () => {
    toastEl.remove();
  });
}

/* ==========================================================================
   Navbar & Navigation
   ========================================================================== */

function initNavbar() {
  const navbar = document.querySelector(".velora-navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove("d-none");
      } else {
        backToTopBtn.classList.add("d-none");
      }
    }
  });
}

/* ==========================================================================
   Rooms & Suites Rendering
   ========================================================================== */

function renderRooms(filterCategory = "all") {
  const container = document.getElementById("roomsContainer");
  if (!container || !window.VELORA_DATA) return;

  const rooms = window.VELORA_DATA.rooms.filter(room => {
    if (filterCategory === "all") return true;
    return room.category === filterCategory;
  });

  container.innerHTML = rooms.map(room => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="room-card">
        <div class="room-img-wrapper">
          <img src="${room.image}" alt="${room.title}" class="room-img" loading="lazy" onerror="this.src='https://picsum.photos/seed/${room.id}/800/600'">
          <span class="room-badge">${room.badge}</span>
          <div class="room-price-tag">
            <span class="room-price-amount">$${room.price}</span> <small class="text-white-50">/ night</small>
          </div>
        </div>
        <div class="room-content">
          <h3 class="room-title">${room.title}</h3>
          <div class="room-specs">
            <span><i class="fas fa-vector-square"></i> ${room.size}</span>
            <span><i class="fas fa-users"></i> ${room.guests}</span>
            <span><i class="fas fa-bed"></i> ${room.bed}</span>
          </div>
          <p class="room-desc">${room.description}</p>
          <div class="room-amenities-pills">
            ${room.amenities.slice(0, 4).map(a => `<span class="amenity-pill"><i class="fas fa-check text-gold me-1"></i>${a}</span>`).join('')}
            ${room.amenities.length > 4 ? `<span class="amenity-pill">+${room.amenities.length - 4} more</span>` : ''}
          </div>
          <div class="room-actions">
            <button class="btn btn-outline-gold w-50 btn-sm" onclick="openRoomDetails('${room.id}')">View Details</button>
            <button class="btn btn-gold w-50 btn-sm" onclick="selectRoomForBooking('${room.id}')">Reserve Stay</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterRooms(category, btnElement) {
  document.querySelectorAll("#roomsFilterTabs .filter-btn").forEach(btn => btn.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");
  renderRooms(category);
}

function openRoomDetails(roomId) {
  // Always navigate to real room-details.html page as per multi-page architecture
  window.location.href = `room-details.html?id=${encodeURIComponent(roomId)}`;
}

function selectRoomForBooking(roomId) {
  const roomSelect = document.getElementById("bookRoomSelect");
  if (roomSelect) {
    roomSelect.value = roomId;
    calculateBookingTotal();
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = `booking.html?room=${encodeURIComponent(roomId)}`;
  }
}

/* ==========================================================================
   Room Details Page Dynamic Renderer
   ========================================================================== */

function initRoomDetailsPage() {
  const container = document.getElementById("roomDetailsPageContainer");
  if (!container) return;

  const roomsList = window.VELORA_ROOMS || (window.VELORA_DATA ? window.VELORA_DATA.rooms : []);
  const params = new URLSearchParams(window.location.search);
  const roomId = params.get("id") || "deluxe-king";
  const room = roomsList.find(r => r.id === roomId) || roomsList[0];

  if (!room) return;

  // Set document title
  document.title = `${room.title} | Velora Grand Hotel & Spa`;

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  container.innerHTML = `
    <div class="row g-5">
      <!-- Left Media Gallery & Details Column -->
      <div class="col-lg-8">
        <!-- Main Image -->
        <div class="position-relative overflow-hidden rounded shadow-sm mb-3">
          <img id="mainRoomImage" src="${room.image}" alt="${room.title}" class="w-100 object-fit-cover" style="height: 480px;">
          <span class="room-badge" style="top:20px; right:20px;">${room.badge || 'Luxury'}</span>
        </div>

        <!-- Thumbnails Gallery -->
        <div class="row g-2 mb-4">
          <div class="col-4 col-md-3">
            <img src="${room.image}" onclick="document.getElementById('mainRoomImage').src='${room.image}'" class="img-fluid rounded border border-gold cursor-pointer" style="height:90px; width:100%; object-fit:cover;">
          </div>
          ${(room.gallery || []).map(img => `
            <div class="col-4 col-md-3">
              <img src="${img}" onclick="document.getElementById('mainRoomImage').src='${img}'" class="img-fluid rounded border cursor-pointer hover-gold" style="height:90px; width:100%; object-fit:cover;" onerror="this.src='https://picsum.photos/seed/rm/300/200'">
            </div>
          `).join('')}
        </div>

        <!-- Title & Rating Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <div>
            <h1 class="font-heading h2 text-emerald mb-1">${room.title}</h1>
            <div class="d-flex align-items-center gap-2 text-gold fs-7">
              <i class="fas fa-star"></i><strong>${room.rating || 5.0}</strong>
              <span class="text-muted">(${room.reviewsCount || 35} verified reviews)</span>
              <span class="text-muted">• ${room.view || 'Scenic View'}</span>
            </div>
          </div>
          <div class="text-lg-end mt-2 mt-lg-0">
            <span class="fs-7 text-muted d-block">Starting from</span>
            <span class="font-heading text-gold fs-2 fw-bold">$${room.price}</span> <small class="text-muted">/ night</small>
          </div>
        </div>

        <div class="section-divider start mb-4"></div>

        <!-- Room Specs Cards -->
        <div class="bg-ivory p-4 rounded border mb-4">
          <h5 class="font-heading text-emerald mb-3">Key Accommodations Specifications</h5>
          <div class="row g-3 fs-7">
            <div class="col-md-4 col-6">
              <i class="fas fa-ruler-combined text-gold me-2 fs-6"></i><strong>Room Size:</strong><br><span class="text-muted ms-4">${room.size}</span>
            </div>
            <div class="col-md-4 col-6">
              <i class="fas fa-users text-gold me-2 fs-6"></i><strong>Max Occupancy:</strong><br><span class="text-muted ms-4">${room.guests}</span>
            </div>
            <div class="col-md-4 col-6">
              <i class="fas fa-bed text-gold me-2 fs-6"></i><strong>Bed Layout:</strong><br><span class="text-muted ms-4">${room.bed}</span>
            </div>
            <div class="col-md-4 col-6">
              <i class="fas fa-bath text-gold me-2 fs-6"></i><strong>Bathroom:</strong><br><span class="text-muted ms-4">${room.bathroom || 'Marble Bath & Rain Shower'}</span>
            </div>
            <div class="col-md-4 col-6">
              <i class="fas fa-utensils text-gold me-2 fs-6"></i><strong>Breakfast:</strong><br><span class="text-muted ms-4">${room.breakfast || 'Gourmet Breakfast Included'}</span>
            </div>
            <div class="col-md-4 col-6">
              <i class="fas fa-wifi text-gold me-2 fs-6"></i><strong>Wi-Fi:</strong><br><span class="text-muted ms-4">${room.wifi || 'High-Speed Fiber Included'}</span>
            </div>
          </div>
        </div>

        <!-- Full Description -->
        <div class="mb-5">
          <h4 class="font-heading text-emerald mb-3">About ${room.title}</h4>
          <p class="text-muted leading-relaxed mb-4">${room.fullDescription || room.description}</p>
        </div>

        <!-- Included Amenities -->
        <div class="mb-5">
          <h4 class="font-heading text-emerald mb-3">Room Amenities & Services</h4>
          <div class="row g-3">
            ${(room.amenities || []).map(a => `
              <div class="col-md-6">
                <div class="d-flex align-items-center p-3 bg-white rounded border">
                  <i class="fas fa-check-circle text-gold me-3 fs-5"></i>
                  <span class="fs-7 fw-medium">${a}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Special Features -->
        ${room.features ? `
          <div class="mb-5">
            <h4 class="font-heading text-emerald mb-3">Bespoke Room Features</h4>
            <ul class="list-group list-group-flush border-0">
              ${room.features.map(f => `
                <li class="list-group-item bg-transparent border-bottom px-0 py-2 fs-7 text-muted">
                  <i class="fas fa-gem text-gold me-2"></i> ${f}
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Guest Reviews -->
        <div class="mb-4">
          <h4 class="font-heading text-emerald mb-3">Verified Guest Reviews</h4>
          ${(room.reviews && room.reviews.length > 0) ? room.reviews.map(rev => `
            <div class="bg-white p-4 rounded border mb-3">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="font-heading text-emerald mb-0 fw-bold">${rev.name}</h6>
                <div class="text-gold fs-8">
                  ${Array(rev.rating || 5).fill('<i class="fas fa-star"></i>').join('')}
                  <small class="text-muted ms-2">${rev.date}</small>
                </div>
              </div>
              <p class="text-muted fs-7 mb-0">"${rev.text}"</p>
            </div>
          `).join('') : `
            <p class="text-muted fs-7">No individual reviews submitted yet for this suite. Rating: 5.0 / 5 stars.</p>
          `}
        </div>
      </div>

      <!-- Right Reservation Sticky Sidebar -->
      <div class="col-lg-4">
        <div class="card border-gold p-4 sticky-top" style="top:100px; z-index:100;">
          <div class="text-center mb-4">
            <span class="text-muted fs-7 d-block">Reservation Rate</span>
            <span class="font-heading text-gold fs-1 fw-bold">$${room.price}</span>
            <small class="text-muted">/ night</small>
          </div>

          <form onsubmit="event.preventDefault(); goToBookingWithRoom('${room.id}');">
            <div class="mb-3">
              <label class="form-label fs-7 fw-bold text-emerald"><i class="far fa-calendar-alt me-1 text-gold"></i> Check-in Date</label>
              <input type="date" class="form-control" id="detailsCheckIn" value="${today}" min="${today}" required>
            </div>
            <div class="mb-3">
              <label class="form-label fs-7 fw-bold text-emerald"><i class="far fa-calendar-check me-1 text-gold"></i> Check-out Date</label>
              <input type="date" class="form-control" id="detailsCheckOut" value="${tomorrow}" min="${tomorrow}" required>
            </div>
            <div class="mb-4">
              <label class="form-label fs-7 fw-bold text-emerald"><i class="fas fa-user-friends me-1 text-gold"></i> Guests</label>
              <select class="form-select" id="detailsGuests">
                <option value="1">1 Adult</option>
                <option value="2" selected>2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>

            <div class="bg-ivory p-3 rounded mb-4 text-center fs-8 text-muted">
              <i class="fas fa-shield-alt text-gold me-1"></i> Instant Confirmation • Free Cancellation 24h Prior
            </div>

            <button type="submit" class="btn btn-gold w-100 py-3 font-heading tracking-widest text-uppercase">
              <i class="fas fa-calendar-check me-2"></i> Reserve This Room
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function goToBookingWithRoom(roomId) {
  const checkIn = document.getElementById("detailsCheckIn")?.value || "";
  const checkOut = document.getElementById("detailsCheckOut")?.value || "";
  window.location.href = `booking.html?room=${encodeURIComponent(roomId)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`;
}

window.goToBookingWithRoom = goToBookingWithRoom;

/* ==========================================================================
   Experiences, Dining & Spa
   ========================================================================== */

function renderExperiences() {
  const container = document.getElementById("experiencesContainer");
  if (!container || !window.VELORA_DATA) return;

  container.innerHTML = window.VELORA_DATA.experiences.map(exp => `
    <div class="col-lg-3 col-md-6 mb-4">
      <div class="experience-card">
        <img src="${exp.image}" alt="${exp.title}" class="experience-img" loading="lazy" onerror="this.src='https://picsum.photos/seed/exp/600/400'">
        <div class="experience-overlay">
          <span class="experience-subtitle">${exp.subtitle}</span>
          <h3 class="experience-title">${exp.title}</h3>
          <p class="fs-7 text-white-50 mb-0">${exp.description}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function renderDiningMenu(category = 'breakfast') {
  const container = document.getElementById("diningMenuContainer");
  if (!container || !window.VELORA_DATA) return;

  const catData = window.VELORA_DATA.dining.categories.find(c => c.id === category);
  if (!catData) return;

  container.innerHTML = `
    <div class="dining-card">
      <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h3 class="font-heading text-emerald mb-0">${catData.name}</h3>
          <small class="text-gold"><i class="far fa-clock me-1"></i> Serving hours: ${catData.time}</small>
        </div>
        <span class="badge bg-gold text-dark fs-7">Verde Gourmet</span>
      </div>
      <div class="row g-4">
        ${catData.items.map(item => `
          <div class="col-md-6">
            <div class="menu-item">
              <span class="menu-item-title">${item.name}</span>
              <span class="menu-item-price">${item.price}</span>
            </div>
            <p class="menu-item-desc">${item.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function switchDiningTab(catId, btnEl) {
  document.querySelectorAll("#diningTabs .filter-btn").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  renderDiningMenu(catId);
}

function renderSpaServices() {
  const container = document.getElementById("spaContainer");
  if (!container || !window.VELORA_DATA) return;

  container.innerHTML = window.VELORA_DATA.spa.map(s => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="spa-card">
        <img src="${s.image}" alt="${s.title}" class="spa-img" loading="lazy" onerror="this.src='https://picsum.photos/seed/spa/600/400'">
        <div class="spa-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge bg-emerald text-gold">${s.duration}</span>
            <span class="font-heading text-gold fs-4 fw-bold">${s.price}</span>
          </div>
          <h3 class="font-heading text-emerald h4 mb-2">${s.title}</h3>
          <p class="text-muted fs-7 mb-3">${s.description}</p>
          <button class="btn btn-outline-gold btn-sm w-100" onclick="bookSpaService('${s.title}')">
            <i class="fas fa-spa me-1"></i> Book Spa Treatment
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function bookSpaService(serviceName) {
  const specialReq = document.getElementById("bookSpecialRequests");
  if (specialReq) {
    specialReq.value = `Spa Request: ${serviceName}`;
  }
  showToast("Spa Selection Added", `Added '${serviceName}' to special requests. Choose check-in date to complete reservation.`);
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}

/* ==========================================================================
   Offers, Gallery, Reviews & FAQs
   ========================================================================== */

function renderOffers() {
  const container = document.getElementById("offersContainer");
  if (!container || !window.VELORA_DATA) return;

  container.innerHTML = window.VELORA_DATA.offers.map(offer => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="offer-card p-4">
        <span class="offer-badge">${offer.discount}</span>
        <h3 class="font-heading text-white h3 mb-2 mt-2">${offer.title}</h3>
        <p class="text-white-50 fs-7 mb-3">${offer.description}</p>

        <div class="bg-dark-emerald p-2 rounded mb-3 d-flex justify-content-between align-items-center border border-gold">
          <small class="text-gold">Promo Code:</small>
          <strong class="text-white letter-spacing-1">${offer.code}</strong>
        </div>

        <small class="d-block text-white-50 fs-8 mb-3"><i class="far fa-calendar-alt me-1"></i> ${offer.validity}</small>
        
        <button class="btn btn-gold btn-sm w-100" onclick="applyPromoCode('${offer.code}')">
          <i class="fas fa-tag me-1"></i> Claim Offer Now
        </button>
      </div>
    </div>
  `).join('');
}

function applyPromoCode(code) {
  const promoInput = document.getElementById("bookPromoCode");
  if (promoInput) {
    promoInput.value = code;
    calculateBookingTotal();
  }
  showToast("Promo Applied", `Promo code '${code}' applied successfully!`);
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}

function renderGallery(filterCategory = "all") {
  const container = document.getElementById("galleryContainer");
  if (!container || !window.VELORA_DATA) return;

  const items = window.VELORA_DATA.gallery.filter(item => {
    if (filterCategory === "all") return true;
    return item.category === filterCategory;
  });

  container.innerHTML = items.map(item => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="gallery-item" onclick="openLightbox('${item.image}', '${item.title}')">
        <img src="${item.image}" alt="${item.title}" class="gallery-img" loading="lazy" onerror="this.src='https://picsum.photos/seed/gal/800/600'">
        <div class="gallery-overlay">
          <div class="gallery-icon"><i class="fas fa-search-plus"></i></div>
          <h5 class="font-heading mb-0 text-white">${item.title}</h5>
          <small class="text-gold text-uppercase fs-8">${item.category}</small>
        </div>
      </div>
    </div>
  `).join('');
}

function filterGallery(category, btnEl) {
  document.querySelectorAll("#galleryFilterTabs .filter-btn").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  renderGallery(category);
}

function openLightbox(imgSrc, title) {
  const modalImg = document.getElementById("lightboxImage");
  const modalTitle = document.getElementById("lightboxTitle");
  if (!modalImg || !modalTitle) return;

  modalImg.src = imgSrc;
  modalTitle.textContent = title;

  const modal = new bootstrap.Modal(document.getElementById("lightboxModal"));
  modal.show();
}

function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  if (!container || !window.VELORA_DATA) return;

  // Load any user reviews from LocalStorage
  const userReviews = JSON.parse(localStorage.getItem("velora_reviews") || "[]");
  const allReviews = [...userReviews, ...window.VELORA_DATA.reviews];

  container.innerHTML = allReviews.map(r => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="testimonial-card">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="rating-stars">
            ${Array(r.rating).fill('<i class="fas fa-star"></i>').join('')}
          </div>
          <span class="badge bg-emerald text-gold fs-8">Verified Guest</span>
        </div>
        <h4 class="font-heading text-emerald mb-2">${r.title}</h4>
        <p class="text-muted fs-7 mb-4">"${r.text}"</p>

        <div class="d-flex align-items-center mt-auto">
          <img src="${r.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}" class="rounded-circle me-3" style="width:45px; height:45px; object-fit:cover;">
          <div>
            <h6 class="font-heading text-emerald mb-0 fw-bold">${r.name}</h6>
            <small class="text-muted fs-8">${r.stay} • ${r.location || 'Guest'}</small>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function submitReview(e) {
  e.preventDefault();
  const name = document.getElementById("reviewName").value;
  const title = document.getElementById("reviewTitle").value;
  const stay = document.getElementById("reviewStay").value;
  const rating = parseInt(document.getElementById("reviewRating").value);
  const text = document.getElementById("reviewText").value;

  const newReview = {
    id: Date.now(),
    name,
    location: "Verified Traveler",
    stay,
    rating,
    date: "Just now",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    title,
    text
  };

  const userReviews = JSON.parse(localStorage.getItem("velora_reviews") || "[]");
  userReviews.unshift(newReview);
  localStorage.setItem("velora_reviews", JSON.stringify(userReviews));

  renderReviews();
  bootstrap.Modal.getInstance(document.getElementById("addReviewModal")).hide();
  showToast("Review Submitted", "Thank you for sharing your experience at Velora!");
  e.target.reset();
}

function renderFaqs() {
  const container = document.getElementById("faqAccordion");
  if (!container || !window.VELORA_DATA) return;

  container.innerHTML = window.VELORA_DATA.faqs.map((faq, idx) => `
    <div class="accordion-item">
      <h2 class="accordion-header" id="faqHead${idx}">
        <button class="accordion-button ${idx !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse${idx}">
          ${faq.q}
        </button>
      </h2>
      <div id="faqCollapse${idx}" class="accordion-collapse collapse ${idx === 0 ? 'show' : ''}" data-bs-parent="#faqAccordion">
        <div class="accordion-body text-muted fs-7">
          ${faq.a}
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   Booking Engine & LocalStorage System
   ========================================================================== */

function initBookingSystem() {
  const roomSelect = document.getElementById("bookRoomSelect");
  if (!roomSelect || !window.VELORA_DATA) return;

  // Populate room options
  const roomsList = window.VELORA_ROOMS || window.VELORA_DATA.rooms;
  roomSelect.innerHTML = roomsList.map(r => `
    <option value="${r.id}" data-price="${r.price}">${r.title} - $${r.price}/night</option>
  `).join('');

  // Set minimum dates
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const checkInInput = document.getElementById("bookCheckIn");
  const checkOutInput = document.getElementById("bookCheckOut");

  if (checkInInput && checkOutInput) {
    checkInInput.min = today;
    checkInInput.value = today;

    checkOutInput.min = tomorrow;
    checkOutInput.value = tomorrow;

    checkInInput.addEventListener("change", function () {
      const selectedCheckIn = new Date(this.value);
      const nextDay = new Date(selectedCheckIn.getTime() + 86400000).toISOString().split("T")[0];
      checkOutInput.min = nextDay;
      if (checkOutInput.value <= this.value) {
        checkOutInput.value = nextDay;
      }
      calculateBookingTotal();
    });

    checkOutInput.addEventListener("change", calculateBookingTotal);
  }

  // Parse URL Parameters (e.g. booking.html?room=deluxe-king&promo=WEEKEND20&checkIn=2026-08-10&checkOut=2026-08-14)
  const params = new URLSearchParams(window.location.search);
  const paramRoom = params.get("room");
  const paramPromo = params.get("promo");
  const paramCheckIn = params.get("checkIn");
  const paramCheckOut = params.get("checkOut");
  const paramService = params.get("service");

  if (paramRoom && Array.from(roomSelect.options).some(o => o.value === paramRoom)) {
    roomSelect.value = paramRoom;
  }
  if (paramPromo) {
    const promoInput = document.getElementById("bookPromoCode");
    if (promoInput) promoInput.value = paramPromo;
  }
  if (paramCheckIn && checkInInput) {
    checkInInput.value = paramCheckIn;
  }
  if (paramCheckOut && checkOutInput) {
    checkOutInput.value = paramCheckOut;
  }
  if (paramService) {
    const specialReq = document.getElementById("bookSpecialRequests");
    if (specialReq) specialReq.value = `Service Request: ${paramService}`;
  }

  roomSelect.addEventListener("change", calculateBookingTotal);
  document.getElementById("bookPromoCode")?.addEventListener("input", calculateBookingTotal);

  calculateBookingTotal();
}

function selectRoomForBooking(roomId) {
  const roomSelect = document.getElementById("bookRoomSelect");
  if (roomSelect) {
    roomSelect.value = roomId;
    calculateBookingTotal();
  }
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}

function calculateBookingTotal() {
  const checkInVal = document.getElementById("bookCheckIn")?.value;
  const checkOutVal = document.getElementById("bookCheckOut")?.value;
  const roomSelect = document.getElementById("bookRoomSelect");
  const promoVal = document.getElementById("bookPromoCode")?.value?.trim()?.toUpperCase();

  if (!checkInVal || !checkOutVal || !roomSelect) return;

  const checkIn = new Date(checkInVal);
  const checkOut = new Date(checkOutVal);

  let nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  if (isNaN(nights) || nights < 1) nights = 1;

  const selectedOption = roomSelect.options[roomSelect.selectedIndex];
  const pricePerNight = parseFloat(selectedOption?.getAttribute("data-price") || 280);

  const subtotal = nights * pricePerNight;
  let tax = subtotal * 0.12; // 12% luxury tax & resort fee

  let discount = 0;
  if (promoVal === "WEEKEND20") discount = subtotal * 0.20;
  if (promoVal === "WELLNESS25") discount = subtotal * 0.25;
  if (promoVal === "ROMANCE2026") discount = 100;

  const total = Math.max(0, subtotal + tax - discount);

  // Update Summary DOM
  document.getElementById("summaryNights").textContent = nights;
  document.getElementById("summaryRate").textContent = `$${pricePerNight}`;
  document.getElementById("summarySubtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("summaryTax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("summaryDiscount").textContent = `-$${discount.toFixed(2)}`;
  document.getElementById("summaryTotal").textContent = `$${total.toFixed(2)}`;
}

function processBookingSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("bookName").value;
  const email = document.getElementById("bookEmail").value;
  const phone = document.getElementById("bookPhone").value;
  const checkIn = document.getElementById("bookCheckIn").value;
  const checkOut = document.getElementById("bookCheckOut").value;
  const adults = document.getElementById("bookAdults").value;
  const children = document.getElementById("bookChildren").value;
  const roomId = document.getElementById("bookRoomSelect").value;
  const specialRequests = document.getElementById("bookSpecialRequests").value;

  const room = window.VELORA_DATA.rooms.find(r => r.id === roomId);
  const totalStr = document.getElementById("summaryTotal").textContent;
  const totalNum = parseFloat(totalStr.replace("$", ""));

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  const bookingCode = "VEL-" + Math.floor(1000 + Math.random() * 9000);

  const newBooking = {
    id: bookingCode,
    guestName: name,
    email: email,
    phone: phone,
    roomId: roomId,
    roomTitle: room ? room.title : "Luxury Suite",
    checkIn: checkIn,
    checkOut: checkOut,
    nights: nights,
    guests: `${adults} Adults${children > 0 ? `, ${children} Children` : ''}`,
    specialRequests: specialRequests || "None",
    pricePerNight: room ? room.price : 280,
    totalPrice: totalNum,
    status: "Confirmed",
    createdDate: new Date().toISOString().split("T")[0]
  };

  // Store in LocalStorage
  const existingBookings = JSON.parse(localStorage.getItem("velora_bookings") || "[]");
  existingBookings.unshift(newBooking);
  localStorage.setItem("velora_bookings", JSON.stringify(existingBookings));

  // Show Confirmation Modal
  showBookingConfirmationModal(newBooking);

  // Trigger Toast & Reset Form
  showToast("Reservation Confirmed!", `Booking ${bookingCode} saved. Check 'My Bookings' tab anytime.`);
  e.target.reset();
  initBookingSystem();
}

function showBookingConfirmationModal(booking) {
  const modalBody = document.getElementById("confirmationModalBody");
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="text-center mb-4">
      <div class="d-inline-flex align-items-center justify-content-center bg-emerald text-gold rounded-circle mb-3" style="width:70px; height:70px; font-size:2rem; border:2px solid #D6B878;">
        <i class="fas fa-check"></i>
      </div>
      <h3 class="font-heading text-emerald mb-1">Reservation Confirmed!</h3>
      <p class="text-muted fs-7">Thank you for choosing Velora Grand Hotel & Spa.</p>
      <div class="badge bg-gold text-dark fs-6 py-2 px-3 border">Reservation ID: ${booking.id}</div>
    </div>

    <div class="bg-ivory p-3 rounded border mb-3">
      <div class="row g-2 fs-7">
        <div class="col-6"><strong>Guest Name:</strong> ${booking.guestName}</div>
        <div class="col-6"><strong>Room Type:</strong> ${booking.roomTitle}</div>
        <div class="col-6"><strong>Check-in:</strong> ${booking.checkIn} (14:00)</div>
        <div class="col-6"><strong>Check-out:</strong> ${booking.checkOut} (12:00)</div>
        <div class="col-6"><strong>Guests:</strong> ${booking.guests}</div>
        <div class="col-6"><strong>Duration:</strong> ${booking.nights} Night(s)</div>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center bg-emerald text-white p-3 rounded">
      <span class="fs-7 text-gold">Total Paid / Guaranteed:</span>
      <strong class="font-heading fs-3 text-gold">$${booking.totalPrice.toFixed(2)}</strong>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById("confirmationModal"));
  modal.show();
}

/* ==========================================================================
   My Bookings Management
   ========================================================================== */

function openMyBookingsModal() {
  const modalBody = document.getElementById("myBookingsModalBody");
  if (!modalBody) return;

  const stored = JSON.parse(localStorage.getItem("velora_bookings") || "[]");
  const initial = window.VELORA_DATA ? window.VELORA_DATA.initialBookings : [];
  const allBookings = stored.length > 0 ? stored : initial;

  if (allBookings.length === 0) {
    modalBody.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-calendar-times text-gold fs-1 mb-3"></i>
        <h4 class="font-heading">No Active Reservations Found</h4>
        <p class="text-muted">You haven't made any room reservations yet.</p>
        <button class="btn btn-gold btn-sm mt-2" onclick="bootstrap.Modal.getInstance(document.getElementById('myBookingsModal')).hide(); document.getElementById('booking').scrollIntoView();">
          Book Your First Stay
        </button>
      </div>
    `;
  } else {
    modalBody.innerHTML = `
      <div class="table-responsive">
        <table class="table table-velora align-middle">
          <thead>
            <tr>
              <th>Res #</th>
              <th>Guest Name</th>
              <th>Room</th>
              <th>Dates</th>
              <th>Guests</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${allBookings.map(b => `
              <tr>
                <td><strong class="text-emerald">${b.id}</strong></td>
                <td>${b.guestName}</td>
                <td>${b.roomTitle}</td>
                <td><small class="d-block">${b.checkIn}</small><small class="text-muted">to ${b.checkOut}</small></td>
                <td>${b.guests}</td>
                <td><strong class="text-gold">$${b.totalPrice}</strong></td>
                <td>
                  <span class="badge-status ${b.status.toLowerCase().replace(' ', '-')}">${b.status}</span>
                </td>
                <td>
                  ${b.status === "Confirmed" ? `
                    <button class="btn btn-outline-danger btn-sm fs-8 py-1" onclick="cancelReservation('${b.id}')">Cancel</button>
                  ` : '<span class="text-muted fs-8">N/A</span>'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  const modal = new bootstrap.Modal(document.getElementById("myBookingsModal"));
  modal.show();
}

function initMyBookingsPage() {
  const container = document.getElementById("myBookingsPageContainer");
  if (!container) return;

  const stored = JSON.parse(localStorage.getItem("velora_bookings") || "[]");
  const initial = window.VELORA_DATA ? window.VELORA_DATA.initialBookings : [];
  const allBookings = stored.length > 0 ? stored : initial;

  if (allBookings.length === 0) {
    container.innerHTML = `
      <div class="card p-5 text-center">
        <i class="fas fa-calendar-times text-gold fs-1 mb-3"></i>
        <h3 class="font-heading text-emerald mb-2">No Active Reservations Found</h3>
        <p class="text-muted mb-4">You have not placed any room reservations yet with Velora Grand Hotel & Spa.</p>
        <div>
          <a href="booking.html" class="btn btn-gold">
            <i class="fas fa-calendar-plus me-2"></i> Book Your First Stay
          </a>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="card p-4 border-gold shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h3 class="font-heading text-emerald mb-0">Your Active & Past Stay History</h3>
            <span class="text-muted fs-7">Manage, review, or modify your current guest reservations</span>
          </div>
          <a href="booking.html" class="btn btn-gold btn-sm">
            <i class="fas fa-plus me-1"></i> New Reservation
          </a>
        </div>
        
        <div class="table-responsive">
          <table class="table table-velora align-middle">
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Guest Name</th>
                <th>Room / Suite</th>
                <th>Stay Dates</th>
                <th>Occupancy</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${allBookings.map(b => `
                <tr>
                  <td><strong class="text-emerald font-heading">${b.id}</strong></td>
                  <td>${b.guestName}</td>
                  <td>${b.roomTitle}</td>
                  <td><small class="d-block fw-bold">${b.checkIn}</small><small class="text-muted">to ${b.checkOut}</small></td>
                  <td>${b.guests}</td>
                  <td><strong class="text-gold font-heading fs-5">$${typeof b.totalPrice === 'number' ? b.totalPrice.toFixed(2) : b.totalPrice}</strong></td>
                  <td>
                    <span class="badge-status ${b.status.toLowerCase().replace(' ', '-')}">${b.status}</span>
                  </td>
                  <td>
                    ${b.status === "Confirmed" ? `
                      <button class="btn btn-outline-danger btn-sm fs-8 py-1" onclick="cancelReservation('${b.id}')">Cancel</button>
                    ` : '<span class="text-muted fs-8">N/A</span>'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

function cancelReservation(bookingId) {
  if (!confirm(`Are you sure you want to cancel reservation ${bookingId}?`)) return;

  let stored = JSON.parse(localStorage.getItem("velora_bookings") || "[]");
  if (stored.length === 0 && window.VELORA_DATA) {
    stored = [...window.VELORA_DATA.initialBookings];
  }

  const booking = stored.find(b => b.id === bookingId);
  if (booking) {
    booking.status = "Cancelled";
    localStorage.setItem("velora_bookings", JSON.stringify(stored));
    showToast("Booking Cancelled", `Reservation ${bookingId} has been cancelled.`);
    if (document.getElementById("myBookingsModalBody")) {
      openMyBookingsModal();
    }
    if (document.getElementById("myBookingsPageContainer")) {
      initMyBookingsPage();
    }
  }
}

/* ==========================================================================
   Contact Form & Event Listeners
   ========================================================================== */

function initEventListeners() {
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", processBookingSubmit);
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("contactName").value;
      const message = document.getElementById("contactMessage").value;

      const userMessages = JSON.parse(localStorage.getItem("velora_messages") || "[]");
      userMessages.unshift({ id: Date.now(), name, message, date: new Date().toLocaleDateString() });
      localStorage.setItem("velora_messages", JSON.stringify(userMessages));

      showToast("Message Sent", "Thank you! Our Concierge desk will reply shortly.");
      this.reset();
    });
  }
}

// Global Exports
window.toggleTheme = toggleTheme;
window.filterRooms = filterRooms;
window.openRoomDetails = openRoomDetails;
window.selectRoomForBooking = selectRoomForBooking;
window.switchDiningTab = switchDiningTab;
window.bookSpaService = bookSpaService;
window.applyPromoCode = applyPromoCode;
window.filterGallery = filterGallery;
window.openLightbox = openLightbox;
window.submitReview = submitReview;
window.openMyBookingsModal = openMyBookingsModal;
window.cancelReservation = cancelReservation;
