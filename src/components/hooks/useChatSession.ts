"use client";
import { useState, useCallback, useEffect } from "react";
import { Message } from "../chat/types";
import { useMutation } from "@tanstack/react-query";

export function useChatSession() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    // Load saved messages
    useEffect(() => {
        const saved = localStorage.getItem("chatMessages");
        if (saved) setMessages(JSON.parse(saved));
    }, []);

    // Save messages to localStorage
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("chatMessages", JSON.stringify(messages));
        }
    }, [messages]);

    const { mutate: sendMessage, isPending: isLoading } = useMutation({
        mutationFn: async (userInput: string) => {
            const userMessage: Message = {
                role: "user",
                parts: [{ text: userInput }],
            };

            const updatedMessages = [...messages, userMessage];
            setMessages(updatedMessages);
            setInput("");

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.details || "Request failed");
            }

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let aiResponse = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                aiResponse += decoder.decode(value);
                setMessages([
                    ...updatedMessages,
                    { role: "model", parts: [{ text: aiResponse }] }
                ]);
            }
        },
        onError: (error) => {
            setMessages(prev => [
                ...prev,
                { role: "model", parts: [{ text: `Error: ${error.message}` }] }
            ]);
        }
    });

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) sendMessage(input);
    }, [input, sendMessage]);

    const clearChat = useCallback(() => {
        setMessages([]);
        localStorage.removeItem("chatMessages");
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

    return {
        messages,
        input,
        isLoading,
        handleInputChange,
        handleSubmit,
        clearChat
    };
}