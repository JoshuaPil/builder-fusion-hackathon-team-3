import { useState } from "react";
import { Category } from "@/lib/booking-utils";
import { useDateRange } from "./useDateRange";
import { useRooms } from "./useRooms";

export type ActiveSection = "book" | "location" | "dates" | "guests" | null;
export type DateMode = "exact" | "flexible";

export function useBookingState() {
  const [category, setCategory] = useState<Category | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSection>("book");
  const [dateMode, setDateMode] = useState<DateMode>("exact");
  const [flexibleMonths, setFlexibleMonths] = useState<string[]>([]);

  const dateRange = useDateRange();
  const roomsState = useRooms();

  function toggleSection(section: ActiveSection) {
    setActiveSection(section);
  }

  function clear() {
    setCategory(null);
    setLocation(null);
    setActiveSection(null);
    setFlexibleMonths([]);
    dateRange.clear();
  }

  return {
    category,
    setCategory,
    location,
    setLocation,
    activeSection,
    toggleSection,
    dateMode,
    setDateMode,
    flexibleMonths,
    setFlexibleMonths,
    dateRange,
    ...roomsState,
    clear,
  };
}
