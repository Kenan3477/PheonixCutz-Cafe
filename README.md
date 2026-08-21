# Phoenix Cutz & Cafe

Public website for the cafe and Turkish barber at **493 Wimborne Road, Winton, Bournemouth BH9 2AW**.

## What’s on the site

- Kitchen plates and interior shots taken from [@phoenix.cutz.cafe](https://www.instagram.com/phoenix.cutz.cafe/)
- Barber emblem and official cut prices from [phoenixturkishbarbers.godaddysites.com](https://phoenixturkishbarbers.godaddysites.com/)
- Drink and sweet prices read from their yellow counter board
- Live open/closed pill in UK time
- WhatsApp booking to 07902 852085 (Phoenix Turkish Barber By Yusuf)
- 5/5 food hygiene rating (inspected 21 July 2026)

Food plate prices are not invented. Ask the team for the day’s board.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Live

[https://phoenix-cutz-cafe.app](https://phoenix-cutz-cafe.app)

Buy that domain (Vercel Domains is simplest) and leave it attached to the `pheonix-cutz-cafe` project. Until DNS is valid, Vercel shows **Invalid Configuration**. After purchase, Vercel can set the records itself.

If the domain was bought elsewhere, add this apex record at the registrar:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `216.198.79.1` |

Also add `www` as a CNAME to `cname.vercel-dns.com` if you want the www address. The GitHub repo can keep its original name.

## Stack

Next.js, TypeScript, Tailwind CSS. Images live in `public/images/real/`.
