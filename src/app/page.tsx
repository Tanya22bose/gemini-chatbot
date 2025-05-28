import { Chat } from "@/components/chat/Chat";
import { ToggleTheme } from "@/components/ui/toggle-theme";

export default function Home() {
  return (
    <>
      <ToggleTheme />
      <Chat />
    </>
  );
}
