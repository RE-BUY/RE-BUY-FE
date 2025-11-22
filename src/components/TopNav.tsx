import { useNavigate } from 'react-router-dom';

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      {/* Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/home')}
      >
        <div className="w-6 h-6 bg-main rounded-full flex items-center justify-center">
          <span className="text-white text-xs">🌍</span>
        </div>
        <span className="text-lg font-bold text-main">RE:BUY</span>
      </div>

      {/* Shopping Cart */}
      <button
        onClick={() => navigate('/shoppingBasket')}
        className="p-2"
        aria-label="장바구니"
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </button>
    </header>
  );
}

