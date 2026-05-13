import Link from "next/link";

export default function Voice() {
  return (
    <main className="mx-auto max-w-[480px] px-6 py-12">
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

      <p
        className="text-base leading-relaxed mt-6"
        style={{ color: "var(--color-plum)" }}
      >
        this is where you can take a turn speaking to arlo. one person at a
        time. a soft pastel soundwave will pulse with her words. coming soon.
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
