"use server";

import { EMAIL_FROM, EMAIL_TO, resend } from "@/lib/email";
import { services } from "@/lib/services";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

const serviceOptionIds = [...services.map((s) => s.id), "other"] as const;
export type ServiceOptionId = (typeof serviceOptionIds)[number];

function serviceLabel(id: string): string {
  if (id === "other") return "Other";
  return services.find((s) => s.id === id)?.name ?? id;
}

function serviceLabels(ids: string[]): string {
  return ids.map(serviceLabel).join(", ");
}

const budgetLabels: Record<string, string> = {
  "100k-250k": "$100K – $250K",
  "250k-500k": "$250K – $500K",
  "500k-1m": "$500K – $1M",
  "1m-plus": "$1M+",
};

function budgetLabel(id: string, details: string): string {
  if (id === "custom") return details || "Custom";
  return budgetLabels[id] ?? id;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendContactEmails(params: {
  submitterName: string;
  submitterEmail: string;
  subject: string;
  notificationHtml: string;
}): Promise<boolean> {
  try {
    const notification = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: params.submitterEmail,
      subject: params.subject,
      html: params.notificationHtml,
    });

    if (notification.error) {
      return false;
    }

    // Auto-reply is best-effort: e.g. it 403s on Resend's sandbox `resend.dev`
    // sender until a real domain is verified, since that domain can only send
    // to the account's own address. Don't fail the submission over it.
    resend.emails
      .send({
        from: EMAIL_FROM,
        to: params.submitterEmail,
        subject: "We received your message",
        html: `
          <p>Hi ${params.submitterName},</p>
          <p>Thanks for reaching out. We'll get back to you within one business day.</p>
        `,
      })
      .catch(() => {});

    return true;
  } catch {
    return false;
  }
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const service = formData.getAll("service") as string[];
  const budget = (formData.get("budget") as string)?.trim();
  const budgetDetails = (formData.get("budgetDetails") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!email || !validateEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (
    service.length === 0 ||
    !service.every((id) => serviceOptionIds.includes(id as ServiceOptionId))
  ) {
    errors.service = "Please select at least one service.";
  }
  if (!message || message.length < 10) {
    errors.message = "Please enter a message (at least 10 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below.", errors };
  }

  const sent = await sendContactEmails({
    submitterName: name,
    submitterEmail: email,
    subject: `New ${serviceLabels(service)} inquiry from ${name}`,
    notificationHtml: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "—"}</p>
      <p><strong>Service:</strong> ${serviceLabels(service)}</p>
      <p><strong>Budget:</strong> ${budget ? budgetLabel(budget, budgetDetails) : "—"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  if (!sent) {
    return {
      success: false,
      message: "Something went wrong. Please try again or call us directly.",
    };
  }

  return {
    success: true,
    message: "Thanks for reaching out. We'll get back to you within one business day.",
  };
}

export async function submitHomeContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const service = formData.getAll("service") as string[];
  const budget = (formData.get("budget") as string)?.trim();
  const budgetDetails = (formData.get("budgetDetails") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!email || !validateEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (
    service.length === 0 ||
    !service.every((id) => serviceOptionIds.includes(id as ServiceOptionId))
  ) {
    errors.service = "Please select at least one service.";
  }
  if (!message || message.length < 10) {
    errors.message = "Please enter a message (at least 10 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below.", errors };
  }

  const sent = await sendContactEmails({
    submitterName: name,
    submitterEmail: email,
    subject: `New ${serviceLabels(service)} inquiry from ${name} (homepage)`,
    notificationHtml: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "—"}</p>
      <p><strong>Service:</strong> ${serviceLabels(service)}</p>
      <p><strong>Budget:</strong> ${budget ? budgetLabel(budget, budgetDetails) : "—"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  if (!sent) {
    return {
      success: false,
      message: "Something went wrong. Please try again or call us directly.",
    };
  }

  return {
    success: true,
    message: "Thanks for reaching out. We'll get back to you within one business day.",
  };
}
