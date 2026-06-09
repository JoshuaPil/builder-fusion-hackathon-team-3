import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Room, formatDateRange } from "@/lib/booking-utils";
import { Counter } from "@/components/booking/atoms/Counter";

interface GuestsSectionProps {
  dateRange: { start: Date | null; end: Date | null };
  rooms: Room[];
  onAddRoom: () => void;
  onRemoveRoom: (id: string) => void;
  onUpdateRoom: (id: string, patch: Partial<{ adults: number; children: number }>) => void;
  onBack?: () => void;
  onSearch?: () => void;
}

export function GuestsSection({
  dateRange,
  rooms,
  onAddRoom,
  onRemoveRoom,
  onUpdateRoom,
  onBack,
  onSearch,
}: GuestsSectionProps) {
  const dateLabel = formatDateRange(dateRange.start, dateRange.end);

  return (
    <div className="flex flex-col h-full">
      {/* Date summary chip */}
      {dateLabel && (
        <div className="px-6 pt-3 pb-1 shrink-0">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F2F2F2] px-4 py-2">
            <span className="font-jakarta text-[13px] font-semibold text-[#121212]">
              {dateLabel}
            </span>
          </div>
        </div>
      )}

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 pb-4 flex flex-col gap-3">
        {rooms.map((room, idx) => (
          <div
            key={room.id}
            className="rounded-2xl bg-[#F2F2F2] p-4 flex flex-col gap-4"
          >
            {/* Room header */}
            <div className="flex items-center justify-between">
              <span className="font-jakarta text-[15px] font-semibold text-[#121212]">
                Room {idx + 1}
              </span>
              {rooms.length > 1 && (
                <button
                  onClick={() => onRemoveRoom(room.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white"
                >
                  <X size={14} className="text-[#808080]" />
                </button>
              )}
            </div>

            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-jakarta text-[14px] font-semibold text-[#121212]">Adults</p>
                <p className="font-jakarta text-[12px] text-[#808080]">Ages 18+</p>
              </div>
              <Counter
                value={room.adults}
                min={1}
                onDecrement={() => onUpdateRoom(room.id, { adults: room.adults - 1 })}
                onIncrement={() => onUpdateRoom(room.id, { adults: room.adults + 1 })}
              />
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-jakarta text-[14px] font-semibold text-[#121212]">Children</p>
                <p className="font-jakarta text-[12px] text-[#808080]">Ages 0–17</p>
              </div>
              <Counter
                value={room.children}
                min={0}
                onDecrement={() => onUpdateRoom(room.id, { children: room.children - 1 })}
                onIncrement={() => onUpdateRoom(room.id, { children: room.children + 1 })}
              />
            </div>
          </div>
        ))}

        {/* Add room */}
        {rooms.length < 4 && (
          <button
            onClick={onAddRoom}
            className={cn(
              "flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#E6E6E6] py-4 font-jakarta text-[14px] font-semibold text-[#808080] hover:border-[#999] transition-all",
            )}
          >
            + Add another room
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 shrink-0 border-t border-gray-100">
        <button
          onClick={onSearch}
          className="w-full py-4 rounded-full bg-[#86080B] text-white font-jakarta font-semibold text-[15px]"
        >
          Search Hotels
        </button>
      </div>
    </div>
  );
}
