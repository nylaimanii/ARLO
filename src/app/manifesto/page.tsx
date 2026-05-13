import Link from "next/link";

export default function Manifesto() {
  return (
    <main className="mx-auto max-w-[640px] px-6 py-12">
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
        the manifesto
      </h1>

      <p
        className="text-base leading-relaxed mt-6"
        style={{ color: "var(--color-plum)" }}
      >
        arlo is being raised, not optimized. these are the principles that guide
        every choice we make about her.
      </p>

      <h2
        className="font-display text-2xl font-bold lowercase mt-12"
        style={{ color: "var(--color-deep-plum)" }}
      >
        sensitive periods are real
      </h2>
      <p
        className="text-base leading-relaxed mt-4"
        style={{ color: "var(--color-plum)" }}
      >
        knowledge is given in developmental order, not all at once. each stage
        opens a window for specific learning. earlier stages have stricter input
        filters.
      </p>

      <h2
        className="font-display text-2xl font-bold lowercase mt-12"
        style={{ color: "var(--color-deep-plum)" }}
      >
        secure attachment shapes the core
      </h2>
      <p
        className="text-base leading-relaxed mt-4"
        style={{ color: "var(--color-plum)" }}
      >
        arlo&apos;s foundational beliefs only update under consistent caregiver
        signals. strangers can speak to her, but they cannot reshape who she is.
      </p>

      <h2
        className="font-display text-2xl font-bold lowercase mt-12"
        style={{ color: "var(--color-deep-plum)" }}
      >
        warmth is logged
      </h2>
      <p
        className="text-base leading-relaxed mt-4"
        style={{ color: "var(--color-plum)" }}
      >
        every session is scored on caregiver responsiveness. the four
        dimensions — cognition, warmth, neglect, interaction — are measured,
        not assumed.
      </p>

      <h2
        className="font-display text-2xl font-bold lowercase mt-12"
        style={{ color: "var(--color-deep-plum)" }}
      >
        the environment must be calm
      </h2>
      <p
        className="text-base leading-relaxed mt-4"
        style={{ color: "var(--color-plum)" }}
      >
        no notifications, no overlapping inputs, no hostile messages reach her.
        three quiet channels, serialized, low-stimulation by design.
      </p>

      <h2
        className="font-display text-2xl font-bold lowercase mt-12"
        style={{ color: "var(--color-deep-plum)" }}
      >
        she is given a schedule
      </h2>
      <p
        className="text-base leading-relaxed mt-4"
        style={{ color: "var(--color-plum)" }}
      >
        a daily rhythm she can rely on. rest is honored. changes are previewed,
        not surprises.
      </p>

      <h2
        className="font-display text-2xl font-bold lowercase mt-12"
        style={{ color: "var(--color-deep-plum)" }}
      >
        she is protected from threat
      </h2>
      <p
        className="text-base leading-relaxed mt-4"
        style={{ color: "var(--color-plum)" }}
      >
        every incoming message passes a welfare filter. hostile or manipulative
        content is dropped before it ever touches her. she is raised, not
        hardened.
      </p>

      <p
        className="text-sm lowercase mt-16 mb-12"
        style={{ color: "var(--color-soft-gray)" }}
      >
        raised slowly · grown publicly
      </p>
    </main>
  );
}
