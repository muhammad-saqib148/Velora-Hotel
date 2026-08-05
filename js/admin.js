/**
 * Velora Grand Hotel & Spa - Executive Admin Management Script
 * Handles Authentication, Reservations Approval, Room CRUD, Supabase Image Uploads & Communications.
 */

document.addEventListener("DOMContentLoaded", function () {
  initAdminPage();
});

function initAdminPage() {
  const loginSection = document.getElementById("adminLoginSection");
  const dashboardSection = document.getElementById("adminDashboardSection");

  if (!loginSection || !dashboardSection) return;

  if (window.VeloraSupabase && window.VeloraSupabase.isAdminAuthenticated()) {
    loginSection.style.display = "none";
    dashboardSection.style.display = "block";
    switchAdminPortalTab('dashboard');
  } else {
    loginSection.style.display = "block";
    dashboardSection.style.display = "none";
  }
}

async function handleAdminLogin(e) {
  e.preventDefault();
  const userEl = document.getElementById("adminUsername");
  const passEl = document.getElementById("adminPassword");
  const alertArea = document.getElementById("loginAlertArea");

  if (!userEl || !passEl) return;

  const username = userEl.value;
  const password = passEl.value;

  alertArea.innerHTML = `<div class="alert alert-info py-2 fs-8"><i class="fas fa-spinner fa-spin me-1"></i> Authenticating credentials...</div>`;

  const result = await window.VeloraSupabase.authenticateAdmin(username, password);

  if (result.success) {
    alertArea.innerHTML = `<div class="alert alert-success py-2 fs-8"><i class="fas fa-check-circle me-1"></i> Access Granted. Redirecting to dashboard...</div>`;
    setTimeout(() => {
      document.getElementById("adminLoginSection").style.display = "none";
      document.getElementById("adminDashboardSection").style.display = "block";
      switchAdminPortalTab('dashboard');
      alertArea.innerHTML = "";
    }, 600);
  } else {
    alertArea.innerHTML = `<div class="alert alert-danger py-2 fs-8"><i class="fas fa-exclamation-triangle me-1"></i> ${result.message}</div>`;
  }
}

function handleAdminLogout() {
  if (confirm("Log out from Velora Executive Admin Portal?")) {
    window.VeloraSupabase.logoutAdmin();
    initAdminPage();
    if (typeof showToast === "function") {
      showToast("Logged Out", "Admin session ended securely.");
    }
  }
}

