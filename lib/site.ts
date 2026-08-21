export const site = {
  name: "Phoenix Cutz & Cafe",
  url: "https://phoenix-cutz-cafe.app",
  shortName: "Phoenix Cafe",
  tagline: "Good food. Good mood. Good day.",
  scriptLine: "Good Day",
  coffeeLine: "Good Coffee",
  cutzLine: "Good Cutz",
  welcome: "We are so glad you are here.",
  feel: "Feel the difference",
  description:
    "A Turkish barber and all-day cafe on Wimborne Road in Winton, Bournemouth. Full English plates, coffee, and traditional cuts under one roof.",
  address: {
    line1: "493 Wimborne Road",
    area: "Winton",
    city: "Bournemouth",
    postcode: "BH9 2AW",
    country: "United Kingdom",
    display: "493 Wimborne Road, Winton, Bournemouth BH9 2AW",
    lat: 50.744829,
    lng: -1.878121,
    what3words: "pink.order.tags",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=493+Wimborne+Road+Bournemouth+BH9+2AW",
    embedUrl:
      "https://maps.google.com/maps?q=493%20Wimborne%20Road%2C%20Bournemouth%20BH9%202AW&z=16&output=embed",
  },
  phoneDisplay: "07902 852085",
  phoneTel: "+447902852085",
  whatsapp: "https://wa.me/447902852085",
  instagram: "https://www.instagram.com/phoenix.cutz.cafe/",
  instagramHandle: "@phoenix.cutz.cafe",
  facebook: "https://www.facebook.com/profile.php?id=61555156340333",
  hygiene: {
    rating: 5,
    label: "Very good",
    inspected: "21 July 2026",
    authority: "Bournemouth, Christchurch and Poole",
    url: "https://ratings.food.gov.uk/business/1961139",
  },
  hours: [
    { day: "Monday", open: null, close: null },
    { day: "Tuesday", open: "09:30", close: "19:00" },
    { day: "Wednesday", open: "09:30", close: "19:00" },
    { day: "Thursday", open: "09:30", close: "19:00" },
    { day: "Friday", open: "09:30", close: "19:00" },
    { day: "Saturday", open: "09:30", close: "18:00" },
    { day: "Sunday", open: "10:00", close: "16:00" },
  ] as const,
  hoursNote:
    "Hours from the Phoenix Turkish Barber listings for this address. Pop in for food; WhatsApp if you want a chair held.",
  amenities: [
    {
      title: "Walk in for food",
      detail: "Breakfast plates, burgers, bagels and coffee from the kitchen.",
    },
    {
      title: "Book the chair",
      detail: "WhatsApp Yusuf on 07902 852085. Walk-ins are taken when a chair is free.",
    },
    {
      title: "Kids are welcome",
      detail: "Kids’ cuts from £9, and the cafe is used to family tables.",
    },
    {
      title: "Easy to reach",
      detail: "493 Wimborne Road, Winton. Street parking. Bournemouth station is about two kilometres.",
    },
  ],
  faqs: [
    {
      q: "Do I need to book?",
      a: "Not for the cafe — walk in. For a haircut, walk-ins are fine, but WhatsApp is the surest way at busy times.",
    },
    {
      q: "What are the hours?",
      a: "Closed Monday. Tuesday–Friday 9:30–19:00, Saturday 9:30–18:00, Sunday 10:00–16:00.",
    },
    {
      q: "Is it cash only?",
      a: "Local barber listings mark the chair as cash. Ask at the counter for the cafe.",
    },
    {
      q: "Is it good for children?",
      a: "Yes. Kids’ haircuts are on the list, and the lime booths are used as a family cafe.",
    },
    {
      q: "What about allergies or prices on the food?",
      a: "Drink and tart prices on the menu page are from their yellow board. Plate prices change — ask the team, and tell them about allergies when you order.",
    },
    {
      q: "What’s the hygiene rating?",
      a: "5 out of 5 (very good), inspected 21 July 2026 by Bournemouth, Christchurch and Poole.",
    },
  ],
  companies: [
    {
      name: "Phoenix Cafe Services Ltd",
      number: "16964570",
      note: "Cafe, incorporated January 2026",
    },
    {
      name: "Phoenix Turkish Barber Services Ltd",
      number: "14078280",
      note: "Barber, trading from this address since 2022",
    },
  ],
} as const;

