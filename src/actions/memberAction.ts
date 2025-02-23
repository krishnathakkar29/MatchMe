"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Photo } from "@prisma/client";

export async function getMemberList() {
  const session = await auth();

  if (!session?.user) return null;
  try {
    return await prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    return prisma.member.findUnique({ where: { userId } });
  } catch (error) {
    console.log(error);
  }
}

export async function getMemberPhotosByUserId(userId: string) {
  const member = await prisma.member.findUnique({
    where: { userId },
    select: { photos: true },
  });

  if (!member) return null;

  return member.photos.map((p) => p) as Photo[];
}
