"use server";

import { prisma } from "@/lib/db";
import { getAuthUserId } from "./authAction";
import { Photo } from "@prisma/client";

export async function getMemberList() {
  try {
    const userId = await getAuthUserId();

    const members = await prisma.member.findMany({
      where: {
        NOT: {
          userId,
        },
      },
      orderBy: {
        created: "desc",
      },
    });

    return {
      items: members,
      totalCount: members.length,
    };
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
