/**
 * Velora Grand Hotel & Spa - System Data
 */

const VELORA_DATA = {
  hotel: {
    name: "Velora Grand Hotel & Spa",
    tagline: "Luxury, Serenity & Exceptional Hospitality",
    address: "Islamabad & Rawalpindi, Pakistan",
    phone: "+92 349 1905800",
    email: "sk8013908@gmail.com",
    whatsapp: "+92 349 1905800",
    totalRooms: 120,
    checkInTime: "14:00",
    checkOutTime: "12:00"
  },

  rooms: [
    {
      id: "deluxe-king",
      title: "Deluxe King Room",
      category: "rooms",
      price: 280,
      size: "48 m² / 516 sq.ft",
      guests: "2 Adults, 1 Child",
      bed: "1 King Bed",
      view: "Mountain & Garden View",
      rating: 4.9,
      reviewsCount: 42,
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
      ],
      description: "Designed for discerning travelers, the Deluxe King Room blends contemporary luxury with classical warmth. Features a plush pillow-top king bed, marble bathroom with rain shower, and floor-to-ceiling windows overlooking tranquil grounds.",
      amenities: ["Free High-Speed Wi-Fi", "55-inch OLED Smart TV", "Nespresso Coffee Machine", "Italian Marble Bathroom", "Rainfall Shower", "24/7 Room Service", "Private Balcony", "In-room Safe"]
    },
    {
      id: "executive-suite",
      title: "Executive Suite",
      category: "suites",
      price: 450,
      size: "72 m² / 775 sq.ft",
      guests: "3 Adults",
      bed: "1 Super King Bed",
      view: "City Skyline & Garden View",
      rating: 5.0,
      reviewsCount: 58,
      badge: "Best Seller",
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"
      ],
      description: "Spacious luxury featuring a separate elegant living lounge, dedicated workspace, and an opulent master bedroom. Complete with Executive Lounge access including complimentary afternoon tea and evening cocktails.",
      amenities: ["Executive Lounge Access", "Complimentary Breakfast", "Deep Soaking Bathtub", "Walk-in Closet", "Nespresso Machine", "Hermès Bath Amenities", "Personal Butler Service", "Airport Shuttle Included"]
    },
    {
      id: "velora-garden-suite",
      title: "Velora Garden Suite",
      category: "suites",
      price: 520,
      size: "85 m² / 915 sq.ft",
      guests: "2 Adults, 2 Children",
      bed: "1 King Bed + Sofa Bed",
      view: "Private Botanical Garden",
      rating: 4.95,
      reviewsCount: 31,
      badge: "Serenity Choice",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
      ],
      description: "A sanctuary of peace featuring direct access to Velora's private botanical gardens. Boasts a private sun terrace, oversized spa bathtub, custom silk robes, and bespoke evening turndown treats.",
      amenities: ["Private Sun Terrace", "Direct Garden Access", "Jacuzzi Bathtub", "Complimentary Daily Spa Pass", "Bespoke Mini Bar", "Pillow Menu (6 Options)", "24/7 Concierge", "Gourmet Breakfast"]
    },
    {
      id: "family-residence",
      title: "Family Residence",
      category: "residences",
      price: 680,
      size: "110 m² / 1,184 sq.ft",
      guests: "4 Adults, 2 Children",
      bed: "1 King + 2 Twin Beds",
      view: "Panoramic Resort View",
      rating: 4.9,
      reviewsCount: 27,
      badge: "Family Favorite",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"
      ],
      description: "Designed for family luxury, offering two interconnected master bedrooms, a fully equipped kitchenette, formal dining area, and dedicated entertainment console for children.",
      amenities: ["Two En-suite Bathrooms", "Gourmet Kitchenette", "Dining Table for 6", "PlayStation 5 Console", "Child Concierge Service", "Laundry Service Included", "Private Balcony", "Unlimited Pool Access"]
    },
    {
      id: "presidential-suite",
      title: "Presidential Suite",
      category: "suites",
      price: 1200,
      size: "160 m² / 1,722 sq.ft",
      guests: "4 Guests",
      bed: "1 Emperor King Bed",
      view: "Panoramic Mountain & City Views",
      rating: 5.0,
      reviewsCount: 19,
      badge: "Exclusive",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
      ],
      description: "The pinnacle of architectural grandeur. Features a private grand entrance, grand piano, formal dining room, steam room, master walk-in wardrobe, and round-the-clock private chef option.",
      amenities: ["Dedicated 24/7 Private Butler", "Chauffeur Limousine Service", "In-suite Steam Room & Sauna", "Grand Piano", "Private Chef Dining", "VIP Airport Fast Track", "Complimentary Vintage Champagne"]
    },
    {
      id: "royal-grand-suite",
      title: "Royal Grand Suite",
      category: "suites",
      price: 1800,
      size: "240 m² / 2,583 sq.ft",
      guests: "6 Guests",
      bed: "2 Emperor King Beds",
      view: "360° Rooftop & Mountain View",
      rating: 5.0,
      reviewsCount: 14,
      badge: "Crown Jewel",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
      ],
      description: "Our signature residence spanning the top floor with private heated infinity plunge pool, security entrance, bullet-proof glassing, expansive terrace, private spa room, and dining hall for 10.",
      amenities: ["Private Heated Rooftop Plunge Pool", "Full Top Floor Security Suite", "Private Spa Treatment Room", "Personal Butler & Chef Team", "Private Elevator Access", "Unlimited Helipad Access", "Custom Wine Cellar"]
    }
  ],

  experiences: [
    {
      title: "Sunset Rooftop Dining",
      subtitle: "Haute Cuisine Above the Clouds",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      description: "Dine under golden hour skies on our 18th-floor open terrace with curated 7-course tasting menus paired with sommelier selections."
    },
    {
      title: "Private Spa Retreat",
      subtitle: "Holistic Mind & Body Healing",
      image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80",
      description: "Immerse in bespoke aromatherapy rituals, hydrothermal circuits, and couples massages guided by internationally accredited therapists."
    },
    {
      title: "Infinity Pool",
      subtitle: "Temperature-Controlled Luxury",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      description: "Relax in luxury sun loungers with poolside cocktail service, underwater acoustics, and panoramic views of the verdant landscape."
    },
    {
      title: "Verde Fine Dining",
      subtitle: "Michelin-Inspired Gastronomy",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      description: "Celebrated Executive Chefs present a fusion of international classic cuisine and regional delicacies crafted from organic local harvests."
    },
    {
      title: "Romantic Dinner",
      subtitle: "Private Garden Candlelight Experience",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
      description: "A private gazebo setup illuminated by soft candlelight, violin serenades, and a personalized dining menu crafted exclusively for two."
    },
    {
      title: "Business Lounge",
      subtitle: "High-Tech Corporate Elegance",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      description: "Private executive boardrooms, ultra-high-speed fiber connection, video conferencing facilities, and dedicated secretarial services."
    },
    {
      title: "Airport Transfer",
      subtitle: "Mercedes-Maybach Chauffeur Service",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      description: "Seamless door-to-door luxury transport with onboard Wi-Fi, chilled refreshments, and luggage concierge assistance."
    },
    {
      title: "Private Events",
      subtitle: "Grand Ballroom & Celebrations",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      description: "Hosting royal weddings, global summits, and gala banquets for up to 500 guests with tailored event planning and catering."
    }
  ],

  dining: {
    restaurantName: "Verde Signature Restaurant",
    tagline: "Elegance on every plate",
    categories: [
      {
        id: "breakfast",
        name: "Artisanal Breakfast",
        time: "06:30 AM - 11:00 AM",
        items: [
          { name: "Royal Truffle Eggs Benedict", price: "$32", desc: "Poached organic eggs, black truffle hollandaise, smoked salmon, brioche." },
          { name: "Velora Signature Bakery Basket", price: "$24", desc: "Fresh warm croissants, pain au chocolat, artisanal jams, whipped honey butter." },
          { name: "Avocado & Caviar Toast", price: "$38", desc: "Sourdough toast, smashed Hass avocado, Royal Osetra caviar, microgreens." }
        ]
      },
      {
        id: "finedining",
        name: "Fine Dining Dinner",
        time: "06:30 PM - 11:00 PM",
        items: [
          { name: "Wagyu A5 Striploin (8oz)", price: "$145", desc: "Miyazaki Wagyu, roasted bone marrow jus, truffle pomme purée." },
          { name: "Pan-Seared Chilean Sea Bass", price: "$85", desc: "Saffron risotto, braised baby fennel, citrus emulsion." },
          { name: "Wild Forest Mushroom Risotto", price: "$48", desc: "Acquerello rice, aged Parmigiano-Reggiano, black winter truffle shaving." }
        ]
      },
      {
        id: "international",
        name: "International Cuisine",
        time: "12:00 PM - 10:30 PM",
        items: [
          { name: "Velora Grand Club Sandwich", price: "$28", desc: "Free-range chicken, artisanal bacon, fried egg, avocado, hand-cut fries." },
          { name: "Lobster & Prawn Tagliolini", price: "$65", desc: "Handmade egg pasta, Maine lobster, cherry tomatoes, chili oil." },
          { name: "Mediterranean Mezze Platter", price: "$42", desc: "House hummus, babaganoush, stuffed grape leaves, warm pita, falafel." }
        ]
      },
      {
        id: "rooftop",
        name: "Rooftop Lounge & Bar",
        time: "05:00 PM - 02:00 AM",
        items: [
          { name: "Gold Leaf Craft Mocktail", price: "$22", desc: "Passionfruit nectar, sparkling elderflower, 24k edible gold flakes." },
          { name: "Seafood Tower for Two", price: "$120", desc: "Oysters, king crab legs, poached jumbo prawns, tuna tartare." },
          { name: "Charcuterie & Artisanal Cheese", price: "$55", desc: "Imported aged prosciutto, brie, manchego, honeycomb, crostini." }
        ]
      }
    ]
  },

  spa: [
    {
      title: "Full Body Aromatherapy Massage",
      duration: "90 Mins",
      price: "$210",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
      description: "Deep tissue pressure combined with rare essential floral oils to relieve tension and restore energetic vitality."
    },
    {
      title: "Hydrotherapy Sauna & Steam Ritual",
      duration: "60 Mins",
      price: "$140",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
      description: "Detoxifying thermal chambers followed by a cold plunge shower and herbal tea lounge serenity."
    },
    {
      title: "Royal Couples Escape",
      duration: "120 Mins",
      price: "$450",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      description: "Side-by-side massages, gold collagen facials, private Jacuzzi soak with rose petals and vintage champagne."
    },
    {
      title: "Fitness & Pilates Center",
      duration: "Daily Pass",
      price: "$60",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      description: "State-of-the-art Technogym equipment, personal trainers, and daily yoga & Pilates sessions."
    },
    {
      title: "Velora Signature Wellness Package",
      duration: "Full Day",
      price: "$650",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive day spa pass including body scrub, body wrap, facial, massage, healthy lunch, and juice bar."
    }
  ],

  offers: [
    {
      id: "weekend-escape",
      title: "Weekend Escape Package",
      discount: "20% OFF",
      code: "WEEKEND20",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      description: "Unwind over the weekend with 20% off luxury suite rates, complimentary daily breakfast for two, and 2:00 PM late check-out.",
      validity: "Valid through Dec 31, 2026"
    },
    {
      id: "romantic-retreat",
      title: "Romantic Couples Retreat",
      discount: "SPECIAL PACKAGE",
      code: "ROMANCE2026",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      description: "Includes welcome bottle of chilled Champagne, rose petal room decoration, $100 Spa voucher, and private candlelit dinner.",
      validity: "Valid year-round"
    },
    {
      id: "wellness-retreat",
      title: "3-Day Holism & Wellness",
      discount: "25% OFF SPA",
      code: "WELLNESS25",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      description: "Recharge your mind with 3 nights stay, daily organic dining plan, unlimited spa thermal pass, and private yoga sessions.",
      validity: "Valid through Nov 30, 2026"
    }
  ],

  gallery: [
    { title: "Grand Hotel Facade at Sunset", category: "exterior", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80" },
    { title: "Crystal Chandelier Grand Foyer", category: "lobby", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80" },
    { title: "Deluxe King Master Bedroom", category: "rooms", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80" },
    { title: "Executive Suite Living Lounge", category: "suites", image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80" },
    { title: "Presidential Skyline Suite & Terrace", category: "suites", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80" },
    { title: "Royal Penthouse Bedroom & Canopy", category: "suites", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80" },
    { title: "Heated Infinity Swimming Pool", category: "pool", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80" },
    { title: "Tropical Pool Cabanas & Sunbeds", category: "pool", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" },
    { title: "Verde Fine Dining Restaurant", category: "restaurant", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" },
    { title: "Michelin-Inspired Gastronomy Plating", category: "restaurant", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sunset Rooftop Lounge & Cocktail Bar", category: "rooftop", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80" },
    { title: "Luxury Thermal Spa Hydrotherapy Suite", category: "spa", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80" },
    { title: "Aromatherapy Treatment Sanctum", category: "spa", image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80" },
    { title: "Botanical Water Gardens & Fountains", category: "exterior", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" },
    { title: "Royal Ballroom Grand Gala Setup", category: "events", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80" }
  ],

  reviews: [
    {
      id: 1,
      name: "Lord Alexander Sterling",
      location: "London, UK",
      stay: "Presidential Suite",
      rating: 5,
      date: "July 2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      title: "An unmatchable standard of world-class elegance",
      text: "Velora Grand Hotel exceeds every expectation. The butler service was flawless, the dining at Verde was worthy of international accolades, and the garden views offered absolute tranquility."
    },
    {
      id: 2,
      name: "Dr. Sophia Vance",
      location: "Geneva, Switzerland",
      stay: "Velora Garden Suite",
      rating: 5,
      date: "August 2026",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      title: "Pure peace and revitalizing spa experience",
      text: "The hydrotherapy suite and aromatherapy massages restored my spirit completely. The staff anticipates every single need before you even speak. I will return every year."
    },
    {
      id: 3,
      name: "Tariq Mahmood & Family",
      location: "Lahore, Pakistan",
      stay: "Family Residence",
      rating: 5,
      date: "June 2026",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      title: "The ideal luxury getaway for our family",
      text: "Spacious layout, top-tier amenities, and marvelous kids entertainment. The concierge arranged our entire city tour effortlessly. Outstanding hospitality!"
    }
  ],

  faqs: [
    {
      q: "What are the standard Check-in and Check-out times?",
      a: "Check-in begins at 14:00 (2:00 PM) and Check-out is until 12:00 (12:00 PM noon). Early check-in or late check-out can be arranged through our 24/7 Concierge team."
    },
    {
      q: "Is airport chauffeur transfer included with room bookings?",
      a: "Complimentary luxury airport transfer (Mercedes-Maybach or S-Class) is included for Executive Suites, Presidential Suites, and Royal Grand Suites. For other rooms, transfer service can be added during booking."
    },
    {
      q: "Are children allowed in the Spa & Wellness Center?",
      a: "The Spa & Thermal hydrotherapy area is reserved for guests aged 16 and above to maintain a tranquil ambiance. Family pool sessions are available at the main infinity pool daily."
    },
    {
      q: "What dining options cater to special dietary requirements?",
      a: "Verde Signature Restaurant offers full Vegan, Gluten-Free, Halal, and custom Dietary Menus crafted by our Executive Culinary Team upon request."
    },
    {
      q: "What is Velora's reservation cancellation policy?",
      a: "Flexible cancellations are permitted up to 24 hours prior to check-in without charge. You can manage or cancel your reservation anytime via the 'My Bookings' tab on our website."
    }
  ],

  initialBookings: [
    {
      id: "VEL-8921",
      guestName: "Lady Catherine Croft",
      email: "catherine.c@luxurytravel.com",
      phone: "+92 300 5551234",
      roomId: "presidential-suite",
      roomTitle: "Presidential Suite",
      checkIn: "2026-08-10",
      checkOut: "2026-08-14",
      nights: 4,
      guests: "2 Adults",
      specialRequests: "High floor view, champagne on arrival",
      pricePerNight: 1200,
      totalPrice: 5376, // 4 * 1200 + tax
      status: "Confirmed",
      createdDate: "2026-08-01"
    },
    {
      id: "VEL-7410",
      guestName: "Hamza Malik",
      email: "hamza.m@techcorp.pk",
      phone: "+92 321 9876543",
      roomId: "executive-suite",
      roomTitle: "Executive Suite",
      checkIn: "2026-08-15",
      checkOut: "2026-08-18",
      nights: 3,
      guests: "1 Adult",
      specialRequests: "Quiet room, quiet workspace",
      pricePerNight: 450,
      totalPrice: 1512,
      status: "Checked In",
      createdDate: "2026-08-02"
    }
  ]
};

// Export to window object for Vanilla JS access
window.VELORA_DATA = VELORA_DATA;
