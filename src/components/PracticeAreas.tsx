import React, { useState } from "react";
import { Search, ChevronRight, Landmark, Shield, Scale, Users, Briefcase, Cpu, Globe, FileText, ArrowRight, X } from "lucide-react";
import { PRACTICE_AREAS, PracticeArea } from "../data";

// Map string icon names to Lucide icon components
const IconMap: Record<string, React.ComponentType<any>> = {
  Landmark,
  Shield,
  Scale,
  Users,
  Briefcase,
  Cpu,
  Globe,
  FileText
};

export default function PracticeAreas() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "litigation" | "corporate" | "consulting">("all");
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);

  // Filter practice areas based on search query and category
  const filteredAreas = PRACTICE_AREAS.filter((area) => {
    const matchesSearch = area.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          area.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          area.detailedDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || area.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="practice-areas-section" className="py-24 bg-[#050505] border-t border-b border-[#D4AF37]/10 relative">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-[#D4AF37]/5 filter blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-3">
            Fields of Litigation & Advisory
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-4">
            Practice Jurisdictions
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-[#A5A5A5] max-w-2xl mx-auto leading-relaxed">
            Delivering bespoke, state-of-the-art representation with pristine technical execution across civil, criminal, corporate, and constitutional chambers.
          </p>
        </div>

        {/* Filter Toolbar / Search */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white/[0.02] border border-white/10 p-4 rounded-[2px] backdrop-blur-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {(["all", "litigation", "corporate", "consulting"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-[2px] transition-all ${
                  activeCategory === cat
                    ? "bg-[#D4AF37] text-black font-semibold shadow-[0_4px_15px_rgba(212,175,55,0.15)]"
                    : "text-[#A5A5A5] hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-[#A5A5A5]" />
            </span>
            <input
              type="text"
              placeholder="Search legal practice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 text-white placeholder-gray-500 text-xs rounded-[2px] pl-10 pr-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Grids of Cards */}
        {filteredAreas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAreas.map((area) => {
              const IconComponent = IconMap[area.iconName] || Scale;
              return (
                <div
                  key={area.id}
                  id={`practice-card-${area.id}`}
                  className="group relative bg-white/[0.02] border-t border-b border-r border-l border-white/10 border-l-[#D4AF37]/40 rounded-[2px] p-6 hover:bg-white/[0.04] hover:border-l-[#D4AF37] transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform hover:-translate-y-1"
                >
                  <div>
                    {/* Top Icon section */}
                    <div className="mb-6 inline-block p-3 bg-white/[0.01] border border-white/10 rounded-[2px] group-hover:border-[#D4AF37]/50 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-serif font-medium text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-200">
                      {area.title}
                    </h3>
                    <p className="text-xs text-[#A5A5A5] leading-relaxed mb-6">
                      {area.description}
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <button
                    onClick={() => setSelectedArea(area)}
                    className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] hover:text-[#FFF3B0] transition-colors mt-auto group/btn"
                  >
                    <span>Analyze Juris</span>
                    <ArrowRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {/* Golden accent bottom glow line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4AF37]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#111111] rounded-[2px] border border-dashed border-[#D4AF37]/20">
            <p className="text-sm text-[#A5A5A5]">No practice areas matched your exact search criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="mt-4 text-xs font-mono text-[#D4AF37] underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Luxury Detailed Modal/Drawer overlay */}
      {selectedArea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div 
            className="relative bg-[#0d0d0d] border border-white/10 border-l-[#D4AF37] border-l-4 rounded-[2px] max-w-2xl w-full p-8 md:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedArea(null)}
              className="absolute top-6 right-6 p-2 bg-[#050505] border border-white/10 hover:border-[#D4AF37] text-gray-400 hover:text-[#D4AF37] rounded-[2px] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Content */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-white/[0.02] border border-[#D4AF37]/30 rounded-[2px] text-[#D4AF37]">
                {React.createElement(IconMap[selectedArea.iconName] || Scale, { className: "h-8 w-8" })}
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2.5 py-1 rounded-[2px]">
                  {selectedArea.category} JURISDICTION
                </span>
                <h3 className="text-2xl font-serif font-semibold text-white mt-2">
                  {selectedArea.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-white font-medium leading-relaxed mb-4 bg-white/5 p-4 rounded-[2px] border-l-4 border-[#D4AF37]">
              {selectedArea.description}
            </p>

            <div className="text-xs text-[#A5A5A5] leading-relaxed space-y-4 mb-8">
              <p>{selectedArea.detailedDesc}</p>
              <p>
                Under the direct supervision of Advocate Mahesh Kumar Sharma, cases assigned to this division undergo multi-layer draft review, strategic scenario mapping, and precedent validation using our proprietary AI Legal Databases.
              </p>
            </div>

            {/* Call to Actions in Modal */}
            <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-white/10 pt-6">
              <a
                href={`https://wa.me/919784364298?text=Hello%20Advocate%20Mahesh%20Kumar%20Sharma,%20I%20have%20an%20urgent%20matter%20regarding%20${encodeURIComponent(selectedArea.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-[#D4AF37] hover:bg-[#FFF3B0] text-black font-semibold text-xs tracking-widest uppercase px-6 py-3.5 rounded-[2px] transition-all"
              >
                Discuss Urgent Dispute
              </a>
              <button
                onClick={() => setSelectedArea(null)}
                className="w-full sm:w-auto text-center border border-white/10 hover:border-[#D4AF37] text-white font-medium text-xs tracking-widest uppercase px-6 py-3.5 rounded-[2px] transition-all"
              >
                Return to Directory
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
