import { Category } from "@/lib/booking-utils";
import { CategoryGrid } from "@/components/booking/organisms/CategoryGrid";

interface BookSectionProps {
  selected: Category | null;
  onSelect: (category: Category) => void;
}

export function BookSection({ selected, onSelect }: BookSectionProps) {
  return (
    <div className="py-2">
      <CategoryGrid selected={selected} onSelect={onSelect} />
    </div>
  );
}
