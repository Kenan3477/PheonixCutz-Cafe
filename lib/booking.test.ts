import assert from "node:assert/strict";
import test from "node:test";
import {
  activeBookings,
  bookingOccupies,
  buildPublicDays,
  canFitService,
  createBooking,
  emptyBookingStore,
  getService,
  normalizePhone,
  rangesOverlap,
  shopHoursForDate,
  slotTimes,
  slotsNeeded,
} from "./booking";

test("haircut needs one 30-minute slot and the special needs three", () => {
  assert.equal(slotsNeeded(30), 1);
  assert.equal(slotsNeeded(45), 2);
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

test("a 45-minute cut needs the next slot free", () => {
  const service = getService("skin-fade-with-zero-clipper-fade");
  assert.ok(service);
  const existing = createBooking({
    date: "2026-08-25",
    start: "10:00",
    service: getService("hair-cut")!,
    name: "Sam",
    phone: "+447900000000",
    source: "yusuf",
  });
  const clash = canFitService({
    isoDate: "2026-08-25",
    start: "09:30",
    minutes: service.minutes,
    bookings: [existing],
    closedDates: [],
  });
  assert.equal(clash.ok, false);

  const free = canFitService({
    isoDate: "2026-08-25",
    start: "11:00",
    minutes: service.minutes,
    bookings: [existing],
    closedDates: [],
  });
  assert.equal(free.ok, true);
  if (free.ok) assert.equal(free.end, "11:45");
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
