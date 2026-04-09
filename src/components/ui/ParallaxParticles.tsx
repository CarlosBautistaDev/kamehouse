"use client";

import { ParticlesCanvas } from "./ParticlesCanvas";

export function ParallaxParticles() {
  return (
    <div className="fixed inset-0 z-[5] pointer-events-none">
      <ParticlesCanvas
        colors={[
          "255, 107, 53",
          "230, 57, 70",
          "34, 197, 94",
          "56, 189, 248",
        ]}
        particleCount={200}
        connectionDistance={110}
        speed={0.1}
      />
    </div>
  );
}
