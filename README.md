# Gemini AI Chatbot
A responsive chat interface with Google Gemini API integration featuring real-time streaming responses.

## Features
- 💬 Real-time chat with streaming responses
- 🎨 Modern UI built with Shadcn UI components
- ⚡ Next.js 14 (App Router)
- 📱 Fully responsive design
- 📋 Copy message functionality
- 🔄 Chat history persistence
- 🌓 Light/Dark mode 

## Technical Stack
- Framework: Next.js 14 (App Router)
- UI Library: Shadcn UI
- Styling: Tailwind CSS
- AI Integration: Google Generative AI SDK (@google/generative-ai)

## State Management: 
- React hooks

## Deployment: 
Vercel (recommended)

## Getting Started
- Prerequisites
- Node.js v18+

### Google Gemini API key (free from Google AI Studio)

## Project Setup
1. Clone the repository: `git clone https://github.com/Tanya22bose/gemini-chatbot.git`
2. cd gemini-chatbot
3. Create `.env` file: Add your Gemini API key to .env:`NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here`
4. `npm install`
5. Run the development server: `npm run dev`

## Project Structure
1. `/src/app/api/chat/route.ts`          (Gemini API endpoint)
2. `/src/components/chat/Chat.tsx`       (Main chat component)
3. `/src/lib/utils.ts`                   (Helper functions)

## Bonus Features Implemented
- ✅ Message copy functionality
- ✅ Chat history persistence (localStorage)
- ✅ Mobile-responsive design
- ✅ Loading animations
