"use server";

import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generateToken } from "@/lib/token";
import { TokenType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const exisitingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!exisitingUser) {
      return { status: "error", error: "User does not exist" };
    }

    const token = await generateToken(email, TokenType.PASSWORD_RESET);

    await sendPasswordResetEmail(token.email, token.token);

    return NextResponse.json({ status: "success", data: "Email sent" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
