"use client";

import Image from "next/image";
import type { EmblaOptionsType } from "embla-carousel";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import {
  Carousel,
  Slider,
  SliderContainer,
  ThumbsSlider,
} from "@/components/ui/thumbnail-slider-utils/carousel";

const PROOF_IMAGES = ["six.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "1.jpg"];

const OPTIONS: EmblaOptionsType = { loop: true };

export function ProofGallery() {
  return (
    <Section background="white">
      <Reveal>
        <div className="mx-auto max-w-3xl lg:max-w-4xl">
          <Carousel options={OPTIONS}>
            <SliderContainer className="gap-3">
              {PROOF_IMAGES.map((file) => (
                <Slider
                  key={file}
                  thumbnailSrc={`/proofpic/${file}`}
                  className="relative aspect-4/3 overflow-hidden rounded-card border border-border-dark/10 shadow-lg sm:aspect-video"
                >
                  <Image
                    src={`/proofpic/${file}`}
                    alt="Client conversation proof"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 60vw, 90vw"
                    priority={file === PROOF_IMAGES[0]}
                  />
                </Slider>
              ))}
            </SliderContainer>
            <ThumbsSlider
              className="mt-3"
              thumbsClassName="aspect-4/3 basis-[15%]"
            />
          </Carousel>
        </div>
      </Reveal>
    </Section>
  );
}
