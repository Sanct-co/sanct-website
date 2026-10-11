export const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#industries", label: "Industries" },
  { href: "/#clients", label: "Testimonials" },
  { href: "/about", label: "Company" },
] as const;

export const company = [
  {
    id: "about",
    name: "About",
    href: "/about",
    offerings: [
      {
        name: "About Us",
        href: "/about",
        linkCue: true,
        description:
          "Who we are, why we build, and the people behind software that strips away complexity.",
        idealFor: "Anyone meeting Sanct for the first time.",
      },
      {
        name: "Mission",
        href: "/about#mission",
        description: "Give people mental space to focus on what truly matters.",
        idealFor: "Anyone who wants the reason Sanct builds software.",
      },
      {
        name: "Story",
        href: "/about#story",
        description:
          "We started Sanct so technology would remove obstacles, not create them. Today we work with clients across the Philippines and the US.",
        idealFor: "Teams who want to know where Sanct comes from and who we build for.",
      },
      {
        name: "Philosophy",
        href: "/about#philosophy",
        description:
          "Build technology with excellence. Use it with wisdom. And never lose sight of the people it serves.",
        idealFor:
          "People who want the virtues behind the work: Areté, Dignity, and Phrónēsis.",
      },
      {
        name: "Team",
        href: "/about#team",
        description: "A team of A+ players, obsessed with craft and committed to excellence.",
        idealFor: "Anyone who wants to meet the people behind Sanct.",
      },
    ],
  },
  {
    id: "careers",
    name: "Careers",
    href: "/#contact",
    offerings: [
      {
        name: "Join Us",
        href: "/#contact",
        linkCue: true,
        description:
          "For new talent and seasoned professionals alike: build on your strengths, chase your ambitions, and grow into who you want to become.",
        idealFor: "People who care about craft and want to build software with Sanct.",
      },
    ],
  },
] as const;

export const contact = {
  phone: "+63 968 4670926",
  phoneHref: "tel:+639684670926",
  email: "noreply@sanct.ph",
  facebook: "https://www.facebook.com/profile.php?id=61589366583515",
  address: "FRJ2+R7F Oroquieta City, Misamis Occidental",
  addressHref:
    "https://www.google.com/maps/search/?api=1&query=FRJ2%2BR7F+Oroquieta+City%2C+Misamis+Occidental",
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
