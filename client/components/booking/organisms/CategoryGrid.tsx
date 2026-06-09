import { Category, ALL_CATEGORIES } from "@/lib/booking-utils";
import { CategoryCard } from "@/components/booking/molecules/CategoryCard";

interface CategoryGridProps {
  selected: Category | null;
  onSelect: (category: Category) => void;
}

export function CategoryGrid({ selected, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 px-6">
      {ALL_CATEGORIES.map((cat) => (
        <CategoryCard
          key={cat}
          category={cat}
          selected={selected === cat}
          onSelect={() => onSelect(cat)}
        />
      ))}
    </div>
  );
}