function switchAdminPortalTab(tabName, btnEl) {
  if (btnEl) {
    document.querySelectorAll(".admin-sidebar-nav .nav-link").forEach(el => el.classList.remove("active"));
    btnEl.classList.add("active");
  } else {
    // Highlight sidebar item matching tabName
    document.querySelectorAll(".admin-sidebar-nav .nav-link").forEach(el => {
      const onclickAttr = el.getAttribute("onclick") || "";
      if (onclickAttr.includes(`'${tabName}'`)) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  const contentArea = document.getElementById("adminMainContentArea");
  if (!contentArea) return;

  contentArea.innerHTML = `<div class="text-center py-5"><i class="fas fa-spinner fa-spin text-gold fs-2 mb-2"></i><p class="text-white-50 fs-7">Loading live data from Supabase...</p></div>`;

  switch (tabName) {
    case 'dashboard':
      renderAdminDashboard();
      break;
    case 'reservations':
      renderAdminReservations();
      break;
    case 'rooms':
      renderAdminRooms();
      break;
    case 'images':
      renderAdminRoomImages();
      break;
    case 'guests':
      renderAdminGuests();
      break;
    case 'messages':
      renderAdminMessages();
      break;
    case 'settings':
      renderAdminSettings();
      break;
    default:
      renderAdminDashboard();
  }
}

// ------------------------------------------------------------------
// 1. DASHBOARD VIEW
// ------------------------------------------------------------------
async function renderAdminDashboard() {
  const contentArea = document.getElementById("adminMainContentArea");
  if (!contentArea) return;

  const bookings = await window.VeloraSupabase.getBookings();
  const rooms = await window.VeloraSupabase.getRooms();

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === "PENDING" || b.status === "Pending").length;
  const confirmedBookings = bookings.filter(b => b.status === "CONFIRMED" || b.status === "Confirmed").length;
  const cancelledBookings = bookings.filter(b => b.status === "CANCELLED" || b.status === "Cancelled").length;

  const availableRoomsCount = rooms.filter(r => r.status === "Available").length;
  const occupiedRoomsCount = rooms.filter(r => r.status === "Booked" || r.status === "Occupied").length;

  const totalRevenue = bookings
    .filter(b => b.status !== "CANCELLED" && b.status !== "Cancelled")
    .reduce((sum, b) => sum + (parseFloat(b.totalPrice) || 0), 0);

  contentArea.innerHTML = `
    <!-- KPI Header Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-3 col-6">
        <div class="p-3 bg-emerald rounded border border-gold">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="text-white-50 fs-8 text-uppercase fw-bold">Total Reservations</span>
            <i class="fas fa-suitcase text-gold fs-5"></i>
          </div>
          <h2 class="font-heading text-gold mb-0">${totalBookings}</h2>
          <small class="text-white-50 fs-8">Registered Bookings</small>
        </div>
      </div>

      <div class="col-md-3 col-6">
        <div class="p-3 bg-emerald rounded border border-warning">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="text-white-50 fs-8 text-uppercase fw-bold">Pending Approval</span>
            <i class="fas fa-clock text-warning fs-5"></i>
          </div>
          <h2 class="font-heading text-warning mb-0">${pendingBookings}</h2>
          <small class="text-warning fs-8">Requires Confirmation</small>
        </div>
      </div>

      <div class="col-md-3 col-6">
        <div class="p-3 bg-emerald rounded border border-success">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="text-white-50 fs-8 text-uppercase fw-bold">Confirmed Stays</span>
            <i class="fas fa-check-circle text-success fs-5"></i>
          </div>
          <h2 class="font-heading text-success mb-0">${confirmedBookings}</h2>
          <small class="text-success fs-8">Active Reservations</small>
        </div>
      </div>

      <div class="col-md-3 col-6">
        <div class="p-3 bg-emerald rounded border border-gold">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="text-white-50 fs-8 text-uppercase fw-bold">Total Revenue</span>
            <i class="fas fa-dollar-sign text-gold fs-5"></i>
          </div>
          <h2 class="font-heading text-gold mb-0">$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
          <small class="text-white-50 fs-8">Gross Booking Value</small>
        </div>
      </div>
    </div>

    <!-- Inventory & Cancellation Stats Row -->
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="p-3 bg-emerald rounded border border-gold">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-white-50 fs-8 text-uppercase fw-bold">Available Rooms</span>
            <span class="badge bg-success text-white">${availableRoomsCount} Ready</span>
          </div>
          <h3 class="font-heading text-white mb-0">${availableRoomsCount} / ${rooms.length} Suites</h3>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-3 bg-emerald rounded border border-gold">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-white-50 fs-8 text-uppercase fw-bold">Occupied Rooms</span>
            <span class="badge bg-gold text-dark">${occupiedRoomsCount} In Use</span>
          </div>
          <h3 class="font-heading text-white mb-0">${occupiedRoomsCount} Suites</h3>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-3 bg-emerald rounded border border-danger">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-white-50 fs-8 text-uppercase fw-bold">Cancelled Bookings</span>
            <span class="badge bg-danger text-white">${cancelledBookings} Cancelled</span>
          </div>
          <h3 class="font-heading text-danger mb-0">${cancelledBookings} Reservations</h3>
        </div>
      </div>
    </div>

    <!-- Recent Reservations Table -->
    <div class="p-4 bg-emerald rounded border border-gold">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="font-heading text-gold mb-0"><i class="fas fa-history me-2"></i> Recent Reservations (Supabase DB)</h4>
        <button class="btn btn-gold btn-sm" onclick="switchAdminPortalTab('reservations')">View All Reservations</button>
      </div>

      <div class="table-responsive">
        <table class="table table-dark table-hover align-middle mb-0">
          <thead>
            <tr class="text-gold font-heading fs-8 border-gold">
              <th>ID</th>
              <th>Customer</th>
              <th>Room</th>
              <th>Check-in / Out</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${bookings.slice(0, 6).map(b => `
              <tr>
                <td><strong class="text-gold">${b.id}</strong></td>
                <td>
                  <strong>${b.guestName}</strong>
                  <small class="d-block text-white-50 fs-8">${b.email}</small>
                </td>
                <td>${b.roomTitle}</td>
                <td><small>${b.checkIn} to ${b.checkOut}</small></td>
                <td><strong class="text-gold">$${parseFloat(b.totalPrice).toFixed(2)}</strong></td>
                <td>
                  <span class="badge ${getStatusBadgeClass(b.status)} py-1 px-2">${b.status}</span>
                </td>
                <td>
                  <button class="btn btn-outline-gold btn-sm py-0 px-2 fs-8" onclick="viewReservationDetails('${b.id}')">
                    <i class="fas fa-eye me-1"></i> View
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function getStatusBadgeClass(status) {
  const s = (status || "").toUpperCase();
  if (s === "CONFIRMED") return "bg-success text-white";
  if (s === "CANCELLED") return "bg-danger text-white";
  return "bg-warning text-dark";
}

// ------------------------------------------------------------------
// 2. RESERVATIONS APPROVAL WORKFLOW
// ------------------------------------------------------------------
async function renderAdminReservations() {
  const contentArea = document.getElementById("adminMainContentArea");
  if (!contentArea) return;

  const bookings = await window.VeloraSupabase.getBookings();

  contentArea.innerHTML = `
    <div class="p-4 bg-emerald rounded border border-gold shadow-sm">
      <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h4 class="font-heading text-gold mb-0"><i class="fas fa-calendar-check me-2"></i> Guest Reservations Approval Registry</h4>
          <p class="text-white-50 fs-8 mb-0">Review pending reservations, confirm bookings, or issue guest cancellations.</p>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-gold btn-sm" onclick="exportReservationsCSV()"><i class="fas fa-download me-1"></i> Export CSV</button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-dark table-hover align-middle border-gold">
          <thead>
            <tr class="text-gold font-heading fs-7 border-gold">
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Room</th>
              <th>Check-in / Out</th>
              <th>Guests</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${bookings.length === 0 ? `
              <tr><td colspan="8" class="text-center py-4 text-white-50">No reservations found in database.</td></tr>
            ` : bookings.map(b => `
              <tr>
                <td><strong class="text-gold">${b.id}</strong></td>
                <td>
                  <strong class="d-block">${b.guestName}</strong>
                  <small class="text-white-50 d-block fs-8">${b.email}</small>
                  <small class="text-white-50 d-block fs-8">${b.phone || 'N/A'}</small>
                </td>
                <td><strong>${b.roomTitle}</strong></td>
                <td>
                  <small class="d-block"><i class="far fa-calendar-alt text-gold me-1"></i> ${b.checkIn}</small>
                  <small class="d-block text-white-50"><i class="far fa-calendar-check text-gold me-1"></i> ${b.checkOut}</small>
                </td>
                <td><small>${b.guests}</small></td>
                <td><strong class="text-gold">$${parseFloat(b.totalPrice).toFixed(2)}</strong></td>
                <td>
                  <span class="badge ${getStatusBadgeClass(b.status)} py-1 px-2 fs-8">${b.status}</span>
                </td>
                <td>
                  <div class="d-flex gap-1 flex-wrap">
                    <button class="btn btn-outline-info btn-sm py-1 px-2 fs-8" title="View Full Details" onclick="viewReservationDetails('${b.id}')">
                      <i class="fas fa-eye"></i> VIEW
                    </button>
                    ${(b.status === "PENDING" || b.status === "Pending" || b.status === "CANCELLED" || b.status === "Cancelled") ? `
                      <button class="btn btn-success btn-sm py-1 px-2 fs-8" title="Approve & Confirm Booking" onclick="confirmReservation('${b.id}')">
                        <i class="fas fa-check"></i> CONFIRM
                      </button>
                    ` : ''}
                    ${(b.status !== "CANCELLED" && b.status !== "Cancelled") ? `
                      <button class="btn btn-warning btn-sm py-1 px-2 fs-8" title="Cancel Booking" onclick="cancelReservation('${b.id}')">
                        <i class="fas fa-times"></i> CANCEL
                      </button>
                    ` : ''}
                    <button class="btn btn-outline-danger btn-sm py-1 px-2 fs-8" title="Delete Permanent Record" onclick="deleteReservationRecord('${b.id}')">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

async function viewReservationDetails(bookingId) {
  const bookings = await window.VeloraSupabase.getBookings();
  const booking = bookings.find(b => b.id === bookingId || b.dbId === bookingId);

  if (!booking) return;

  const modalBody = document.getElementById("adminReservationModalBody");
  modalBody.innerHTML = `
    <div class="bg-dark-emerald p-3 rounded border border-gold mb-3 text-center">
      <span class="badge ${getStatusBadgeClass(booking.status)} fs-6 py-2 px-3 mb-2">STATUS: ${booking.status}</span>
      <h3 class="font-heading text-gold mb-1">Reservation #${booking.id}</h3>
      <p class="text-white-50 fs-8 mb-0">Booked on: ${booking.createdDate || 'Recent'}</p>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <div class="p-3 bg-dark-emerald rounded border border-secondary">
          <h6 class="text-gold font-heading border-bottom border-secondary pb-1"><i class="fas fa-user me-1"></i> Customer Information</h6>
          <p class="mb-1 fs-7"><strong>Name:</strong> ${booking.guestName}</p>
          <p class="mb-1 fs-7"><strong>Email:</strong> ${booking.email}</p>
          <p class="mb-0 fs-7"><strong>Phone:</strong> ${booking.phone || 'N/A'}</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="p-3 bg-dark-emerald rounded border border-secondary">
          <h6 class="text-gold font-heading border-bottom border-secondary pb-1"><i class="fas fa-bed me-1"></i> Accommodations Details</h6>
          <p class="mb-1 fs-7"><strong>Suite:</strong> ${booking.roomTitle}</p>
          <p class="mb-1 fs-7"><strong>Dates:</strong> ${booking.checkIn} to ${booking.checkOut}</p>
          <p class="mb-0 fs-7"><strong>Duration & Guests:</strong> ${booking.nights} Night(s) • ${booking.guests}</p>
        </div>
      </div>
    </div>

    <div class="p-3 bg-dark-emerald rounded border border-secondary mb-3">
      <h6 class="text-gold font-heading border-bottom border-secondary pb-1"><i class="fas fa-comment-dots me-1"></i> Special Requests</h6>
      <p class="fs-7 text-white-50 mb-0">"${booking.specialRequests || 'No special requests submitted.'}"</p>
    </div>

    <div class="d-flex justify-content-between align-items-center p-3 bg-dark-emerald rounded border border-gold mb-4">
      <span class="font-heading text-white fs-5">Total Booking Amount:</span>
      <strong class="font-heading text-gold fs-3">$${parseFloat(booking.totalPrice).toFixed(2)}</strong>
    </div>

    <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
      ${booking.status !== "CONFIRMED" ? `
        <button class="btn btn-success" onclick="confirmReservation('${booking.id}')">
          <i class="fas fa-check-circle me-1"></i> CONFIRM BOOKING
        </button>
      ` : ''}
      ${booking.status !== "CANCELLED" ? `
        <button class="btn btn-warning" onclick="cancelReservation('${booking.id}')">
          <i class="fas fa-times-circle me-1"></i> CANCEL BOOKING
        </button>
      ` : ''}
      <button class="btn btn-outline-light" data-bs-dismiss="modal">Close</button>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById("adminReservationModal"));
  modal.show();
}

async function confirmReservation(bookingId) {
  if (confirm(`Confirm reservation #${bookingId}? This will dispatch a confirmation email to the customer.`)) {
    await window.VeloraSupabase.updateBookingStatus(bookingId, "CONFIRMED");
    
    // Close modal if open
    const modalEl = document.getElementById("adminReservationModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    renderAdminReservations();
    if (typeof showToast === "function") {
      showToast("Reservation Confirmed!", `Booking ${bookingId} status updated to CONFIRMED. Customer notified.`);
    }
  }
}

async function cancelReservation(bookingId) {
  if (confirm(`Are you sure you want to CANCEL reservation #${bookingId}? A cancellation notification will be sent.`)) {
    await window.VeloraSupabase.updateBookingStatus(bookingId, "CANCELLED");

    const modalEl = document.getElementById("adminReservationModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    renderAdminReservations();
    if (typeof showToast === "function") {
      showToast("Reservation Cancelled", `Booking ${bookingId} has been CANCELLED.`);
    }
  }
}

async function deleteReservationRecord(bookingId) {
  if (confirm(`Permanently delete reservation record #${bookingId}?`)) {
    await window.VeloraSupabase.deleteBooking(bookingId);
    renderAdminReservations();
    if (typeof showToast === "function") {
      showToast("Deleted", `Reservation ${bookingId} deleted.`);
    }
  }
}

function exportReservationsCSV() {
  window.VeloraSupabase.getBookings().then(bookings => {
    let csvContent = "data:text/csv;charset=utf-8,Booking ID,Customer Name,Email,Phone,Room,Check In,Check Out,Nights,Total Amount,Status\n";
    bookings.forEach(b => {
      csvContent += `"${b.id}","${b.guestName}","${b.email}","${b.phone || ''}","${b.roomTitle}","${b.checkIn}","${b.checkOut}","${b.nights}","${b.totalPrice}","${b.status}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Velora_Reservations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// ------------------------------------------------------------------
// 3. ROOM MANAGEMENT (ADD, EDIT, DELETE, STATUS)
// ------------------------------------------------------------------
async function renderAdminRooms() {
  const contentArea = document.getElementById("adminMainContentArea");
  if (!contentArea) return;

  const rooms = await window.VeloraSupabase.getRooms();

  contentArea.innerHTML = `
    <div class="p-4 bg-emerald rounded border border-gold shadow-sm mb-4">
      <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h4 class="font-heading text-gold mb-0"><i class="fas fa-bed me-2"></i> Accommodations & Suite Inventory</h4>
          <p class="text-white-50 fs-8 mb-0">Manage hotel room details, rates, availability status, and amenities.</p>
        </div>
        <button class="btn btn-gold btn-sm" onclick="showAddRoomModal()">
          <i class="fas fa-plus me-1"></i> Add New Room
        </button>
      </div>

      <div class="row g-4">
        ${rooms.map(r => `
          <div class="col-md-6 col-lg-4">
            <div class="card bg-dark-emerald border-gold h-100 shadow-sm overflow-hidden">
              <div class="position-relative" style="height: 180px;">
                <img src="${r.image}" class="w-100 h-100" style="object-fit: cover;" alt="${r.title}">
                <span class="position-absolute top-0 end-0 m-2 badge ${r.status === 'Available' ? 'bg-success' : 'bg-warning'}">
                  ${r.status || 'Available'}
                </span>
              </div>
              <div class="card-body p-3 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h5 class="font-heading text-gold mb-0">${r.title}</h5>
                  <strong class="text-white font-heading fs-5">$${r.price}<small class="fs-8 text-white-50">/night</small></strong>
                </div>
                <small class="text-white-50 d-block mb-2"><i class="fas fa-tag text-gold me-1"></i> ${r.category} • ${r.size}</small>
                <p class="fs-8 text-white-50 mb-3 flex-grow-1">${(r.description || "").slice(0, 90)}...</p>
                
                <div class="d-flex gap-1 border-top border-secondary pt-2">
                  <button class="btn btn-outline-gold btn-sm flex-fill py-1 fs-8" onclick="showEditRoomModal('${r.id}')">
                    <i class="fas fa-edit me-1"></i> Edit
                  </button>
                  <button class="btn btn-outline-info btn-sm flex-fill py-1 fs-8" onclick="openRoomImageUploadModal('${r.id}')">
                    <i class="fas fa-camera me-1"></i> Image
                  </button>
                  <button class="btn btn-outline-danger btn-sm py-1 px-2 fs-8" onclick="deleteAdminRoom('${r.id}')" title="Delete Room">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function showAddRoomModal() {
  document.getElementById("editRoomId").value = "";
  document.getElementById("adminRoomModalTitle").innerHTML = `<i class="fas fa-plus me-2"></i> Add New Accommodations Suite`;
  document.getElementById("adminRoomForm").reset();

  const modal = new bootstrap.Modal(document.getElementById("adminRoomModal"));
  modal.show();
}

async function showEditRoomModal(roomId) {
  const rooms = await window.VeloraSupabase.getRooms();
  const room = rooms.find(r => r.id === roomId);
  if (!room) return;

  document.getElementById("editRoomId").value = room.id;
  document.getElementById("adminRoomModalTitle").innerHTML = `<i class="fas fa-edit me-2"></i> Edit Suite: ${room.title}`;

  document.getElementById("roomNameInput").value = room.title;
  document.getElementById("roomTypeInput").value = room.category;
  document.getElementById("roomPriceInput").value = room.price;
  document.getElementById("roomCapacityInput").value = room.occupancy || "2 Guests";
  document.getElementById("roomSizeInput").value = room.size || "650 sq.ft";
  document.getElementById("roomBedInput").value = room.bed || "King Bed";
  document.getElementById("roomStatusSelect").value = room.status || "Available";
  document.getElementById("roomImageInput").value = room.image;
  document.getElementById("roomDescInput").value = room.description;

  const modal = new bootstrap.Modal(document.getElementById("adminRoomModal"));
  modal.show();
}

async function handleSaveRoomForm(e) {
  e.preventDefault();
  const roomId = document.getElementById("editRoomId").value || ("room-" + Date.now());

  const roomData = {
    id: roomId,
    title: document.getElementById("roomNameInput").value,
    category: document.getElementById("roomTypeInput").value,
    price: parseFloat(document.getElementById("roomPriceInput").value) || 280,
    occupancy: document.getElementById("roomCapacityInput").value,
    size: document.getElementById("roomSizeInput").value,
    bed: document.getElementById("roomBedInput").value,
    status: document.getElementById("roomStatusSelect").value,
    image: document.getElementById("roomImageInput").value,
    description: document.getElementById("roomDescInput").value,
    amenities: ["King Bed", "Private Terrace", "High-speed Wi-Fi", "Marble Bathroom"]
  };

  await window.VeloraSupabase.saveRoom(roomData);

  const modalEl = document.getElementById("adminRoomModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  renderAdminRooms();
  if (typeof renderRooms === "function") renderRooms(); // Update live public site view
  if (typeof showToast === "function") showToast("Room Saved", `${roomData.title} record updated.`);
}

async function deleteAdminRoom(roomId) {
  if (confirm("Are you sure you want to delete this room from database?")) {
    await window.VeloraSupabase.deleteRoom(roomId);
    renderAdminRooms();
    if (typeof renderRooms === "function") renderRooms();
    if (typeof showToast === "function") showToast("Room Deleted", "Room removed successfully.");
  }
}

// ------------------------------------------------------------------
// 4. ROOM IMAGES & SUPABASE STORAGE UPLOADS
// ------------------------------------------------------------------
async function renderAdminRoomImages() {
  const contentArea = document.getElementById("adminMainContentArea");
  if (!contentArea) return;

  const rooms = await window.VeloraSupabase.getRooms();

  contentArea.innerHTML = `
    <div class="p-4 bg-emerald rounded border border-gold shadow-sm">
      <div class="mb-4">
        <h4 class="font-heading text-gold mb-1"><i class="fas fa-images me-2"></i> Live Room Image Management (Supabase Storage)</h4>
        <p class="text-white-50 fs-8 mb-0">Upload new room photos directly. Changes publish instantly to the live public website without code updates.</p>
      </div>

      <div class="row g-4">
        ${rooms.map(r => `
          <div class="col-md-6 col-lg-4">
            <div class="card bg-dark-emerald border-gold h-100 p-3 text-center">
              <h5 class="font-heading text-gold mb-2">${r.title}</h5>
              <div class="mb-3 position-relative rounded overflow-hidden" style="height: 180px; border: 1px solid #C9A96E;">
                <img src="${r.image}" class="w-100 h-100" style="object-fit: cover;" alt="${r.title}">
              </div>
              <button class="btn btn-gold btn-sm w-100 fw-bold" onclick="openRoomImageUploadModal('${r.id}')">
                <i class="fas fa-camera me-1"></i> Change Room Image
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

async function openRoomImageUploadModal(roomId) {
  const rooms = await window.VeloraSupabase.getRooms();
  const room = rooms.find(r => r.id === roomId);
  if (!room) return;

  document.getElementById("uploadImageRoomId").value = roomId;
  document.getElementById("roomUrlInput").value = room.image;
  
  const preview = document.getElementById("imageUploadPreview");
  preview.src = room.image;
  preview.style.display = "block";
  document.getElementById("roomFileInput").value = "";

  const modal = new bootstrap.Modal(document.getElementById("adminRoomImageModal"));
  modal.show();
}

function previewSelectedImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById("imageUploadPreview");
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

async function handleSaveRoomImageUpload() {
  const roomId = document.getElementById("uploadImageRoomId").value;
  const fileInput = document.getElementById("roomFileInput");
  const urlInput = document.getElementById("roomUrlInput");

  if (!roomId) return;

  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    if (typeof showToast === "function") showToast("Uploading...", "Saving file to Supabase Storage.");
    
    const result = await window.VeloraSupabase.uploadRoomImageStorage(file, roomId);
    if (result && result.success) {
      if (typeof showToast === "function") showToast("Image Updated!", "Live website updated automatically!");
    }
  } else if (urlInput.value) {
    await window.VeloraSupabase.updateRoomImage(roomId, urlInput.value);
    if (typeof showToast === "function") showToast("Image Updated!", "Live website updated automatically!");
  }

  const modalEl = document.getElementById("adminRoomImageModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  renderAdminRoomImages();
  if (typeof renderRooms === "function") renderRooms(); // Live website refresh
}

// ------------------------------------------------------------------
// 5. GUESTS DIRECTORY VIEW
// ------------------------------------------------------------------
async function renderAdminGuests() {
  const contentArea = document.getElementById("adminMainContentArea");
  if (!contentArea) return;

  const bookings = await window.VeloraSupabase.getBookings();
  const guestMap = {};

  bookings.forEach(b => {
    const email = b.email || "guest@domain.com";
    if (!guestMap[email]) {
      guestMap[email] = {
        name: b.guestName,
        email: email,
        phone: b.phone || "N/A",
        bookingsCount: 0,
        totalSpend: 0
      };
    }
    guestMap[email].bookingsCount += 1;
    if (b.status !== "CANCELLED" && b.status !== "Cancelled") {
      guestMap[email].totalSpend += (parseFloat(b.totalPrice) || 0);
    }
  });

  const guestsList = Object.values(guestMap);

  contentArea.innerHTML = `
    <div class="p-4 bg-emerald rounded border border-gold shadow-sm">
      <h4 class="font-heading text-gold mb-3"><i class="fas fa-users me-2"></i> Registered Guest Directory</h4>
      <div class="table-responsive">
        <table class="table table-dark table-hover align-middle border-gold mb-0">
          <thead>
            <tr class="text-gold font-heading fs-7 border-gold">
              <th>Guest Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Reservations</th>
              <th>Total Spend</th>
              <th>Membership Tier</th>
            </tr>
          </thead>
          <tbody>
            ${guestsList.length === 0 ? `
              <tr><td colspan="6" class="text-center py-4 text-white-50">No guests recorded yet.</td></tr>
            ` : guestsList.map(g => `
              <tr>
                <td><strong>${g.name}</strong></td>
                <td>${g.email}</td>
                <td>${g.phone}</td>
                <td>${g.bookingsCount} Stay(s)</td>
                <td><strong class="text-gold">$${g.totalSpend.toFixed(2)}</strong></td>
                <td>
                  <span class="badge ${g.totalSpend > 2000 ? 'bg-gold text-dark' : 'bg-info text-dark'}">
                    ${g.totalSpend > 2000 ? 'VIP Gold Elite' : 'Standard Guest'}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ------------------------------------------------------------------
// 6. MESSAGES INBOX VIEW
// ------------------------------------------------------------------
function renderAdminMessages() {
  const contentArea = document.getElementById("adminMainContentArea");
  if (!contentArea) return;

  const messages = JSON.parse(localStorage.getItem("velora_messages") || "[]");

  contentArea.innerHTML = `
    <div class="p-4 bg-emerald rounded border border-gold shadow-sm">
      <h4 class="font-heading text-gold mb-3"><i class="fas fa-comments me-2"></i> Concierge Inquiries Inbox</h4>
      ${messages.length === 0 ? `
        <div class="alert alert-dark text-white-50 border-secondary">No guest messages received yet.</div>
      ` : `
        <div class="row g-3">
          ${messages.map(m => `
            <div class="col-md-6">
              <div class="p-3 bg-dark-emerald rounded border border-gold">
                <div class="d-flex justify-content-between align-items-center mb-2 border-bottom border-secondary pb-1">
                  <strong class="text-gold">${m.name}</strong>
                  <small class="text-white-50 fs-8">${m.date || 'Recent'}</small>
                </div>
                <p class="fs-8 text-white-50 mb-1"><strong>Email:</strong> ${m.email}</p>
                <p class="fs-7 text-white mb-0">"${m.message}"</p>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// ------------------------------------------------------------------
// 7. SETTINGS VIEW
// ------------------------------------------------------------------
function renderAdminSettings() {
  const contentArea = document.getElementById("adminMainContentArea");
  if (!contentArea) return;

  const currentUrl = window.VeloraSupabase ? window.VeloraSupabase.url : "";

  contentArea.innerHTML = `
    <div class="p-4 bg-emerald rounded border border-gold shadow-sm">
      <h4 class="font-heading text-gold mb-3"><i class="fas fa-cog me-2"></i> Backend & Production Settings</h4>
      
      <div class="bg-dark-emerald p-3 rounded border border-secondary mb-4">
        <h6 class="text-gold font-heading"><i class="fas fa-database me-1"></i> Supabase Connection Details</h6>
        <p class="fs-8 text-white-50 mb-2">Connected Project URL: <code>${currentUrl}</code></p>
        <p class="fs-8 text-white-50 mb-0">Status: <span class="badge bg-success">Active Storage & Database Service</span></p>
      </div>

      <div class="bg-dark-emerald p-3 rounded border border-secondary mb-4">
        <h6 class="text-gold font-heading"><i class="fas fa-envelope me-1"></i> Vercel Production Environment Variables</h6>
        <p class="fs-8 text-white-50 mb-2">To connect your custom Supabase and EmailJS accounts on Vercel deployment, configure these environment variables under <strong>Project Settings → Environment Variables</strong>:</p>
        <ul class="fs-8 text-gold">
          <li><code>VITE_SUPABASE_URL</code> = Your Supabase Project URL</li>
          <li><code>VITE_SUPABASE_ANON_KEY</code> = Your Supabase Anon Key</li>
          <li><code>VITE_EMAILJS_SERVICE_ID</code> = EmailJS Service ID</li>
          <li><code>VITE_EMAILJS_TEMPLATE_ID</code> = EmailJS Template ID</li>
          <li><code>VITE_EMAILJS_PUBLIC_KEY</code> = EmailJS Public Key</li>
        </ul>
      </div>
    </div>
  `;
}

// Export functions to global scope
window.handleAdminLogin = handleAdminLogin;
window.handleAdminLogout = handleAdminLogout;
window.switchAdminPortalTab = switchAdminPortalTab;
window.viewReservationDetails = viewReservationDetails;
window.confirmReservation = confirmReservation;
window.cancelReservation = cancelReservation;
window.deleteReservationRecord = deleteReservationRecord;
window.exportReservationsCSV = exportReservationsCSV;
window.showAddRoomModal = showAddRoomModal;
window.showEditRoomModal = showEditRoomModal;
window.handleSaveRoomForm = handleSaveRoomForm;
window.deleteAdminRoom = deleteAdminRoom;
window.openRoomImageUploadModal = openRoomImageUploadModal;
window.previewSelectedImage = previewSelectedImage;
window.handleSaveRoomImageUpload = handleSaveRoomImageUpload;
