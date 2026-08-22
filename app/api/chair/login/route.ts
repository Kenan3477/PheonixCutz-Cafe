import { NextResponse } from "next/server";
import {
  allowLoginAttempt,
  chairCookieName,
  chairCookieOptions,
  clientIp,
  createChairSession,
  recordLoginAttempt,
  verifyChairPassword,
} from "@/lib/booking-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!allowLoginAttempt(ip)) {
    return NextResponse.json(
      { error: "Too many tries. Wait ten minutes." },
      { status: 429 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "Send the password as JSON." }, { status: 400 });
  }

  const ok = verifyChairPassword(password);
  recordLoginAttempt(ip, ok);
  if (!ok) {
    return NextResponse.json({ error: "That password is not right." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(chairCookieName(), createChairSession(), await chairCookieOptions());
  return response;
}