export const kitchen = {
  intro:
    "Plates photographed in the cafe and posted on @phoenix.cutz.cafe. Drink prices are taken from the yellow board behind the counter. Food prices change with the board — ask the team.",
  plates: [
    {
      name: "Full English",
      section: "breakfast",
      tag: "The house plate",
      photo: "/images/real/breakfast-full-english-mushrooms.jpg",
      blurb:
        "The classic Winton breakfast they put on the black-and-gold menu card.",
      includes: [
        "Fried egg",
        "Back bacon",
        "Grilled sausage",
        "Hash brown",
        "Mushrooms",
        "Roasted tomato",
        "Beans",
      ],
    },
    {
      name: "The Big Hash",
      section: "breakfast",
      tag: "Hearty",
      photo: "/images/real/breakfast-hash-browns-sausage.jpg",
      blurb: "A taller stack when you want more crunch than the standard plate.",
      includes: [
        "Hash browns",
        "Sausage",
        "Back bacon",
        "Fried egg",
        "Beans",
      ],
    },
    {
      name: "Garden plate",
      section: "breakfast",
      tag: "Lighter",
      photo: "/images/real/breakfast-veggie-hash-browns.jpg",
      blurb: "Same kitchen, greener plate — avocado and spinach with the usual sides.",
      includes: [
        "Avocado",
        "Spinach",
        "Fried egg",
        "Hash brown",
        "Mushrooms",
        "Roasted tomato",
        "Beans",
        "Plant sausage",
      ],
    },
    {
      name: "House burger",
      section: "plates",
      tag: "Lunch",
      photo: "/images/real/interior-lime-green-booth-burger.jpg",
      blurb: "Served in the lime booth, with fries in a wire basket.",
      includes: [
        "Double cheeseburger",
        "Sesame bun",
        "Lettuce",
        "Fries",
      ],
    },
    {
      name: "Avocado halloumi bagel",
      section: "plates",
      tag: "Their line: simple, fresh, delicious",
      photo: "/images/real/bagel-sandwich-egg.jpg",
      blurb: "Toasted bagel from their own Instagram post.",
      includes: ["Toasted bagel", "Smashed avocado", "Grilled halloumi"],
    },
  ],
  drinks: [
    { name: "Cappuccino", price: "£2.80", source: "counter board" },
    { name: "Plain latte", price: "£2.80", source: "counter board" },
    { name: "Iced latte", price: null, source: "iced coffee board" },
    { name: "Iced mocha", price: null, source: "iced coffee board" },
    { name: "Iced americano", price: null, source: "iced coffee board" },
  ],
  sweets: [
    { name: "Strawberry tart", price: "£2.20" },
    { name: "Chocolate tart", price: "£3.20" },
    { name: "Cheesecake", price: "£3.20" },
  ],
  loyalty: "Buy 6 coffees and get the 7th free.",
} as const;

export const chair = {
  intro:
    "Official Phoenix Turkish Barbers price list from their Wimborne Road site. Yusuf’s chair: traditional Turkish work with a British finish. Complimentary coffee while you wait.",
  specialNote:
    "The Phoenix Special includes a hot wax, ear flame, hot towel, face mask and more — as listed on their Facebook page.",
  groups: [
    {
      title: "Cuts",
      items: [
        { name: "Hair cut", price: "£14" },
        { name: "Hair cut & wash", price: "£18" },
        { name: "Clipper cut", price: "£14" },
        { name: "Skin fade with zero clipper fade", price: "£17" },
        { name: "Kids haircut", price: "£9" },
        { name: "Kids skin fade with clipper zero fade", price: "£12" },
        { name: "OAP haircut", price: "£12" },
      ],
    },
    {
      title: "Shaves & beard",
      items: [
        { name: "Razor head shave", price: "£12" },
        { name: "Turkish wet shave", price: "£12" },
        { name: "Design wet shave", price: "£14" },
        { name: "Beard trim with clipper", price: "£12" },
        { name: "Beard trim line-up with clipper", price: "£12" },
      ],
    },
    {
      title: "Details",
      items: [
        { name: "Nose wax or ear wax", price: "£5" },
        { name: "Face mask, mud & hot towel wash", price: "£7" },
        { name: "Eyebrow threading", price: "£3" },
      ],
    },
    {
      title: "Phoenix signatures",
      items: [
        { name: "Phoenix Special hair cut", price: "£37" },
        { name: "Phoenix restyle skin fade", price: "£40" },
      ],
    },
  ],
} as const;

export const reviews = [
  {
    quote: "Facebook page shows 100% recommend from the reviews left there.",
    source: "Phoenix Turkish Baber on Facebook",
  },
  {
    quote:
      "Locals praise Yusuf for listening first, then cutting — traditional Turkish work with a British finish.",
    source: "Winton shop listings",
  },
  {
    quote:
      "Complimentary coffee in the chair, kids welcome, and the occasional wait at peak times.",
    source: "Customer notes on the Wimborne Road shop",
  },
] as const;

export const gallery = [
  {
    src: "/images/real/breakfast-full-english-mushrooms.jpg",
    alt: "Full English breakfast at Phoenix Cafe with the black and gold menu",
    wide: true,
  },
  {
    src: "/images/real/coffee-latte-counter.jpg",
    alt: "Latte and yellow coffee loyalty card on the Phoenix Cafe counter",
  },
  {
    src: "/images/real/interior-lime-green-booth-burger.jpg",
    alt: "Double cheeseburger and fries on the lime green booth at Phoenix Cafe",
  },
  {
    src: "/images/real/breakfast-hash-browns-sausage.jpg",
    alt: "Hash browns, sausage, bacon and beans at Phoenix Cafe",
  },
  {
    src: "/images/real/bagel-sandwich-egg.jpg",
    alt: "Avocado and halloumi bagel from Phoenix Cafe",
  },
  {
    src: "/images/real/breakfast-veggie-hash-browns.jpg",
    alt: "Garden breakfast with avocado and spinach at Phoenix Cafe",
    wide: true,
  },
] as const;

export function whatsappHref(message: string) {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
