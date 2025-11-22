import { useNavigate } from 'react-router-dom';
import basketIcon from '../assets/basket.svg';
import earthIcon from '../assets/earth.svg';

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      {/* Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/home')}
      >
        <img src={earthIcon} alt="RE:BUY" className="w-6 h-6" />
        <span className="text-lg font-bold text-main">RE:BUY</span>
      </div>

      {/* Shopping Cart */}
      <button
        onClick={() => navigate('/shoppingBasket')}
        className="p-2"
        aria-label="장바구니"
      >
        <img src={basketIcon} alt="장바구니" className="w-6 h-6" />
      </button>
    </header>
  );
}

