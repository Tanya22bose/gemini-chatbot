"use client";

import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CornerDownLeft } from "lucide-react";
import {
  getApiError,
  processStreamResponse,
  validateResponse,
} from "@/lib/utils";
import { Message } from "./types";
import { LoadInitialMessage } from "./LoadInitialMessage";

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  const handleSend = async () => {
    // Don't send empty messages or while waiting for a response
    if (!input.trim() || loading) return;

    // Create new user message
    const userMessage: Message = {
      role: "user",
      parts: [{ text: input }],
    };

    // Update messages state and clear input
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const errors = validateResponse(response);
      if (!errors) {
        await processStreamResponse(
          response,
          newMessages,
          updateMessagesWithResponse
        );
      }
    } catch (error) {
      const errorMessage = getApiError(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: `Error: ${errorMessage}` }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateMessagesWithResponse = (
    currentMessages: Message[],
    responseText: string
  ) => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      // If the last message is from the model, update it
      if (lastMessage?.role === "model") {
        return [
          ...prev.slice(0, -1),
          { role: "model", parts: [{ text: responseText }] },
        ];
      }
      // Otherwise, add a new message
      return [
        ...currentMessages,
        { role: "model", parts: [{ text: responseText }] },
      ];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && <LoadInitialMessage />}
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            role={message.role}
            text={message.parts[0].text}
          />
        ))}

        {loading && <TypingIndicator />}

        {/* Auto-scroll anchor */}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="pr-10"
          disabled={loading}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-1 top-1 h-7 w-7"
          disabled={!input.trim() || loading}
        >
          <CornerDownLeft className="h-4 w-4" />
        </Button>
      </form>
      <Button variant="default" onClick={handleClearChat} className="mt-4">
        Clear Chat
      </Button>
    </div>
  );
}
