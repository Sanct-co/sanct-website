"use client";

import Image from "next/image";
import type { EmblaOptionsType } from "embla-carousel";
import { Section } from "@/components/ui/section";
import { Carousel, Slider, SliderContainer, ThumbsSlider } from "@/components/ui/thumbnail-slider-utils/carousel";
import "./hallmark/proof.css";

const PROOF_IMAGES = ["six.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "1.jpg"];
const OPTIONS: EmblaOptionsType = { loop: true };

export function ProofGallery() {
  return (
    <Section id="gallery" background="white" className="sanct-gallery">
      <Carousel options={OPTIONS} className="sanct-gallery__layout">
        <SliderContainer className="sanct-gallery__track">
          {PROOF_IMAGES.map((file, index) => (
            <Slider key={file} thumbnailSrc={`/proofpic/${file}`} className="sanct-gallery__slide">
              <Image
                src={`/proofpic/${file}`}
                alt={`Sanct team and client gallery, photo ${index + 1} of ${PROOF_IMAGES.length}`}
                fill
                className="sanct-gallery__image"
                sizes="(min-width: 1400px) 860px, (min-width: 1024px) 65vw, 92vw"
              />
            </Slider>
          ))}
        </SliderContainer>
        <h2 className="sanct-gallery__heading">The people behind the work.</h2>
        <ThumbsSlider className="sanct-gallery__thumbs" thumbsClassName="sanct-gallery__thumb" />
      </Carousel>
    </Section>
  );
}
