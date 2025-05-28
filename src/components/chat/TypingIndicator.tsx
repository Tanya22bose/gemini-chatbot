/**
 *
 * @returns a loader while loading messages from gemini api server
 */
export function TypingIndicator() {
  return (
    <div className="flex space-x-1 p-2 rounded-full w-fit">
      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
      <div
        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
        style={{ animationDelay: "0.2s" }}
      />
      <div
        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
}
