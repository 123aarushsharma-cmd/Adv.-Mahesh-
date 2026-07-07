import React from "react";
import { Scale, Heart, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import LawLogo from "./LawLogo";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="bg-[#050505] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      
      {/* Footer background gradient effect */}
      <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/5 filter blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Upper Column layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column A: Branding */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate("home")}>
              <LawLogo size="sm" />
            </div>
            <p className="text-xs text-[#A5A5A5] leading-relaxed max-w-sm">
              Delivering premium trial advocacy, high court appellate representations, and structured digital legal solutions with uncompromising integrity.
            </p>
          </div>

          {/* Column B: Navigation map */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono tracking-[0.25em] uppercase text-white font-semibold">Chambers Directory</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Home Base", value: "home" },
                { label: "Practice Areas", value: "practice-areas" },
                { label: "Credentials", value: "about" },
                { label: "Select Outcomes", value: "case-results" },
                { label: "Resources", value: "resources" },
                { label: "AI Chambers", value: "ai-features" },
                { label: "Consultation", value: "booking" },
                { label: "Client Portal", value: "portal" }
              ].map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate(link.value)}
                  className="text-left text-xs text-[#A5A5A5] hover:text-[#D4AF37] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column C: Bar Council Notice */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono tracking-[0.25em] uppercase text-white font-semibold">Bar Council Disclaimer</h4>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              As per the rules of the Bar Council of India, we are not permitted to solicit work or advertise. This website is designed solely to provide general public information at the user's specific request. Any material downloaded or informational data retrieved does not construct a binding lawyer-client relationship.
            </p>
          </div>

        </div>

        {/* Bottom Socials & Rights Row */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono text-[#A5A5A5] uppercase tracking-wide">
            &copy; {currentYear} Advocate Mahesh Kumar Sharma. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-[10px] font-mono text-[#A5A5A5]">
            <span className="cursor-default hover:text-white">Privacy Protocol Enabled</span>
            <span className="cursor-default hover:text-white">Terms of Juris</span>
            <span className="cursor-default hover:text-white">Cookie-Free</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
