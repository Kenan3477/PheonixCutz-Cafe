export type ChairService = {
  id: string;
  name: string;
  price: string;
  minutes: number;
  group: string;
};

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
  status: "booked" | "blocked" | "done" | "cancelled";
  source: "online" | "yusuf";
};

export type Availability = {
  services: ChairService[];
  days: PublicDay[];
  next: { date: string; weekday: string; start: string } | null;
  error?: string;
};

export type DeskPayload = {
  bookings: Booking[];
  closedDates: string[];
  services: ChairService[];
  store: string;
  storeLabel: string;
  today: string;
  error?: string;
};
