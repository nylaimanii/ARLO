export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1
          className="font-display text-8xl font-bold lowercase"
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
        <p
          className="text-sm mt-6"
          style={{ color: "var(--color-soft-gray)" }}
        >
          raised slowly · grown publicly
        </p>
      </div>
    </main>
  );
}
