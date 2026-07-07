import React, { useState } from "react";
import { BookOpen, FileText, ChevronDown, ChevronUp, Download, HelpCircle, CheckSquare, Search } from "lucide-react";
import { LEGAL_RESOURCES, FAQS } from "../data";

export default function LegalResources() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "guide" | "bare-act" | "template">("all");

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const filteredResources = LEGAL_RESOURCES.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || res.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="resources-section" className="py-24 bg-[#050505] relative border-t border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-3">
            Public Legal Repository & FAQs
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-4">
            Legal Resources
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-[#A5A5A5] max-w-2xl mx-auto leading-relaxed">
            Access compiled legislative handbooks, standard commercial drafts, co-founder agreements, and immediate FAQ resolutions.
          </p>
        </div>

        {/* Resources & FAQs Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Resources and Downloads */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="text-lg font-serif font-medium text-white tracking-wide flex items-center space-x-2">
                <FileText className="h-5 w-5 text-[#D4AF37]" />
                <span>Reference Documents</span>
              </h3>
              
              {/* Simple filter tabs */}
              <div className="flex gap-1 bg-[#111111] p-1 rounded-[2px] border border-white/10">
                {(["all", "guide", "bare-act", "template"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest rounded-[2px] ${
                      activeCategory === cat ? "bg-[#D4AF37] text-black font-semibold" : "text-[#A5A5A5] hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Resources List */}
            <div className="space-y-4">
              {filteredResources.map((res) => (
                <div 
                  key={res.id}
                  className="bg-white/[0.02] border border-white/5 rounded-[2px] p-5 hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <span className="inline-block text-[8px] font-mono tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2.5 py-1 rounded-[2px] mb-2 font-semibold">
                        {res.category}
                      </span>
                      <h4 className="text-sm font-serif font-semibold text-white leading-snug">
                        {res.title}
                      </h4>
                    </div>
                    {res.fileSize && (
                      <span className="text-[10px] font-mono text-[#A5A5A5] uppercase whitespace-nowrap bg-white/5 px-2 py-1 rounded-[2px]">
                        {res.fileSize}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-[#A5A5A5] leading-relaxed mb-4">
                    {res.description}
                  </p>

                  <div className="bg-[#050505] p-3 rounded-[2px] border border-white/5 mb-4">
                    <p className="text-[10px] font-sans text-gray-400">
                      <strong className="text-[#D4AF37]">Highlights:</strong> {res.content}
                    </p>
                  </div>

                  <button
                    onClick={() => alert(`Your premium package has completed. Standard file ${res.title} download simulation initialized.`)}
                    className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] hover:text-[#FFF3B0] transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Handbook</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-serif font-medium text-white border-b border-white/10 pb-4 mb-4 flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-[#D4AF37]" />
              <span>Chambers FAQs</span>
            </h3>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white/[0.02] border border-white/5 rounded-[2px] overflow-hidden transition-all duration-300 hover:border-white/10"
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-5 flex justify-between items-center gap-4 text-white hover:text-[#D4AF37] transition-colors"
                    >
                      <h4 className="text-sm font-serif font-medium leading-relaxed">
                        {faq.q}
                      </h4>
                      <span className="text-[#D4AF37]">
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </span>
                    </button>

                    {/* Expandable Panel */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-[#A5A5A5] leading-relaxed border-t border-white/5 bg-[#050505]/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
