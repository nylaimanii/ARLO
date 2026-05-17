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
          she remembers
        </p>
        <div
          className="mt-8 mx-auto h-px w-10"
          style={{ backgroundColor: "var(--color-rose)" }}
        />
        <div className="mt-10">
          <SignupForm />
        </div>
        <div className="mt-12 flex items-center justify-center">
          <Link
            href="/chat"
            className="rounded-full px-5 py-2 text-sm lowercase transition-colors hover:bg-[var(--color-lavender)]! hover:text-[var(--color-deep-plum)]!"
            style={{
              backgroundColor: "var(--color-cream)",
              border: "1px solid var(--color-rose)",
              color: "var(--color-plum)",
            }}
          >
            start the conversation
          </Link>
        </div>
      </div>
    </main>
  );
}
