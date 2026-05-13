"use client";

import { useEffect, useRef } from "react";

const HEIGHT = 160;
const WAVE_COLOR = "#F4C0D1";

export default function Soundwave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let displayWidth = canvas.offsetWidth;

    function setupCanvas() {
      if (!canvas || !ctx) return;
      displayWidth = canvas.offsetWidth;
      canvas.width = displayWidth * dpr;
      canvas.height = HEIGHT * dpr;
      canvas.style.height = `${HEIGHT}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    setupCanvas();

    const startTime = performance.now();
    let rafId = 0;

    function draw() {
      if (!ctx) return;
      const elapsed = performance.now() - startTime;

      const breathPhase = elapsed / 3000;
      const baseAmp = HEIGHT * 0.3;
      const ampVar = HEIGHT * 0.1;
      const amp = baseAmp + ampVar * Math.sin(breathPhase * 2 * Math.PI);

      const wavelength = displayWidth / 2;
      const phaseOffset = (elapsed / 4000) * displayWidth;
      const centerY = HEIGHT / 2;

      ctx.clearRect(0, 0, displayWidth, HEIGHT);
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = WAVE_COLOR;
      ctx.shadowColor = WAVE_COLOR;
      ctx.shadowBlur = 12;

      for (let x = 0; x <= displayWidth; x += 4) {
        const y =
          centerY +
          amp * Math.sin(((x - phaseOffset) / wavelength) * 2 * Math.PI);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    function handleResize() {
      setupCanvas();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full"
      style={{ height: `${HEIGHT}px` }}
    />
  );
}
