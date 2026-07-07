import React, { useState } from "react";
import { Landmark, Scale, ShieldCheck, ChevronRight, Gavel, HelpCircle, AlertTriangle } from "lucide-react";
import { CASE_RESULTS } from "../data";

export default function CaseResults() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const activeCase = CASE_RESULTS[activeCaseIndex];

  return (
    <section id="case-results-section" className="py-24 bg-[#050505] relative border-t border-b border-white/5 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 filter blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-3">
            Precedent-Setting Victories
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-4">
            Select Case Outcomes
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-[#A5A5A5] max-w-2xl mx-auto leading-relaxed">
            A portfolio of meticulous legal actions resulting in massive corporate restitutions, acquittals, and proprietary asset recoveries.
          </p>
        </div>

        {/* Interactive Case Results Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Selection Rail */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <span className="text-[9px] font-mono tracking-[0.15em] text-[#A5A5A5] uppercase mb-1">
              Select Case Study
            </span>
            {CASE_RESULTS.map((caseItem, idx) => {
              const isActive = idx === activeCaseIndex;
              return (
                <button
                  key={caseItem.id}
                  id={`case-selector-${caseItem.id}`}
                  onClick={() => setActiveCaseIndex(idx)}
                  className={`w-full text-left p-5 rounded-[2px] border transition-all duration-300 relative ${
                    isActive
                      ? "bg-[#111111] border-[#D4AF37]/50 shadow-[0_4px_25px_rgba(212,175,55,0.05)]"
                      : "bg-[#111111]/40 border-white/5 hover:border-[#D4AF37]/30"
                  }`}
                >
                  <span className="block text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest mb-1.5">
                    {caseItem.court}
                  </span>
                  <h4 className={`text-sm font-serif font-semibold leading-snug ${isActive ? "text-white" : "text-[#A5A5A5]"}`}>
                    {caseItem.title}
                  </h4>
                  {isActive && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 bg-[#D4AF37] text-black rounded-[2px]">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Case Deep Dive Layout */}
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/10 rounded-[2px] p-8 md:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
            
            {/* Top Info section */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6 mb-8 gap-4">
                <div className="flex items-center space-x-3 text-[#D4AF37]">
                  <Gavel className="h-6 w-6" />
                  <span className="text-xs font-mono tracking-[0.2em] uppercase font-semibold">
                    Strategic Breakdown
                  </span>
                </div>
                <div className="px-3.5 py-1.5 bg-[#050505] border border-[#D4AF37]/40 rounded-[2px] text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider self-start sm:self-auto">
                  {activeCase.court}
                </div>
              </div>

              {/* Case Title */}
              <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide mb-8">
                {activeCase.title}
              </h3>

              {/* Three Pillar Breakdown (Challenge, Strategy, Outcome) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                
                {/* Challenge */}
                <div className="bg-[#050505] border border-white/10 p-5 rounded-[2px] hover:border-red-900/40 transition-colors">
                  <div className="flex items-center space-x-2 text-red-400 mb-3">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-[10px] font-mono tracking-widest uppercase">The Challenge</span>
                  </div>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed">
                    {activeCase.challenge}
                  </p>
                </div>

                {/* Strategy */}
                <div className="bg-[#050505] border border-white/10 p-5 rounded-[2px] hover:border-[#D4AF37]/30 transition-colors">
                  <div className="flex items-center space-x-2 text-[#D4AF37] mb-3">
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-[10px] font-mono tracking-widest uppercase">The Strategy</span>
                  </div>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed">
                    {activeCase.strategy}
                  </p>
                </div>

                {/* Outcome */}
                <div className="bg-[#050505] border border-white/10 p-5 rounded-[2px] hover:border-emerald-900/40 transition-colors">
                  <div className="flex items-center space-x-2 text-emerald-400 mb-3">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-[10px] font-mono tracking-widest uppercase">The Outcome</span>
                  </div>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed">
                    {activeCase.outcome}
                  </p>
                </div>

              </div>

              {/* Legal Precedent / Judgment */}
              <div className="bg-white/5 border-l-4 border-[#D4AF37] p-5 rounded-r-[2px]">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] mb-2 font-semibold">
                  Legal Precedent Set / Core Judgment
                </span>
                <p className="text-xs text-white leading-relaxed italic">
                  “{activeCase.judgment}”
                </p>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[10px] font-mono text-[#A5A5A5] tracking-wider uppercase">
                *Case details published under strict Client NDA and judicial clearance.
              </p>
              <a
                href="https://wa.me/919784364298?text=Hello%20Advocate%20Mahesh%20Kumar%20Sharma,%20I'd%20like%20to%20discuss%20a%20similar%20case%20regarding%20precedent%20disputes."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37] hover:text-[#FFF3B0] transition-colors"
              >
                <span>Consult on this Precedent</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
