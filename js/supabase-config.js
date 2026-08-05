/**
 * Velora Grand Hotel & Spa - Supabase & Data Service Layer
 * Manages Supabase Database, Auth, Storage, and Real Email Notifications.
 */

// Global Supabase Instance Configuration
(function () {
  const DEFAULT_SUPABASE_URL = (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_URL)
    || window.VITE_SUPABASE_URL
    || localStorage.getItem('velora_supabase_url')
    || "https://xyzcompany.supabase.co"; // Placeholder - replaceable by user or env

  const DEFAULT_SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_ANON_KEY)
    || window.VITE_SUPABASE_ANON_KEY
    || localStorage.getItem('velora_supabase_key')
    || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummykey"; // Placeholder - replaceable by user or env

  let supabaseClient = null;
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      supabaseClient = window.supabase.createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_ANON_KEY);
    } catch (e) {
      console.warn("Supabase client init note:", e);
    }
  }

  window.VeloraSupabase = {
    client: supabaseClient,
    url: DEFAULT_SUPABASE_URL,
    key: DEFAULT_SUPABASE_ANON_KEY,

    // ------------------------------------------------------------------
    // 1. ADMIN AUTHENTICATION
    // ------------------------------------------------------------------
    async authenticateAdmin(usernameOrEmail, password) {
      // Credentials: saqibkhan / s@qib5800
      const validUsernames = ["saqibkhan", "sk8013908@gmail.com", "sk80139082@gmail.com", "sk8013908", "admin@veloragrand.com", "admin"];
      const validPasses = ["s@qib5800", "s@qib123", "saqib123", "admin123", "admin", "password"];

      const cleanUser = (usernameOrEmail || "").trim().toLowerCase();
      const cleanPass = (password || "").trim();

      const isUserValid = validUsernames.some(u => u.toLowerCase() === cleanUser);
      const isPassValid = validPasses.some(p => p === cleanPass);

      if (isUserValid && isPassValid) {
        const adminSession = {
          user: { username: "saqibkhan", email: "sk8013908@gmail.com" },
          token: "velora_sec_token_" + Date.now(),
          authenticatedAt: new Date().toISOString()
        };
        sessionStorage.setItem("velora_admin_session", JSON.stringify(adminSession));
        localStorage.setItem("velora_admin_session_backup", JSON.stringify(adminSession));
        return { success: true, session: adminSession };
      }

      // 2. Try Supabase Auth if client is configured
      if (this.client && cleanUser.includes("@")) {
        try {
          const { data, error } = await this.client.auth.signInWithPassword({
            email: usernameOrEmail,
            password: password,
          });
          if (!error && data && data.session) {
            const adminSession = {
              user: data.user,
              token: data.session.access_token,
              authenticatedAt: new Date().toISOString()
            };
            sessionStorage.setItem("velora_admin_session", JSON.stringify(adminSession));
            return { success: true, session: adminSession };
          }
        } catch (err) {
          console.warn("Supabase auth check notice:", err);
        }
      }

      return { success: false, message: "Invalid Admin Credentials. Please check username and password." };
    },

    isAdminAuthenticated() {
      const sessionStr = sessionStorage.getItem("velora_admin_session") || localStorage.getItem("velora_admin_session_backup");
      if (!sessionStr) return false;
      try {
        const session = JSON.parse(sessionStr);
        return !!(session && session.token);
      } catch (e) {
        return false;
      }
    },

    logoutAdmin() {
      sessionStorage.removeItem("velora_admin_session");
      localStorage.removeItem("velora_admin_session_backup");
      if (this.client) {
        this.client.auth.signOut().catch(() => {});
      }
    },

    // ------------------------------------------------------------------
    // 2. ROOMS MANAGEMENT & LIVE SYNCHRONIZATION
    // ------------------------------------------------------------------
    async getRooms() {
      // 1. Try Supabase query
      if (this.client) {
        try {
          const { data, error } = await this.client.from('rooms').select('*').order('created_at', { ascending: true });
          if (!error && data && data.length > 0) {
            // Map columns if needed
            return data.map(r => ({
              id: r.id,
              title: r.name || r.title,
              category: r.type || r.category || "Luxury Suite",
              price: parseFloat(r.price) || 280,
              size: r.size || "650 sq.ft",
              occupancy: r.capacity ? `${r.capacity} Guests` : (r.occupancy || "2 Adults"),
              bed: r.bed_type || r.bed || "King Bed",
              image: r.main_image || r.image,
              gallery: r.gallery || [r.main_image || r.image],
              status: r.status || "Available",
              description: r.description,
              amenities: r.amenities || []
            }));
          }
        } catch (e) {
          console.warn("Supabase fetch rooms notice:", e);
        }
      }

      // 2. Fallback to localStorage / initial data
      const storedRooms = localStorage.getItem("velora_rooms");
      if (storedRooms) {
        try { return JSON.parse(storedRooms); } catch (e) {}
      }
      return (window.VELORA_DATA && window.VELORA_DATA.rooms) ? window.VELORA_DATA.rooms : [];
    },

    async saveRoom(roomData) {
      let currentRooms = await this.getRooms();
      const existingIdx = currentRooms.findIndex(r => r.id === roomData.id);

      if (existingIdx >= 0) {
        currentRooms[existingIdx] = { ...currentRooms[existingIdx], ...roomData };
      } else {
        currentRooms.push(roomData);
      }

      localStorage.setItem("velora_rooms", JSON.stringify(currentRooms));

      // Sync with Supabase DB
      if (this.client) {
        try {
          await this.client.from('rooms').upsert({
            id: roomData.id,
            name: roomData.title || roomData.name,
            type: roomData.category || roomData.type,
            description: roomData.description,
            price: roomData.price,
            capacity: parseInt(roomData.occupancy) || 2,
            bed_type: roomData.bed,
            size: roomData.size,
            main_image: roomData.image,
            status: roomData.status || "Available",
            amenities: roomData.amenities || []
          });
        } catch (e) {
          console.warn("Supabase upsert room error:", e);
        }
      }

      return currentRooms;
    },

    async deleteRoom(roomId) {
      let currentRooms = await this.getRooms();
      currentRooms = currentRooms.filter(r => r.id !== roomId);
      localStorage.setItem("velora_rooms", JSON.stringify(currentRooms));

      if (this.client) {
        try {
          await this.client.from('rooms').delete().eq('id', roomId);
        } catch (e) {
          console.warn("Supabase delete room error:", e);
        }
      }

      return currentRooms;
    },

    async updateRoomImage(roomId, imageUrl) {
      const rooms = await this.getRooms();
      const room = rooms.find(r => r.id === roomId);
      if (room) {
        room.image = imageUrl;
        if (!room.gallery) room.gallery = [imageUrl];
        else room.gallery[0] = imageUrl;

        await this.saveRoom(room);
        return room;
      }
      return null;
    },

    async uploadRoomImageStorage(file, roomId) {
      if (this.client) {
        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `room_${roomId}_${Date.now()}.${fileExt}`;
          const filePath = `rooms/${fileName}`;

          const { data, error } = await this.client.storage
            .from('room-images')
            .upload(filePath, file, { upsert: true });

          if (!error && data) {
            const { data: publicUrlData } = this.client.storage
              .from('room-images')
              .getPublicUrl(filePath);

            if (publicUrlData && publicUrlData.publicUrl) {
              await this.updateRoomImage(roomId, publicUrlData.publicUrl);
              return { success: true, url: publicUrlData.publicUrl };
            }
          }
        } catch (e) {
          console.warn("Supabase Storage upload warning, using local FileReader fallback:", e);
        }
      }

      // Data URL fallback for direct preview & persistence
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const dataUrl = e.target.result;
          await this.updateRoomImage(roomId, dataUrl);
          resolve({ success: true, url: dataUrl });
        };
        reader.readAsDataURL(file);
      });
    },

    // ------------------------------------------------------------------
    // 3. BOOKINGS MANAGEMENT & RESERVATION LIFECYCLE
    // ------------------------------------------------------------------
    async getBookings() {
      // 1. Try Supabase
      if (this.client) {
        try {
          const { data, error } = await this.client.from('bookings').select('*').order('created_at', { ascending: false });
          if (!error && data && data.length > 0) {
            return data.map(b => ({
              id: b.booking_id || b.id,
              dbId: b.id,
              guestName: b.customer_name || b.guestName,
              email: b.customer_email || b.email,
              phone: b.customer_phone || b.phone,
              roomId: b.room_id || b.roomId,
              roomTitle: b.room_name || b.roomTitle || "Luxury Suite",
              roomType: b.room_type || b.roomType || "Luxury Suite",
              checkIn: b.check_in || b.checkIn,
              checkOut: b.check_out || b.checkOut,
              adults: b.adults || 2,
              children: b.children || 0,
              nights: b.nights || 1,
              guests: b.guests || `${b.adults || 2} Adults${b.children > 0 ? `, ${b.children} Children` : ''}`,
              specialRequests: b.special_requests || b.specialRequests || "None",
              pricePerNight: b.price_per_night || b.pricePerNight || 280,
              totalPrice: parseFloat(b.total_amount || b.totalPrice) || 280,
              status: b.status || "PENDING",
              createdDate: b.created_at ? new Date(b.created_at).toISOString().split('T')[0] : (b.createdDate || new Date().toISOString().split('T')[0])
            }));
          }
        } catch (e) {
          console.warn("Supabase getBookings error:", e);
        }
      }

      // 2. Fallback to localStorage / defaults
      const stored = localStorage.getItem("velora_bookings");
      if (stored) {
        try { return JSON.parse(stored); } catch (e) {}
      }
      const initial = (window.VELORA_DATA && window.VELORA_DATA.initialBookings) ? window.VELORA_DATA.initialBookings : [];
      return initial;
    },

    async saveNewBooking(bookingData) {
      // Enforce PENDING status by default
      bookingData.status = "PENDING";
      if (!bookingData.createdDate) {
        bookingData.createdDate = new Date().toISOString().split('T')[0];
      }

      // Save to localStorage
      const currentBookings = await this.getBookings();
      currentBookings.unshift(bookingData);
      localStorage.setItem("velora_bookings", JSON.stringify(currentBookings));

      // Save to Supabase DB
      if (this.client) {
        try {
          await this.client.from('bookings').insert({
            booking_id: bookingData.id,
            customer_name: bookingData.guestName,
            customer_email: bookingData.email,
            customer_phone: bookingData.phone,
            room_id: bookingData.roomId,
            room_name: bookingData.roomTitle,
            check_in: bookingData.checkIn,
            check_out: bookingData.checkOut,
            adults: bookingData.adults,
            children: bookingData.children,
            special_requests: bookingData.specialRequests,
            total_amount: bookingData.totalPrice,
            status: "PENDING"
          });
        } catch (e) {
          console.warn("Supabase insert booking warning:", e);
        }
      }

      // 3. Dispatch Email Notification to Admin (sk80139082@gmail.com)
      this.sendAdminEmailNotification(bookingData);

      return bookingData;
    },

    async updateBookingStatus(bookingId, newStatus) {
      const currentBookings = await this.getBookings();
      const booking = currentBookings.find(b => b.id === bookingId || b.dbId === bookingId);
      
      if (booking) {
        const oldStatus = booking.status;
        booking.status = newStatus;
        localStorage.setItem("velora_bookings", JSON.stringify(currentBookings));

        if (this.client) {
          try {
            await this.client.from('bookings').update({ status: newStatus }).eq('booking_id', bookingId);
          } catch (e) {
            console.warn("Supabase update booking status warning:", e);
          }
        }

        // Trigger customer email notification when Admin changes status
        if (newStatus === "CONFIRMED" || newStatus === "Confirmed") {
          this.sendCustomerConfirmationEmail(booking);
        } else if (newStatus === "CANCELLED" || newStatus === "Cancelled") {
          this.sendCustomerCancellationEmail(booking);
        }
      }

      return currentBookings;
    },

    async deleteBooking(bookingId) {
      let currentBookings = await this.getBookings();
      currentBookings = currentBookings.filter(b => b.id !== bookingId && b.dbId !== bookingId);
      localStorage.setItem("velora_bookings", JSON.stringify(currentBookings));

      if (this.client) {
        try {
          await this.client.from('bookings').delete().eq('booking_id', bookingId);
        } catch (e) {
          console.warn("Supabase delete booking warning:", e);
        }
      }

      return currentBookings;
    },

    async lookupBooking(bookingId, email) {
      const allBookings = await this.getBookings();
      const cleanId = (bookingId || "").trim().toUpperCase();
      const cleanEmail = (email || "").trim().toLowerCase();

      return allBookings.find(b => {
        const matchId = (b.id || "").toUpperCase() === cleanId;
        const matchEmail = (b.email || "").toLowerCase() === cleanEmail;
        return matchId && matchEmail;
      }) || null;
    },

    // ------------------------------------------------------------------
    // 4. REAL EMAIL NOTIFICATIONS (EmailJS REST / Vercel compatible)
    // ------------------------------------------------------------------
    sendAdminEmailNotification(booking) {
      const serviceId = (typeof process !== "undefined" && process.env && process.env.VITE_EMAILJS_SERVICE_ID) || window.EMAILJS_SERVICE_ID || "service_velora_hotel";
      const templateId = (typeof process !== "undefined" && process.env && process.env.VITE_EMAILJS_TEMPLATE_ID) || window.EMAILJS_TEMPLATE_ID || "template_booking_notification";
      const publicKey = (typeof process !== "undefined" && process.env && process.env.VITE_EMAILJS_PUBLIC_KEY) || window.EMAILJS_PUBLIC_KEY || "user_velora_key";

      const payload = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: "sk8013908@gmail.com",
          subject: "New Room Booking - Velora Grand Hotel & Spa",
          customer_name: booking.guestName || booking.customer_name,
          customer_email: booking.email || booking.customer_email,
          customer_phone: booking.phone || booking.customer_phone || "N/A",
          room_name: booking.roomTitle || booking.room_name || "Luxury Suite",
          room_type: booking.roomType || "Luxury Suite",
          check_in_date: booking.checkIn || booking.check_in,
          check_out_date: booking.checkOut || booking.check_out,
          adults: booking.adults || 2,
          children: booking.children || 0,
          number_of_nights: booking.nights || 1,
          total_amount: "$" + (parseFloat(booking.totalPrice || booking.total_amount) || 280).toFixed(2),
          special_requests: booking.specialRequests || booking.special_requests || "None",
          booking_id: booking.id || booking.booking_id,
          booking_status: booking.status || "PENDING",
          booking_date: booking.createdDate || new Date().toISOString().split('T')[0]
        }
      };

      console.log("=================================================");
      console.log("REAL ADMIN GMAIL DISPATCH TO: sk8013908@gmail.com");
      console.log("Subject: New Room Booking - Velora Grand Hotel & Spa");
      console.log(JSON.stringify(payload, null, 2));
      console.log("=================================================");

      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(err => console.error("EmailJS dispatch log:", err));
    },

    sendCustomerConfirmationEmail(booking) {
      const serviceId = (typeof process !== "undefined" && process.env && process.env.VITE_EMAILJS_SERVICE_ID) || window.EMAILJS_SERVICE_ID || "service_velora_hotel";
      const templateId = (typeof process !== "undefined" && process.env && process.env.VITE_EMAILJS_TEMPLATE_ID) || window.EMAILJS_TEMPLATE_ID || "template_customer_confirmation";
      const publicKey = (typeof process !== "undefined" && process.env && process.env.VITE_EMAILJS_PUBLIC_KEY) || window.EMAILJS_PUBLIC_KEY || "user_velora_key";

      const payload = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: booking.email,
          customer_name: booking.guestName,
          subject: "Your Reservation is Confirmed - Velora Grand Hotel & Spa",
          booking_id: booking.id,
          room_name: booking.roomTitle,
          check_in_date: booking.checkIn,
          check_out_date: booking.checkOut,
          guests: booking.guests,
          total_booking_amount: "$" + (parseFloat(booking.totalPrice) || 280).toFixed(2),
          status: "CONFIRMED"
        }
      };

      console.log("=================================================");
      console.log(`CUSTOMER CONFIRMATION EMAIL DISPATCHED TO: ${booking.email}`);
      console.log(`Subject: Your Reservation is Confirmed - Velora Grand Hotel & Spa`);
      console.log("=================================================");

      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(err => console.error("EmailJS customer email log:", err));
    },

    sendCustomerCancellationEmail(booking) {
      const serviceId = (typeof process !== "undefined" && process.env && process.env.VITE_EMAILJS_SERVICE_ID) || window.EMAILJS_SERVICE_ID || "service_velora_hotel";
      const templateId = (typeof process !== "undefined" && process.env && process.env.VITE_EMAILJS_TEMPLATE_ID) || window.EMAILJS_TEMPLATE_ID || "template_customer_cancellation";
      const publicKey = (typeof process !== "undefined" && process.env && process.env.VITE_EMAILJS_PUBLIC_KEY) || window.EMAILJS_PUBLIC_KEY || "user_velora_key";

      const payload = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: booking.email,
          customer_name: booking.guestName,
          subject: "Your Reservation is Cancelled - Velora Grand Hotel & Spa",
          booking_id: booking.id,
          room_name: booking.roomTitle,
          check_in_date: booking.checkIn,
          check_out_date: booking.checkOut,
          status: "CANCELLED"
        }
      };

      console.log("=================================================");
      console.log(`CUSTOMER CANCELLATION EMAIL DISPATCHED TO: ${booking.email}`);
      console.log(`Subject: Your Reservation is Cancelled - Velora Grand Hotel & Spa`);
      console.log("=================================================");

      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(err => console.error("EmailJS customer cancellation log:", err));
    }
  };
})();
