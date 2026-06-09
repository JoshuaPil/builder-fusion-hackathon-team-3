import { useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data ---

interface City {
  id: string;
  name: string;
  hotels: number;
  image: string;
}

interface StateDestination {
  id: string;
  name: string;
  hotels: number;
  icon: React.ReactNode;
}

const GOLD_GRADIENT_ID = "goldGrad";

function GoldGradientDef() {
  return (
    <defs>
      <linearGradient id={GOLD_GRADIENT_ID} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD892" />
        <stop offset="17.79%" stopColor="#E1BB76" />
        <stop offset="100%" stopColor="#9C7303" />
      </linearGradient>
    </defs>
  );
}

const SunIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <GoldGradientDef />
    <path d="M18.9583 13.0001C18.9583 16.2908 16.2907 18.9584 13 18.9584C9.70929 18.9584 7.04166 16.2908 7.04166 13.0001C7.04166 9.70938 9.70929 7.04175 13 7.04175C16.2907 7.04175 18.9583 9.70938 18.9583 13.0001Z" fill={`url(#${GOLD_GRADIENT_ID})`} />
    <path fillRule="evenodd" clipRule="evenodd" d="M13.8119 1.44934C14.208 1.89773 14.1657 2.58236 13.7173 2.97848C13.6901 3.00246 13.6458 3.05022 13.6067 3.11231C13.568 3.17377 13.5502 3.22424 13.5443 3.25667C13.5396 3.28156 13.5415 3.29482 13.5475 3.31157C13.5542 3.33031 13.5858 3.40521 13.7173 3.52138C14.1657 3.91751 14.208 4.60212 13.8119 5.05052C13.4158 5.49891 12.7311 5.54128 12.2827 5.14515C11.5255 4.47613 11.2687 3.6493 11.4135 2.86402C11.541 2.17213 11.9537 1.64537 12.2827 1.35471C12.7311 0.958584 13.4158 1.00095 13.8119 1.44934ZM23.1359 11.4134C23.8278 11.5409 24.3545 11.9536 24.6452 12.2826C25.0414 12.731 24.999 13.4157 24.5506 13.8118C24.1022 14.2079 23.4176 14.1656 23.0215 13.7172C22.9974 13.69 22.9498 13.6457 22.8876 13.6066C22.8262 13.5679 22.7757 13.5501 22.7433 13.5442C22.7184 13.5395 22.7052 13.5414 22.6884 13.5474C22.6696 13.5542 22.5948 13.5857 22.4785 13.7172C22.0825 14.1656 21.3978 14.2079 20.9494 13.8118C20.501 13.4157 20.4587 12.731 20.8548 12.2826C21.5238 11.5254 22.3507 11.2686 23.1359 11.4134ZM1.44943 11.6464C1.89783 11.2502 2.58245 11.2926 2.97857 11.741C3.09474 11.8725 3.16965 11.904 3.18838 11.9108C3.20513 11.9169 3.21839 11.9186 3.24328 11.914C3.27571 11.908 3.32619 11.8903 3.38764 11.8516C3.44974 11.8126 3.49749 11.7682 3.52147 11.741C3.9176 11.2926 4.60222 11.2502 5.05061 11.6464C5.499 12.0425 5.54137 12.7271 5.14524 13.1755C4.85459 13.5045 4.32782 13.9173 3.63593 14.0448C2.85066 14.1895 2.02382 13.9328 1.35481 13.1755C0.958676 12.7271 1.00104 12.0425 1.44943 11.6464Z" fill={`url(#${GOLD_GRADIENT_ID})`} />
  </svg>
);

const MountainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <GoldGradientDef />
    <path d="M11.8797 9.42731C12.4544 8.75508 13.1144 8.25 14 8.25C14.8856 8.25 15.5456 8.75508 16.1203 9.42731C16.6779 10.0797 17.2743 11.033 18.0083 12.2062L22.6358 19.6022C22.7805 19.8334 22.7882 20.1249 22.6561 20.3634C22.5239 20.602 22.2727 20.75 22 20.75H6C5.72729 20.75 5.47607 20.602 5.34393 20.3634C5.21179 20.1249 5.21955 19.8334 5.36419 19.6022L9.99167 12.2062C10.7257 11.033 11.3221 10.0797 11.8797 9.42731Z" fill={`url(#${GOLD_GRADIENT_ID})`} />
    <path d="M9.00001 3.25C7.80787 3.25 7.07109 4.22261 6.50018 5.35011C5.90739 6.52083 5.3053 8.24699 4.5382 10.4462L1.29185 19.753C1.21184 19.9823 1.24788 20.2363 1.38855 20.4343C1.52921 20.6323 1.75709 20.75 2.00001 20.75H4.14591C3.90734 20.1605 3.96209 19.4865 4.30452 18.9392L8.97811 11.4695C9.67372 10.3575 10.3111 9.3387 10.9296 8.61512C11.3029 8.1784 11.7762 7.72066 12.3747 7.40446C12.0696 6.5984 11.7836 5.9106 11.4998 5.35011C10.9289 4.2226 10.1921 3.25 9.00001 3.25Z" fill={`url(#${GOLD_GRADIENT_ID})`} />
  </svg>
);

const CityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <GoldGradientDef />
    <path fillRule="evenodd" clipRule="evenodd" d="M4.25 13V21C4.25 21.5523 3.80228 22 3.25 22C2.69772 22 2.25 21.5523 2.25 21V13C2.25 12.7715 2.2606 12.5196 2.3132 12.2802C2.36828 12.0294 2.48211 11.7332 2.73264 11.4826C2.98317 11.2321 3.27942 11.1183 3.53015 11.0632C3.76956 11.0106 4.02152 11 4.25 11H7.25C7.80228 11 8.25 11.4477 8.25 12C8.25 12.5523 7.80228 13 7.25 13H4.25Z" fill={`url(#${GOLD_GRADIENT_ID})`} />
    <path fillRule="evenodd" clipRule="evenodd" d="M13.7045 1.30068C14.0177 1.37232 14.3416 1.51609 14.652 1.67454L19.0352 3.91256C19.5375 4.16902 19.9809 4.39534 20.3314 4.62308C20.7117 4.87022 21.0525 5.16147 21.3068 5.58168C21.5604 6.00064 21.6617 6.43841 21.7076 6.89118C21.7501 7.31074 21.75 7.81462 21.75 8.38956V21.2498C21.75 21.8021 21.3023 22.2498 20.75 22.2498C20.1977 22.2498 19.75 21.8021 19.75 21.2498V8.43543C19.75 7.80118 19.7488 7.39949 19.7177 7.09265C19.6889 6.80788 19.6409 6.69182 19.5958 6.61723C19.5514 6.54391 19.4739 6.45106 19.2417 6.30015C18.9892 6.13612 18.6404 5.95664 18.0841 5.67258L13.75 3.45964V7.9533C13.75 8.50558 13.3023 8.9533 12.75 8.9533C12.1977 8.9533 11.75 8.50558 11.75 7.9533V3.47853C11.75 3.13416 11.7674 2.78512 11.8391 2.47783C11.9087 2.18004 12.0692 1.74934 12.4951 1.47372C12.9295 1.19259 13.3947 1.22982 13.7045 1.30068Z" fill={`url(#${GOLD_GRADIENT_ID})`} />
    <path fillRule="evenodd" clipRule="evenodd" d="M1 21.75C1 21.1977 1.44772 20.75 2 20.75H22C22.5523 20.75 23 21.1977 23 21.75C23 22.3023 22.5523 22.75 22 22.75H2C1.44772 22.75 1 22.3023 1 21.75ZM11 10.25C10.5858 10.25 10.25 10.5858 10.25 11C10.25 11.4142 10.5858 11.75 11 11.75H13C13.4142 11.75 13.75 11.4142 13.75 11C13.75 10.5858 13.4142 10.25 13 10.25H11ZM11 13.25C10.5858 13.25 10.25 13.5858 10.25 14C10.25 14.4142 10.5858 14.75 11 14.75H13C13.4142 14.75 13.75 14.4142 13.75 14C13.75 13.5858 13.4142 13.25 13 13.25H11Z" fill={`url(#${GOLD_GRADIENT_ID})`} />
  </svg>
);

const RacingFlagIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <GoldGradientDef />
    <path fillRule="evenodd" clipRule="evenodd" d="M11.3942 2.65018C13.9515 1.49153 17.0759 0.0758991 20.1056 2.11831C20.3048 2.2526 20.4538 2.4493 20.5289 2.67746L23.7789 12.5379C23.9196 12.9647 23.7821 13.4341 23.4334 13.7176C23.0846 14.0011 22.5971 14.0398 22.208 13.8149C20.5048 12.8307 19.0428 12.6106 17.7348 12.7554C16.3941 12.9039 15.1401 13.4431 13.8641 14.1108C13.5328 14.2841 13.1898 14.4725 12.8404 14.6645C11.9179 15.1712 10.9503 15.7028 10.032 16.048C9.28864 16.3274 8.50215 16.5183 7.68651 16.5093L9.70785 23.5332C9.87331 24.1082 9.54134 24.7085 8.96636 24.8739C8.3914 25.0393 7.79115 24.7074 7.62568 24.1325L2.20894 5.30975C2.09449 4.91201 2.21664 4.48381 2.52374 4.20634C2.83083 3.92887 3.26918 3.85061 3.65331 4.00468C6.16376 5.01158 8.5371 3.94434 11.329 2.67972C11.3506 2.66989 11.3724 2.66004 11.3942 2.65018Z" fill={`url(#${GOLD_GRADIENT_ID})`} />
  </svg>
);

const CactusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <GoldGradientDef />
    <path d="M12 3C10.3 3 9 4.3 9 6v8H7V9c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 2.2 1.8 4 4 4h2v3h6v-3h1c2.2 0 4-1.8 4-4V9c0-1.1-.9-2-2-2s-2 .9-2 2v5h-2V6c0-1.7-1.3-3-3-3z" fill={`url(#${GOLD_GRADIENT_ID})`} />
  </svg>
);

const CITIES: City[] = [
  {
    id: "las-vegas",
    name: "Las Vegas, NV",
    hotels: 10,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/41f48dfe20a7e428dc2d4ef9a24fa450be1ccbcf?width=210",
  },
  {
    id: "atlantic-city",
    name: "Atlantic City, NJ",
    hotels: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2F388662fb7ec843d0bed672fdc53e11a1%2F5d1a8a063d264179be03f0a20802a0fb?format=webp&width=800&height=1200",
  },
  {
    id: "lake-tahoe",
    name: "Lake Tahoe, NV",
    hotels: 3,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=120&h=120&fit=crop",
  },
  {
    id: "reno",
    name: "Reno, NV",
    hotels: 4,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/60ed32431f491a7199240dd56cba8b347f44e21c?width=220",
  },
  {
    id: "laughlin",
    name: "Laughlin, NV",
    hotels: 4,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop",
  },
];

const STATES: StateDestination[] = [
  { id: "arizona", name: "Arizona", hotels: 2, icon: <CactusIcon /> },
  { id: "california", name: "California", hotels: 1, icon: <SunIcon /> },
  { id: "colorado", name: "Colorado", hotels: 2, icon: <MountainIcon /> },
  { id: "illinois", name: "Illinois", hotels: 2, icon: <CityIcon /> },
  { id: "indiana", name: "Indiana", hotels: 2, icon: <RacingFlagIcon /> },
  { id: "iowa", name: "Iowa", hotels: 1, icon: <MountainIcon /> },
  { id: "louisiana", name: "Louisiana", hotels: 3, icon: <CityIcon /> },
  { id: "maryland", name: "Maryland", hotels: 1, icon: <SunIcon /> },
  { id: "mississippi", name: "Mississippi", hotels: 2, icon: <RacingFlagIcon /> },
  { id: "missouri", name: "Missouri", hotels: 2, icon: <CityIcon /> },
  { id: "new-jersey", name: "New Jersey", hotels: 2, icon: <SunIcon /> },
  { id: "pennsylvania", name: "Pennsylvania", hotels: 1, icon: <CityIcon /> },
];

export const DESTINATIONS = [...CITIES, ...STATES];

// --- Component ---

interface LocationSectionProps {
  selected: string | null;
  onSelect: (location: string) => void;
  onBack?: () => void;
}

