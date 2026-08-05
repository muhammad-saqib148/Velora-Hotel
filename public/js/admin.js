/**
 * Velora Grand Hotel & Spa - Admin Panel Management Script
 */

function openAdminDashboard() {
  const modal = new bootstrap.Modal(document.getElementById("adminModal"));
  modal.show();
  renderAdminOverview();
}

function switchAdminTab(tabName, btnEl) {
  document.querySelectorAll(".admin-nav-item").forEach(item => item.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  const contentArea = document.getElementById("adminContentArea");
  if (!contentArea) return;

  switch (tabName) {
    case 'overview':
      renderAdminOverview();
      break;
    case 'reservations':
      renderAdminReservations();
      break;
    case 'rooms':
      renderAdminRooms();
      break;
    case 'guests':
      renderAdminGuests();
      break;
    case 'messages':
      renderAdminMessages();
      break;
    case 'reports':
      renderAdminReports();
      break;
    default:
      renderAdminOverview();
  }
}

function getAdminBookingsData() {
  const stored = JSON.parse(localStorage.getItem("velora_bookings") || "[]");
  const initial = window.VELORA_DATA ? window.VELORA_DATA.initialBookings : [];
  return stored.length > 0 ? stored : initial;
}

function renderAdminOverview() {
  const contentArea = document.getElementById("adminContentArea");
  if (!contentArea) return;

  const bookings = getAdminBookingsData();
  const activeBookings = bookings.filter(b => b.status !== "Cancelled");

  const totalBookings = bookings.length;
  const totalRevenue = activeBookings.reduce((sum, b) => sum + (parseFloat(b.totalPrice) || 0), 0);
  const occupiedRooms = activeBookings.filter(b => b.status === "Checked In" || b.status === "Confirmed").length;
  const availableRooms = 120 - occupiedRooms;
  const occupancyRate = ((occupiedRooms / 120) * 100).toFixed(1);

  contentArea.innerHTML = `
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <div class="admin-kpi-card">
          <small class="text-muted text-uppercase fw-bold fs-8">Total Reservations</small>
          <div class="admin-kpi-val">${totalBookings}</div>
          <span class="badge bg-success text-white fs-8"><i class="fas fa-arrow-up me-1"></i> Active System</span>
        </div>
      </div>
      <div class="col-md-3">
        <div class="admin-kpi-card">
          <small class="text-muted text-uppercase fw-bold fs-8">Total Revenue</small>
          <div class="admin-kpi-val">$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
          <span class="badge bg-gold text-dark fs-8">YTD Revenue</span>
        </div>
      </div>
      <div class="col-md-3">
        <div class="admin-kpi-card">
          <small class="text-muted text-uppercase fw-bold fs-8">Available Rooms</small>
          <div class="admin-kpi-val">${availableRooms} <small class="fs-6 text-muted">/ 120</small></div>
          <span class="badge bg-emerald text-gold fs-8">Ready for Guests</span>
        </div>
      </div>
      <div class="col-md-3">
        <div class="admin-kpi-card">
          <small class="text-muted text-uppercase fw-bold fs-8">Occupancy Rate</small>
          <div class="admin-kpi-val">${occupancyRate}%</div>
          <span class="badge bg-info text-dark fs-8">${occupiedRooms} Occupied</span>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-header bg-emerald text-white d-flex justify-content-between align-items-center py-3">
        <h5 class="font-heading mb-0 text-white">Recent Guest Reservations</h5>
        <button class="btn btn-gold btn-sm" onclick="switchAdminTab('reservations')">View All Reservations</button>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-velora align-middle mb-0">
            <thead>
              <tr>
                <th>Res ID</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Dates</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${bookings.slice(0, 5).map(b => `
                <tr>
                  <td><strong class="text-emerald">${b.id}</strong></td>
                  <td>${b.guestName}</td>
                  <td>${b.roomTitle}</td>
                  <td><small>${b.checkIn} to ${b.checkOut}</small></td>
                  <td><strong class="text-gold">$${b.totalPrice}</strong></td>
                  <td><span class="badge-status ${b.status.toLowerCase().replace(' ', '-')}">${b.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderAdminReservations() {
  const contentArea = document.getElementById("adminContentArea");
  if (!contentArea) return;

  const bookings = getAdminBookingsData();

  contentArea.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="font-heading text-emerald mb-0">All Hotel Reservations</h4>
      <button class="btn btn-gold btn-sm" onclick="showAddReservationModal()"><i class="fas fa-plus me-1"></i> Add Manual Booking</button>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-velora align-middle mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Guest</th>
                <th>Contact</th>
                <th>Room</th>
                <th>Check-in/out</th>
                <th>Guests</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${bookings.map(b => `
                <tr>
                  <td><strong class="text-emerald">${b.id}</strong></td>
                  <td>
                    <strong>${b.guestName}</strong>
                  </td>
                  <td>
                    <small class="d-block">${b.email}</small>
                    <small class="text-muted">${b.phone}</small>
                  </td>
                  <td>${b.roomTitle}</td>
                  <td><small>${b.checkIn}</small><br><small class="text-muted">to ${b.checkOut}</small></td>
                  <td>${b.guests}</td>
                  <td><strong class="text-gold">$${b.totalPrice}</strong></td>
                  <td>
                    <select class="form-select form-select-sm fs-8 py-0" onchange="updateBookingStatus('${b.id}', this.value)">
                      <option value="Confirmed" ${b.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
                      <option value="Checked In" ${b.status === "Checked In" ? "selected" : ""}>Checked In</option>
                      <option value="Completed" ${b.status === "Completed" ? "selected" : ""}>Completed</option>
                      <option value="Cancelled" ${b.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button class="btn btn-outline-danger btn-sm p-1 px-2" onclick="deleteAdminBooking('${b.id}')"><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function updateBookingStatus(bookingId, newStatus) {
  let stored = getAdminBookingsData();
  const booking = stored.find(b => b.id === bookingId);
  if (booking) {
    booking.status = newStatus;
    localStorage.setItem("velora_bookings", JSON.stringify(stored));
    showToast("Status Updated", `Reservation ${bookingId} status changed to ${newStatus}.`);
  }
}

function deleteAdminBooking(bookingId) {
  if (!confirm(`Delete reservation ${bookingId} permanently?`)) return;
  let stored = getAdminBookingsData();
  stored = stored.filter(b => b.id !== bookingId);
  localStorage.setItem("velora_bookings", JSON.stringify(stored));
  renderAdminReservations();
  showToast("Deleted", `Reservation ${bookingId} removed.`);
}

function renderAdminRooms() {
  const contentArea = document.getElementById("adminContentArea");
  if (!contentArea) return;

  const rooms = window.VELORA_DATA.rooms;

  contentArea.innerHTML = `
    <h4 class="font-heading text-emerald mb-3">Room Inventory & Status (120 Total Units)</h4>
    <div class="row g-3">
      ${rooms.map(r => `
        <div class="col-md-4">
          <div class="card p-3 border shadow-sm">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5 class="font-heading text-emerald mb-0">${r.title}</h5>
              <span class="badge bg-gold text-dark">$${r.price}/night</span>
            </div>
            <small class="text-muted d-block mb-2"><i class="fas fa-layer-group text-gold me-1"></i> ${r.category.toUpperCase()} • ${r.size}</small>
            <p class="fs-7 text-muted mb-2">${r.description.slice(0, 90)}...</p>
            <div class="d-flex justify-content-between align-items-center pt-2 border-top">
              <span class="badge bg-success">20 Available Units</span>
              <button class="btn btn-outline-gold btn-sm py-0" onclick="editRoomPrice('${r.id}')">Edit Rate</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function editRoomPrice(roomId) {
  const room = window.VELORA_DATA.rooms.find(r => r.id === roomId);
  if (!room) return;
  const newPrice = prompt(`Enter new night rate for ${room.title}:`, room.price);
  if (newPrice && !isNaN(newPrice)) {
    room.price = parseFloat(newPrice);
    renderAdminRooms();
    renderRooms(); // Update main UI
    showToast("Price Updated", `${room.title} rate updated to $${newPrice}/night.`);
  }
}

function renderAdminGuests() {
  const contentArea = document.getElementById("adminContentArea");
  if (!contentArea) return;

  const bookings = getAdminBookingsData();
  const guestMap = {};

  bookings.forEach(b => {
    if (!guestMap[b.email]) {
      guestMap[b.email] = {
        name: b.guestName,
        email: b.email,
        phone: b.phone,
        bookingsCount: 0,
        totalSpend: 0
      };
    }
    guestMap[b.email].bookingsCount += 1;
    guestMap[b.email].totalSpend += (parseFloat(b.totalPrice) || 0);
  });

  const guestsList = Object.values(guestMap);

  contentArea.innerHTML = `
    <h4 class="font-heading text-emerald mb-3">Registered Guests Directory</h4>
    <div class="card border-0 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-velora align-middle mb-0">
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Reservations</th>
                <th>Total Value</th>
                <th>VIP Status</th>
              </tr>
            </thead>
            <tbody>
              ${guestsList.map(g => `
                <tr>
                  <td><strong>${g.name}</strong></td>
                  <td>${g.email}</td>
                  <td>${g.phone}</td>
                  <td>${g.bookingsCount} Stay(s)</td>
                  <td><strong class="text-gold">$${g.totalSpend.toFixed(2)}</strong></td>
                  <td>
                    <span class="badge ${g.totalSpend > 3000 ? 'bg-gold text-dark' : 'bg-emerald text-white'}">
                      ${g.totalSpend > 3000 ? 'VIP Gold Member' : 'Standard Guest'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderAdminMessages() {
  const contentArea = document.getElementById("adminContentArea");
  if (!contentArea) return;

  const messages = JSON.parse(localStorage.getItem("velora_messages") || "[]");

  contentArea.innerHTML = `
    <h4 class="font-heading text-emerald mb-3">Guest Concierge Inquiries</h4>
    ${messages.length === 0 ? `
      <div class="alert alert-info">No inquiries received yet.</div>
    ` : `
      <div class="row g-3">
        ${messages.map(m => `
          <div class="col-md-6">
            <div class="card p-3 border shadow-sm">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <strong class="text-emerald">${m.name}</strong>
                <small class="text-muted">${m.date}</small>
              </div>
              <p class="text-muted fs-7 mb-0">"${m.message}"</p>
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

function renderAdminReports() {
  const contentArea = document.getElementById("adminContentArea");
  if (!contentArea) return;

  contentArea.innerHTML = `
    <h4 class="font-heading text-emerald mb-3">Financial & Occupancy Summary</h4>
    <div class="bg-ivory p-4 rounded border mb-4">
      <h5 class="font-heading text-emerald">Executive Summary - Q3 2026</h5>
      <p class="text-muted fs-7">Velora Grand Hotel & Spa continues to maintain peak international occupancy with a average daily rate (ADR) of $420 across suites and standard rooms.</p>
      
      <div class="row g-3 text-center mt-2">
        <div class="col-3">
          <div class="p-3 bg-white rounded border">
            <small class="text-muted d-block text-uppercase">RevPAR</small>
            <strong class="font-heading fs-3 text-emerald">$315.00</strong>
          </div>
        </div>
        <div class="col-3">
          <div class="p-3 bg-white rounded border">
            <small class="text-muted d-block text-uppercase">ADR</small>
            <strong class="font-heading fs-3 text-gold">$420.00</strong>
          </div>
        </div>
        <div class="col-3">
          <div class="p-3 bg-white rounded border">
            <small class="text-muted d-block text-uppercase">Avg Stay</small>
            <strong class="font-heading fs-3 text-emerald">3.4 Nights</strong>
          </div>
        </div>
        <div class="col-3">
          <div class="p-3 bg-white rounded border">
            <small class="text-muted d-block text-uppercase">Guest Rating</small>
            <strong class="font-heading fs-3 text-gold">4.95 / 5.0</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.openAdminDashboard = openAdminDashboard;
window.switchAdminTab = switchAdminTab;
window.updateBookingStatus = updateBookingStatus;
window.deleteAdminBooking = deleteAdminBooking;
window.editRoomPrice = editRoomPrice;
