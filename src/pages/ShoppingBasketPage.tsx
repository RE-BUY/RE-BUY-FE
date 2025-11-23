import { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { checkoutOrder } from '../services/orderService';
import { removeFromCart, updateCartItem, getCart, clearCart } from '../services/cartService';
import { getMyPageInfo } from '../services/myPageService';
import { products } from '../data/products';

export default function ShoppingBasket() {
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useCart();
    const [isLoading, setIsLoading] = useState(true);

    // 2. 수량 변경 함수
    const handleQuantityChange = async (id: number, change: number) => {
        const item = cartItems.find(item => item.id === id);
        if (!item) return;
        
        const newQty = item.qty + change;
        if (newQty <= 0) return; // 수량이 0 이하면 업데이트하지 않음
        
        try {
            // API 호출
            await updateCartItem(id, newQty);
            
            // 로컬 상태도 업데이트 (UI 즉시 반영)
            setCartItems(prevItems => 
                prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, qty: newQty };
                    }
                    return item;
                })
            );
        } catch (error) {
            console.error('수량 변경 실패:', error);
            alert('수량을 변경하는데 실패했습니다. 다시 시도해주세요.');
        }
    };

    // 3. 삭제 함수
    const handleRemoveItem = async (id: number) => {
        try {
            // API 호출
            await removeFromCart(id);
            
            // 로컬 상태도 업데이트 (UI 즉시 반영)
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('장바구니 삭제 실패:', error);
            alert('상품을 삭제하는데 실패했습니다. 다시 시도해주세요.');
        }
    };

    // 페이지 로드 시 서버에서 장바구니 데이터 가져오기
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartData = await getCart();
                // API 응답을 로컬 CartItem 형식으로 변환
                const convertedItems = cartData.items.map(apiItem => {
                    const product = products.find(p => p.id === apiItem.id);
                    return {
                        id: apiItem.id,
                        name: apiItem.productName,
                        price: apiItem.unitPrice,
                        qty: apiItem.quantity,
                        img: product?.image || '/images/products/p1.png'
                    };
                });
                setCartItems(convertedItems);
            } catch (error) {
                console.error('장바구니 조회 실패:', error);
                // 에러 발생 시 로컬 상태 유지
            } finally {
                setIsLoading(false);
            }
        };
        fetchCart();
    }, [setCartItems]);

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const shippingFee = 3000;

    const handlePurchase = async () => {
        if (cartItems.length === 0) return;
        
        try {
            // 보유 크레딧 조회
            let availableCredit = 0;
            try {
                const myPageInfo = await getMyPageInfo();
                availableCredit = myPageInfo.totalCredit || 0;
            } catch (error) {
                console.error('크레딧 조회 실패:', error);
                // 에러 발생 시 0으로 설정
            }
            
            // 총 금액 계산
            const totalAmount = totalPrice + shippingFee;
            // 보유 크레딧 범위 내에서 최대 사용
            const creditToUse = Math.min(availableCredit, totalAmount);
            
            // 체크아웃 정보 (임시 값, 실제로는 입력 폼에서 받아야 함)
            const checkoutData = {
                creditToUse: creditToUse,
                receiverName: '홍길동', // TODO: 실제 입력값으로 교체
                address: '서울시 강남구 테헤란로 123', // TODO: 실제 입력값으로 교체
                contactPhone: '010-1234-5678', // TODO: 실제 입력값으로 교체
            };
            
            // 주문 체크아웃 (장바구니 전체 주문하기)
            await checkoutOrder(checkoutData);
            
            // 구매 완료 메시지 먼저 표시
            alert('구매가 완료되었습니다!');
            
            // 서버 장바구니 비우기
            try {
                await clearCart();
            } catch (error) {
                console.error('장바구니 비우기 실패:', error);
            }
            
            // 로컬 장바구니 비우기
            setCartItems([]);
            
            // 주문내역 페이지로 이동
            setTimeout(() => {
                navigate('/history');
            }, 100);
        } catch (error) {
            console.error('주문 체크아웃 실패:', error);
            alert('주문 처리에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <Layout>
            <div className="flex flex-col h-full bg-white relative">
                
                {/* 헤더 */}
                <header className="flex items-center px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <button onClick={() => navigate(-1)} className="mr-4 text-2xl text-gray-600 leading-none pb-1">
                        &#8249;
                    </button>
                    <h1 className="text-lg font-bold text-gray-800 flex items-center gap-1">
                        장바구니
                    </h1>
                </header>

                {/* 컨텐츠 (flex-col로 설정하여 결제칸을 아래로 밀 수 있게 함) */}
                <div className="flex-1 overflow-y-auto pb-16 flex flex-col">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center flex-grow text-gray-400">
                            <p>장바구니를 불러오는 중...</p>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center flex-grow text-gray-400">
                            <p>장바구니가 비어있습니다.</p>
                        </div>
                    ) : (
                        <ul className="px-5 py-2 divide-y divide-gray-100">
                            {cartItems.map((item, index) => (
                                <li key={`${item.id}-${index}`} className="py-6 flex gap-4">
                                    {/* 이미지 */}
                                    <div className="w-20 h-20 bg-sub1 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100">
                                        <img 
                                            src={item.img} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover mix-blend-multiply" 
                                        />
                                    </div>

                                    {/* 정보 및 버튼 */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
                                            
                                            <button 
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors text-lg"
                                            >
                                                x
                                            </button>
                                        </div>
                                        
                                        <div className="flex justify-between items-end mt-2">
                                            <div className="flex items-center bg-gray-50 rounded-md border border-gray-200">
                                                <button 
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-l active:bg-gray-300 transition-colors text-lg"
                                                >
                                                    -
                                                </button>
                                                
                                                <span className="px-2 text-sm font-semibold text-gray-700 select-none">{item.qty}</span>
                                                
                                                <button 
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-r active:bg-gray-300 transition-colors text-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            
                                            {/* [수정됨] 개별 가격 빨간색 적용 (text-red-500) */}
                                            <span className="font-bold text-red-500">
                                                {(item.price * item.qty).toLocaleString()}원
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* 가격 정보 (mt-auto로 가능한 아래로 밀고, 상단 여백 추가) */}
                    {cartItems.length > 0 && (
                        <div className="px-5 mt-auto pt-10 mb-10">
                            <div className="bg-sub1/30 rounded-xl p-5 space-y-3">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>총 상품금액</span>
                                    <span>{totalPrice.toLocaleString()}원</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>배송비</span>
                                    <span>{shippingFee.toLocaleString()}원</span>
                                </div>
                                <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg text-gray-800"> 
                                    <span>결제 예정 금액</span>
                                    {/* 결제 예정 금액도 빨간색으로 강조 */}
                                    <span className="text-red-600">{(totalPrice + shippingFee).toLocaleString()}원</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 하단 구매 버튼 */}
                <div className="absolute bottom-0 w-full p-5 bg-white border-t border-gray-100">
                    <button
                        onClick={handlePurchase}
                        className="w-full py-3 bg-main text-white text-lg font-bold rounded-xl shadow-lg hover:bg-[#3d5a44] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex justify-center items-center"
                        disabled={cartItems.length === 0}
                    >
                        구매하기
                    </button>
                </div>
            </div>
        </Layout>
    );
}