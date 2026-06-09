import { Home, CalendarDays, Sparkles, Ticket, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "home" | "book" | "discover" | "rewards" | "account";

const TABS: Array<{ id: Tab; label: string; Icon: typeof Home }> = [
  { id: "home", label: "Home", Icon: Home },
  { id: "book", label: "Book", Icon: CalendarDays },
  { id: "discover", label: "Discover", Icon: Sparkles },
  { id: "rewards", label: "Rewards", Icon: Ticket },
  { id: "account", label: "Account", Icon: User },
];

interface BottomNavProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

export function BottomNav({ activeTab = "home", onTabChange }: BottomNavProps) {
  return (
    <nav className="relative shrink-0 bg-[#121212] flex items-center justify-around px-6 pt-4 pb-6">
      <div className="absolute top-0 left-0 right-0 h-6 rounded-b-3xl" />

      {TABS.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange?.(id)}
            className="relative z-10 flex flex-col items-center justify-center gap-1 w-11 h-11"
          >
            <Icon
              size={24}
              strokeWidth={1.5}
              className={cn(active ? "text-white" : "text-white/60")}
            />
            <span
              className={cn(
                "text-[9px] font-medium font-jakarta",
                active ? "text-white" : "text-white/60",
              )}
            >
              {label}
            </span>
          </button>
        );
      })}

      {/* Home indicator pill */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-white/15" />
    </nav>
  );
}
