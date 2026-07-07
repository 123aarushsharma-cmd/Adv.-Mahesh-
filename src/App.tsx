import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import PracticeAreas from "./components/PracticeAreas";
import About from "./components/About";
import CaseResults from "./components/CaseResults";
import LegalResources from "./components/LegalResources";
import AIFeatures from "./components/AIFeatures";
import Booking from "./components/Booking";
import ClientPortal from "./components/ClientPortal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { MessageSquare, Phone, Calendar, ArrowUp, Sparkles, Scale } from "lucide-react";

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Custom mouse follower
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentSection("home");
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black font-sans overflow-x-hidden scroll-smooth">
      
      {/* Editorial Vertical Branding */}
      <div className="vertical-brand hidden xl:block font-mono">
        Rajasthan High Court &bull; Civil & Consumer Chambers
      </div>

      {/* Premium Cinematic Custom Cursor follower */}
      <div
        id="custom-cursor"
        className="hidden md:block fixed w-5 h-5 rounded-full border border-[#D4AF37]/50 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 mix-blend-screen"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      >
        <div className="w-1 h-1 bg-[#D4AF37] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Navigation Header */}
      <Navigation onNavigate={handleNavigate} currentSection={currentSection} />

      {/* Main Page Layout Flow */}
      <main className="relative z-20">
        
        {/* SECTION: HERO PORTAL */}
        <div id="home-section">
          <Hero onNavigate={handleNavigate} />
        </div>

        {/* SECTION: JURISDICTIONS */}
        <div id="practice-areas-section">
          <PracticeAreas />
        </div>

        {/* SECTION: CHAMBERS ORIGINS */}
        <div id="about-section">
          <About />
        </div>

        {/* SECTION: OUTCOMES */}
        <div id="case-results-section">
          <CaseResults />
        </div>

        {/* SECTION: RESOURCE REPOSITORY */}
        <div id="resources-section">
          <LegalResources />
        </div>

        {/* SECTION: AI INTELLIGENCE */}
        <div id="ai-features-section">
          <AIFeatures />
        </div>

        {/* SECTION: SECURE CONSULTATION BOOKER */}
        <div id="booking-section">
          <Booking />
        </div>

        {/* SECTION: CLIENT RETRIEVAL PORTAL */}
        <div id="portal-section">
          <ClientPortal />
        </div>

        {/* SECTION: CONTACT OFFICE */}
        <div id="contact-section">
          <Contact />
        </div>

      </main>

      {/* Footer information mapping */}
      <Footer onNavigate={handleNavigate} />

      {/* FLOATING ACTION PANELS (REQUIRED FOR MOBILE & STICKY CTA EXPERIENCE) */}
      <div id="floating-actions" className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        
        {/* Floating AI Chambers alert tag */}
        <button
          onClick={() => handleNavigate("ai-features")}
          className="p-3 bg-[#111111] border border-[#D4AF37]/60 text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all transform hover:scale-110 flex items-center justify-center relative group"
          title="Open AI Legal Assistant"
        >
          <Sparkles className="h-5 w-5 animate-pulse" />
          <span className="absolute right-12 bg-[#111111] border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] px-2.5 py-1 rounded font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            AI Assistant
          </span>
        </button>

        {/* Quick Dial Panel */}
        <a
          href="tel:+919784364298"
          className="p-3 bg-[#111111] border border-white/10 text-white hover:text-[#D4AF37] rounded-full hover:border-[#D4AF37] shadow-xl transition-all transform hover:scale-110 flex items-center justify-center relative group"
          title="Call Chambers Office"
        >
          <Phone className="h-5 w-5" />
          <span className="absolute right-12 bg-[#111111] border border-white/10 text-white text-[10px] px-2.5 py-1 rounded font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Call Now
          </span>
        </a>

        {/* WhatsApp direct thread */}
        <a
          href="https://wa.me/919784364298?text=Hello%20Advocate%20Mahesh%20Kumar%20Sharma,%20I'd%20like%20to%20schedule%20a%20legal%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-[#25D366] text-black rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] transition-all transform hover:scale-110 flex items-center justify-center relative group"
          title="WhatsApp Messenger"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="absolute right-12 bg-[#111111] border border-[#25D366]/30 text-[#25D366] text-[10px] px-2.5 py-1 rounded font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            WhatsApp
          </span>
        </a>

        {/* Scroll back to top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-[#111111]/80 border border-white/10 rounded-full hover:border-[#D4AF37] text-[#D4AF37] transition-all transform hover:scale-110 flex items-center justify-center shadow-2xl"
            title="Scroll To Top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>

    </div>
  );
}
