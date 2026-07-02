"use server";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

const inquiryTypes = ["New project", "General inquiry", "Partnership"] as const;
export type InquiryType = (typeof inquiryTypes)[number];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const inquiry = formData.get("inquiry") as string;
  const message = (formData.get("message") as string)?.trim();

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!email || !validateEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!inquiry || !inquiryTypes.includes(inquiry as InquiryType)) {
    errors.inquiry = "Please select an inquiry type.";
  }
  if (!message || message.length < 10) {
    errors.message = "Please enter a message (at least 10 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below.", errors };
  }

  const payload = { name, email, company, inquiry, message };

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        return {
          success: false,
          message: "Something went wrong. Please try again or call us directly.",
        };
      }
    } catch {
      return {
        success: false,
        message: "Something went wrong. Please try again or call us directly.",
      };
    }
  }

  return {
    success: true,
    message: "Thanks for reaching out. We'll get back to you within one business day.",
  };
}
