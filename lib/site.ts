export const site = {
  name: "Phoenix Cutz & Cafe",
  url: "https://phoenix-cutz-cafe.vercel.app",
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
      a: "The cafe counter sticker says cash and card are accepted. Older barber listings still say cash for the chair — ask if you want to pay by card for a cut.",
    },
    {
      q: "Is it good for children?",
      a: "Yes. Kids’ haircuts are on the list, and the lime booths are used as a family cafe.",
    },
    {
      q: "What about allergies or prices on the food?",
      a: "Food prices are from their printed Phoenix Cafe menu. Drink prices are from the yellow counter board. Tell the team about allergies when you order.",
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
    "Food prices from their printed Phoenix Cafe menu. Drink prices from the yellow counter board: PHOENIX — Fresh Food, Warm Coffee.",
  breakfastNote:
    "All breakfasts include a pot of tea and are served with fresh crusty bread.",
  omeletteNote: "All omelettes are served with fresh crusty bread.",
  milkNote: "Milk alternatives +£0.50 — soya, oat or almond.",
  menu: [
    {
      id: "breakfast",
      title: "Breakfast",
      items: [
        {
          name: "Full English Breakfast",
          price: "£8.50",
          detail:
            "2 rashers of bacon, pork sausage, beans, tomato, fried egg, mushrooms, hash brown, butter.",
          photo: "/images/real/breakfast-full-english-mushrooms.jpg",
        },
        {
          name: "Veggie Breakfast",
          price: "£7.50",
          detail:
            "2 veggie sausages, beans, tomato, fried egg, mushrooms, hash brown, spinach.",
          photo: "/images/real/breakfast-veggie-hash-browns.jpg",
        },
        {
          name: "Vegan Breakfast",
          price: "£7.50",
          detail:
            "Veggie sausage, beans, tomato, mushrooms, hash brown, avocado, spinach.",
        },
        {
          name: "Turkish Breakfast",
          price: "£10.00",
          detail:
            "Feta, olives, kashar, halloumi, salami, sucuk, halal sausage, egg, honey, jam, cheese borek, salad.",
        },
        {
          name: "Hash Brown Brunch",
          price: "£8.95",
          detail:
            "2 rashers of bacon, sausage, beans, fried egg, 4 hash browns.",
          photo: "/images/real/breakfast-hash-browns-sausage.jpg",
        },
        {
          name: "Big Brunch",
          price: "£8.95",
          detail: "2 rashers of bacon, 2 sausages, beans, 2 fried eggs, chips.",
        },
      ],
    },
    {
      id: "omelettes",
      title: "Omelettes",
      items: [
        {
          name: "Classic Cheese Omelette",
          price: "£6.00",
          detail: "3 eggs, grated mozzarella, butter.",
        },
        {
          name: "Ham & Cheese Omelette",
          price: "£6.50",
          detail: "3 eggs, smoked ham, grated mozzarella, butter.",
        },
        {
          name: "Mushrooms & Cheese Omelette",
          price: "£7.00",
          detail: "3 eggs, sautéed mushrooms, grated mozzarella, butter.",
        },
        {
          name: "Full English Omelette",
          price: "£8.50",
          detail:
            "3 eggs, smoked ham, pork sausage, sautéed mushrooms, grated mozzarella, butter.",
        },
      ],
    },
    {
      id: "baps",
      title: "Phoenix bap",
      items: [
        { name: "Bacon Bap", price: "£4.50", detail: "2 rashers of bacon." },
        { name: "Sausage Bap", price: "£5.00", detail: "2 pork sausages." },
        {
          name: "Bacon & Sausage Bap",
          price: "£6.50",
          detail: "2 rashers of bacon, 2 pork sausages.",
        },
        { name: "The Cypriot Bap", price: "£7.00", detail: "2 halloumi, avocado." },
        { name: "Halloumi Bap", price: "£5.50", detail: "2 halloumi, mushrooms." },
        { name: "The Veggie Bap", price: "£5.50", detail: "2 veggie sausages." },
        {
          name: "The Vegan Bap",
          price: "£6.50",
          detail: "Avocado, tomato, mushrooms.",
        },
        {
          name: "Phoenix Special Bap",
          price: "£7.00",
          detail: "2 bacon, 2 sausages, hash brown, fried egg.",
        },
      ],
    },
    {
      id: "bagels",
      title: "Phoenix bagel",
      items: [
        { name: "Egg & Bacon", price: "£5.50", detail: "Egg and a rasher of bacon." },
        { name: "Egg & Cheese", price: "£4.00", detail: "Egg and mozzarella." },
        {
          name: "Smashed Avocado & Egg",
          price: "£6.00",
          detail: "Egg and avocado.",
          photo: "/images/real/bagel-sandwich-egg.jpg",
        },
        {
          name: "Mushrooms and Cheese",
          price: "£5.00",
          detail: "Mushrooms and mozzarella.",
        },
        {
          name: "Breakfast Bagel",
          price: "£5.95",
          detail: "Bacon, pork sausage, fried egg, cheese.",
        },
      ],
    },
    {
      id: "toasties",
      title: "Paninis, toasties and baguettes",
      items: [
        {
          name: "Mozzarella Tomato Pesto Panini",
          price: "£5.50",
          detail: "Mozzarella, tomato, pesto.",
        },
        {
          name: "Ham & Cheese Panini",
          price: "£5.50",
          detail: "Smoked ham, mozzarella.",
        },
        { name: "Bacon & Egg Toast", price: "£4.50", detail: "Bacon and egg." },
        {
          name: "Tuna Melt Baguette",
          price: "£5.00",
          detail: "Tuna, sweetcorn, mayo, mozzarella, cucumber.",
        },
        {
          name: "Chicken Pesto Baguette",
          price: "£6.00",
          detail: "Roast chicken, pesto, mozzarella.",
        },
        {
          name: "Phoenix Toast Star",
          price: "£4.50",
          detail: "Butter, mozzarella, Turkish beef sucuk.",
        },
        {
          name: "Phoenix Baguette",
          price: "£5.00",
          detail: "Butter, 2 scrambled eggs, grated mozzarella.",
        },
        {
          name: "Baked Beans on Toast",
          price: "£5.00",
          detail: "2 crusty toasties, butter, beans.",
        },
      ],
    },
    {
      id: "lunch",
      title: "Phoenix lunch special",
      items: [
        {
          name: "Beef Lasagna",
          price: "£7.00",
          detail: "Home made, with coleslaw.",
        },
        {
          name: "Vegetarian Lasagna",
          price: "£6.50",
          detail: "Home made, with coleslaw.",
        },
        {
          name: "Lentil Soup",
          price: "£5.00",
          detail: "Home made, lemon and fried bread.",
        },
        {
          name: "Cheeseburger & Chips",
          price: "£6.50",
          photo: "/images/real/interior-lime-green-booth-burger.jpg",
        },
        { name: "Chicken Burger & Chips", price: "£7.50" },
        { name: "10 Chicken Nuggets", price: "£6.50" },
        { name: "Chicken Nuggets & Chips", price: "£7.50" },
        {
          name: "Jacket Potato with Coleslaw",
          price: "£6.50",
          detail: "Cheese and beans, cheese and ham, or tuna mayo and cheese.",
        },
      ],
    },
    {
      id: "kids",
      title: "Kids menu",
      items: [
        { name: "Chicken Burger & Chips", price: "£6.00" },
        { name: "Cheeseburger & Chips", price: "£7.00" },
        { name: "Chicken Nuggets & Chips", price: "£5.50", detail: "5 nuggets." },
      ],
    },
  ],
  drinks: [
    { name: "Espresso", price: "£2.50" },
    { name: "Americano", price: "£2.60" },
    { name: "Latte", price: "£3.00" },
    { name: "Cappuccino", price: "£3.00" },
    { name: "Flat white", price: "£3.00" },
    { name: "Macchiato", price: "£3.00" },
    { name: "Mocha", price: "£3.20" },
    { name: "Turkish coffee", price: "£2.50" },
    { name: "Hot chocolate", price: "£3.50" },
    { name: "Chai latte", price: "£4.50" },
    { name: "Matcha latte", price: "£4.50" },
  ],
  teas: [
    { name: "Turkish tea, glass", price: "£1.00" },
    { name: "English tea", price: "£2.50" },
    { name: "Green tea", price: "£2.50" },
    { name: "Mint tea", price: "£2.50" },
  ],
  milkshakes: [
    { name: "Strawberry, chocolate, vanilla, Oreo or Lotus Biscoff", price: "£5.00" },
  ],
  sweets: [
    { name: "Carrot cake", price: "£4.00" },
    { name: "Pistachio cake", price: "£4.00" },
    { name: "Chocolate cake", price: "£4.00" },
    { name: "Baklava", price: "£4.50", detail: "2 slices with vanilla ice cream." },
    { name: "Tiramisu, home made", price: "£4.50" },
    { name: "Strawberry cheesecake", price: "£3.50" },
  ],
  counterBakes: [
    { name: "Cake", price: "£2.50" },
    { name: "Brownie", price: "£2.50" },
    { name: "Tart or waffle", price: "£2.00" },
    { name: "Muffin", price: "£2.00" },
  ],
  loyalty: "Buy 6 coffees and get the 7th free.",
  plates: [
    {
      name: "Full English",
      section: "breakfast",
      tag: "£8.50 · pot of tea",
      photo: "/images/real/breakfast-full-english-mushrooms.jpg",
      blurb: "The house breakfast from their printed menu.",
      includes: [
        "Bacon",
        "Sausage",
        "Fried egg",
        "Hash brown",
        "Mushrooms",
        "Tomato",
        "Beans",
      ],
    },
    {
      name: "Hash Brown Brunch",
      section: "breakfast",
      tag: "£8.95",
      photo: "/images/real/breakfast-hash-browns-sausage.jpg",
      blurb: "The crunchier brunch plate — four hash browns.",
      includes: ["Hash browns", "Bacon", "Sausage", "Fried egg", "Beans"],
    },
    {
      name: "Veggie Breakfast",
      section: "breakfast",
      tag: "£7.50",
      photo: "/images/real/breakfast-veggie-hash-browns.jpg",
      blurb: "Veggie sausages, spinach and the usual sides.",
      includes: [
        "Veggie sausage",
        "Spinach",
        "Fried egg",
        "Hash brown",
        "Mushrooms",
        "Tomato",
        "Beans",
      ],
    },
    {
      name: "Cheeseburger & chips",
      section: "plates",
      tag: "£6.50",
      photo: "/images/real/interior-lime-green-booth-burger.jpg",
      blurb: "From the lunch list, photographed in the lime booth.",
      includes: ["Cheeseburger", "Chips"],
    },
    {
      name: "Smashed avocado & egg bagel",
      section: "plates",
      tag: "£6.00",
      photo: "/images/real/bagel-sandwich-egg.jpg",
      blurb: "On the printed bagel list.",
      includes: ["Bagel", "Avocado", "Egg"],
    },
  ],
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
    src: "/images/real/shop-front.jpg",
    alt: "Phoenix Turkish Barber by Yusuf and the cafe front on Wimborne Road",
    wide: true,
  },
  {
    src: "/images/real/interior-seating.jpg",
    alt: "Cafe seating with copper ceiling and lime booths",
    wide: false,
  },
  {
    src: "/images/real/interior-from-door.jpg",
    alt: "Looking down the cafe from the front door",
    wide: false,
  },
  {
    src: "/images/real/cafe-counter.jpg",
    alt: "Service counter, pastry case and yellow Phoenix drinks board",
    wide: false,
  },
  {
    src: "/images/real/breakfast-full-english-mushrooms.jpg",
    alt: "Full English breakfast at Phoenix Cafe",
    wide: false,
  },
  {
    src: "/images/real/interior-lime-green-booth-burger.jpg",
    alt: "Cheeseburger in the lime booth",
    wide: true,
  },
] as const;

export function whatsappHref(message: string) {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
