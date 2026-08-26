import assert from "node:assert/strict";
import test from "node:test";
import {
  BOOKING_LOOKBACK_DAYS,
  activeBookings,
  bookingOccupies,
  buildDayBoard,
  buildPublicDays,
  canFitService,
  createBooking,
  emptyBookingStore,
  formatPounds,
  getService,
  moneyFor,
  normalizePhone,
  occupyPublicDays,
  pricePence,
  publicDayMeta,
  rangesOverlap,
  shopHoursForDate,
  slotTimes,
  slotsNeeded,
} from "./booking";

test("a 20-minute cut fits one slot and a wash needs two", () => {
  assert.equal(slotsNeeded(20), 1);
  assert.equal(slotsNeeded(30), 1);
  assert.equal(slotsNeeded(40), 2);
  assert.equal(slotsNeeded(75), 3);
});

test("shop is closed Mondays and open Saturday until 18:00", () => {
  const monday = shopHoursForDate("2026-08-24");
  const saturday = shopHoursForDate("2026-08-22");
  assert.equal(monday.open, null);
  assert.equal(saturday.open, "09:30");
  assert.equal(saturday.close, "18:00");
});

test("slot grid starts at opening time", () => {
  const times = slotTimes("09:30", "11:00");
  assert.deepEqual(times, ["09:30", "10:00", "10:30"]);
});

test("ranges overlap when they share time", () => {
  assert.equal(rangesOverlap(570, 600, 590, 620), true);
  assert.equal(rangesOverlap(570, 600, 600, 630), false);
});

test("a fade cannot start on a taken 20-minute cut", () => {
  const service = getService("skin-fade-with-zero-clipper-fade");
  assert.ok(service);
  assert.equal(service.minutes, 30);
  assert.equal(getService("hair-cut")?.minutes, 20);
  const existing = createBooking({
    date: "2026-09-15",
    start: "10:00",
    service: getService("hair-cut")!,
    name: "Sam",
    phone: "+447900000000",
    source: "yusuf",
  });
  const clash = canFitService({
    isoDate: "2026-09-15",
    start: "10:00",
    minutes: service.minutes,
    bookings: [existing],
    closedDates: [],
  });
  assert.equal(clash.ok, false);

  const free = canFitService({
    isoDate: "2026-09-15",
    start: "10:30",
    minutes: service.minutes,
    bookings: [existing],
    closedDates: [],
  });
  assert.equal(free.ok, true);
  if (free.ok) assert.equal(free.end, "11:00");
});

test("closed dates hide every slot", () => {
  const store = emptyBookingStore();
  store.closedDates.push("2026-08-25");
  const days = buildPublicDays(store, "2026-08-25", 1, 30);
  assert.equal(days[0]?.closed, true);
  assert.equal(days[0]?.slots.length, 0);
});

test("cancelled bookings do not hold a chair", () => {
  const booking = createBooking({
    date: "2026-08-25",
    start: "10:00",
    service: getService("hair-cut")!,
    name: "Sam",
    phone: "+447900000000",
    source: "online",
  });
  booking.status = "cancelled";
  assert.equal(activeBookings([booking]).length, 0);
  assert.equal(bookingOccupies(booking, "10:00", "10:30"), true);
});

test("UK mobile numbers normalise to +44", () => {
  assert.equal(normalizePhone("07902 852085"), "+447902852085");
  assert.equal(normalizePhone("+44 7902 852085"), "+447902852085");
  assert.equal(normalizePhone("01202 123456"), "");
});

test("taken times disappear from the public calendar immediately", () => {
  const store = emptyBookingStore();
  const days = buildPublicDays(store, "2026-09-15", 1, 30);
  assert.ok(days[0]);
  const occupied = occupyPublicDays(days, "2026-09-15", "11:00", 45);
  const eleven = occupied[0]?.slots.find((slot) => slot.start === "11:00");
  const elevenThirty = occupied[0]?.slots.find((slot) => slot.start === "11:30");
  const twelve = occupied[0]?.slots.find((slot) => slot.start === "12:00");
  assert.equal(eleven?.available, false);
  assert.equal(elevenThirty?.available, false);
  assert.equal(twelve?.available, true);
  assert.equal(eleven?.kind, "taken");
});

test("an empty Saturday is clear, not booked", () => {
  const store = emptyBookingStore();
  const days = buildPublicDays(store, "2026-08-22", 2, 30);
  const saturday = days.find((day) => day.date === "2026-08-22");
  const sunday = days.find((day) => day.date === "2026-08-23");
  assert.ok(saturday);
  assert.ok(sunday);
  assert.equal(publicDayMeta(saturday), "All free");
  assert.equal(publicDayMeta(sunday), "All free");
  assert.ok(saturday.slots.every((slot) => slot.kind !== "taken"));
  assert.ok(sunday.slots.every((slot) => slot.kind !== "taken"));
});

test("a booked Sunday shows how many seats are taken", () => {
  const store = emptyBookingStore();
  store.bookings.push(
    createBooking({
      date: "2026-12-27",
      start: "11:00",
      service: getService("hair-cut")!,
      name: "Sam",
      phone: "+447900000000",
      source: "online",
    }),
  );
  const days = buildPublicDays(store, "2026-12-27", 1, 30);
  const sunday = days[0];
  assert.ok(sunday);
  assert.equal(publicDayMeta(sunday), "1 booked");
  assert.equal(sunday.slots.find((slot) => slot.start === "11:00")?.kind, "taken");
});

test("money totals ignore blocked and cancelled chairs", () => {
  const cut = createBooking({
    date: "2026-08-25",
    start: "11:00",
    service: getService("hair-cut")!,
    name: "Sam",
    phone: "+447900000000",
    source: "online",
  });
  const cancelled = { ...cut, id: "2", status: "cancelled" as const, start: "12:00" };
  assert.equal(pricePence("£16"), 1600);
  assert.equal(formatPounds(1600), "£16");
  assert.equal(moneyFor([cut, cancelled], "2026-08-25"), 1600);
});

test("day board marks continuation slots for a wash and cut", () => {
  const wash = createBooking({
    date: "2026-08-25",
    start: "11:00",
    service: getService("hair-cut-and-wash")!,
    name: "Sam",
    phone: "+447900000000",
    source: "yusuf",
  });
  const board = buildDayBoard("2026-08-25", [wash]);
  const start = board.find((cell) => cell.start === "11:00");
  const next = board.find((cell) => cell.start === "11:30");
  assert.equal(start?.booking?.customerName, "Sam");
  assert.equal(start?.continuation, false);
  assert.equal(next?.continuation, true);
});

test("the diary keeps four weeks of history", () => {
  assert.equal(BOOKING_LOOKBACK_DAYS, 28);
});

test("the diary opens even when remote storage is missing", async () => {
  const { loadStore } = await import("./booking-store");
  const store = await loadStore();
  assert.ok(Array.isArray(store.data.bookings));
  assert.ok(Array.isArray(store.data.closedDates));
});
