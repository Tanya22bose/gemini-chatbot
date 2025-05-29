"use client";

import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Role = "user" | "model";

export function MessageBubble({ role, text }: { role: Role; text: string }) {
  const isUser = role === "user";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!");
  };

  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "relative rounded-xl px-4 py-3 max-w-[80%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute cursor-pointer hover:text-foreground",
            isUser
              ? "top-2 right-2 text-primary-foreground/70"
              : "top-2 left-2 text-muted-foreground "
          )}
          onClick={copyToClipboard}
          aria-label="Copy message"
        >
          <Copy className="w-4 h-4" />
        </Button>
        <p className={cn("whitespace-pre-wrap pr-8", !isUser && "pl-8")}>
          {text}
        </p>
      </div>
    </div>
  );
}
