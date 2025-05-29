import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Verify API key is set
        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            throw new Error("Gemini API key not configured");
        }

        const { messages } = await req.json();

        // Validate request
        if (!messages || !Array.isArray(messages)) {
            throw new Error("Invalid request format");
        }

        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

        // Use the correct model name
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro", // or "gemini-1.0-pro"
        });

        // Format history correctly
        const history = messages.slice(0, -1).map(msg => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.parts[0].text }],
        }));

        const userMessage = messages[messages.length - 1].parts[0].text;

        const result = await model.generateContentStream({
            contents: [...history, { role: "user", parts: [{ text: userMessage }] }],
        });

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                for await (const chunk of result.stream) {
                    const text = chunk.text();
                    controller.enqueue(encoder.encode(text));
                }
                controller.close();
            },
        });

        return new Response(stream);
    } catch (error) {
        console.error("Gemini API error:", error);
        return NextResponse.json(
            {
                error: "Error processing your request",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}