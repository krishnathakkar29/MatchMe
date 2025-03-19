"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail";
import { LoginSchema } from "@/lib/schemas/login";
import { combinedRegisterSchema, RegisterSchema } from "@/lib/schemas/register";
import { generateToken, getTokenByEmail } from "@/lib/token";
import { TokenType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function signInUser(data: LoginSchema) {
  try {
    const existingUser = await getUserByEmail(data.email);

    if (!existingUser || !existingUser.email)
      return { status: "error", error: "Invalid credentials" };

    if (!existingUser.emailVerified) {
      const { token, email } = await generateToken(
        existingUser.email,
        TokenType.VERIFICATION
      );

      await sendVerificationEmail(email, token);

      return {
        status: "error",
        error: "Please verify your email before logging in",
      };
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { status: "success", data: "Logged in" };
  } catch (error) {
    console.log("error hai yeh \n");
    console.log(error);
    console.log("\n \n \n");
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return { status: "error", error: "Something went wrong" };
      }
    } else {
      return { status: "error", error: "Something else went wrong" };
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}

export async function registerUser(data: RegisterSchema) {
  try {
    const validated = combinedRegisterSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const {
      name,
      email,
      password,
      gender,
      dateOfBirth,
      description,
      city,
      country,
    } = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return { status: "error", error: "User already exists" };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        member: {
          create: {
            name,
            gender,
            dateOfBirth: new Date(dateOfBirth),
            description,
            city,
            country,
          },
        },
      },
      include: {
        member: true,
      },
    });

    const verificationToken = await generateToken(
      email,
      TokenType.VERIFICATION
    );

    //send the emails
    await sendVerificationEmail(email, verificationToken.token);

    return { status: "success", data: user };
  } catch (error: any) {
    console.error(error.message);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getAuthUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  return userId;
}

export async function verifyEmail(token: string) {
  try {
    const existingToken = await prisma.token.findFirst({
      where: {
        token,
      },
    });

    if (!existingToken) {
      return { status: "error", error: "Invalid token" };
    }

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) {
      return { status: "error", error: "Token has expired" };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: existingToken.email,
      },
    });

    if (!existingUser) {
      return { status: "error", error: "User does not exist" };
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date() },
    });

    await prisma.token.delete({ where: { id: existingToken.id } });

    return { status: "success", data: "Success" };
  } catch (error: any) {
    console.error(error?.message);
    throw error;
  }
}

export async function generateResetPasswordEmail(email: string) {
  try {
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

    return { status: "success", data: "Email sent" };
  } catch (error) {
    console.error(error);

    return { status: "error", error: "Something went wrong" };
  }
}

export async function resetPassword(password: string, token: string | null) {
  try {
    if (!token) return { status: "error", error: "Missing token" };

    const existingToken = await prisma.token.findFirst({
      where: {
        token,
      },
    });
    if (!existingToken) {
      return { status: "error", error: "Invalid token" };
    }

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) {
      return { status: "error", error: "Token has expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { status: "error", error: "User not found" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { passwordHash: hashedPassword },
    });

    await prisma.token.delete({
      where: { id: existingToken.id },
    });

    return {
      status: "success",
      data: "Password updated successfully.  Please try logging in",
    };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}
