"use client";

import { useEffect, useState } from "react";

const BIRTH_DATE = new Date("2026-06-01T00:00:00");

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function getStage(day: number): string {
  if (day <= 14) return "nursery";
  if (day <= 35) return "toddler";
  if (day <= 70) return "child";
  if (day <= 100) return "teen";
  return "adult";
}

function computeLabel(): string {
  const birth = startOfDay(BIRTH_DATE);
  const today = startOfDay(new Date());
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    (today.getTime() - birth.getTime()) / msPerDay,
  );

  if (diffDays < 0) {
    return `pre-birth · day ${diffDays}`;
  }
  const dayNumber = diffDays + 1;
  return `day ${dayNumber} · ${getStage(dayNumber)}`;
}

export default function DayCounter() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(computeLabel());
  }, []);

  if (label === null) return null;

  return (
    <span
      className="text-sm font-sans lowercase"
      style={{ color: "var(--color-soft-gray)" }}
    >
      {label}
    </span>
  );
}
