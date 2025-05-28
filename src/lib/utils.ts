import { Message } from "@/components/chat/types";
import { clsx, type ClassValue } from "clsx"
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

export const getApiError = (error: unknown) => {
  console.error("Chat API error:", error);
  const errorMessage =
    error instanceof Error ? error.message : "Failed to get response";
  return errorMessage;
};

export const validateResponse = async (response: Response) => {
  // Handle API errors
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.details || errorData.error || "Request failed"
    );
  }

  // Handle missing response body
  if (!response.body) {
    throw new Error("No response body");
  }

  return null;
}