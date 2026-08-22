import { chair, site } from "./site";
import {
  fromMinutes,
  listIsoDates,
  londonNow,
  toMinutes,
  weekdayFromIsoDate,
} from "./london";

export const SLOT_MINUTES = 30;
export const BOOKING_HORIZON_DAYS = 56;
export const MIN_NOTICE_MINUTES = 20;

const SERVICE_MINUTES: Record<string, number> = {
  "Hair cut": 30,
  "Hair cut & wash": 45,
  "Clipper cut": 30,
  "Skin fade with zero clipper fade": 45,
  "Kids haircut": 30,
  "Kids skin fade with clipper zero fade": 45,
  "OAP haircut": 30,
  "Razor head shave": 30,
  "Turkish wet shave": 30,
  "Design wet shave": 30,
  "Beard trim with clipper": 30,
  "Beard trim line-up with clipper": 30,
  "Nose wax or ear wax": 15,
  "Face mask, mud & hot towel wash": 30,
  "Eyebrow threading": 15,
  "Phoenix Special hair cut": 75,
  "Phoenix restyle skin fade": 60,
};

export type BookingStatus = "booked" | "blocked" | "done" | "cancelled";
export type BookingSource = "online" | "yusuf";

export type Booking = {
  id: string;
  date: string;
  start: string;
  end: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  status: BookingStatus;
  source: BookingSource;
  createdAt: string;
};

export type ChairService = {
  id: string;
  name: string;
  price: string;
  minutes: number;
  group: string;
};

export type QuickChairAction =
  | {
      kind: "book";
      serviceId: string;
      label: string;
      hint: string;
    }
  | {
      kind: "block";
      minutes: number;
      label: string;
      hint: string;
    };

export const quickChairActions: QuickChairAction[] = [
  { kind: "book", serviceId: "hair-cut", label: "Cut", hint: "30 min · £14" },
  {
    kind: "book",
    serviceId: "skin-fade-with-zero-clipper-fade",
    label: "Fade",
    hint: "45 min · £17",
  },
  {
    kind: "book",
    serviceId: "hair-cut-and-wash",
    label: "Wash",
    hint: "45 min · £18",
  },
  {
    kind: "book",
    serviceId: "turkish-wet-shave",
    label: "Shave",
    hint: "30 min · £12",
  },
  { kind: "book", serviceId: "kids-haircut", label: "Kids", hint: "30 min · £9" },
  {
    kind: "book",
    serviceId: "phoenix-special-hair-cut",
    label: "Special",
    hint: "75 min · £37",
  },
  { kind: "block", minutes: 30, label: "Busy 30", hint: "Hold the chair" },
  { kind: "block", minutes: 45, label: "Busy 45", hint: "Longer hold" },
];

export type PublicSlot = {
  start: string;
  end: string;
  available: boolean;
  kind: "open" | "past" | "taken";
};

export type PublicDay = {
  date: string;
  weekday: string;
  closed: boolean;
  slots: PublicSlot[];
};

export type BookingStoreData = {
  version: number;
  bookings: Booking[];
  closedDates: string[];
};

export function emptyBookingStore(): BookingStoreData {
  return { version: 1, bookings: [], closedDates: [] };
}

