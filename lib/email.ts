import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_FROM =
  process.env.CONTACT_FROM_EMAIL ?? "Sanct <onboarding@resend.dev>";
export const EMAIL_TO = process.env.CONTACT_TO_EMAIL ?? "hello@sanct.ph";
