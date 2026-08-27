import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { INITIAL_PATENTS } from "./src/data/mockPatents";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI client server-side if key exists
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
}) : null;

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiConfigured: !!ai });
});

// Get patents endpoint with optional search mode and query
app.get("/api/patents", (req, res) => {
  const { searchMode, query, company } = req.query;
  let results = [...INITIAL_PATENTS];

  if (searchMode === 'narrow') {
    // Narrow search: higher relevance score >= 85 or marked narrow
    results = results.filter(p => p.searchType === 'narrow' || p.relevanceScore >= 88);
  } else if (searchMode === 'broad') {
    // Broad search: all or 1-2 conditions met
    results = results;
  }

  if (query && typeof query === 'string') {
    const q = query.toLowerCase();
    results = results.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.applicant.toLowerCase().includes(q) ||
      p.company.toLowerCase().includes(q) ||
      p.solution.toLowerCase().includes(q) ||
      p.priorArtProblems.toLowerCase().includes(q)
    );
  }

  if (company && typeof company === 'string' && company !== '전체') {
    results = results.filter(p => p.company === company);
  }

  res.json({
    total: results.length,
    patents: results
  });
});

// AI Search expansion endpoint using Gemini API
app.post("/api/patents/ai-search", async (req, res) => {
  const { searchMode, topic } = req.body;

  if (!ai) {
    return res.status(400).json({ 
      error: "Gemini API key is not configured. Please set GEMINI_API_KEY in secrets." 
    });
  }

  try {
    const prompt = `
    당신은 전문 특허 분석가입니다. 주제 "${topic || 'MLCC 바인더 특허 검색'}"에 대한 ${searchMode === 'narrow' ? '좁은 탐색 (적합성 70% 이상 엄선된 고정밀 특허)' : '넓은 탐색 (광범위한 특허 10개 이상 추가 탐색)'}을 수행하여, 실제 특허 데이터를 기반으로 한 JSON 형식의 특허 목록을 생성해주세요.
    
    필수 포함 항목:
    - id (특허 등록번호 형식 예: KR-2026-XXXX)
    - applicant (출원인 풀네임)
    - company (소속 회사명 통일: 삼성전기, 무라타제작소, TDK, 태양유전, 교세라, LG화학, 듀폰, 3M 중 하나로 매칭)
    - applicationYear (출원년도 숫자, 예: 2024 또는 2025)
    - patentNumber (정식 특허번호)
    - title (특허 명칭)
    - priorArtProblems (종래 기술의 문제점)
    - solution (해결 방안)
    - representativeClaim (대표 청구항 1항)
    - example1 (실시예 1번 상세 내용)
    - searchType ("broad" 또는 "narrow")
    - relevanceScore (적합성 점수 70~100 사이 숫자)
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              applicant: { type: Type.STRING },
              company: { type: Type.STRING },
              applicationYear: { type: Type.INTEGER },
              patentNumber: { type: Type.STRING },
              title: { type: Type.STRING },
              priorArtProblems: { type: Type.STRING },
              solution: { type: Type.STRING },
              representativeClaim: { type: Type.STRING },
              example1: { type: Type.STRING },
              searchType: { type: Type.STRING },
              relevanceScore: { type: Type.INTEGER }
            },
            required: [
              "id", "applicant", "company", "applicationYear", 
              "patentNumber", "title", "priorArtProblems", 
              "solution", "representativeClaim", "example1", 
              "searchType", "relevanceScore"
            ]
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from Gemini");
    }

    const rawPatents = JSON.parse(text);
    const newPatents = rawPatents.map((p: any, idx: number) => ({
      ...p,
      id: p.id || `AI-PATENT-${Date.now()}-${idx}`,
      documentUrl: `https://patents.google.com/patent/${(p.patentNumber || '').replace(/[\s-]/g, '')}/ko`
    }));
    res.json({ success: true, patents: newPatents });
  } catch (error: any) {
    console.error("AI Patent Search Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI patent search results" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