export function serviceIdFromName(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const chairServices: ChairService[] = chair.groups.flatMap((group) =>
  group.items.map((item) => ({
    id: serviceIdFromName(item.name),
    name: item.name,
    price: item.price,
    minutes: SERVICE_MINUTES[item.name] ?? 30,
    group: group.title,
  })),
);

export function getService(id: string) {
  return chairServices.find((service) => service.id === id) ?? null;
}

export function shopHoursForDate(isoDate: string) {
  const weekday = weekdayFromIsoDate(isoDate);
  const row = site.hours.find((item) => item.day === weekday);
  if (!row?.open || !row.close) {
    return { weekday, open: null, close: null };
  }
  return { weekday, open: row.open, close: row.close };
}

export function activeBookings(bookings: Booking[], isoDate?: string) {
  return bookings.filter(
    (booking) =>
      booking.status !== "cancelled" &&
      (isoDate ? booking.date === isoDate : true),
  );
}

export function rangesOverlap(
  startA: number,
  endA: number,
  startB: number,
  endB: number,
) {
  return startA < endB && startB < endA;
}

export function bookingOccupies(
  booking: Booking,
  start: string,
  end: string,
) {
  return rangesOverlap(
    toMinutes(booking.start),
    toMinutes(booking.end),
    toMinutes(start),
    toMinutes(end),
  );
}

export function slotTimes(open: string, close: string) {
  const times: string[] = [];
  for (
    let minutes = toMinutes(open);
    minutes < toMinutes(close);
    minutes += SLOT_MINUTES
  ) {
    times.push(fromMinutes(minutes));
  }
  return times;
}

export function slotEnd(start: string, minutes: number) {
  return fromMinutes(toMinutes(start) + minutes);
}

export function slotsNeeded(minutes: number) {
  return Math.max(1, Math.ceil(minutes / SLOT_MINUTES));
}

function slotIsInPast(isoDate: string, start: string) {
  const now = londonNow();
  if (isoDate < now.isoDate) return true;
  if (isoDate > now.isoDate) return false;
  return toMinutes(start) < now.minutes + MIN_NOTICE_MINUTES;
}

export function canFitService(options: {
  isoDate: string;
  start: string;
  minutes: number;
  bookings: Booking[];
  closedDates: string[];
  ignoreId?: string;
  ignoreNotice?: boolean;
  ignoreClosed?: boolean;
}) {
  const hours = shopHoursForDate(options.isoDate);
  if (!hours.open || !hours.close) {
    return { ok: false as const, reason: "The chair is closed that day." };
  }
  if (!options.ignoreClosed && options.closedDates.includes(options.isoDate)) {
    return { ok: false as const, reason: "Yusuf has closed the book that day." };
  }

  const start = toMinutes(options.start);
  const end = start + options.minutes;
  if (start < toMinutes(hours.open) || end > toMinutes(hours.close)) {
    return {
      ok: false as const,
      reason: "That time runs past closing.",
    };
  }
  if ((start - toMinutes(hours.open)) % SLOT_MINUTES !== 0) {
    return { ok: false as const, reason: "Pick a listed time." };
  }
  if (!options.ignoreNotice && slotIsInPast(options.isoDate, options.start)) {
    return { ok: false as const, reason: "That time has already gone." };
  }

  const clash = activeBookings(options.bookings, options.isoDate).find(
    (booking) =>
      booking.id !== options.ignoreId &&
      bookingOccupies(
        booking,
        options.start,
        fromMinutes(end),
      ),
  );
  if (clash) {
    return { ok: false as const, reason: "That time is already taken." };
  }

  return {
    ok: true as const,
    end: fromMinutes(end),
    weekday: hours.weekday,
  };
}

export function buildPublicDays(
  store: BookingStoreData,
  fromIso = londonNow().isoDate,
  dayCount = BOOKING_HORIZON_DAYS,
  serviceMinutes = 30,
) {
  return listIsoDates(fromIso, dayCount).map((date) => {
    const hours = shopHoursForDate(date);
    const closed = !hours.open || !hours.close || store.closedDates.includes(date);
    if (closed || !hours.open || !hours.close) {
      return {
        date,
        weekday: hours.weekday,
        closed: true,
        slots: [] as PublicSlot[],
      };
    }

    const slots = slotTimes(hours.open, hours.close).map((start) => {
      const end = slotEnd(start, serviceMinutes);
      const past = slotIsInPast(date, start);
      const clash = activeBookings(store.bookings, date).some((booking) =>
        bookingOccupies(booking, start, end),
      );
      const fit = canFitService({
        isoDate: date,
        start,
        minutes: serviceMinutes,
        bookings: store.bookings,
        closedDates: store.closedDates,
      });
      const kind = past ? "past" : clash ? "taken" : "open";
      return {
        start,
        end,
        available: fit.ok,
        kind,
      };
    });

    return {
      date,
      weekday: hours.weekday,
      closed: false,
      slots,
    };
  });
}

export function nextAvailableSlot(
  store: BookingStoreData,
  serviceMinutes = 30,
) {
  for (const day of buildPublicDays(store, londonNow().isoDate, BOOKING_HORIZON_DAYS, serviceMinutes)) {
    const slot = day.slots.find((item) => item.available);
    if (slot) {
      return { date: day.date, weekday: day.weekday, start: slot.start };
    }
  }
  return null;
}

export function normalizePhone(value: string) {
  const trimmed = value.trim();
  const compact = trimmed.replace(/[()\s-]/g, "");
  if (/^07\d{9}$/.test(compact)) {
    return `+44${compact.slice(1)}`;
  }
  if (/^\+447\d{9}$/.test(compact)) {
    return compact;
  }
  if (/^447\d{9}$/.test(compact)) {
    return `+${compact}`;
  }
  return "";
}

export function displayPhone(value: string) {
  if (value.startsWith("+44") && value.length === 13) {
    return `0${value.slice(3, 7)} ${value.slice(7, 10)} ${value.slice(10)}`;
  }
  return value;
}

export function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 40);
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const HH_MM = /^\d{2}:\d{2}$/;

