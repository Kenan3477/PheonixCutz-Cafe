import { NextResponse } from "next/server";
import {
  BOOKING_HORIZON_DAYS,
  buildPublicDays,
  chairServices,
  getService,
  nextAvailableSlot,
} from "@/lib/booking";
import { loadStore } from "@/lib/booking-store";
import { londonNow } from "@/lib/london";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const service = getService(url.searchParams.get("service") ?? "") ??
    getService("hair-cut") ??
    chairServices[0];

  try {
    const { data, kind } = await loadStore();
    const days = buildPublicDays(
      data,
      londonNow().isoDate,
      BOOKING_HORIZON_DAYS,
      service.minutes,
    );
    return NextResponse.json({
      services: chairServices,
      serviceId: service.id,
      days,
      next: nextAvailableSlot(data, service.minutes),
      store: kind,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not load the chair diary.",
      },
      { status: 500 },
    );
  }
}
