import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  image: string;
  memberRateHighlight?: boolean;
}

interface HotelCardProps {
  hotel: Hotel;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function HotelCard({ hotel, index, isFavorite, onToggleFavorite }: HotelCardProps) {
  return (
    <div className="flex flex-col">
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow"
        >
          <Heart
            size={16}
            className={cn(
              "transition-colors",
              isFavorite ? "fill-[#86080B] text-[#86080B]" : "text-[#808080]",
            )}
          />
        </button>
      </div>

      {/* Info */}
      <div className="px-6 pt-3 pb-4">
        <div className="flex items-start justify-between mb-0.5">
          <span className="font-jakarta text-[15px] font-bold text-[#121212]">
            {hotel.name}
          </span>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <Star size={12} className="fill-[#121212] text-[#121212]" />
            <span className="font-jakarta text-[12px] font-semibold text-[#121212]">
              {hotel.rating}
            </span>
          </div>
        </div>
        <p className="font-jakarta text-[12px] text-[#808080] mb-3">{hotel.location}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px]">🗝️</span>
            <span className="font-jakarta text-[14px] font-bold text-[#121212]">
              ${hotel.pricePerNight}
            </span>
            <span className="font-jakarta text-[12px] text-[#808080]">/ night</span>
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#121212] font-jakarta text-[12px] font-bold text-white">
            Select room
          </button>
        </div>
      </div>

      {/* Member rates highlight (first hotel only) */}
      {hotel.memberRateHighlight && index === 0 && (
        <div className="mx-6 mb-4 rounded-xl bg-[#86080B] px-4 py-3 flex items-center gap-3">
          <span className="text-[20px]">🗝️</span>
          <div className="flex-1">
            <p className="font-jakarta text-[13px] font-bold text-white">Member rates</p>
            <p className="font-jakarta text-[11px] text-white/70">
              Every time you use the key you're saving with our member rates
            </p>
          </div>
          <button className="font-jakarta text-[11px] font-bold text-white/80 underline shrink-0">
            got it
          </button>
        </div>
      )}
    </div>
  );
}
