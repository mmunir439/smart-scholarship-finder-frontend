import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request) {
  const token = request.cookies.get("token")?.value;

  console.log("TOKEN:", token);

  if (!token) {
    console.log("NO TOKEN");

    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (err) {
    console.log("INVALID TOKEN");

    const response = NextResponse.redirect(new URL("/login", request.url));

    response.cookies.delete("token");

    return response;
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*"],
};
