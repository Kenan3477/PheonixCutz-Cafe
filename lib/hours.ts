import { site } from "./site";

const DAY_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function londonNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Monday";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  return { weekday, minutes: hour * 60 + minute };
}

function toMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export function getOpenState() {
  const { weekday, minutes } = londonNow();
  const today = site.hours.find((row) => row.day === weekday) ?? site.hours[0];
  const tomorrow =
    site.hours.find((row) => DAY_INDEX[row.day] === (DAY_INDEX[weekday] + 1) % 7) ??
    site.hours[0];

  if (!today.open || !today.close) {
    return {
      open: false,
      label: "Closed today",
      detail: tomorrow.open
        ? `Back ${tomorrow.day} ${tomorrow.open}`
        : "See hours below",
    };
  }

  const opens = toMinutes(today.open);
  const closes = toMinutes(today.close);

  if (minutes < opens) {
    return {
      open: false,
      label: "Closed",
      detail: `Opens ${today.open} today`,
    };
  }

  if (minutes >= closes) {
    return {
      open: false,
      label: "Closed",
      detail: tomorrow.open
        ? `Back ${tomorrow.day} ${tomorrow.open}`
        : "See hours below",
    };
  }

  const remaining = closes - minutes;
  return {
    open: true,
    label: "Open now",
    detail:
      remaining <= 60
        ? `Kitchen and chair until ${today.close}`
        : `Until ${today.close} today`,
  };
}
