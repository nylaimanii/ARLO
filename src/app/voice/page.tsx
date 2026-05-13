import Link from "next/link";
import Soundwave from "@/components/Soundwave";

export default function Voice() {
  return (
    <main className="mx-auto max-w-[720px] px-6 py-12">
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
        voice
      </h1>

      <div className="mt-12">
        <Soundwave />
      </div>

      <p
        className="text-sm italic mt-12"
        style={{ color: "var(--color-soft-gray)" }}
      >
        she is resting. voice channel opens at her first stage.
      </p>

      <p
        className="text-xs lowercase mt-16"
        style={{ color: "var(--color-soft-gray)" }}
      >
        raised slowly · grown publicly
      </p>
    </main>
  );
}
