import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // localStorage에서 장바구니 데이터 불러오기
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // 기본값 (ShoppingBasketPage의 초기 데이터)
    return [
      { 
        id: 1, 
        name: '재활용 지갑', 
        price: 12800, 
        qty: 2, 
        img: '/images/products/p1.png' 
      },
      { 
        id: 2, 
        name: '리사이클링 지갑', 
        price: 45000, 
        qty: 1, 
        img: '/images/products/p2.png' 
      },
    ];
  });

  // cartItems가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // 총 아이템 수 계산 (수량 합계)
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

