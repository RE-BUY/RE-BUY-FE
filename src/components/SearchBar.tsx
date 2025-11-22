import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
  showMenuIcon?: boolean;
  onChange?: (query: string) => void;
  className?: string;
}

export default function SearchBar({ 
  placeholder = "검색어를 입력하세요",
  onSearch,
  onMenuClick,
  showMenuIcon = false,
  onChange,
  className = ""
}: SearchBarProps) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onChange?.(value);
  };

  return (
    <form onSubmit={handleSearch} className={`pl-3 pr-5 py-3 pt-0 ${className}`}>
      <div className="relative flex items-center gap-0.5">
        {/* 삼선 아이콘 (햄버거 메뉴) */}
        {showMenuIcon && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onMenuClick?.();
            }}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6 text-main"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        
        {/* 검색 입력 필드 */}
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            name="search"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-main rounded-full focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent text-sm"
          />
        </div>
      </div>
    </form>
  );
}

