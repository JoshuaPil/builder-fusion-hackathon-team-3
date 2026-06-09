import { useState } from "react";
import { Room } from "@/lib/booking-utils";

let nextId = 2;

const DEFAULT_ROOMS: Room[] = [{ id: "1", adults: 2, children: 0 }];

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>(DEFAULT_ROOMS);

  function addRoom() {
    setRooms((prev) => [
      ...prev,
      { id: String(nextId++), adults: 2, children: 0 },
    ]);
  }

  function removeRoom(id: string) {
    setRooms((prev) =>
      prev.length > 1 ? prev.filter((r) => r.id !== id) : prev,
    );
  }

  function updateRoom(
    id: string,
    patch: Partial<Pick<Room, "adults" | "children">>,
  ) {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        return {
          ...r,
          adults: Math.max(1, patch.adults ?? r.adults),
          children: Math.max(0, patch.children ?? r.children),
        };
      }),
    );
  }

  return { rooms, addRoom, removeRoom, updateRoom };
}
