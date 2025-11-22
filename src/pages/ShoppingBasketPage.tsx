import React, { useState } from 'react';
import Layout from "../components/Layout";
import { useNavigate } from 'react-router-dom';

export default function ShoppingBasketPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: '저탄소 인증 우유', 
      price: 2800, 
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
  ]);

  // 수량 변경 함수 
  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQty = item.qty + change;
          // 수량은 1보다 작아질 수 없음
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      })
    );
  };

  // 상품 삭제 함수 
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shippingFee = 3000;

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        
        {/* Header */}
        <header className="flex items-center px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <button onClick={() => navigate(-1)} className="mr-4 text-2xl text-gray-600 leading-none pb-1">
            &#8249;
          </button>
          <h1 className="text-lg font-bold text-gray-800 flex items-center gap-1">
            장바구니 <span className="text-2xl">🛒</span>
          </h1>
        </header>

        {/* Contents */}
        <div className="flex-1 overflow-y-auto pb-32">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>장바구니가 비어있습니다.</p>
            </div>
          ) : (
            <ul className="px-5 py-2 divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.id} className="py-6 flex gap-4">
                  {/* 이미지 */}
                  <div className="w-20 h-20 bg-sub1 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover mix-blend-multiply" 
                    />
                  </div>

                  {/* 정보 및 컨트롤 */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
                      
                      {/* [수정됨] 삭제 버튼 클릭 이벤트 연결 */}
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors text-lg"
                      >
                        🗑️
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      <div className="flex items-center bg-gray-50 rounded-md border border-gray-200">
                        {/* [수정됨] 마이너스 버튼 클릭 이벤트 연결 */}
                        <button 
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-l active:bg-gray-300 transition-colors text-lg"
                        >
                          -
                        </button>
                        
                        <span className="px-2 text-sm font-semibold text-gray-700 select-none">
                          {item.qty}
                        </span>
                        
                        {/* [수정됨] 플러스 버튼 클릭 이벤트 연결 */}
                        <button 
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-r active:bg-gray-300 transition-colors text-lg"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-gray-900">
                        {(item.price * item.qty).toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* 금액 요약 */}
          {cartItems.length > 0 && (
            <div className="px-5 mt-4 mb-10">
              <div className="bg-sub1/30 rounded-xl p-5 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>총 상품금액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>배송비</span>
                  <span>{shippingFee.toLocaleString()}원</span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg text-main">
                  <span>결제 예정 금액</span>
                  <span>{(totalPrice + shippingFee).toLocaleString()}원</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Button */}
        <div className="absolute bottom-0 w-full p-5 bg-white border-t border-gray-100">
          <button
            className="w-full py-4 bg-main text-white text-lg font-bold rounded-xl shadow-lg hover:bg-[#3d5a44] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={cartItems.length === 0}
          >
            {cartItems.length > 0 ? `${(totalPrice + shippingFee).toLocaleString()}원 ` : ''}구매하기
          </button>
        </div>
      </div>
    </Layout>
  );
}