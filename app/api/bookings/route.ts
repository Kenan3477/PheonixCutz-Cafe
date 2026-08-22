import { NextResponse } from "next/server";
import {
  BOOKING_HORIZON_DAYS,
  canFitService,
  createBooking,
  getService,
  isClockTime,
  isIsoDate,
  normalizeName,
  normalizePhone,
  publicBooking,
  upcomingForPhone,
} from "@/lib/booking";
import { clientIp } from "@/lib/booking-auth";
import { updateStore } from "@/lib/booking-store";
import { addDaysToIsoDate, londonNow } from "@/lib/london";
import { whatsappHref } from "@/lib/site";

export const dynamic = "force-dynamic";

const recentByIp = new Map<string, number[]>();

function allowCustomerRequest(ip: string) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const times = (recentByIp.get(ip) ?? []).filter((time) => now - time < windowMs);
  if (times.length >= 8) {
    recentByIp.set(ip, times);
    return false;
  }
  times.push(now);
  recentByIp.set(ip, times);
  return true;
}

export async function POST(request: Request) {
  if (!allowCustomerRequest(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many booking attempts. Wait a little and try again." },
      { status: 429 },
    );
  }

  let body: {
    serviceId?: string;
    date?: string;
    start?: string;
    name?: string;
    phone?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the booking as JSON." }, { status: 400 });
  }

  const service = getService(body.serviceId ?? "");
  const name = normalizeName(body.name ?? "");
  const phone = normalizePhone(body.phone ?? "");
  const date = body.date ?? "";
  const start = body.start ?? "";
  const today = londonNow().isoDate;
  const lastDay = addDaysToIsoDate(today, BOOKING_HORIZON_DAYS - 1);

  if (!service) {
    return NextResponse.json({ error: "Pick a service from the list." }, { status: 400 });
  }
  if (name.length < 2) {
    return NextResponse.json({ error: "Tell us your name." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json(
      { error: "Use a UK mobile so Yusuf can reach you." },
      { status: 400 },
    );
  }
  if (!isIsoDate(date) || date < today || date > lastDay) {
    return NextResponse.json({ error: "Pick a day from the calendar." }, { status: 400 });
  }
  if (!isClockTime(start)) {
    return NextResponse.json({ error: "Pick a time from the calendar." }, { status: 400 });
  }

  const saved = await updateStore((store) => {
    if (upcomingForPhone(store.bookings, phone).length >= 3) {
      return { error: "This number already has three upcoming cuts." };
    }
    const fit = canFitService({
      isoDate: date,
      start,
      minutes: service.minutes,
      bookings: store.bookings,
      closedDates: store.closedDates,
    });
    if (!fit.ok) return { error: fit.reason };
    const booking = createBooking({
      date,
      start,
      service,
      name,
      phone,
      source: "online",
    });
    return { ...store, bookings: [...store.bookings, booking] };
  });

  if (!saved.ok) {
    return NextResponse.json({ error: saved.error }, { status: 409 });
  }

  const booking = saved.data.bookings.at(-1);
  if (!booking) {
    return NextResponse.json({ error: "The booking did not save." }, { status: 500 });
  }

  return NextResponse.json({
    booking: publicBooking(booking),
    whatsapp: whatsappHref(
      [
        `Hi Yusuf — I booked on the Phoenix website.`,
        `Name: ${name}`,
        `Service: ${service.name}`,
        `Time: ${date} at ${start}`,
      ].join("\n"),
    ),
    store: saved.kind,
  });
}
