export const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#clients", label: "Clients" },
  { href: "/about", label: "About" },
] as const;

export const contact = {
  phone: "+63 968 4670926",
  phoneHref: "tel:+639684670926",
  email: "noreply@sanct.ph",
  facebook: "https://www.facebook.com/profile.php?id=61589366583515",
} as const;

export const socialLinks = [
  {
    label: "Facebook",
    href: contact.facebook,
    icon: "facebook",
  },
] as const;

export const site = {
  name: "Sanct",
  tagline: "Software that strips away complexity.",
} as const;
