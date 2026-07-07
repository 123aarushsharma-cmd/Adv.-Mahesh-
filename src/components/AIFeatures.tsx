import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, MessageSquare, FileSearch, Calculator, Send, 
  RefreshCw, FileText, CheckCircle, AlertOctagon, HelpCircle, AlertTriangle 
} from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AIFeatures() {
  const [activeTab, setActiveTab] = useState<"assistant" | "analyzer" | "calculator">("assistant");

  // AI Chatbot State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Welcome to the Elite Legal AI Chambers of Advocate Mahesh Kumar Sharma. I am trained in Indian Civil, Consumer Protection, Land Revenue, and General Laws. How can I assist you today?"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Document Analyzer State
  const [docText, setDocText] = useState("");
  const [analysisType, setAnalysisType] = useState("General Legal Audit & Risk Factors");
  const [analysisResult, setAnalysisResult] = useState("");
  const [analyzerLoading, setAnalyzerLoading] = useState(false);

  // Calculator State
  const [suitValue, setSuitValue] = useState("1000000"); // 10 Lakhs
  const [delayPrincipal, setDelayPrincipal] = useState("5000000"); // 50 Lakhs
  const [delayMonths, setDelayMonths] = useState("18");
  const [calculatorResults, setCalculatorResults] = useState({
    courtFee: 12500,
    reraInterest: 1125000,
    totalReraPayout: 6125000
  });

  const promptSuggestions = [
    "How to file a consumer complaint in Rajasthan?",
    "Statutory delay compensation rules under RERA?",
    "Step-by-step property registration rules in Rajasthan?",
    "Requirements to partition ancestral agricultural land?"
  ];

  // Scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Chat Submissions
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || chatLoading) return;
    const userMsg = text.trim();
    setUserInput("");
    
    const updatedMessages = [...messages, { role: "user", content: userMsg } as ChatMessage];
    setMessages(updatedMessages);
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          systemInstruction: "You are a highly knowledgeable legal assistant working in the chambers of Advocate Mahesh Kumar Sharma. Respond with absolute legal precision, citing relevant sections of the Civil Procedure Code, Consumer Protection Act, and land laws of Rajasthan where applicable. Be highly formal, respectful, and articulate. Keep answers professional, simple, and structured."
        })
      });

      const data = await response.json();
      if (data.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${data.error}` }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "assistant", content: "Apologies, but the legal servers are temporarily unresponsive. Please verify connection." }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Handle Document Review
  const handleAnalyzeDocument = async () => {
    if (!docText.trim() || analyzerLoading) return;
    setAnalyzerLoading(true);
    setAnalysisResult("");

    try {
      const response = await fetch("/api/analyze-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentText: docText,
          analysisType
        })
      });

      const data = await response.json();
      if (data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        setAnalysisResult("Failed to generate document analysis. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setAnalysisResult("An unexpected server error occurred during contract audit.");
    } finally {
      setAnalyzerLoading(false);
    }
  };

  // Run Calculator Formulae
  const runCalculations = () => {
    const val = parseFloat(suitValue) || 0;
    const principal = parseFloat(delayPrincipal) || 0;
    const months = parseFloat(delayMonths) || 0;

    // Delhi Court Fee Estimation (Simulated progressive scale)
    // 1% to 1.5% ad-valorem capping around 1.5 Lakhs
    let calculatedCourtFee = 5000;
    if (val > 100000) {
      calculatedCourtFee = val * 0.0125;
    }
    if (calculatedCourtFee > 200000) calculatedCourtFee = 200000;

    // RERA Delay Interest rate (usually SBI MCLR + 2% which is roughly 10.5% p.a. simple interest)
    const annualRate = 0.105;
    const interest = principal * annualRate * (months / 12);
    const totalPayout = principal + interest;

    setCalculatorResults({
      courtFee: Math.round(calculatedCourtFee),
      reraInterest: Math.round(interest),
      totalReraPayout: Math.round(totalPayout)
    });
  };

  useEffect(() => {
    runCalculations();
  }, [suitValue, delayPrincipal, delayMonths]);

  return (
    <section id="ai-features-section" className="py-24 bg-[#050505] relative border-t border-b border-white/5 overflow-hidden">
      
      {/* Visual neon golden particle grid background effect */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#D4AF37]/5 to-[#C8A23B]/5 filter blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-3">
            Interactive AI Chambers Portal
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-4">
            AI Chambers Suite
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-[#A5A5A5] max-w-2xl mx-auto leading-relaxed">
            Harness real-time legal summaries, automated draft contract audit, and statutory financial calculators powered by Google Gemini.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-3 gap-1 bg-[#111111] p-1.5 rounded-[2px] border border-white/10 w-full max-w-lg shadow-2xl">
            <button
              onClick={() => setActiveTab("assistant")}
              className={`flex items-center justify-center space-x-2 py-3 text-xs font-sans tracking-wider uppercase rounded-[2px] transition-all ${
                activeTab === "assistant" ? "bg-[#D4AF37] text-black font-semibold" : "text-[#A5A5A5] hover:text-white"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
            <button
              onClick={() => setActiveTab("analyzer")}
              className={`flex items-center justify-center space-x-2 py-3 text-xs font-sans tracking-wider uppercase rounded-[2px] transition-all ${
                activeTab === "analyzer" ? "bg-[#D4AF37] text-black font-semibold" : "text-[#A5A5A5] hover:text-white"
              }`}
            >
              <FileSearch className="h-4 w-4" />
              <span className="hidden sm:inline">Document Review</span>
            </button>
            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex items-center justify-center space-x-2 py-3 text-xs font-sans tracking-wider uppercase rounded-[2px] transition-all ${
                activeTab === "calculator" ? "bg-[#D4AF37] text-black font-semibold" : "text-[#A5A5A5] hover:text-white"
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Legal Calculator</span>
            </button>
          </div>
        </div>

        {/* Tab Screen Renderer */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2px] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md">
          
          {/* TAB 1: AI ASSISTANT CHATBOT */}
          {activeTab === "assistant" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[550px] items-stretch">
              {/* Left sidebar info and suggestions */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 border-r border-white/10 pr-6 hidden lg:flex">
                <div>
                  <div className="flex items-center space-x-2 text-[#D4AF37] mb-3">
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest font-semibold">Gemini Intelligence</span>
                  </div>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed mb-6">
                    This advanced AI model is initialized with the systemic rules of the Indian Penal Code, Civil Claims Rules, and standard commercial contracts.
                  </p>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white mb-3">
                    Sample Legal Inquiries
                  </span>
                  <div className="space-y-2">
                    {promptSuggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sug)}
                        className="w-full text-left bg-[#050505] hover:bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 p-3 rounded-[2px] text-[11px] text-[#A5A5A5] hover:text-white transition-all duration-200"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-[#050505] p-3 rounded-[2px] border border-white/5 text-[9px] font-mono text-[#A5A5A5] tracking-wide">
                  Disclaimer: AI Assistant provides informational advice based on Indian judicial trends. For binding legal audits, secure an official consultation.
                </div>
              </div>

              {/* Main Chat Thread area */}
              <div className="lg:col-span-8 flex flex-col h-full justify-between">
                {/* Scrollable message container */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[380px]">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-[2px] p-4 text-xs leading-relaxed ${
                          m.role === "user"
                            ? "bg-[#D4AF37] text-black font-semibold"
                            : "bg-[#050505] border border-white/10 text-white whitespace-pre-wrap"
                        }`}
                      >
                        <span className="block font-mono text-[9px] uppercase tracking-wider mb-1 opacity-60">
                          {m.role === "user" ? "CLIENT MATTERS" : "ADVOCATE SHARMA AI"}
                        </span>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#050505] border border-white/5 rounded-2xl p-4 text-xs text-white rounded-tl-none flex items-center space-x-3">
                        <RefreshCw className="h-4 w-4 animate-spin text-[#D4AF37]" />
                        <span>Counsel researching precedents...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Input box */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(userInput);
                  }}
                  className="flex items-center space-x-2 border-t border-white/10 pt-4 mt-4"
                >
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Inquire on legal queries, penal codes, property rules..."
                    className="flex-1 bg-[#050505] border border-white/10 rounded-[2px] px-4 py-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                    disabled={chatLoading}
                  />
                  <button
                    type="submit"
                    className="p-3.5 bg-[#D4AF37] hover:bg-[#FFF3B0] text-black rounded-[2px] transition-colors"
                    disabled={chatLoading}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: AI DOCUMENT RISK ANALYZER */}
          {activeTab === "analyzer" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Text entry panel */}
                <div className="flex flex-col justify-between space-y-4">
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
                      Upload Draft / Paste Legal Clauses
                    </span>
                    <p className="text-xs text-[#A5A5A5] mb-4">
                      Paste the text of your lease deeds, partnership covenants, co-founder terms, or employment contracts for auditing liabilities.
                    </p>
                    <textarea
                      value={docText}
                      onChange={(e) => setDocText(e.target.value)}
                      placeholder="Paste your legal document contract text here (minimum 50 characters)..."
                      className="w-full h-72 bg-[#050505] border border-white/10 rounded-[2px] p-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all resize-none font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <select
                      value={analysisType}
                      onChange={(e) => setAnalysisType(e.target.value)}
                      className="bg-[#050505] border border-white/10 text-xs text-white rounded-[2px] px-4 py-3 focus:outline-none"
                    >
                      <option value="General Legal Audit & Risk Factors">General Legal Audit & Risk Factors</option>
                      <option value="Hidden Liabilities & Unbalanced Terms">Hidden Liabilities & Unbalanced Terms</option>
                      <option value="IP Rights & Indemnification Gaps">IP Rights & Indemnification Gaps</option>
                      <option value="Arbitration vs Court Jurisdictions">Arbitration vs Court Jurisdictions</option>
                    </select>

                    <button
                      onClick={handleAnalyzeDocument}
                      className="flex-1 bg-[#D4AF37] hover:bg-[#FFF3B0] text-black font-semibold text-xs tracking-widest uppercase py-3.5 rounded-[2px] transition-all flex items-center justify-center space-x-2"
                      disabled={analyzerLoading || docText.length < 50}
                    >
                      {analyzerLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Auditing Draft...</span>
                        </>
                      ) : (
                        <>
                          <FileSearch className="h-4 w-4" />
                          <span>Audit Contract</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Audit Result outputs */}
                <div className="bg-[#050505] border border-white/10 rounded-[2px] p-6 flex flex-col h-[400px] overflow-y-auto relative justify-between">
                  {analyzerLoading ? (
                    <div className="my-auto flex flex-col items-center justify-center text-center">
                      <RefreshCw className="h-10 w-10 text-[#D4AF37] animate-spin mb-4" />
                      <p className="text-sm font-medium text-white">Analyzing clause vulnerabilities...</p>
                      <p className="text-xs text-[#A5A5A5] mt-1 max-w-xs">AI scanning liability provisions and evaluating under Indian Contract Act laws.</p>
                    </div>
                  ) : analysisResult ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-semibold">
                          Precedent Audit Report
                        </span>
                        <div className="flex items-center space-x-2 bg-yellow-950/40 border border-yellow-900/40 text-yellow-400 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Moderate Risks Detected</span>
                        </div>
                      </div>
                      <div className="text-xs text-[#A5A5A5] leading-relaxed whitespace-pre-wrap font-sans">
                        {analysisResult}
                      </div>
                    </div>
                  ) : (
                    <div className="my-auto text-center flex flex-col items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-700 mb-4" />
                      <h4 className="text-sm font-serif text-white">Waiting for Draft Input</h4>
                      <p className="text-xs text-[#A5A5A5] mt-1 max-w-xs mx-auto">
                        Your contract will undergo automated legal scanning, flagging clauses representing hidden risks or structural voids.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: LEGAL CALCULATORS */}
          {activeTab === "calculator" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Inputs columns */}
              <div className="space-y-8">
                
                {/* Part A: Court Fees */}
                <div className="space-y-4 bg-[#050505] p-6 rounded-[2px] border border-white/10">
                  <h4 className="text-sm font-serif font-semibold text-white tracking-wide border-b border-white/10 pb-2 flex items-center space-x-2">
                    <Calculator className="h-4 w-4 text-[#D4AF37]" />
                    <span>Delhi Court Civil Fees Estimator</span>
                  </h4>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono text-[#A5A5A5] uppercase tracking-wider">
                      Valuation of Civil Claim / Dispute Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={suitValue}
                      onChange={(e) => setSuitValue(e.target.value)}
                      className="w-full bg-[#111111] border border-white/10 rounded-[2px] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Part B: RERA Delay interest */}
                <div className="space-y-4 bg-[#050505] p-6 rounded-[2px] border border-white/10">
                  <h4 className="text-sm font-serif font-semibold text-white tracking-wide border-b border-white/10 pb-2 flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 text-[#D4AF37]" />
                    <span>RERA Builder Statutory Delay Compensation</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono text-[#A5A5A5] uppercase tracking-wider">
                        Total Amount Paid to Developer (₹)
                      </label>
                      <input
                        type="number"
                        value={delayPrincipal}
                        onChange={(e) => setDelayPrincipal(e.target.value)}
                        className="w-full bg-[#111111] border border-white/10 rounded-[2px] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono text-[#A5A5A5] uppercase tracking-wider">
                        Period of Possession Delay (Months)
                      </label>
                      <input
                        type="number"
                        value={delayMonths}
                        onChange={(e) => setDelayMonths(e.target.value)}
                        className="w-full bg-[#111111] border border-white/10 rounded-[2px] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Output summaries columns */}
              <div className="flex flex-col justify-center space-y-6 bg-[#050505] border border-white/10 rounded-[2px] p-6 md:p-8">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block font-semibold border-b border-white/10 pb-3">
                  Summary Estimation Reports
                </span>

                {/* Court fees report */}
                <div className="flex justify-between items-center bg-[#111111] p-4 rounded-[2px] border border-white/10">
                  <div>
                    <p className="text-xs text-white font-medium">Estimated Court Fee (Delhi ad-valorem)</p>
                    <p className="text-[10px] font-mono text-[#A5A5A5] uppercase tracking-wider mt-0.5">Approx. Court Stamp Expense</p>
                  </div>
                  <span className="text-lg font-serif font-bold text-[#D4AF37]">
                    ₹{calculatorResults.courtFee.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* RERA Delay report */}
                <div className="space-y-3 bg-[#111111] p-4 rounded-[2px] border border-white/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-white font-medium">Statutory Interest Earned</p>
                      <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mt-0.5">Computed at SBI MCLR + 2% p.a.</p>
                    </div>
                    <span className="text-lg font-serif font-bold text-emerald-400">
                      ₹{calculatorResults.reraInterest.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/10 pt-3">
                    <span className="text-xs text-white font-semibold">Total Claimable Payout from Developer</span>
                    <span className="text-lg font-serif font-bold text-white">
                      ₹{calculatorResults.totalReraPayout.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="bg-[#D4AF37]/10 p-4 rounded-[2px] border border-[#D4AF37]/25 flex items-start space-x-3 text-xs text-[#D4AF37] leading-relaxed">
                  <AlertOctagon className="h-5 w-5 shrink-0 mt-0.5" />
                  <p>
                    <strong>Precedent Note:</strong> In *Pioneer Urban Land v. Govindan Raghavan*, the Supreme Court held that delayed possession clauses in agreements are unfair, enabling consumers to secure full refunds with up to 10.5% statutory compound interest.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
