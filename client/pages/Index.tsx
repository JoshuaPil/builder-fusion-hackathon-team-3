import { useState } from "react";
import { useBookingState } from "@/hooks/useBookingState";
import { BookingLayout } from "@/layouts/booking/BookingLayout";
import { BookSection } from "@/layouts/booking/sections/BookSection";
import { LocationSection, DESTINATIONS } from "@/layouts/booking/sections/LocationSection";
import { DatesSection } from "@/layouts/booking/sections/DatesSection";
import { GuestsSection } from "@/layouts/booking/sections/GuestsSection";
import { HotelsResultsScreen } from "@/layouts/booking/HotelsResultsScreen";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, CATEGORY_EMOJI, formatDateRange, formatGuestSummary } from "@/lib/booking-utils";

type Section = "book" | "location" | "dates" | "guests";

const SECTION_LABELS: Record<Section, string> = {
  book: "Book",
  location: "Location",
  dates: "Dates",
  guests: "Guests",
};

export default function Index() {
  const [showResults, setShowResults] = useState(false);

  const {
    category, setCategory,
    location, setLocation,
    activeSection, toggleSection,
    dateRange, dateMode, setDateMode,
    flexibleMonths, setFlexibleMonths,
    rooms, addRoom, removeRoom, updateRoom,
  } = useBookingState();

  const active: Section = (activeSection as Section) ?? "book";

  const dateValue = formatDateRange(dateRange.start, dateRange.end) || null;
  const guestValue = formatGuestSummary(rooms) || null;

  const locationDest = DESTINATIONS.find((d) => d.id === location);

  function toggleFlexibleMonth(key: string) {
    setFlexibleMonths((prev: string[]) =>
      prev.includes(key) ? [] : [key],
    );
  }

  const sectionValue: Record<Section, string | null> = {
    book: category ? `${CATEGORY_EMOJI[category]} ${CATEGORY_LABELS[category]}` : null,
    location: locationDest?.name ?? null,
    dates: dateValue,
    guests: guestValue,
  };

  const sections: Section[] = ["book", "location", "dates", "guests"];

  if (showResults) {
    return (
      <BookingLayout activeTab="book" showChrome={false}>
        <HotelsResultsScreen
          params={{
            location: location ?? "las-vegas",
            locationName: locationDest?.name ?? "Las Vegas, NV",
            dateRange,
            rooms,
          }}
          onBack={() => setShowResults(false)}
        />
      </BookingLayout>
    );
  }

  return (
    <BookingLayout activeTab="book" showChrome={active === "book"}>
      <div className="flex flex-col h-full">
        {sections.map((section) => {
          const isExpanded = active === section;
          return (
            <div
              key={section}
              className="flex flex-col border-b border-gray-100 overflow-hidden"
              style={{
                flexGrow: isExpanded ? 1 : 0,
                flexShrink: isExpanded ? 1 : 0,
                minHeight: 0,
                transition: "flex-grow 360ms cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between px-6 shrink-0"
                style={{
                  paddingTop: isExpanded ? 24 : 16,
                  paddingBottom: isExpanded ? 12 : 16,
                  transition: "padding 360ms cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <span
                  className={cn(
                    "font-jakarta font-semibold tracking-tight transition-all duration-[360ms]",
                    isExpanded
                      ? "text-[32px] leading-9 text-[#121212]"
                      : "text-base font-medium text-gray-400",
                  )}
                >
                  {SECTION_LABELS[section]}
                </span>
                {!isExpanded && (
                  <span
                    className={cn(
                      "text-sm px-4 py-1.5 rounded-full border font-jakarta",
                      sectionValue[section]
                        ? "border-gray-800 text-gray-900 font-medium"
                        : "border-gray-200 text-gray-500",
                    )}
                  >
                    {sectionValue[section] ?? "Select"}
                  </span>
                )}
              </button>

              {isExpanded && (
                <div className="flex-1 min-h-0 overflow-y-auto section-content-enter">
                  {section === "book" && (
                    <BookSection
                      selected={category}
                      onSelect={(cat) => {
                        setCategory(cat);
                        toggleSection("location");
                      }}
                    />
                  )}
                  {section === "location" && (
                    <LocationSection
                      selected={location}
                      onSelect={(loc) => {
                        setLocation(loc);
                        toggleSection("dates");
                      }}
                      onBack={() => toggleSection("book")}
                    />
                  )}
                  {section === "dates" && (
                    <DatesSection
                      dateRange={dateRange}
                      onSelectDate={dateRange.selectDate}
                      onClear={() => { dateRange.clear(); setFlexibleMonths([]); }}
                      dateMode={dateMode}
                      onSetDateMode={setDateMode}
                      flexibleMonths={flexibleMonths}
                      onToggleFlexibleMonth={toggleFlexibleMonth}
                      onBack={() => toggleSection("location")}
                      onNext={() => toggleSection("guests")}
                    />
                  )}
                  {section === "guests" && (
                    <GuestsSection
                      dateRange={dateRange}
                      rooms={rooms}
                      onAddRoom={addRoom}
                      onRemoveRoom={removeRoom}
                      onUpdateRoom={updateRoom}
                      onBack={() => toggleSection("dates")}
                      onSearch={() => setShowResults(true)}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </BookingLayout>
  );
}
