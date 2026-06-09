export interface DayCell {
  date: Date | null;
  dayOfMonth: number | null;
}

export function getMonthGrid(year: number, month: number): DayCell[][] {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: DayCell[][] = [];
  let day = 1;

  for (let row = 0; row < 6; row++) {
    const week: DayCell[] = [];
    for (let col = 0; col < 7; col++) {
      const index = row * 7 + col;
      if (index < firstDayOfWeek || day > daysInMonth) {
        week.push({ date: null, dayOfMonth: null });
      } else {
        week.push({ date: new Date(year, month, day), dayOfMonth: day });
        day++;
      }
    }
    grid.push(week);
    if (day > daysInMonth) break;
  }
  return grid;
}

export function isInRange(
  date: Date,
  start: Date | null,
  end: Date | null,
): boolean {
  if (!start || !end) return false;
  return date > start && date < end;
}

export function isRangeStart(date: Date, start: Date | null): boolean {
  if (!start) return false;
  return date.toDateString() === start.toDateString();
}

export function isRangeEnd(date: Date, end: Date | null): boolean {
  if (!end) return false;
  return date.toDateString() === end.toDateString();
}

export function getFlexibleMonths(
  count: number = 18,
): Array<{ year: number; month: number; label: string }> {
  const result: Array<{ year: number; month: number; label: string }> = [];
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  for (let i = 0; i < count; i++) {
    result.push({
      year,
      month,
      label: new Date(year, month).toLocaleDateString("en-US", {
        month: "long",
      }),
    });
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }
  return result;
}