export function isIsoDate(value: string) {
  return ISO_DATE.test(value);
}

export function isClockTime(value: string) {
  return HH_MM.test(value);
}

export function upcomingForPhone(bookings: Booking[], phone: string) {
  const today = londonNow().isoDate;
  return activeBookings(bookings).filter(
    (booking) =>
      booking.customerPhone === phone &&
      booking.status === "booked" &&
      booking.date >= today,
  );
}

export function createBooking(input: {
  date: string;
  start: string;
  service: ChairService;
  name: string;
  phone: string;
  notes?: string;
  source: BookingSource;
  status?: BookingStatus;
}): Booking {
  return {
    id: crypto.randomUUID(),
    date: input.date,
    start: input.start,
    end: slotEnd(input.start, input.service.minutes),
    serviceId: input.service.id,
    serviceName: input.service.name,
    customerName: input.name,
    customerPhone: input.phone,
    notes: (input.notes ?? "").trim().slice(0, 200),
    status: input.status ?? "booked",
    source: input.source,
    createdAt: new Date().toISOString(),
  };
}

export function publicBooking(booking: Booking) {
  return {
    id: booking.id,
    date: booking.date,
    start: booking.start,
    end: booking.end,
    serviceName: booking.serviceName,
    serviceId: booking.serviceId,
  };
}

export function pricePence(price: string) {
  const match = /£\s*(\d+(?:\.\d+)?)/.exec(price);
  return match ? Math.round(Number(match[1]) * 100) : 0;
}

export function formatPounds(pence: number) {
  const pounds = pence / 100;
  return Number.isInteger(pounds) ? `£${pounds}` : `£${pounds.toFixed(2)}`;
}

export function bookingPence(booking: Booking) {
  if (booking.status === "cancelled" || booking.status === "blocked") return 0;
  const service = getService(booking.serviceId);
  return service ? pricePence(service.price) : 0;
}

export function moneyFor(bookings: Booking[], isoDate?: string) {
  return bookings
    .filter((booking) => !isoDate || booking.date === isoDate)
    .reduce((sum, booking) => sum + bookingPence(booking), 0);
}

export function publicDayMeta(day: PublicDay) {
  if (day.closed) return "Closed";
  const taken = day.slots.filter((slot) => slot.kind === "taken").length;
  if (taken === 0) return "All free";
  return taken === 1 ? "1 booked" : `${taken} booked`;
}

export function occupyPublicDays(
  days: PublicDay[],
  date: string,
  start: string,
  minutes: number,
) {
  const from = toMinutes(start);
  const to = from + minutes;
  return days.map((day) => {
    if (day.date !== date) return day;
    return {
      ...day,
      slots: day.slots.map((slot) => {
        const slotStart = toMinutes(slot.start);
        const slotEndMinutes = toMinutes(slot.end);
        if (slotStart < to && slotEndMinutes > from) {
          return { ...slot, available: false, kind: "taken" as const };
        }
        return slot;
      }),
    };
  });
}

export function nextFreeStart(options: {
  isoDate: string;
  minutes: number;
  bookings: Booking[];
  closedDates: string[];
  ignoreNotice?: boolean;
}) {
  const hours = shopHoursForDate(options.isoDate);
  if (!hours.open || !hours.close) return null;
  for (const start of slotTimes(hours.open, hours.close)) {
    const fit = canFitService({
      isoDate: options.isoDate,
      start,
      minutes: options.minutes,
      bookings: options.bookings,
      closedDates: options.closedDates,
      ignoreNotice: options.ignoreNotice,
      ignoreClosed: true,
    });
    if (fit.ok) return start;
  }
  return null;
}

export type BoardCell = {
  start: string;
  end: string;
  booking: Booking | null;
  continuation: boolean;
};

export function buildDayBoard(isoDate: string, bookings: Booking[]): BoardCell[] {
  const hours = shopHoursForDate(isoDate);
  if (!hours.open || !hours.close) return [];
  const taken = activeBookings(bookings, isoDate);
  return slotTimes(hours.open, hours.close).map((start) => {
    const end = slotEnd(start, SLOT_MINUTES);
    const booking =
      taken.find((item) => bookingOccupies(item, start, end)) ?? null;
    return {
      start,
      end,
      booking,
      continuation: Boolean(booking && booking.start !== start),
    };
  });
}