function CityRow({
  city,
  selected,
  onSelect,
  portal = false,
}: {
  city: City;
  selected: boolean;
  onSelect: () => void;
  portal?: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex items-center gap-4 text-left w-full transition-all",
        portal && selected
          ? "rounded-xl border border-[#1F1F1F] bg-white px-3 py-2"
          : "py-1",
      )}
    >
      <div className="relative h-12 w-12 shrink-0 rounded-xl overflow-hidden bg-black">
        <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <span className="font-jakarta text-[14px] font-semibold leading-5 text-[#121212]">{city.name}</span>
        <span className="font-jakarta text-[13px] text-[#666]">{city.hotels} Hotels</span>
      </div>
    </button>
  );
}

function StateRow({
  state,
  selected,
  onSelect,
}: {
  state: StateDestination;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex items-center gap-4 text-left w-full transition-all py-1",
        selected && "rounded-xl border border-[#1F1F1F] bg-white px-3",
      )}
    >
      <div className="h-12 w-12 shrink-0 rounded-xl bg-[#F2F2F2] flex items-center justify-center">
        {state.icon}
      </div>
      <div className="flex flex-col">
        <span className="font-jakarta text-[14px] font-semibold leading-5 text-[#121212]">{state.name}</span>
        <span className="font-jakarta text-[13px] text-[#666]">{state.hotels} Hotel{state.hotels !== 1 ? "s" : ""}</span>
      </div>
    </button>
  );
}

export function LocationSection({ selected, onSelect, onBack }: LocationSectionProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [query, setQuery] = useState("");

  const q = query.toLowerCase();
  const filteredCities = CITIES.filter((c) => c.name.toLowerCase().includes(q));
  const filteredStates = STATES.filter((s) => s.name.toLowerCase().includes(q));

  // Default inline expanded view: "Destinations" entry + quick city list
  const inlineView = (
    <div className="flex flex-col px-6 pt-3 pb-4 gap-4">
      {/* Destinations entry point */}
      <button
        onClick={() => setIsSearchActive(true)}
        className="flex items-center justify-between w-full rounded-full border border-[#E6E6E6] px-5 py-3"
      >
        <span className="font-jakarta text-[15px] font-semibold text-[#121212]">Destinations</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#121212] shrink-0">
          <ArrowRight size={14} className="text-white" />
        </div>
      </button>

      {/* Quick city list */}
      <div className="flex flex-col gap-[17px]">
        {CITIES.map((city) => (
          <CityRow
            key={city.id}
            city={city}
            selected={selected === city.id}
            onSelect={() => onSelect(city.id)}
            portal={false}
          />
        ))}
      </div>
    </div>
  );

  if (!isSearchActive) {
    return inlineView;
  }

  // Full-screen portal — rendered inside the phone frame
  const portalTarget = document.getElementById("phone-portal");
  if (!portalTarget) return null;

  return createPortal(
    <div className="absolute inset-0 z-50 bg-white flex flex-col pointer-events-auto">
      {/* Header */}
      <div className="px-6 pt-4 pb-4 shrink-0">
        <button
          onClick={() => { setIsSearchActive(false); setQuery(""); }}
          className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F2F2F2]"
        >
          <ArrowLeft size={18} className="text-[#121212]" />
        </button>
        <h1 className="font-jakarta text-[32px] font-semibold leading-9 tracking-tight text-[#121212] mb-4">
          Destinations
        </h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="City or state"
          autoFocus
          className="w-full rounded-full border border-[#E6E6E6] bg-white px-5 py-3 text-[15px] font-jakarta text-[#121212] placeholder:text-[#999] focus:outline-none focus:border-[#121212]"
        />
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col gap-[17px]">
        {filteredCities.map((city) => (
          <CityRow
            key={city.id}
            city={city}
            selected={selected === city.id}
            onSelect={() => { onSelect(city.id); setIsSearchActive(false); }}
            portal
          />
        ))}

        {filteredStates.length > 0 && (
          <p className="mt-2 mb-0 font-jakarta text-[11px] font-bold uppercase tracking-[2.4px] text-[#808080]">
            States
          </p>
        )}

        {filteredStates.map((state) => (
          <StateRow
            key={state.id}
            state={state}
            selected={selected === state.id}
            onSelect={() => { onSelect(state.id); setIsSearchActive(false); }}
          />
        ))}
      </div>
    </div>,
    portalTarget,
  );
}
