# Phoenix Cutz & Cafe

Public website for the cafe and Turkish barber at **493 Wimborne Road, Winton, Bournemouth BH9 2AW**.

## What’s on the site

- Kitchen plates and interior shots taken from [@phoenix.cutz.cafe](https://www.instagram.com/phoenix.cutz.cafe/)
- Barber emblem and official cut prices from [phoenixturkishbarbers.godaddysites.com](https://phoenixturkishbarbers.godaddysites.com/)
- Drink and sweet prices read from their yellow counter board
- Live open/closed pill in UK time
- Chair booking on the Cut page, with Yusuf’s private diary at `/chair`
- WhatsApp booking to 07902 852085 (Phoenix Turkish Barber By Yusuf)
- 5/5 food hygiene rating (inspected 21 July 2026)

Food and drink prices are taken from their printed Phoenix Cafe menu and the yellow counter board.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Live

[https://phoenix-cutz-cafe.vercel.app](https://phoenix-cutz-cafe.vercel.app)

Free Vercel address with the shop spelling. No custom domain required. The GitHub repo can keep its original name.

## Chair diary

Customers book free slots on `/barber`. Yusuf manages the book at `/chair`.

Locally the diary is saved to `data/bookings.json`. On Vercel, add a KV store
(Storage → KV) so appointments survive deploys. Until that is connected, the
book still works but can reset when the site updates.

## Stack

Next.js, TypeScript, Tailwind CSS. Images live in `public/images/real/`.
