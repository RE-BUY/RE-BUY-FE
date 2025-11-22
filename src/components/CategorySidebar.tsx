interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

const categories = [
  { id: "food", name: "식품" },
  { id: "drink", name: "음료" },
  { id: "fashion", name: "패션" },
  { id: "accessories", name: "소품" },
  { id: "stationery", name: "문구류" },
  { id: "household", name: "생활용품" },
];

export default function CategorySidebar({
  isOpen,
  onClose,
  selectedCategory = "fashion",
  onSelectCategory,
}: CategorySidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - 모바일 프레임 내부에만 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 z-[60] transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar - 모바일 프레임 내부에만 */}
      <div
        className="absolute left-0 top-0 bottom-0 w-48 bg-sub1 bg-opacity-95 z-[60] transform transition-transform duration-300 ease-out"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="h-full overflow-y-auto pt-20 pb-20">
          <div className="px-4 py-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onSelectCategory?.(category.id);
                  onClose();
                }}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                  selectedCategory === category.id
                    ? "bg-main text-white font-semibold"
                    : "text-main hover:bg-white hover:bg-opacity-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

