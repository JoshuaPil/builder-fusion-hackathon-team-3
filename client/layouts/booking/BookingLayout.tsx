import { ReactNode } from "react";
import { BottomNav } from "@/components/booking/molecules/BottomNav";

interface BookingLayoutProps {
  children: ReactNode;
  showChrome?: boolean;
  activeTab?: "home" | "book" | "discover" | "rewards" | "account";
  onTabChange?: (tab: "home" | "book" | "discover" | "rewards" | "account") => void;
}

export function BookingLayout({ children, showChrome = true, activeTab, onTabChange }: BookingLayoutProps) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      {/* iPhone frame */}
      <div
        className="relative flex flex-col w-full max-w-[390px] overflow-hidden rounded-[50px] border-[10px] border-[#1C1C1E]"
        style={{
          background: "linear-gradient(180deg, #86080B 0%, #6B0609 26.03%, #200203 100%)",
          height: "min(844px, 100svh)",
          boxShadow:
            "0 0 0 1.5px #3a3a3c, 0 40px 100px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Gradient spacer — only visible when chrome is shown */}
        {showChrome && <div className="h-[60px] shrink-0" />}

        {/* White card panel */}
        <div
          className="flex-1 flex flex-col bg-white overflow-hidden"
          style={
            showChrome
              ? { borderRadius: "24px 24px 0 0", boxShadow: "0 -8px 20px 0 rgba(0,0,0,0.18)" }
              : undefined
          }
        >
          <div className="flex-1 overflow-hidden">{children}</div>
          {showChrome && <BottomNav activeTab={activeTab} onTabChange={onTabChange} />}
        </div>

        {/* Portal target — overlays rendered here stay inside the phone frame */}
        <div id="phone-portal" className="absolute inset-0 pointer-events-none" />
      </div>
    </div>
  );
}
