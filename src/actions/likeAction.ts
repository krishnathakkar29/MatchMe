"use server";

import { prisma } from "@/lib/db";
import { getAuthUserId } from "./authAction";
import { auth } from "@/auth";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
  try {
    const session = await auth();
    if (!session?.user) return null;

    // Get the source member
    const sourceMember = await prisma.member.findUnique({
      where: { userId: session.user.id },
    });

    // Get the target member
    const targetMember = await prisma.member.findUnique({
      where: { userId: targetUserId },
    });

    if (!sourceMember || !targetMember) {
      throw new Error("Member not found");
    }

    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: sourceMember.userId,
            targetUserId: targetMember.userId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: sourceMember.userId,
          targetUserId: targetMember.userId,
        },
      });
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Like action error:", error.message);
      return { success: false, error: error.message };
    }
    console.error("Unknown error:", error);
    return { success: false, error: "Failed to process like action" };
  }
}

export async function fetchCurrentUserLikeIds() {
  try {
    const userId = await getAuthUserId();

    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });

    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchLikedMembers(type = "source") {
  try {
    const userId = await getAuthUserId();

    switch (type) {
      case "source":
        return await fetchSourceLikes(userId);
      case "target":
        return await fetchTargetLikes(userId);
      case "mutual":
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchSourceLikes(userId: string) {
  const sourceList = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetMember: true },
  });
  return sourceList.map((x) => x.targetMember);
}

async function fetchTargetLikes(userId: string) {
  const targetList = await prisma.like.findMany({
    where: { targetUserId: userId },
    select: { sourceMember: true },
  });
  return targetList.map((x) => x.sourceMember);
}

async function fetchMutualLikes(userId: string) {
  const likedUsers = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });
  const likedIds = likedUsers.map((x) => x.targetUserId);

  const mutualList = await prisma.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: { sourceMember: true },
  });
  return mutualList.map((x) => x.sourceMember);
}
