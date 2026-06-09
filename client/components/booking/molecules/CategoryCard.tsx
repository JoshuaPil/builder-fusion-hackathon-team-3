import { cn } from "@/lib/utils";
import { Category, CATEGORY_IMAGES, CATEGORY_LABELS } from "@/lib/booking-utils";

interface CategoryCardProps {
  category: Category;
  selected: boolean;
  onSelect: () => void;
}

export function CategoryCard({ category, selected, onSelect }: CategoryCardProps) {
  const images = CATEGORY_IMAGES[category];

  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative flex flex-col rounded-[18px] overflow-hidden text-left w-full bg-[#F2F2F2]",
        "min-h-[113px]",
        selected ? "ring-2 ring-black" : "ring-0",
      )}
    >
      {/* Marble background */}
      <img
        src={images.bg}
        alt=""
        className="absolute object-cover"
        style={{
          width: "150%",
          height: "150%",
          top: "-25%",
          left: "-25%",
          transform: images.bgRotate ? `rotate(${images.bgRotate}deg)` : undefined,
        }}
      />

      {/* Category label */}
      <span className="relative z-10 px-4 pt-3 text-[14px] font-semibold leading-5 tracking-[0.1px] text-[#121212] font-jakarta">
        {CATEGORY_LABELS[category]}
      </span>

      {/* Gold object image */}
      {images.object && (
        <img
          src={images.object}
          alt=""
          className="absolute bottom-3 right-3 z-10 h-[72px] w-[72px] object-contain drop-shadow"
        />
      )}
    </button>
  );
}
