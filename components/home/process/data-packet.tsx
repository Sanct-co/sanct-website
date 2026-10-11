"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion/react";

type DataPacketProps = {
  d: string;
  emphasized: boolean;
  reducedMotion: boolean;
  size?: number;
};

export function DataPacket({
  d,
  emphasized,
  reducedMotion,
  size = 4.4,
}: DataPacketProps) {
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group || reducedMotion) return;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    const length = path.getTotalLength();
    if (!length) return;

    const place = (progress: number) => {
      const point = path.getPointAtLength(length * progress);
      group.setAttribute("transform", `translate(${point.x} ${point.y})`);
      group.setAttribute("visibility", "visible");
    };

    place(0);

    const controls = animate(0, 1, {
      duration: emphasized ? 1.7 : 6.2,
      repeat: Infinity,
      ease: "linear",
      onUpdate: place,
    });

    return () => controls.stop();
  }, [d, emphasized, reducedMotion]);

  if (reducedMotion) return null;

  const core = size * 0.38;

  return (
    <g ref={groupRef} visibility="hidden" pointerEvents="none">
      <polygon
        points={`0,${-size} ${size},0 0,${size} ${-size},0`}
        fill={emphasized ? "#e4e0ff" : "#a09cf5"}
        opacity={emphasized ? 1 : 0.7}
      />
      {emphasized && (
        <polygon points={`0,${-core} ${core},0 0,${core} ${-core},0`} fill="#ffffff" />
      )}
    </g>
  );
}
