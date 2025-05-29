"use client";
import { useScrollToBottom } from "../hooks/useScrollToBottom";
import { MessageBubble } from "./MessageBubble";
import { Message } from "./types";
import { TypingIndicator } from "./TypingIndicator";

export function MessageList({
  messages,
  isLoading,
}: {
  messages: Message[];
  isLoading: boolean;
}) {
  const bottomRef = useScrollToBottom([messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto space-y-4">
      {messages.length === 0 ? (
        <div className="h-full grid place-items-center text-center text-muted-foreground">
          <div>
            <h3 className="text-xl font-semibold">Gemini AI Chat</h3>
            <p>Start a conversation with the AI</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              role={message.role}
              text={message.parts[0].text}
            />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}
