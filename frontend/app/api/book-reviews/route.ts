import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL;

export async function GET() {
  try {
    const res = await fetch(`${STRAPI_URL}/book-reviews?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch from Strapi" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
}