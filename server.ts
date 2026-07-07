import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Initialize environment variables
dotenv.config();

// Ensure GEMINI_API_KEY is available
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

// Simple, extremely fast in-memory Rate Limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const rateLimiter = (limit: number, windowMs: number) => {
  return (req: any, res: any, next: any) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const now = Date.now();
    const clientData = rateLimitMap.get(ip);

    if (!clientData || now > clientData.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    clientData.count++;
    if (clientData.count > limit) {
      return res.status(429).json({
        error: "Too many requests. Please try again later.",
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
      });
    }
    next();
  };
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // Limit request payload sizes to prevent Denial of Service (DoS) attacks
  app.use(express.json({ limit: "2mb" }));

  // API Route: AI Legal Chatbot Assistant
  app.post("/api/chat", rateLimiter(20, 60 * 1000), async (req, res) => {
    try {
      const { messages, systemInstruction } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      // Secure input validation and message bounds (prevent long inputs or garbage payloads)
      const sanitizedMessages = messages.map((m: any) => {
        if (!m || typeof m.content !== "string") {
          throw new Error("Invalid message content format.");
        }
        return {
          role: m.role === "assistant" || m.role === "model" ? "model" : "user",
          parts: [{ text: m.content.substring(0, 8000) }], // Restrict length per message to prevent payload swelling
        };
      });

      // Use gemini-2.5-flash for balanced latency & legal knowledge representation
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: sanitizedMessages,
        config: {
          systemInstruction: systemInstruction || "You are an elite legal AI assistant representing Advocate Mahesh Kumar Sharma, a premier lawyer. Answer professionally, clearly, and elegantly. Always state your alignment with Mahesh Kumar Sharma's legal expertise and values.",
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      });

      const reply = response.text || "I apologize, but I could not formulate a response. Please try again.";
      res.json({ content: reply });
    } catch (err: any) {
      console.error("Gemini Chat API Error:", err);
      res.status(500).json({ error: "Failed to process chat consultation. Please try again later." });
    }
  });

  // API Route: AI Document Analyzer
  app.post("/api/analyze-document", rateLimiter(10, 60 * 1000), async (req, res) => {
    try {
      const { documentText, analysisType } = req.body;
      if (!documentText || typeof documentText !== "string") {
        return res.status(400).json({ error: "documentText is required." });
      }

      // Security limit: cap text to prevent resource exhaustion and timeout
      const sanitizedDocText = documentText.substring(0, 30000);
      const sanitizedAnalysisType = typeof analysisType === "string" ? analysisType.substring(0, 100) : "General Legal Review";

      const prompt = `
        Please perform a professional legal review of the following document.
        Analysis Requested: ${sanitizedAnalysisType}
        
        Analyze for:
        1. Executive Summary: High-level overview of the document's nature.
        2. Critical Risk Factors: Identify potential liabilities, hidden terms, or unbalanced clauses.
        3. Key Recommendations: Concrete, actionable changes to safeguard interests.
        4. Summary of Major Clauses: List important timelines, financial values, or terminations.

        Provide the analysis in structured Markdown format, with elegant bullet points.
        Maintain a highly professional, meticulous legal tone.

        Document:
        ---
        ${sanitizedDocText}
        ---
      `;

      // Use gemini-2.5-pro for complex analytical tasks like document analysis
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
          systemInstruction: "You are a meticulous senior legal auditor and contract specialist working at the office of Advocate Mahesh Kumar Sharma. Your goal is to pinpoint risks, loopholes, and strategic legal advice.",
          temperature: 0.2,
        }
      });

      res.json({ analysis: response.text });
    } catch (err: any) {
      console.error("Document Analyzer API Error:", err);
      res.status(500).json({ error: "Failed to analyze document. Please ensure it is a valid format and try again." });
    }
  });

  // API Route: Secure Case Status Portal Database Search
  app.get("/api/case-status/:caseNo", (req, res) => {
    // Secure input validation to prevent path-traversal or injection
    const caseNo = req.params.caseNo.trim().toUpperCase().substring(0, 40);
    if (!/^[A-Z0-9\/_\-]+$/.test(caseNo)) {
      return res.status(400).json({ error: "Invalid case number format. Only alphanumeric characters, dashes, and slashes are allowed." });
    }
    
    // Generates realistic case data based on a pattern for mock retrieval,
    // but allowing flexible lookups to make it feel deeply interactive.
    const mockCases: Record<string, any> = {
      "MKS/2026/8942": {
        caseNo: "MKS/2026/8942",
        clientName: "Aarush Sharma",
        court: "Supreme Court of India",
        matter: "Civil Appeal - Land Acquisition Dispute",
        status: "Active - Next Hearing Scheduled",
        nextHearing: "2026-07-28",
        previousHearings: [
          { date: "2026-06-15", summary: "Interim stay order granted in favor of our client." },
          { date: "2026-05-10", summary: "Notice served to respondents; counter-affidavits filed." }
        ],
        documents: [
          { name: "Special Leave Petition.pdf", date: "2026-04-12" },
          { name: "Stay Application Order.pdf", date: "2026-06-15" }
        ],
        timeline: [
          { title: "Case Filed", date: "2026-04-02", desc: "Successfully drafted and registered in Registry." },
          { title: "First Hearing", date: "2026-05-10", desc: "Arguable case admitted." },
          { title: "Interim Order", date: "2026-06-15", desc: "Stay granted protecting client property possession." }
        ]
      },
      "MKS/2026/1024": {
        caseNo: "MKS/2026/1024",
        clientName: "Siddharth Birla",
        court: "Delhi High Court",
        matter: "Commercial Suit - IP Trademark Infringement",
        status: "Active - Under Pleadings",
        nextHearing: "2026-08-04",
        previousHearings: [
          { date: "2026-05-20", summary: "Ad-interim injunction granted against defendant from using trademark." }
        ],
        documents: [
          { name: "Plaint & Plaint Documents.pdf", date: "2026-05-01" },
          { name: "Injunction Order.pdf", date: "2026-05-20" }
        ],
        timeline: [
          { title: "Suit Filed", date: "2026-05-01", desc: "Filed Commercial Suit for TM infringement." },
          { title: "Injunction Hearing", date: "2026-05-20", desc: "Successfully argued prima facie case, balance of convenience, irreparable loss." }
        ]
      }
    };

    const targetCase = mockCases[caseNo];
    if (targetCase) {
      return res.json(targetCase);
    }

    // Dynamic case generation if they search any valid format to ensure 100% usability
    if (caseNo.startsWith("MKS/")) {
      return res.json({
        caseNo,
        clientName: "Valued Client",
        court: "High Court of Delhi",
        matter: "Criminal Matter / Special Leave Petition",
        status: "In Progress - Notice Issued",
        nextHearing: "2026-08-15",
        previousHearings: [
          { date: "2026-06-10", summary: "Case admitted for expedited hearing." }
        ],
        documents: [
          { name: "Draft Petition.pdf", date: "2026-05-20" }
        ],
        timeline: [
          { title: "Petition Drafted", date: "2026-05-10", desc: "Reviewed by Advocate Mahesh Kumar Sharma." },
          { title: "Admitted", date: "2026-06-10", desc: "Notice issued to state representatives." }
        ]
      });
    }

    res.status(404).json({ error: "Case not found. Please try searching for MKS/2026/8942 or contact the office." });
  });

  // Vite development vs. production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
