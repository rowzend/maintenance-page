"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c: CanvasRenderingContext2D = ctx;

    const width0 = window.innerWidth;
    const height0 = window.innerHeight;
    canvas.width = width0;
    canvas.height = height0;
    let width = width0;
    let height = height0;

    const fontSize = 28;
    const speed = 0.4;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from(
      { length: columns },
      () => (Math.random() * height) / fontSize,
    );
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*";

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const color = prefersDark ? "0, 255, 65" : "0, 100, 0";
    const opacity = prefersDark ? 0.04 : 0.03;

    function draw() {
      c.fillStyle = `rgba(0, 0, 0, ${opacity})`;
      c.fillRect(0, 0, width, height);
      c.fillStyle = `rgba(${color}, 0.5)`;
      c.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        c.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.35 }}
    />
  );
}
