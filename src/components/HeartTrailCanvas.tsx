import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rot: number;
  vRot: number;
  color: string;
  type: "heart" | "kiss" | "petal" | "star";
  life: number;
  maxLife: number;
}

interface HeartTrailCanvasProps {
  kissTrigger: number;
}

export const HeartTrailCanvas: React.FC<HeartTrailCanvasProps> = ({ kissTrigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);

  const colors = ["#f43f5e", "#fb7185", "#fda4af", "#e11d48", "#be123c", "#ec4899", "#d946ef"];

  // Helper to draw heart shape
  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number, color: string, opacity: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.scale(size / 16, size / 16);
    ctx.fillStyle = color;
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.bezierCurveTo(-7, -14, -16, -6, -16, 2);
    ctx.bezierCurveTo(-16, 10, -7, 16, 0, 22);
    ctx.bezierCurveTo(7, 16, 16, 10, 16, 2);
    ctx.bezierCurveTo(16, -6, 7, -14, 0, -5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  // Helper to draw kiss lips
  const drawKiss = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number, color: string, opacity: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.scale(size / 24, size / 24);
    ctx.fillStyle = color;
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
    // Upper lip
    ctx.beginPath();
    ctx.moveTo(-18, 0);
    ctx.quadraticCurveTo(-9, -12, 0, -4);
    ctx.quadraticCurveTo(9, -12, 18, 0);
    ctx.quadraticCurveTo(8, -4, 0, 0);
    ctx.quadraticCurveTo(-8, -4, -18, 0);
    ctx.fill();
    // Lower lip
    ctx.beginPath();
    ctx.moveTo(-16, 2);
    ctx.quadraticCurveTo(-9, 14, 0, 15);
    ctx.quadraticCurveTo(9, 14, 16, 2);
    ctx.quadraticCurveTo(0, 7, -16, 2);
    ctx.fill();
    ctx.restore();
  };

  // Helper to draw petal
  const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number, color: string, opacity: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.scale(size / 14, size / 14);
    ctx.fillStyle = color;
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Spawn kiss explosion
  const spawnKissShower = (width: number, height: number) => {
    const kissCount = 55;
    for (let i = 0; i < kissCount; i++) {
      const startX = width * 0.15 + Math.random() * (width * 0.7);
      const startY = height * 0.6 + Math.random() * (height * 0.35);
      particlesRef.current.push({
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 6,
        vy: -3 - Math.random() * 5.5,
        size: 20 + Math.random() * 24,
        opacity: 1,
        rot: (Math.random() - 0.5) * 45,
        vRot: (Math.random() - 0.5) * 3,
        color: Math.random() > 0.3 ? "#e11d48" : "#f43f5e",
        type: Math.random() > 0.4 ? "kiss" : "heart",
        life: 0,
        maxLife: 120 + Math.random() * 60,
      });
    }
  };

  // Trigger kiss explosion on kissTrigger change
  useEffect(() => {
    if (kissTrigger > 0 && canvasRef.current) {
      spawnKissShower(canvasRef.current.width, canvasRef.current.height);
    }
  }, [kissTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse / touch trail
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      if (!lastMousePos.current) {
        lastMousePos.current = { x: clientX, y: clientY };
      }

      const dist = Math.hypot(clientX - lastMousePos.current.x, clientY - lastMousePos.current.y);
      if (dist > 18) {
        lastMousePos.current = { x: clientX, y: clientY };
        particlesRef.current.push({
          x: clientX,
          y: clientY,
          vx: (Math.random() - 0.5) * 1.8,
          vy: -1 - Math.random() * 1.5,
          size: 10 + Math.random() * 12,
          opacity: 0.9,
          rot: (Math.random() - 0.5) * 30,
          vRot: (Math.random() - 0.5) * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: "heart",
          life: 0,
          maxLife: 45 + Math.random() * 25,
        });
      }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Ambient floating petals/hearts
    const ambientTimer = setInterval(() => {
      if (particlesRef.current.length < 40) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 20,
          vx: Math.sin(Date.now() / 1000) * 0.8 + (Math.random() - 0.5) * 0.6,
          vy: -0.8 - Math.random() * 1.2,
          size: 8 + Math.random() * 10,
          opacity: 0.5 + Math.random() * 0.4,
          rot: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: Math.random() > 0.4 ? "petal" : "heart",
          life: 0,
          maxLife: 240 + Math.random() * 120,
        });
      }
    }, 550);

    // Animation render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;

        // Gentle drag / sway
        p.vx *= 0.99;
        p.opacity = 1 - p.life / p.maxLife;

        if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, p.rot, p.color, p.opacity);
        } else if (p.type === "kiss") {
          drawKiss(ctx, p.x, p.y, p.size, p.rot, p.color, p.opacity);
        } else if (p.type === "petal") {
          drawPetal(ctx, p.x, p.y, p.size, p.rot, p.color, p.opacity);
        }

        if (p.life >= p.maxLife || p.y < -50 || p.x < -50 || p.x > canvas.width + 50) {
          particlesRef.current.splice(i, 1);
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      clearInterval(ambientTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      aria-hidden="true"
    />
  );
};
