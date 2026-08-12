import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getLandingVariant } from "@/lib/posthog-server";

export const dynamic = "force-dynamic";

const AB_TEST_COOKIE_NAME = "home_ab_variant";
const VISITOR_ID_COOKIE_NAME = "visitor_id";

const chooseVariant = (): "v1" | "v2" => (Math.random() < 0.5 ? "v1" : "v2");

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const existingVariant = cookieStore.get(AB_TEST_COOKIE_NAME)?.value as
    | "v1"
    | "v2"
    | undefined;
  const visitorId = cookieStore.get(VISITOR_ID_COOKIE_NAME)?.value || randomUUID();

  const variant =
    existingVariant ||
    (await getLandingVariant(visitorId, chooseVariant()));

  if (!existingVariant) {
    cookieStore.set(AB_TEST_COOKIE_NAME, variant, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  cookieStore.set(VISITOR_ID_COOKIE_NAME, visitorId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  const redirectUrl = variant === "v2" ? "/v2" : "/v1";
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
