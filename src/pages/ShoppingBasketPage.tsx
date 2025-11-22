import Layout from "../components/Layout";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function ShoppingBasket() {
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useCart();

    // 수량 변경 함수
    const handleQuantityChange = (id: number, change: number) => {
        setCartItems(prevItems => 
            prevItems.map(item => {
                if (item.id === id) {
                    const newQty = item.qty + change;
                    return newQty > 0 ? { ...item, qty: newQty } : item;
                }
                return item;
            })
        );
    };

    // 삭제 함수
    const handleRemoveItem = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const shippingFee = 3000;

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

                {/* 컨텐츠 */}
                <div className="flex-1 flex flex-col overflow-y-auto px-5 py-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center flex-grow text-gray-400">
                            <p>장바구니가 비어있습니다.</p>
                        </div>
                    ) : (
                        <ul className="flex-1 divide-y divide-gray-100">
                            {cartItems.map(item => (
                                <li key={item.id} className="py-4 flex gap-4">
                                    {/* 이미지 */}
                                    <div className="w-20 h-20 bg-sub1 rounded-lg overflow-hidden border border-gray-100">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                    </div>

                                    {/* 정보 및 버튼 */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
                                            <button 
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-gray-400 hover:text-red1 text-lg"
                                            >
                                                x
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-end mt-2">
                                            <div className="flex items-center bg-gray-50 rounded-md border border-gray-200">
                                                <button 
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-l"
                                                >-</button>
                                                <span className="px-2 text-sm font-semibold text-gray-700 select-none">{item.qty}</span>
                                                <button 
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-r"
                                                >+</button>
                                            </div>
                                            <span className="font-bold text-red1">{(item.price * item.qty).toLocaleString()}원</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* 결제 예정 금액 + 구매하기 버튼 묶음 */}
                    {cartItems.length > 0 && (
                        <div className="mt-auto space-y-4">
                            {/* 결제 예정 금액 박스 */}
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
                                    <span className="text-red1">{(totalPrice + shippingFee).toLocaleString()}원</span>
                                </div>
                            </div>

                            {/* 구매하기 버튼 */}
                            <button
                                className="w-full py-4 bg-main text-white text-lg font-bold rounded-xl shadow-lg hover:bg-[#3d5a44] transition-colors"
                            >
                                구매하기
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
