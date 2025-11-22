import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import basketIcon from '../assets/basket.svg';
import earthIcon from '../assets/earth.svg';

export default function TopNav() {
  const navigate = useNavigate();
  const { cartItemCount } = useCart();

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
        className="p-2 relative"
        aria-label="장바구니"
      >
        <img src={basketIcon} alt="장바구니" className="w-6 h-6" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {cartItemCount > 99 ? '99+' : cartItemCount}
          </span>
        )}
      </button>
    </header>
  );
}

