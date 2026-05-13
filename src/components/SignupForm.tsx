"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "loading" | "success" | "already" | "error";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase
      .from("subscribers")
      .insert({ email });

    if (error) {
      const isDuplicate =
        error.code === "23505" ||
        /duplicate|unique/i.test(error.message);
      if (isDuplicate) {
        setStatus("already");
        return;
      }
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setStatus("success");
  }

  const statusColor =
    status === "success" || status === "already"
      ? "var(--color-rose)"
      : status === "error"
        ? "var(--color-plum)"
        : "var(--color-soft-gray)";

  return (
    <div className="mx-auto max-w-[360px]">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center justify-center"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          className="flex-1 min-w-0 rounded-full px-5 py-3 text-sm placeholder:text-[var(--color-soft-gray)]"
          style={{
            backgroundColor: "var(--color-cream)",
            border: "1px solid var(--color-rose)",
            color: "var(--color-deep-plum)",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full px-5 py-3 text-sm lowercase transition-colors hover:bg-[var(--color-plum)]!"
          style={{
            backgroundColor: "var(--color-deep-plum)",
            color: "var(--color-soft-pink)",
          }}
        >
          follow
        </button>
      </form>
      <p
        className="text-xs mt-3 text-center"
        style={{ color: statusColor }}
      >
        {status === "loading" && "saving..."}
        {status === "success" && "thank you · you'll hear from her"}
        {status === "already" && "you're already on the list ✓"}
        {status === "error" && errorMessage}
        {status === "idle" && " "}
      </p>
    </div>
  );
}
