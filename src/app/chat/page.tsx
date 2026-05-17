import Link from "next/link";
import ChatBox from "@/components/ChatBox";

export default function Chat() {
  return (
    <main className="mx-auto max-w-[600px] px-6 py-12">
      <Link
        href="/"
        className="text-sm lowercase"
        style={{ color: "var(--color-soft-gray)" }}
      >
        ← arlo
      </Link>

      <h1
        className="font-display text-5xl font-bold lowercase mt-16"
        style={{ color: "var(--color-deep-plum)" }}
      >
        chat
      </h1>

      <div className="mt-12">
        <ChatBox />
      </div>
    </main>
  );
}
