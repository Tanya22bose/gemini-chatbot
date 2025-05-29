"use client";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Button } from "../ui/button";
import { useChatSession } from "../hooks/useChatSession";

export function Chat() {
  const {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    clearChat,
  } = useChatSession();

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto p-4 gap-4">
      <MessageList messages={messages} isLoading={isLoading} />
      <div className="flex h-full w-full items-center justify-center gap-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center"
        >
          <MessageInput
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </form>
        <Button onClick={clearChat} disabled={messages.length === 0}>
          Clear Chat
        </Button>
      </div>
    </div>
  );
}
