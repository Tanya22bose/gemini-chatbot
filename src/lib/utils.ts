import { Message } from "@/components/chat/types";
import { clsx, type ClassValue } from "clsx"
import { FormEvent } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Processes the streaming response from the API
 */
export const processStreamResponse = async (
  response: Response,
  newMessages: Message[],
  updateMessagesWithResponse: Function,
) => {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let responseText = "";

  if (!reader) return;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Decode and accumulate the response text
    const chunk = decoder.decode(value);
    responseText += chunk;

    // Update messages with the latest response
    updateMessagesWithResponse(newMessages, responseText);
  }
};

export const getApiError = (error: unknown): string => {
  return error instanceof Error ? error.message : "Failed to get response";
};

// Handles the API response
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.details || errorData.error || "Request failed");
  }

  if (!response.body) {
    throw new Error("No response body");
  }

  return response;
};

// Helper function to validate input
export const validateInput = (input: string, loading: boolean): boolean => {
  return !input.trim() || loading;
};

// Creates a new user message object
export const createUserMessage = (input: string): Message => ({
  role: "user",
  parts: [{ text: input }],
});

export const handleFormSubmission = (e: KeyboardEvent | FormEvent, handleSubmit: Function) => {
  e.preventDefault();
  handleSubmit();
}

//submit form on key down
export const handleKeyDown = (e: React.KeyboardEvent, handleSubmit: Function) => {
  if (e.key === "Enter" && !e.shiftKey) {
    handleFormSubmission(e, handleSubmit)
  }
};