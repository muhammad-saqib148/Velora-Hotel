import type { Request, Response } from 'express';

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    // Extract booking details with fallbacks
    const booking_id = body.booking_id || body.id || `VEL-${Date.now()}`;
    const customer_name = body.customer_name || body.guestName || 'Valued Guest';
    const customer_email = body.customer_email || body.email || 'N/A';
    const customer_phone = body.customer_phone || body.phone || 'N/A';
    const room_name = body.room_name || body.roomTitle || body.roomType || 'Luxury Suite';
    const check_in_date = body.check_in_date || body.checkIn || 'N/A';
    const check_out_date = body.check_out_date || body.checkOut || 'N/A';
    const adults = body.adults || 2;
    const children = body.children || 0;
    const number_of_nights = body.number_of_nights || body.nights || 1;
    const total_amount = body.total_amount || (body.totalPrice ? `$${parseFloat(body.totalPrice).toFixed(2)}` : '$280.00');
    const special_requests = body.special_requests || body.specialRequests || 'None';
    const booking_date = body.booking_date || body.createdDate || new Date().toISOString().split('T')[0];
    const booking_status = body.booking_status || body.status || 'PENDING';

    const targetEmail = "sk8013908@gmail.com";
    const emailSubject = "New Room Booking - Velora Grand Hotel & Spa";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #0b1f33; color: #ffffff; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; border-bottom: 2px solid #c9a96e; padding-bottom: 20px; margin-bottom: 25px;">
          <h1 style="color: #c9a96e; margin: 0; font-size: 24px; letter-spacing: 2px;">VELORA GRAND HOTEL & SPA</h1>
          <p style="color: #a0aec0; margin: 5px 0 0 0; font-size: 13px; text-transform: uppercase;">New Reservation Notification</p>
        </div>
        
        <div style="background-color: #12304d; padding: 20px; border-radius: 6px; border-left: 4px solid #c9a96e; margin-bottom: 20px;">
          <h2 style="color: #c9a96e; margin-top: 0; font-size: 18px;">Reservation Details (ID: ${booking_id})</h2>
          <table style="width: 100%; color: #ffffff; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #a0aec0; width: 40%;">Customer Name:</td><td><strong>${customer_name}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Customer Email:</td><td><strong>${customer_email}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Customer Phone:</td><td><strong>${customer_phone}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Room Name:</td><td><strong style="color: #c9a96e;">${room_name}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Check-in Date:</td><td><strong>${check_in_date}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Check-out Date:</td><td><strong>${check_out_date}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Adults:</td><td><strong>${adults}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Children:</td><td><strong>${children}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Number of Nights:</td><td><strong>${number_of_nights}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Total Amount:</td><td><strong style="color: #48bb78; font-size: 16px;">${total_amount}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Special Requests:</td><td>${special_requests}</td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Booking Date:</td><td>${booking_date}</td></tr>
            <tr><td style="padding: 8px 0; color: #a0aec0;">Booking Status:</td><td><span style="background-color: #ecc94b; color: #1a202c; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${booking_status}</span></td></tr>
          </table>
        </div>
        
        <p style="text-align: center; color: #a0aec0; font-size: 12px; margin-top: 25px;">
          Sent automatically by Velora Grand Hotel & Spa Reservations Engine.
        </p>
      </div>
    `;

    const textContent = `
NEW ROOM BOOKING - VELORA GRAND HOTEL & SPA
===========================================
Booking ID: ${booking_id}
Customer Name: ${customer_name}
Customer Email: ${customer_email}
Customer Phone: ${customer_phone}
Room Name: ${room_name}
Check-in Date: ${check_in_date}
Check-out Date: ${check_out_date}
Adults: ${adults}
Children: ${children}
Number of Nights: ${number_of_nights}
Total Amount: ${total_amount}
Special Requests: ${special_requests}
Booking Date: ${booking_date}
Booking Status: ${booking_status}
    `.trim();

    let resendSent = false;
    let resendError = null;

    // 1. Try Resend API if RESEND_API_KEY is available
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'Velora Hotel <onboarding@resend.dev>',
            to: [targetEmail],
            subject: emailSubject,
            html: htmlContent,
            text: textContent
          })
        });

        const resendData = await resendRes.json();
        if (resendRes.ok) {
          resendSent = true;
          console.log("✓ Resend API email dispatched successfully:", resendData);
        } else {
          resendError = resendData;
          console.warn("Resend API return notice:", resendData);
        }
      } catch (err: any) {
        resendError = err.message || err;
        console.error("Resend API dispatch error:", err);
      }
    }

    // 2. Also attempt EmailJS REST fallback
    let emailJsSent = false;
    try {
      const emailJsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_velora",
          template_id: "template_velora_booking",
          user_id: "velora_public_key",
          template_params: {
            to_email: targetEmail,
            subject: emailSubject,
            customer_name,
            customer_email,
            customer_phone,
            room_name,
            check_in_date,
            check_out_date,
            adults,
            children,
            number_of_nights,
            total_amount,
            special_requests,
            booking_id,
            booking_status,
            booking_date
          }
        })
      });
      if (emailJsRes.ok) {
        emailJsSent = true;
      }
    } catch (e) {
      // ignore secondary fallback error
    }

    return res.status(200).json({
      success: true,
      message: `Booking email notification processed for ${targetEmail}`,
      booking_id,
      resend_sent: resendSent,
      resend_error: resendError,
      emailjs_sent: emailJsSent,
      env_note: resendApiKey ? "RESEND_API_KEY active" : "RESEND_API_KEY environment variable not detected. Add RESEND_API_KEY in Vercel settings for production Resend delivery."
    });

  } catch (err: any) {
    console.error("Server email endpoint error:", err);
    return res.status(500).json({
      error: "Internal server error processing booking email",
      details: err.message || err
    });
  }
}
