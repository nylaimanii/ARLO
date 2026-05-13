import DayCounter from "@/components/DayCounter";
import SignupForm from "@/components/SignupForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1
          className="font-display text-7xl md:text-8xl font-bold lowercase"
          style={{ color: "var(--color-deep-plum)" }}
        >
          arlo
        </h1>
        <p
          className="text-xl italic mt-4"
          style={{ color: "var(--color-plum)" }}
        >
          a welfare-first developmental ai companion
        </p>
        <div
          className="mt-8 mx-auto h-px w-10"
          style={{ backgroundColor: "var(--color-rose)" }}
        />
        <div className="mt-8">
          <DayCounter />
        </div>
        <div className="mt-10">
          <SignupForm />
        </div>
        <Link
          href="/manifesto"
          className="inline-block text-sm mt-6 hover:text-[var(--color-deep-plum)]! hover:decoration-[var(--color-plum)]!"
          style={{
            color: "var(--color-plum)",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            textDecorationColor: "var(--color-rose)",
          }}
        >
          read the manifesto →
        </Link>
        <p
          className="text-sm mt-6"
          style={{ color: "var(--color-soft-gray)" }}
        >
          raised slowly · grown publicly
        </p>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/voice"
            className="rounded-full px-5 py-2 text-sm lowercase transition-colors hover:bg-[var(--color-lavender)]! hover:text-[var(--color-deep-plum)]!"
            style={{
              backgroundColor: "var(--color-cream)",
              border: "1px solid var(--color-rose)",
              color: "var(--color-plum)",
            }}
          >
            voice
          </Link>
          <Link
            href="/chat"
            className="rounded-full px-5 py-2 text-sm lowercase transition-colors hover:bg-[var(--color-lavender)]! hover:text-[var(--color-deep-plum)]!"
            style={{
              backgroundColor: "var(--color-cream)",
              border: "1px solid var(--color-rose)",
              color: "var(--color-plum)",
            }}
          >
            chat
          </Link>
          <Link
            href="/viewer"
            className="rounded-full px-5 py-2 text-sm lowercase transition-colors hover:bg-[var(--color-lavender)]! hover:text-[var(--color-deep-plum)]!"
            style={{
              backgroundColor: "var(--color-cream)",
              border: "1px solid var(--color-rose)",
              color: "var(--color-plum)",
            }}
          >
            viewer
          </Link>
        </div>
      </div>
    </main>
  );
}
