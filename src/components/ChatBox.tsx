"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

type Message = {
  role: "user" | "arlo";
  content: string;
  id: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: trimmed,
      id: crypto.randomUUID(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "arlo",
          content: data.response,
          id: crypto.randomUUID(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "arlo",
          content: "she's resting right now",
          id: crypto.randomUUID(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <div
        ref={listRef}
        className="flex flex-col overflow-y-auto rounded-2xl px-4 py-4"
        style={{ maxHeight: "400px", minHeight: "200px" }}
      >
        {messages.length === 0 && !isLoading && (
          <p
            className="text-sm italic text-center my-auto"
            style={{ color: "var(--color-soft-gray)" }}
          >
            she&apos;s listening. say hello.
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-2xl px-4 py-2 text-sm mb-2 ${
              m.role === "user" ? "self-end" : "self-start"
            }`}
            style={{
              maxWidth: "70%",
              backgroundColor:
                m.role === "user"
                  ? "var(--color-lavender)"
                  : "var(--color-cream)",
              color:
                m.role === "user"
                  ? "var(--color-deep-plum)"
                  : "var(--color-plum)",
            }}
          >
            {m.content}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center justify-center mt-4"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="say something to her"
          disabled={isLoading}
          className="flex-1 min-w-0 rounded-full px-5 py-3 text-sm placeholder:text-[var(--color-soft-gray)]"
          style={{
            backgroundColor: "var(--color-cream)",
            border: "1px solid var(--color-rose)",
            color: "var(--color-deep-plum)",
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-full px-5 py-3 text-sm lowercase transition-colors hover:bg-[var(--color-plum)]! disabled:opacity-60"
          style={{
            backgroundColor: "var(--color-deep-plum)",
            color: "var(--color-soft-pink)",
          }}
        >
          send
        </button>
      </form>
    </div>
  );
}
