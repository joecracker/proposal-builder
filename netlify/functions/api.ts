import express from "express";
import serverless from "serverless-http";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
app.use(express.json({ limit: "10mb" }));

// Shared Gemini AI instance
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API route: Format raw dictation or unstructured text into clean construction scope line items
// (path is relative — the /api prefix is stripped before reaching here)
app.post("/format-section", async (req, res) => {
  try {
    const { categoryName, rawInput, currentItems } = req.body;

    if (!rawInput || typeof rawInput !== "string") {
      return res.status(400).json({ error: "Missing or invalid rawInput" });
    }

    const prompt = `You are an expert construction project manager and estimator for July's Quality Construction.
Your job is to take raw voice dictation or casual spoken notes from a contractor and convert them into clear, professional, well-structured line items for a formal construction proposal sheet.

Category Name: ${categoryName || "General Construction Scope"}
Raw Spoken/Dictated Text: "${rawInput}"
${currentItems && currentItems.length > 0 ? `Existing Line Items in this section: ${JSON.stringify(currentItems)}` : ""}

Guidelines:
1. Break down the spoken thoughts into distinct, professional bullet points/line items.
2. DO NOT require phrases like "drop down to next line" or "bullet point" in the raw text; recognize natural pauses, action verbs, materials, dimensions, and scope changes automatically.
3. Use precise, clear construction terminology (e.g., "Install 1/2 in. moisture-resistant drywall", "Furnish and install architectural shingles", "Prepare subfloor and tape seams").
4. If the user mentioned quantities, materials, dimensions, or specific installation instructions, highlight them cleanly.
5. Keep each line item sharp, concise, and professional.
6. Return an array of formatted line item strings.

Return JSON in this format:
{
  "formattedItems": [
    "Line item 1...",
    "Line item 2..."
  ],
  "summary": "Brief 1-sentence summary of changes made"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            formattedItems: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of cleanly formatted line items",
            },
            summary: {
              type: Type.STRING,
              description: "Summary of formatting applied",
            },
          },
          required: ["formattedItems"],
        },
      },
    });

    const resultText = response.text || "{}";
    const parsed = JSON.parse(resultText);

    return res.json({
      success: true,
      formattedItems: parsed.formattedItems || [],
      summary: parsed.summary || "Items formatted successfully",
    });
  } catch (error: any) {
    console.error("Error formatting scope section:", error);
    return res.status(500).json({
      error: "Failed to format text with AI",
      details: error.message || String(error),
    });
  }
});

// API route: Parse pasted document text or imported template content into structured proposal sections
app.post("/parse-document", async (req, res) => {
  try {
    const { documentText } = req.body;

    if (!documentText || typeof documentText !== "string") {
      return res.status(400).json({ error: "Missing documentText" });
    }

    const prompt = `You are an AI assistant for July's Quality Construction proposal generator.
Parse the following unstructured or imported document text into a structured construction proposal object.

Document Content:
"""
${documentText}
"""

Extract as much as possible:
- Client Name
- Client Address / Site Location
- Phone Number / Email
- Proposal Date / Project Title
- Scope categories (e.g., Demolition, Framing, Roofing, Electrical, Finishes, Cleanup) with their bullet points
- Special Terms / Legal Clauses if present

Return JSON in this format:
{
  "clientName": "...",
  "siteAddress": "...",
  "phone": "...",
  "email": "...",
  "projectName": "...",
  "categories": [
    {
      "name": "Category Name",
      "items": ["Item 1", "Item 2"]
    }
  ],
  "legalTerms": "..."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            clientName: { type: Type.STRING },
            siteAddress: { type: Type.STRING },
            phone: { type: Type.STRING },
            email: { type: Type.STRING },
            projectName: { type: Type.STRING },
            categories: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  items: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ["name", "items"],
              },
            },
            legalTerms: { type: Type.STRING },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, parsedData: parsed });
  } catch (error: any) {
    console.error("Error parsing document:", error);
    return res.status(500).json({ error: "Failed to parse document text" });
  }
});

export const handler = serverless(app, {
  basePath: "/.netlify/functions/api",
});
