import { TokenType } from "@prisma/client";
import { randomBytes } from "crypto";
import { prisma } from "./db";

export async function getTokenByEmail(email: string) {
  try {
    const token = await prisma.token.findFirst({
      where: {
        email,
      },
    });

    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getToken() {
  const arrayBuffer = new Uint8Array(48);
  crypto.getRandomValues(arrayBuffer);
  return Array.from(arrayBuffer, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

export async function generateToken(email: string, type: TokenType) {
  const token = getToken();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const exisitingToken = await getTokenByEmail(email);

  if (exisitingToken) {
    await prisma.token.delete({
      where: {
        id: exisitingToken.id,
      },
    });
  }

  const createdToken = await prisma.token.create({
    data: {
      email,
      token,
      type,
      expires,
    },
  });

  return createdToken;
}
