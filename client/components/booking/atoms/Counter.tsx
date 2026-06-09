import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  min?: number;
}

export function Counter({ value, onDecrement, onIncrement, min = 0 }: CounterProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onDecrement}
        disabled={value <= min}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full border border-[#E6E6E6] transition-all",
          value <= min ? "opacity-30" : "hover:bg-[#F2F2F2]",
        )}
      >
        <Minus size={14} className="text-[#121212]" />
      </button>
      <span className="w-5 text-center font-jakarta text-[15px] font-semibold text-[#121212]">
        {value}
      </span>
      <button
        onClick={onIncrement}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6E6E6] hover:bg-[#F2F2F2] transition-all"
      >
        <Plus size={14} className="text-[#121212]" />
      </button>
    </div>
  );
}
