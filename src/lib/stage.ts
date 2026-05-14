export type Stage = "nursery" | "toddler" | "child" | "teen" | "adult";

const BIRTH_DATE = new Date("2026-06-01T00:00:00");

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function getCurrentStage(): Stage {
  const birth = startOfDay(BIRTH_DATE);
  const today = startOfDay(new Date());
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    (today.getTime() - birth.getTime()) / msPerDay,
  );
  const day = diffDays + 1;

  if (day <= 14) return "nursery";
  if (day <= 35) return "toddler";
  if (day <= 70) return "child";
  if (day <= 100) return "teen";
  return "adult";
}
