"use client";

import { Chat } from "@/components/chat/Chat";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ToggleTheme />
        <Chat />
      </div>
    </QueryClientProvider>
  );
}
