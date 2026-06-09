import { useState } from "react";
import { ArrowLeft, MapPin, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Room, formatDateRange, formatGuestSummary } from "@/lib/booking-utils";
import { HotelCard, Hotel } from "@/components/booking/molecules/HotelCard";

interface SearchParams {
  location: string;
  locationName: string;
  dateRange: { start: Date | null; end: Date | null };
  rooms: Room[];
}

const LAS_VEGAS_HOTELS: Hotel[] = [
  {
    id: "paris-lv",
    name: "Paris Las Vegas",
    location: "Las Vegas, NV",
    rating: 4.8,
    reviewCount: 2341,
    pricePerNight: 249,
    image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&h=500&fit=crop",
    memberRateHighlight: true,
  },
  {
    id: "flamingo-lv",
    name: "Flamingo Las Vegas",
    location: "Las Vegas, NV",
    rating: 4.8,
    reviewCount: 1890,
    pricePerNight: 249,
    image: "https://images.unsplash.com/photo-1543158266-0066955d54b0?w=800&h=500&fit=crop",
  },
  {
    id: "caesars-palace",
    name: "Caesars Palace",
    location: "Las Vegas, NV",
    rating: 4.8,
    reviewCount: 3102,
    pricePerNight: 349,
    image: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=800&h=500&fit=crop",
  },
  {
    id: "nobu-hotel",
    name: "Nobu Hotel Caesars Palace",
    location: "Las Vegas, NV",
    rating: 4.9,
    reviewCount: 876,
    pricePerNight: 449,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop",
  },
  {
    id: "the-linq",
    name: "The LINQ Hotel + Experience",
    location: "Las Vegas, NV",
    rating: 4.6,
    reviewCount: 1456,
    pricePerNight: 199,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop",
  },
  {
    id: "bally-lv",
    name: "Horseshoe Las Vegas",
    location: "Las Vegas, NV",
    rating: 4.5,
    reviewCount: 1203,
    pricePerNight: 179,
    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=500&fit=crop",
  },
];

const ATLANTIC_CITY_HOTELS: Hotel[] = [
  {
    id: "harrahs-ac",
    name: "Harrah's Resort Atlantic City",
    location: "Atlantic City, NJ",
    rating: 4.6,
    reviewCount: 1204,
    pricePerNight: 199,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=500&fit=crop",
    memberRateHighlight: true,
  },
  {
    id: "caesars-ac",
    name: "Caesars Atlantic City",
    location: "Atlantic City, NJ",
    rating: 4.7,
    reviewCount: 987,
    pricePerNight: 229,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop",
  },
  {
    id: "bally-ac",
    name: "Bally's Atlantic City",
    location: "Atlantic City, NJ",
    rating: 4.5,
    reviewCount: 743,
    pricePerNight: 179,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=500&fit=crop",
  },
  {
    id: "paris-ac",
    name: "Paris Hotel Atlantic City",
    location: "Atlantic City, NJ",
    rating: 4.4,
    reviewCount: 512,
    pricePerNight: 159,
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=500&fit=crop",
  },
];

const DEFAULT_HOTELS: Hotel[] = LAS_VEGAS_HOTELS;

function getHotelsForLocation(locationId: string): Hotel[] {
  if (locationId === "atlantic-city") return ATLANTIC_CITY_HOTELS;
  if (locationId === "las-vegas") return LAS_VEGAS_HOTELS;
  return DEFAULT_HOTELS;
}

// Price pins shown on the mock map
const MAP_PINS = [
  { label: "$249", x: "22%", y: "38%" },
  { label: "$349", x: "38%", y: "55%" },
  { label: "$249", x: "55%", y: "35%" },
  { label: "$449", x: "68%", y: "50%" },
  { label: "$249", x: "45%", y: "65%" },
  { label: "$349", x: "30%", y: "70%" },
  { label: "$449", x: "72%", y: "30%" },
];

interface HotelsResultsScreenProps {
  params: SearchParams;
  onBack: () => void;
}

