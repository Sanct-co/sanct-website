"use client";

import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

type EmblaApi = UseEmblaCarouselType[1];

type CarouselContextValue = {
  mainRef: UseEmblaCarouselType[0];
  thumbRef: UseEmblaCarouselType[0];
  selectedIndex: number;
  thumbs: string[];
  registerThumbs: (srcs: string[]) => void;
  onThumbClick: (index: number) => void;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Thumbnail slider parts must be used within <Carousel>");
  }
  return context;
}

type CarouselProps = {
  options?: EmblaOptionsType;
  className?: string;
  children: ReactNode;
};

export function Carousel({ options, className, children }: CarouselProps) {
  const [mainRef, mainApi] = useEmblaCarousel(options);
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [thumbs, setThumbs] = useState<string[]>([]);

  const onThumbClick = useCallback(
    (index: number) => {
      mainApi?.scrollTo(index);
    },
    [mainApi],
  );

  const onSelect = useCallback((api: EmblaApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  useEffect(() => {
    if (!mainApi || !thumbApi) return;
    thumbApi.scrollTo(selectedIndex);
  }, [mainApi, thumbApi, selectedIndex]);

  return (
    <CarouselContext.Provider
      value={{
        mainRef,
        thumbRef,
        selectedIndex,
        thumbs,
        registerThumbs: setThumbs,
        onThumbClick,
      }}
    >
      <div className={className}>{children}</div>
    </CarouselContext.Provider>
  );
}

type SliderContainerProps = ComponentPropsWithoutRef<"div">;

export function SliderContainer({
  className = "",
  children,
  ...props
}: SliderContainerProps) {
  const { mainRef, registerThumbs } = useCarouselContext();

  useEffect(() => {
    const srcs = Children.toArray(children).map((child) => {
      if (isValidElement<{ thumbnailSrc?: string }>(child)) {
        return child.props.thumbnailSrc ?? "";
      }
      return "";
    });
    registerThumbs(srcs);
  }, [children, registerThumbs]);

  return (
    <div className="overflow-hidden" ref={mainRef}>
      <div className={`flex touch-pan-y ${className}`} {...props}>
        {children}
      </div>
    </div>
  );
}

type SliderProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  /** Consumed by `SliderContainer` to build the thumbnail strip. */
  thumbnailSrc: string;
  children: ReactNode;
};

export function Slider({
  className = "",
  thumbnailSrc,
  children,
  ...props
}: SliderProps) {
  void thumbnailSrc;
  return (
    <div
      className={`min-w-0 shrink-0 grow-0 basis-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

type ThumbsSliderProps = {
  className?: string;
  thumbsClassName?: string;
};

export function ThumbsSlider({
  className = "",
  thumbsClassName = "",
}: ThumbsSliderProps) {
  const { thumbRef, thumbs, selectedIndex, onThumbClick } =
    useCarouselContext();

  if (thumbs.length === 0) return null;

  return (
    <div className={`overflow-hidden ${className}`} ref={thumbRef}>
      <div className="flex gap-2">
        {thumbs.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex}
            onClick={() => onThumbClick(index)}
            className={`relative shrink-0 grow-0 overflow-hidden rounded-md ring-2 transition-opacity duration-150 ${thumbsClassName} ${
              index === selectedIndex
                ? "opacity-100 ring-sanct-indigo"
                : "opacity-50 ring-transparent hover:opacity-80"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
