"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Mobile browsers resize the viewport when the address bar shows or hides.
// Refreshing ScrollTrigger on that change snaps the page back to the top.
ScrollTrigger.config({ ignoreMobileResize: true });

export const EASE_OUT = "power3.out";

export { gsap, ScrollTrigger, useGSAP };
