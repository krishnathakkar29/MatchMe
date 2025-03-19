"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function sendVerificationEmail(email: string, token: string) {
  const link = `${baseUrl}/auth/verify-email?token=${token}`;

  console.log(email, token);
  console.log("hello \n");
  const { data, error } = await resend.emails.send({
    from: "testing@resend.dev",
    to: email,
    subject: "Verify your email address",
    html: `
        <h1>Verify your email address</h1>
        <p>Click the link below to verify your email address</p>
        <a href="${link}">Verify email</a>
    `,
  });

  console.log("data in resend", data);
  console.log("error in resend", error);

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json(data);
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const link = `${baseUrl}/auth/reset-password?token=${token}`;

  return resend.emails.send({
    from: "testing@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
          <h1>You have requested to reset your password</h1>
          <p>Click the link below to reset password</p>
          <a href="${link}">Reset password</a>
      `,
  });
}
