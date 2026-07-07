import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, Phone, Mail, Calendar, ArrowRight, ShieldCheck, Scale, Award } from "lucide-react";
import { STATISTICS } from "../data";

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // 3D Math Particles Canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Interactive mouse parallax tracker
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left - width / 2;
      mouseRef.current.targetY = e.clientY - rect.top - height / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Create 3D points
    interface Point3D {
      x: number;
      y: number;
      z: number;
      ox: number;
      oy: number;
      oz: number;
      color: string;
      size: number;
    }

    const numPoints = 85;
    const points: Point3D[] = [];

    // Generate points arranged in a luxury structural sphere
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.acos(Math.random() * 2 - 1);
      const phi = Math.random() * Math.PI * 2;
      const radius = Math.min(width, height) * 0.28 + Math.random() * 40;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      points.push({
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        size: Math.random() * 2.5 + 1,
        color: i % 4 === 0 ? "rgba(212, 175, 55, 0.7)" : "rgba(255, 255, 255, 0.3)",
      });
    }

    const projected = Array.from({ length: numPoints }, () => ({
      x: 0,
      y: 0,
      z: 0,
      color: "",
      size: 0,
    }));

    let angleX = 0.0015;
    let angleY = 0.002;
    let lastTime = performance.now();

    const render = (time?: number) => {
      const now = time || performance.now();
      const dt = Math.min((now - lastTime) / 16.666, 4); // Normalise to 1.0 at 60fps
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking interpolation
      const m = mouseRef.current;
      const dx = m.targetX - m.x;
      const dy = m.targetY - m.y;
      m.x += dx * 0.08 * dt;
      m.y += dy * 0.08 * dt;

      // Perspective projection values
      const fov = 350;
      const cx = width / 2 + m.x * 0.15;
      const cy = height / 2 + m.y * 0.15;

      // Rotate sphere based on time & mouse
      const cosX = Math.cos(angleX * dt + m.y * 0.000005 * dt);
      const sinX = Math.sin(angleX * dt + m.y * 0.000005 * dt);
      const cosY = Math.cos(angleY * dt + m.x * 0.000005 * dt);
      const sinY = Math.sin(angleY * dt + m.x * 0.000005 * dt);

      // Draw subtle background radial luxury gradient
      const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.6);
      bgGrad.addColorStop(0, "rgba(21, 21, 21, 0.4)");
      bgGrad.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Project and render connection networks
      points.forEach((p, idx) => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Store current position for continuous spin
        p.x = x1;
        p.y = y2;
        p.z = z2;

        const scale = fov / (fov + z2);
        const projX = cx + x1 * scale;
        const projY = cy + y2 * scale;

        const proj = projected[idx];
        proj.x = projX;
        proj.y = projY;
        proj.z = z2;
        proj.color = p.color;
        proj.size = p.size * scale;
      });

      // Draw connection lines for nearby nodes (creates a gorgeous constellation)
      ctx.lineWidth = 0.4;
      const len = projected.length;
      const maxDistSq = 12100; // 110 * 110
      for (let i = 0; i < len; i++) {
        const pi = projected[i];
        for (let j = i + 1; j < len; j++) {
          const pj = projected[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 110) * 0.18;
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      // Draw the nodes
      projected.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Add delicate glowing shadows to Gold nodes without the slow shadowBlur engine
        if (p.color.includes("212, 175, 55")) {
          ctx.fillStyle = "rgba(212, 175, 55, 0.12)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(212, 175, 55, 0.25)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw elegant central wireframe vector of Scales of Justice
      ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Central pillar
      ctx.moveTo(cx, cy - 80);
      ctx.lineTo(cx, cy + 80);
      // Base stand
      ctx.moveTo(cx - 35, cy + 80);
      ctx.lineTo(cx + 35, cy + 80);
      ctx.moveTo(cx - 20, cy + 75);
      ctx.lineTo(cx + 20, cy + 75);
      // Crossbeam
      ctx.moveTo(cx - 65, cy - 50);
      ctx.lineTo(cx + 65, cy - 50);
      ctx.stroke();

      // Draw the left scale plate hanging (bobbing slightly)
      const bob = Math.sin(now * 0.002) * 5;
      ctx.beginPath();
      ctx.moveTo(cx - 65, cy - 50);
      ctx.lineTo(cx - 85, cy - 10 + bob);
      ctx.moveTo(cx - 65, cy - 50);
      ctx.lineTo(cx - 45, cy - 10 + bob);
      ctx.moveTo(cx - 90, cy - 10 + bob);
      ctx.lineTo(cx - 40, cy - 10 + bob);
      ctx.stroke();

      // Draw right scale plate hanging
      ctx.beginPath();
      ctx.moveTo(cx + 65, cy - 50);
      ctx.lineTo(cx + 45, cy - 10 - bob);
      ctx.moveTo(cx + 65, cy - 50);
      ctx.lineTo(cx + 85, cy - 10 - bob);
      ctx.moveTo(cx + 40, cy - 10 - bob);
      ctx.lineTo(cx + 90, cy - 10 - bob);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden pt-20"
    >
      {/* Dynamic 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Decorative Golden Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 filter blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#C8A23B]/5 filter blur-[100px] rounded-full pointer-events-none"></div>

      {/* Hero Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 text-center flex flex-col items-center justify-center min-h-[85vh]">
        
        {/* Superior Trust Badge */}
        <div
          id="hero-badge"
          className="inline-flex items-center space-x-2 bg-[#111111]/80 border border-[#D4AF37]/30 px-4 py-2 rounded-full mb-6 backdrop-blur-md transform hover:scale-105 transition-transform"
        >
          <Award className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37]">
            Appellate Litigation & Trial Counsel
          </span>
        </div>

        {/* Master Headline */}
        <h1
          id="hero-title"
          className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white mb-6 max-w-5xl leading-tight"
        >
          Defining the Future of <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#C8A23B] bg-clip-text text-transparent font-semibold drop-shadow-[0_2px_15px_rgba(212,175,55,0.15)]">
            Elite Advocacy & Justice
          </span>
        </h1>

        {/* Tagline / Strategy */}
        <p
          id="hero-subtitle"
          className="text-base sm:text-xl font-sans text-[#A5A5A5] max-w-2xl mb-12 tracking-wide leading-relaxed"
        >
          “Justice. Integrity. Results.” — Over 26 years of dedicated courtroom advocacy, specializing in Civil cases and Consumer disputes across Jaipur and Dausa courts.
        </p>

        {/* Call to Actions Panel */}
        <div
          id="hero-ctas"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
        >
          <button
            id="btn-hero-book"
            onClick={() => onNavigate("booking")}
            className="group w-full sm:w-auto flex items-center justify-center space-x-3 bg-[#D4AF37] hover:bg-[#FFF3B0] text-black font-semibold text-xs tracking-widest uppercase px-8 py-4 rounded-[2px] transition-all transform hover:-translate-y-1 shadow-[0_4px_25px_rgba(212,175,55,0.2)]"
          >
            <Calendar className="w-4 h-4" />
            <span>Secure Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            id="btn-hero-whatsapp"
            href="https://wa.me/919784364298?text=Hello%20Advocate%20Mahesh%20Kumar%20Sharma,%20I'd%20like%20to%20schedule%20a%20legal%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-transparent border border-[#D4AF37]/50 hover:border-[#D4AF37] text-white hover:bg-white/5 font-medium text-xs tracking-widest uppercase px-8 py-4 rounded-[2px] transition-all transform hover:-translate-y-1 backdrop-blur-md"
          >
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
            <span>WhatsApp Direct</span>
          </a>
        </div>

        {/* Bottom Fast Stats Section */}
        <div
          id="hero-stats"
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-[#D4AF37]/20 bg-white/[0.02] backdrop-blur-sm rounded-[2px] max-w-5xl"
        >
          {STATISTICS.map((stat, i) => (
            <div key={i} id={`hero-stat-${i}`} className="text-center px-2 flex flex-col justify-center">
              <span className="block text-sm sm:text-lg md:text-xl font-serif font-semibold text-[#D4AF37] mb-1 truncate tracking-wide">
                {stat.value}
              </span>
              <span className="block text-[8px] sm:text-[10px] font-mono uppercase tracking-widest text-[#A5A5A5]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          id="scroll-indicator"
          onClick={() => onNavigate("practice-areas")}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group opacity-75 hover:opacity-100 transition-opacity z-25"
        >
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#A5A5A5] mb-2 group-hover:text-[#D4AF37] transition-colors">
            Explore Chambers
          </span>
          <div className="w-[18px] h-[30px] border border-[#D4AF37]/50 rounded-full flex justify-center p-1">
            <div className="w-[4px] h-[6px] bg-[#D4AF37] rounded-full animate-bounce"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
