import { NextResponse } from "next/server";
import { isChairSignedIn } from "@/lib/booking-auth";
import { loadStore, storeLabel } from "@/lib/booking-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await isChairSignedIn(request))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { kind } = await loadStore();
  return NextResponse.json({ ok: true, store: kind, storeLabel: storeLabel(kind) });
}
