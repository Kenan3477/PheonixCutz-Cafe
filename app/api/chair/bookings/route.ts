import { NextResponse } from "next/server";
import {
  canFitService,
  chairServices,
  createBooking,
  getService,
  isClockTime,
  isIsoDate,
  nextFreeStart,
  normalizeName,
  normalizePhone,
} from "@/lib/booking";
import { isChairSignedIn } from "@/lib/booking-auth";
import { loadStore, storeLabel, updateStore } from "@/lib/booking-store";
import { addDaysToIsoDate, londonNow } from "@/lib/london";

export const dynamic = "force-dynamic";

async function requireChair() {
  if (!(await isChairSignedIn())) {
    return NextResponse.json({ error: "Sign in to the chair diary." }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await requireChair();
  if (denied) return denied;

  const { data, kind } = await loadStore();
  const today = londonNow().isoDate;
  const horizon = addDaysToIsoDate(today, 28);
  const bookings = data.bookings
    .filter((booking) => booking.date >= addDaysToIsoDate(today, -2) && booking.date <= horizon)
    .sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));

  return NextResponse.json({
    bookings,
    closedDates: data.closedDates,
    services: chairServices,
    store: kind,
    storeLabel: storeLabel(kind),
    today,
  });
}

export async function POST(request: Request) {
  const denied = await requireChair();
  if (denied) return denied;

  let body: {
    type?: string;
    date?: string;
    start?: string;
    serviceId?: string;
    name?: string;
    phone?: string;
    notes?: string;
    minutes?: number;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the change as JSON." }, { status: 400 });
  }

  const date = body.date ?? "";
  const today = londonNow().isoDate;
  const lastDay = addDaysToIsoDate(today, 60);
  if (!isIsoDate(date) || date < addDaysToIsoDate(today, -1) || date > lastDay) {
    return NextResponse.json({ error: "Pick a valid day." }, { status: 400 });
  }

  if (body.type === "close") {
    const saved = await updateStore((store) => ({
      ...store,
      closedDates: store.closedDates.includes(date)
        ? store.closedDates
        : [...store.closedDates, date],
    }));
    return saved.ok
      ? NextResponse.json({ ok: true, store: saved.kind })
      : NextResponse.json({ error: saved.error }, { status: 409 });
  }

  if (body.type === "open") {
    const saved = await updateStore((store) => ({
      ...store,
      closedDates: store.closedDates.filter((item) => item !== date),
    }));
    return saved.ok
      ? NextResponse.json({ ok: true, store: saved.kind })
      : NextResponse.json({ error: saved.error }, { status: 409 });
  }

  if (body.type === "block" || body.type === "quick") {
    const minutes =
      body.type === "block"
        ? [30, 45, 60, 75, 90].includes(Number(body.minutes))
          ? Number(body.minutes)
          : 30
        : (getService(body.serviceId ?? "") ?? chairServices[0]).minutes;

    const saved = await updateStore((store) => {
      const start =
        isClockTime(body.start ?? "")
          ? body.start!
          : nextFreeStart({
              isoDate: date,
              minutes,
              bookings: store.bookings,
              closedDates: store.closedDates,
              ignoreNotice: true,
            });
      if (!start) return { error: "No free time left that day." };
      const fit = canFitService({
        isoDate: date,
        start,
        minutes,
        bookings: store.bookings,
        closedDates: [],
        ignoreNotice: true,
        ignoreClosed: true,
      });
      if (!fit.ok) return { error: fit.reason };

      if (body.type === "block") {
        return {
          ...store,
          bookings: [
            ...store.bookings,
            createBooking({
              date,
              start,
              service: {
                id: "blocked",
                name: body.notes?.trim() || "Busy",
                price: "",
                minutes,
                group: "Blocked",
              },
              name: "Yusuf",
              phone: "",
              notes: body.notes,
              source: "yusuf",
              status: "blocked",
            }),
          ],
        };
      }

      const service = getService(body.serviceId ?? "hair-cut") ?? chairServices[0];
      return {
        ...store,
        bookings: [
          ...store.bookings,
          createBooking({
            date,
            start,
            service,
            name: normalizeName(body.name ?? "") || "Walk-in",
            phone: body.phone?.trim() ? normalizePhone(body.phone) : "",
            notes: body.notes,
            source: "yusuf",
          }),
        ],
      };
    });
    return saved.ok
      ? NextResponse.json({ ok: true, store: saved.kind })
      : NextResponse.json({ error: saved.error }, { status: 409 });
  }

  const start = body.start ?? "";
  if (!isClockTime(start)) {
    return NextResponse.json({ error: "Pick a start time." }, { status: 400 });
  }

  const service = getService(body.serviceId ?? "hair-cut") ?? chairServices[0];
  const name = normalizeName(body.name ?? "") || "Walk-in";
  const phone = body.phone?.trim() ? normalizePhone(body.phone) : "";
  if (body.phone?.trim() && !phone) {
    return NextResponse.json({ error: "Use a UK mobile, or leave the number blank." }, { status: 400 });
  }

  const saved = await updateStore((store) => {
    const fit = canFitService({
      isoDate: date,
      start,
      minutes: service.minutes,
      bookings: store.bookings,
      closedDates: store.closedDates,
      ignoreNotice: true,
      ignoreClosed: true,
    });
    if (!fit.ok) return { error: fit.reason };
    return {
      ...store,
      bookings: [
        ...store.bookings,
        createBooking({
          date,
          start,
          service,
          name,
          phone,
          notes: body.notes,
          source: "yusuf",
        }),
      ],
    };
  });

  return saved.ok
    ? NextResponse.json({ ok: true, store: saved.kind })
    : NextResponse.json({ error: saved.error }, { status: 409 });
}

export async function PATCH(request: Request) {
  const denied = await requireChair();
  if (denied) return denied;

  let body: { id?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the change as JSON." }, { status: 400 });
  }

  if (!body.id || (body.status !== "cancelled" && body.status !== "done")) {
    return NextResponse.json({ error: "Say which booking to update." }, { status: 400 });
  }

  const bookingId = body.id;
  const nextStatus = body.status;

  const saved = await updateStore((store) => {
    const index = store.bookings.findIndex((booking) => booking.id === bookingId);
    if (index === -1) return { error: "That booking is not in the book." };
    const bookings = store.bookings.slice();
    bookings[index] = { ...bookings[index]!, status: nextStatus };
    return { ...store, bookings };
  });

  return saved.ok
    ? NextResponse.json({ ok: true, store: saved.kind })
    : NextResponse.json({ error: saved.error }, { status: 409 });
}