export function HotelsResultsScreen({ params, onBack }: HotelsResultsScreenProps) {
  const hotels = getHotelsForLocation(params.location);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showCredits, setShowCredits] = useState(false);

  const dateLabel = formatDateRange(params.dateRange.start, params.dateRange.end);
  const guestLabel = formatGuestSummary(params.rooms);
  const summaryLine = [dateLabel, guestLabel].filter(Boolean).join(" · ");

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Map section */}
      <div className="relative h-[220px] shrink-0 bg-[#D9E8D0] overflow-hidden">
        {/* Map background */}
        <img
          src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-115.1728,36.1147,13,0/390x220?access_token=pk.placeholder"
          alt="Map"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // fallback: use a neutral map-like color gradient
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Fallback map pattern */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #e8edf0 25%, #dde4e9 50%, #e3e9ed 75%)",
          }}
        >
          {/* Simple road lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 390 220" fill="none">
            <rect width="390" height="220" fill="#E8EDF0" />
            <rect x="0" y="95" width="390" height="8" fill="#F5F5F5" />
            <rect x="0" y="135" width="390" height="5" fill="#F5F5F5" />
            <rect x="140" y="0" width="6" height="220" fill="#F5F5F5" />
            <rect x="220" y="0" width="10" height="220" fill="#F5F5F5" />
            <rect x="290" y="0" width="5" height="220" fill="#F5F5F5" />
            <rect x="70" y="0" width="4" height="220" fill="#F5F5F5" />
            <rect x="0" y="60" width="390" height="4" fill="#F5F5F5" />
            <rect x="0" y="170" width="390" height="6" fill="#F5F5F5" />
            <rect x="0" y="200" width="390" height="4" fill="#F5F5F5" />
          </svg>
        </div>

        {/* Price pins */}
        {MAP_PINS.map((pin, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full px-2.5 py-1 shadow-md font-jakarta text-[11px] font-bold text-[#121212] border border-white"
            style={{ left: pin.x, top: pin.y, transform: "translate(-50%, -50%)" }}
          >
            {pin.label}
          </div>
        ))}

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
        >
          <ArrowLeft size={18} className="text-[#121212]" />
        </button>

        {/* Map expand button */}
        <button className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
          <MapPin size={16} className="text-[#121212]" />
        </button>

        {/* Location + date summary strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-jakarta text-[13px] font-bold text-[#121212] truncate">
              {params.locationName}
            </p>
            {summaryLine && (
              <p className="font-jakarta text-[11px] text-[#808080] truncate">{summaryLine}</p>
            )}
          </div>
        </div>
      </div>

      {/* Results header */}
      <div className="px-6 pt-4 pb-3 shrink-0 flex items-center justify-between">
        <span className="font-jakarta text-[17px] font-bold text-[#121212]">
          {hotels.length} Resorts
        </span>
        <button className="flex items-center gap-1.5 rounded-full bg-[#F2F2F2] px-3 py-1.5">
          <SlidersHorizontal size={13} className="text-[#121212]" />
          <span className="font-jakarta text-[12px] font-semibold text-[#121212]">Lowest</span>
        </button>
      </div>

      {/* Credits toggle */}
      <div className="px-6 pb-3 shrink-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-jakarta text-[13px] font-semibold text-[#121212]">Show price as credits</span>
          {showCredits && (
            <span className="font-jakarta text-[11px] text-[#808080]">Your credits</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {showCredits && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#121212] px-3 py-1">
              <span className="text-[11px]">🏆</span>
              <span className="font-jakarta text-[11px] font-bold text-white">3,456</span>
            </div>
          )}
          <button
            onClick={() => setShowCredits((v) => !v)}
            className={cn(
              "relative w-11 h-6 rounded-full transition-all duration-200",
              showCredits ? "bg-[#121212]" : "bg-[#E6E6E6]",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200",
                showCredits ? "left-[22px]" : "left-0.5",
              )}
            />
          </button>
        </div>
      </div>

      {/* Hotel list */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          {hotels.map((hotel, idx) => (
            <div key={hotel.id}>
              <HotelCard hotel={hotel} index={idx} isFavorite={favorites.has(hotel.id)} onToggleFavorite={() => toggleFavorite(hotel.id)} />
              {idx < hotels.length - 1 && (
                <div className="h-px bg-[#F2F2F2] mx-6" />
              )}
            </div>
          ))}
          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}
