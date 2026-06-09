export type Category =
  | "resorts"
  | "dining"
  | "entertainment"
  | "spas"
  | "nightlife"
  | "pools";

export interface Room {
  id: string;
  adults: number;
  children: number;
}

export function formatDateRange(
  start: Date | null,
  end: Date | null,
): string {
  if (!start) return "";
  const month = (d: Date) => d.toLocaleDateString("en-US", { month: "short" });
  if (!end) return `${month(start)} ${start.getDate()}`;
  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${month(start)} ${start.getDate()}–${end.getDate()}`;
  }
  return `${month(start)} ${start.getDate()} – ${month(end)} ${end.getDate()}`;
}

export function formatGuestSummary(rooms: Room[]): string {
  if (rooms.length === 0) return "";
  const totalAdults = rooms.reduce((s, r) => s + r.adults, 0);
  const totalChildren = rooms.reduce((s, r) => s + r.children, 0);
  if (rooms.length === 1) {
    const parts: string[] = [];
    if (totalAdults > 0)
      parts.push(`${totalAdults} Adult${totalAdults !== 1 ? "s" : ""}`);
    if (totalChildren > 0)
      parts.push(
        `${totalChildren} Child${totalChildren !== 1 ? "ren" : ""}`,
      );
    return parts.join(", ");
  }
  const totalGuests = totalAdults + totalChildren;
  return `${rooms.length} rooms, ${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  resorts: "Resorts",
  dining: "Dining",
  entertainment: "Entertainment",
  spas: "Spas",
  nightlife: "Nightlife",
  pools: "Pools",
};

export const CATEGORY_EMOJI: Record<Category, string> = {
  resorts: "🗝️",
  dining: "🍴",
  entertainment: "🎲",
  spas: "🌸",
  nightlife: "🦞",
  pools: "🏊",
};

export const CATEGORY_IMAGES: Record<Category, { bg: string; bgRotate?: number; object: string }> = {
  resorts: {
    bg: "https://api.builder.io/api/v1/image/assets/TEMP/ce52cfffcdb3650bc415b6eead3119d051a6e112?width=586",
    object: "https://api.builder.io/api/v1/image/assets/TEMP/39c0904061e79e6bbac705601da0f733ab5136ff?width=142",
  },
  dining: {
    bg: "https://api.builder.io/api/v1/image/assets/TEMP/8eda69683f0ca773f230035e45d4cfcf35ec004d?width=586",
    bgRotate: 90,
    object: "https://cdn.builder.io/api/v1/image/assets%2F388662fb7ec843d0bed672fdc53e11a1%2F310fa33addd842bd93d3d6566d36a570?format=webp&width=800&height=1200",
  },
  entertainment: {
    bg: "https://api.builder.io/api/v1/image/assets/TEMP/ce52cfffcdb3650bc415b6eead3119d051a6e112?width=586",
    bgRotate: 180,
    object: "https://cdn.builder.io/api/v1/image/assets%2F388662fb7ec843d0bed672fdc53e11a1%2F6d0913aad33848d8841611cd9ec444a5",
  },
  spas: {
    bg: "https://api.builder.io/api/v1/image/assets/TEMP/8eda69683f0ca773f230035e45d4cfcf35ec004d?width=586",
    bgRotate: 270,
    object: "https://cdn.builder.io/api/v1/image/assets%2F388662fb7ec843d0bed672fdc53e11a1%2F03ea8b0e822c40c7aa1a02f8df2ba91f?format=webp&width=800&height=1200",
  },
  nightlife: {
    bg: "https://api.builder.io/api/v1/image/assets/TEMP/ce52cfffcdb3650bc415b6eead3119d051a6e112?width=586",
    object: "",
  },
  pools: {
    bg: "https://api.builder.io/api/v1/image/assets/TEMP/8eda69683f0ca773f230035e45d4cfcf35ec004d?width=586",
    object: "",
  },
};

export const ALL_CATEGORIES: Category[] = [
  "resorts",
  "dining",
  "entertainment",
  "spas",
];
