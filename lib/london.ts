const TIME_ZONE = "Europe/London";

const DAY_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export function toMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export function fromMinutes(total: number) {
  const hours = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (total % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function londonParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const read = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    weekday: read("weekday"),
    year: read("year"),
    month: read("month"),
    day: read("day"),
    hour: Number(read("hour") || "0"),
    minute: Number(read("minute") || "0"),
  };
}

export function londonNow() {
  const parts = londonParts();
  return {
    weekday: parts.weekday,
    minutes: parts.hour * 60 + parts.minute,
    isoDate: `${parts.year}-${parts.month}-${parts.day}`,
  };
}

export function weekdayFromIsoDate(isoDate: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "long",
  }).formatToParts(new Date(`${isoDate}T12:00:00Z`));
  return parts.find((part) => part.type === "weekday")?.value ?? "Monday";
}

export function addDaysToIsoDate(isoDate: string, days: number) {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function listIsoDates(fromIso: string, count: number) {
  return Array.from({ length: count }, (_, index) =>
    addDaysToIsoDate(fromIso, index),
  );
}

export function dayIndex(weekday: string) {
  return DAY_INDEX[weekday] ?? 1;
}

export function formatLondonDay(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${isoDate}T12:00:00Z`));
}

export function formatLondonLongDay(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${isoDate}T12:00:00Z`));
}
