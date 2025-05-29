A responsive chat interface with Google Gemini API integration featuring real-time streaming responses.

Features
💬 Real-time chat with streaming responses

🎨 Modern UI built with Shadcn UI components

⚡ Next.js 14 (App Router)

📱 Fully responsive design

📋 Copy message functionality

🔄 Chat history persistence

🌓 Light/Dark mode (optional bonus)

Technical Stack
Framework: Next.js 14 (App Router)

UI Library: Shadcn UI

Styling: Tailwind CSS

AI Integration: Google Generative AI SDK (@google/generative-ai)

State Management: React hooks

Deployment: Vercel (recommended)

Getting Started
Prerequisites
Node.js v18+

Google Gemini API key (free from Google AI Studio)

Git

Installation
Clone the repository:
git clone https://github.com/your-username/gemini-chatbot.git
cd gemini-chatbot

Install dependencies:
npm install

Create .env file:
Add your Gemini API key to .env:

env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here

Run the development server:
npm run dev

Deployment
Vercel (recommended):

Push your code to GitHub

Create new project in Vercel

Add environment variable NEXT_PUBLIC_GEMINI_API_KEY

Deploy!

Netlify:

Similar process to Vercel

Set up continuous deployment from GitHub

Project Structure
/src
├── app
│   ├── api
│   │   └── chat
│   │       └── route.ts        # Gemini API endpoint
│   └── globals.css
├── components
│   ├── chat
│   │   ├── Chat.tsx            # Main chat component
│   │   ├── MessageBubble.tsx
│   │   └── TypingIndicator.tsx
├── lib
│   └── utils.ts                # Helper functions
├── .env.example                # Environment template
└── README.md                   # This file
Implementation Highlights


Streaming Responses:

Uses ReadableStream API

Processes chunks as they arrive

Updates UI in real-time

Error Handling:

API failure detection

User-friendly error messages

Graceful recovery

UI Components:

Custom message bubbles

Typing indicators

Responsive layout

Bonus Features Implemented
✅ Message copy functionality
✅ Chat history persistence (localStorage)
✅ Mobile-responsive design
✅ Loading animations

Time Spent
Total development time: ~12 hours
(Within the 48-hour limit)

Live Demo
View Live Demo
