/**
 * Velora Grand Hotel & Spa - Complete Rooms & Suites Data
 */

const VELORA_ROOMS = [
  {
    id: "deluxe-king",
    title: "Deluxe King Room",
    name: "Deluxe King Room",
    category: "rooms",
    price: 280,
    size: "48 m² / 516 sq.ft",
    guests: "2 Adults, 1 Child",
    bed: "1 King Bed",
    view: "Mountain & Garden View",
    bathroom: "Italian Marble with Rainfall Shower & Soaking Tub",
    breakfast: "Complimentary Artisanal Breakfast Included",
    wifi: "Ultra High-Speed Fiber Wi-Fi (Included)",
    aircon: "Individual Climate Control & Air Purification",
    rating: 4.9,
    reviewsCount: 42,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Designed for discerning travelers, the Deluxe King Room blends contemporary luxury with classical warmth.",
    fullDescription: "Designed for discerning travelers, the Deluxe King Room blends contemporary European luxury with classical warmth. Features a plush pillow-top king bed wrapped in 800-thread-count Egyptian cotton linens, a handcrafted marble bathroom with a spa rainfall shower and soaking tub, floor-to-ceiling soundproof windows overlooking tranquil botanical grounds, and a high-tech entertainment console.",
    amenities: [
      "Free High-Speed Wi-Fi",
      "55-inch OLED Smart TV",
      "Nespresso Coffee Machine & Artisanal Teas",
      "Italian Marble Bathroom",
      "Rainfall Shower & Soaking Tub",
      "24/7 Room Service & Butler Call Button",
      "Private Balcony with Garden Views",
      "Electronic Laptop Safe"
    ],
    features: [
      "Soundproof double-glazed acoustic windows",
      "Bespoke Italian leather lounge seating",
      "Custom velvet evening turndown robes & slippers",
      "Molton Brown luxury bath amenities",
      "Daily fresh fruit bowl and mineral water refill"
    ],
    reviews: [
      { name: "Julian Vance", rating: 5, date: "July 2026", text: "Impeccable cleanliness and unmatched bed comfort. The garden view in the morning was pure magic." },
      { name: "Elena Rostova", rating: 5, date: "June 2026", text: "The bathroom amenities and rainfall shower were spa-quality. Highly recommended!" }
    ]
  },
  {
    id: "executive-suite",
    title: "Executive Suite",
    name: "Executive Suite",
    category: "suites",
    price: 450,
    size: "72 m² / 775 sq.ft",
    guests: "3 Adults",
    bed: "1 Super King Bed",
    view: "City Skyline & Garden View",
    bathroom: "Double Vanities, Deep Jacuzzi Bathtub & Separate Glass Shower",
    breakfast: "Executive Lounge Gourmet Breakfast & Afternoon Tea Included",
    wifi: "Dedicated Executive Fiber Wi-Fi",
    aircon: "Dual-Zone Smart Climate Control",
    rating: 5.0,
    reviewsCount: 58,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Spacious luxury featuring a separate elegant living lounge, dedicated workspace, and an opulent master bedroom.",
    fullDescription: "The Executive Suite offers an elevated level of privacy and comfort with a separate living lounge, ergonomic mahogany study desk, walk-in dressing wardrobe, and a grand master bedroom. Guests enjoy exclusive VIP access to the Executive Lounge on the 14th floor, featuring complimentary gourmet breakfast, afternoon tea, and evening sommelier cocktail hours.",
    amenities: [
      "Executive Lounge VIP Access",
      "Complimentary Gourmet Breakfast & Afternoon Tea",
      "Deep Soaking Jacuzzi Bathtub",
      "Custom Walk-in Closet",
      "Nespresso Coffee Machine & Gourmet Mini-Bar",
      "Hermès Paris Luxury Bath Amenities",
      "Personalized 24/7 Butler Service",
      "Complimentary Airport Shuttle Transfer"
    ],
    features: [
      "Separate living room with plush velvet sofa set",
      "Dual 65-inch 4K Smart TVs with Bose soundbars",
      "Wireless charging pads and international sockets",
      "Priority spa & restaurant table reservations",
      "Bespoke shoe shine & evening garment pressing service"
    ],
    reviews: [
      { name: "Lord Marcus Sterling", rating: 5, date: "August 2026", text: "The Executive Lounge privileges and private butler assistance made my business trip completely seamless." },
      { name: "Dr. Amara Khan", rating: 5, date: "May 2026", text: "Extremely spacious and elegant. The Jacuzzi tub after a long flight was extraordinary." }
    ]
  },
  {
    id: "velora-garden-suite",
    title: "Velora Garden Suite",
    name: "Velora Garden Suite",
    category: "suites",
    price: 520,
    size: "85 m² / 915 sq.ft",
    guests: "2 Adults, 2 Children",
    bed: "1 King Bed + Convertible Sofa Bed",
    view: "Private Botanical Garden & Water Fountains",
    bathroom: "Oversized Spa Bathtub, Dual Basins & Outdoor Garden Shower",
    breakfast: "Private In-Suite Terrace Breakfast Included",
    wifi: "High-Speed Seamless Wi-Fi",
    aircon: "Ecological Silent Air Conditioning",
    rating: 4.95,
    reviewsCount: 31,
    badge: "Serenity Choice",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A sanctuary of peace featuring direct access to Velora's private botanical gardens and private sun terrace.",
    fullDescription: "Surrounded by blooming flora and serene water features, the Velora Garden Suite opens directly onto a private secluded sun terrace with sun loungers and outdoor dining facilities. Inside, enjoy an airy open-plan living room, oversized marble bathroom, and specialized aromatherapy sleep diffusers for ultimate relaxation.",
    amenities: [
      "Private Sun Terrace with Garden Access",
      "Outdoor Rain Shower & Indoor Spa Tub",
      "Complimentary Daily Thermal Spa Pass",
      "Bespoke Organic Mini-Bar Selection",
      "Custom Pillow Menu (6 Orthopedic Options)",
      "Dedicated 24/7 Concierge Service",
      "In-suite Gourmet Breakfast Service",
      "Evening Aromatherapy Turndown Ritual"
    ],
    features: [
      "Direct walking pathway to hotel infinity pool",
      "Handmade silk bathrobes and organic spa footwear",
      "Customizable room scent selection upon check-in",
      "Bose Bluetooth surround sound system",
      "High-security electronic safe and private valet box"
    ],
    reviews: [
      { name: "Sophia Martinez", rating: 5, date: "July 2026", text: "Having a private sun terrace attached to our garden suite made us feel like we had our own resort. Truly tranquil!" }
    ]
  },
  {
    id: "family-residence",
    title: "Family Residence",
    name: "Family Residence",
    category: "residences",
    price: 680,
    size: "110 m² / 1,184 sq.ft",
    guests: "4 Adults, 2 Children",
    bed: "1 Emperor King Bed + 2 Single Twin Beds",
    view: "Panoramic Resort & Mountain View",
    bathroom: "Two Full En-suite Bathrooms with Tubs & Children's Amenities",
    breakfast: "Family Buffet Breakfast at Verde Signature Restaurant",
    wifi: "High-Capacity Ultra Wi-Fi",
    aircon: "Multi-Zone Independent Thermostat",
    rating: 4.9,
    reviewsCount: 27,
    badge: "Family Favorite",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Designed for family luxury with two interconnected master bedrooms, fully equipped kitchenette, and formal dining.",
    fullDescription: "The Family Residence combines maximum living space with multi-generational comfort. It features two private bedrooms with en-suite bathrooms, a grand central living area, formal 6-person dining table, fully equipped luxury kitchenette, and specialized children's entertainment facilities including a PlayStation 5 and board game collection.",
    amenities: [
      "Two Full En-suite Italian Marble Bathrooms",
      "Gourmet Kitchenette with Espresso Machine",
      "Formal Dining Table for 6 Guests",
      "PlayStation 5 Console & Games Library",
      "Dedicated Family Concierge Service",
      "Complimentary Laundry & Garment Care",
      "Expansive Private Balcony",
      "Unlimited Access to Swimming Pool & Kids Club"
    ],
    features: [
      "Interconnecting doors for complete privacy and safety",
      "Child-safe balcony locks and soft corner furnishings",
      "Stocked pantry with organic snacks and fresh juices",
      "Two 65-inch OLED TVs with Disney+ & Netflix",
      "Complimentary baby cot, stroller, and highchair upon request"
    ],
    reviews: [
      { name: "Tariq Mahmood", rating: 5, date: "June 2026", text: "Perfect choice for our family of 5. The kids loved the gaming setup and we loved the spacious master suite!" }
    ]
  },
  {
    id: "presidential-suite",
    title: "Presidential Suite",
    name: "Presidential Suite",
    category: "suites",
    price: 1200,
    size: "160 m² / 1,722 sq.ft",
    guests: "4 Guests",
    bed: "1 Emperor King Bed + 1 Executive Sofa Bed",
    view: "360° Panoramic Mountain & City Skyline Views",
    bathroom: "Private In-Suite Steam Room, Sauna, Oversized Jacuzzi & Rain Showers",
    breakfast: "Private Butler-Served Gourmet Breakfast in Formal Dining Room",
    wifi: "Private Encrypted Ultra-High-Speed Network",
    aircon: "Climate Control with HEPA Medical-Grade Air Filtration",
    rating: 5.0,
    reviewsCount: 19,
    badge: "Exclusive",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The pinnacle of architectural grandeur with private entrance, grand piano, formal dining, steam room, and butler service.",
    fullDescription: "Occupying a prime wing on the top floor, the Presidential Suite represents the ultimate expression of luxury hotel living. Features a grand foyer entrance, hand-carved mahogany furniture, Steinway baby grand piano, private in-suite Finnish sauna and steam room, master walk-in closet, formal dining room for 8 guests, and dedicated 24-hour private butler service.",
    amenities: [
      "24/7 Dedicated Private Butler Team",
      "Chauffeur-Driven Mercedes-Maybach Airport Transfers",
      "In-suite Private Steam Room & Sauna Suite",
      "Steinway Baby Grand Piano",
      "Private Chef Dining Option",
      "VIP Airport Fast-Track Handling",
      "Complimentary Vintage Champagne Selection",
      "Private Security Entrance & Elevator Access"
    ],
    features: [
      "Bullet-resistant glassing and reinforced security locks",
      "Custom temperature-controlled wine cellar in dining area",
      "Bespoke Creed Paris bath and fragrance amenities",
      "85-inch 8K Home Theater system with Bang & Olufsen audio",
      "Unrestricted VIP access to all hotel facilities and rooftop lounge"
    ],
    reviews: [
      { name: "Ambassador Henri Dubois", rating: 5, date: "May 2026", text: "Sublime elegance. The private steam room and private butler service set an unmatched benchmark." }
    ]
  },
  {
    id: "royal-grand-suite",
    title: "Royal Grand Suite",
    name: "Royal Grand Suite",
    category: "suites",
    price: 1800,
    size: "240 m² / 2,583 sq.ft",
    guests: "6 Guests",
    bed: "2 Emperor King Beds",
    view: "360° Rooftop, City Skyline & Mountain Views",
    bathroom: "Private Spa Room, Dual Hydrotherapy Tubs & Gold-Plated Fixtures",
    breakfast: "Bespoke Chef-Curated Breakfast on Private Rooftop Terrace",
    wifi: "Encrypted High-Security Dedicated Fiber Line",
    aircon: "Advanced Multi-Zone Air Purification & Climate Control",
    rating: 5.0,
    reviewsCount: 14,
    badge: "Crown Jewel",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Our crown jewel residence with private heated rooftop plunge pool, security entrance, terrace, and private spa room.",
    fullDescription: "Spanning the entire top penthouse wing of Velora Grand, the Royal Grand Suite is reserved for royalty, heads of state, and global icons. It boasts a private heated outdoor rooftop plunge pool with panoramic city views, dedicated private massage room with on-demand spa therapists, private culinary team, security suite, and lavish gold-leaf interior accents.",
    amenities: [
      "Private Outdoor Heated Rooftop Plunge Pool",
      "Full Top Floor Security Suite & Private Elevator",
      "Dedicated Private Spa Treatment Room",
      "Personal Butler, Sommelier & Private Chef Team",
      "Unlimited Helipad Access & Chauffeur Fleet",
      "Custom Stocked Vintage Wine & Spirits Cabinet",
      "24-Karat Gold Plated Bathroom Fixtures",
      "Complimentary Unlimited Spa & Dining Privileges"
    ],
    features: [
      "Master bedroom with 360-degree glass dome ceiling",
      "Dining hall accommodating up to 12 banquet guests",
      "Custom Italian silk wall coverings and hand-woven carpets",
      "Biometric security access controls",
      "Unlimited VIP room service and bespoke event hosting"
    ],
    reviews: [
      { name: "HRH Prince Faisal", rating: 5, date: "April 2026", text: "The rooftop plunge pool and private culinary staff were extraordinary. Truly the finest suite in the region." }
    ]
  }
];

// Attach to window object
window.VELORA_ROOMS = VELORA_ROOMS;
if (window.VELORA_DATA) {
  window.VELORA_DATA.rooms = VELORA_ROOMS;
}
