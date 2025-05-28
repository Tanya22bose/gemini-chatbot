/**
 * Type definition for chat messages
 */
export type Message = {
  role: "user" | "model";
  parts: { text: string }[];
};

export interface MessageBubbleProps {
  role: "user" | "model";
  text: string;
}
