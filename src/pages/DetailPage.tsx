import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { getReviewsByProductId } from '../data/reviews';
import { getBrandInfo } from '../data/brands';
import { useCart } from '../contexts/CartContext';
import { addToCart } from '../services/cartService';
import { getProduct, type Product as ApiProduct } from '../services/productService';
import { getImageFullUrl } from '../utils/imageUtils';
import earthIcon from '../assets/earth.svg';
import basketIcon from '../assets/basket.svg';

export default function DetailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // productId 검증
  const idParam = searchParams.get('id');
  if (!idParam) {
    console.error("❌ productId 없음 → API 호출 안 함");
    return (
      <div className="flex flex-col h-full bg-white items-center justify-center">
        <p className="text-gray-500">상품 ID가 없습니다.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 px-4 py-2 bg-main text-white rounded-lg"
        >
          홈으로 가기
        </button>
      </div>
    );
  }
  
  const productId = Number(idParam);
  if (isNaN(productId) || productId <= 0) {
    console.error("❌ 유효하지 않은 productId:", idParam);
    return (
      <div className="flex flex-col h-full bg-white items-center justify-center">
        <p className="text-gray-500">유효하지 않은 상품 ID입니다.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 px-4 py-2 bg-main text-white rounded-lg"
        >
          홈으로 가기
        </button>
      </div>
    );
  }
  
  const { setCartItems, cartItems, cartItemCount } = useCart();
  const [activeTab, setActiveTab] = useState<'info' | 'review' | 'inquiry'>('info');
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [inquiryForm, setInquiryForm] = useState({
    title: '',
    content: '',
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [apiProduct, setApiProduct] = useState<ApiProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // API에서 상품 상세 정보 가져오기
// API에서 상품 상세 정보 가져오기
useEffect(() => {

  console.log("🔍 DetailPage: URL에서 받은 productId =", productId);

  const fetchProduct = async () => {
    console.log("📡 getProduct() 호출 시작:", productId);

    setIsLoading(true);
    try {
      const productData = await getProduct(productId);
      console.log("✅ getProduct() 성공:", productData);
      console.log("📎 추가 이미지 raw:", productData.imageUrls);
      console.log("📎 변환된 전체 이미지 URL:", productData.imageUrls?.map(url => getImageFullUrl(url)));

      setApiProduct(productData);
    } catch (error) {
      console.error("❌ getProduct() 실패:", error);
      setApiProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  fetchProduct();
}, [productId]);



  // API 상품 또는 로컬 상품 사용
  const localProduct = products.find(p => p.id === productId) || products[0];
  const product = apiProduct ? {
    id: apiProduct.id,
    brand: apiProduct.manufacturer || apiProduct.name,
    type: apiProduct.name,
    price: apiProduct.price,
    // 🔥 무조건 전체 URL로 변환해야 함
    imageUrl: getImageFullUrl(apiProduct.imageUrl),
    image: getImageFullUrl(apiProduct.imageUrl),
    category: apiProduct.category,
    model: undefined as string | undefined, // API 상품은 model 없음
    additionalImages: apiProduct.imageUrls?.map(url => getImageFullUrl(url)) || [], // 백엔드에서 받은 추가 이미지 배열도 전체 URL로 변환
  } : {
    ...localProduct,
    imageUrl: localProduct.image,
    image: localProduct.image,
    additionalImages: [] as string[], // 로컬 상품은 추가 이미지 없음
  };

  // 브랜드 정보 가져오기
  const brandInfo = getBrandInfo(product.brand);
  console.log('브랜드 정보 확인:', { brand: product.brand, brandInfo });
  
  // 추가 이미지에서 썸네일 제외 (p1_1.png 같은 썸네일은 제외하고 p1_2.png부터 표시)
  const thumbnailUrl = product.imageUrl;
  const additionalImages = product.additionalImages.filter(img => {
    // 썸네일과 같은 이미지는 제외
    if (img === thumbnailUrl) {
      return false;
    }
    // 파일명으로도 비교 (예: p1_1.png는 제외, p1_2.png부터 포함)
    const thumbnailFileName = thumbnailUrl.split('/').pop() || '';
    const imgFileName = img.split('/').pop() || '';
    // 같은 파일명이면 제외
    if (thumbnailFileName === imgFileName) {
      return false;
    }
    return true;
  });
  
  // 상품별 후기 가져오기
  const productReviews = getReviewsByProductId(product.id);

  // 정렬된 후기
  const sortedReviews = [...productReviews].sort((a, b) => {
    if (sortOrder === 'latest') {
      return b.date.getTime() - a.date.getTime();
    } else {
      return a.date.getTime() - b.date.getTime();
    }
  });

  // 별점 표시 컴포넌트
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // 장바구니에 추가
  const handleAddToCart = async () => {
    try {
      // API 호출
      await addToCart(product.id, 1);
      
      // 로컬 상태도 업데이트 (UI 반영)
      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        setCartItems(cartItems.map(item => 
          item.id === product.id 
            ? { ...item, qty: item.qty + 1 }
            : item
        ));
      } else {
        setCartItems([...cartItems, {
          id: product.id,
          name: product.type,
          price: product.price,
          qty: 1,
          img: product.imageUrl || product.image
        }]);
      }
      
      // 담기 성공 메시지 표시
      setShowCartMessage(true);
      setTimeout(() => setShowCartMessage(false), 2000);
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      alert('장바구니에 추가하는데 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 구매하기 - 장바구니에 상품이 있는지 확인하고 없으면 추가
  const handlePurchase = () => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (!existingItem) {
      // 장바구니에 없으면 추가
      setCartItems([...cartItems, {
        id: product.id,
        name: product.type,
        price: product.price,
        qty: 1,
        img: product.imageUrl || product.image
      }]);
    }
    // 장바구니 페이지로 이동
    navigate('/shoppingBasket');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-white items-center justify-center">
        <p className="text-gray-500">상품 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* 헤더 with 뒤로가기 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => navigate(-1)} 
            className="text-2xl text-gray-600 leading-none pb-1"
          >
            &#8249;
          </button>
          <div className="flex items-center gap-2">
            <img src={earthIcon} alt="RE:BUY" className="w-6 h-6" />
            <span className="text-lg font-bold text-main">RE:BUY</span>
          </div>
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
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-[80px]">
          {/* 메인 상품 이미지 */}
          <div className="w-full">
            <img 
              src={product.imageUrl} 
              alt={product.type}
              className="w-full h-auto object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          {/* 상품 정보 */}
          <div className="px-4 mt-8 mb-10">
            <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
            <h1 className="text-xl font-bold text-gray-800 mb-2">{product.type}</h1>
            {product.model && (
              <p className="text-sm text-gray-500 mb-3">{product.model}</p>
            )}
            <p className="text-2xl font-bold text-red1 mb-6">
              {product.price.toLocaleString()}원
            </p>

            {/* 탭 (가격 바로 아래) */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'info' 
                    ? 'bg-main text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                정보
              </button>
              <button
                onClick={() => setActiveTab('review')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'review' 
                    ? 'bg-main text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                사용 후기
              </button>
              <button
                onClick={() => setActiveTab('inquiry')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'inquiry' 
                    ? 'bg-main text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                문의
              </button>
            </div>
            <div className="border-b border-gray-200 mt-[40px] mb-8"></div>
          </div>

          {/* 탭 컨텐츠 */}
          <div className="px-4">
            {activeTab === 'info' && (
              <div className="space-y-6">
                {/* 기업 정보 (디테일 사진 앞) */}
                <div className="text-center mb-8">
                  {brandInfo ? (
                    <>
                      <h2 className="text-[28px] font-extrabold mb-2">
                        <span className="text-main">{brandInfo.brandNameEn[0]}</span>
                        <span className="text-black">{brandInfo.brandNameEn.slice(1)}</span>
                      </h2>
                      <p className="text-base text-black mb-4">{brandInfo.brandName}</p>
                      <div className="text-sm text-gray-600 leading-relaxed mb-6">
                        {(brandInfo.descriptionEn || brandInfo.description).map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-[28px] font-extrabold mb-2">
                        <span className="text-main">{product.brand?.[0] || 'R'}</span>
                        <span className="text-black">{product.brand?.slice(1) || 'E:BUY'}</span>
                      </h2>
                      <p className="text-base text-black mb-4">{product.brand || 'RE:BUY'}</p>
                      <div className="text-sm text-gray-600 leading-relaxed mb-6">
                        <p>Founded by eco-conscious entrepreneurs</p>
                        <p>Sustainable upcycling brand.</p>
                      </div>
                    </>
                  )}
                  <div className="border-t border-[#828282] w-[20px] mx-auto border-[0.6px]"></div>
                </div>

                {/* 추가 상품 이미지 (정보 탭에만 표시) */}
                {additionalImages.length > 0 && (
                  <div className="space-y-4 mb-6">
                    {additionalImages.map((img: string, idx: number) => (
                      <div key={idx} className="w-full bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={img} 
                          alt={`${product.type} ${idx + 2}`}
                          className="w-full h-auto object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 브랜드 정보 */}
                {brandInfo && (
                  <>
                    <div className="text-center mt-20">
                      <h2 className="text-[28px] font-extrabold mb-4">
                        <span className="text-main">{brandInfo.brandNameEn[0]}</span>
                        <span className="text-black">{brandInfo.brandNameEn.slice(1)}</span>
                      </h2>
                      <p className="text-base text-black mb-14">{brandInfo.brandName}</p>
                      <div className="text-sm text-black leading-relaxed mb-8">
                        {brandInfo.description.map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                      <div className="border-t border-[#828282] w-[20px] mx-auto border-[0.6px] mb-10"></div>
                    </div>

                    {/* MADE BY 섹션 */}
                    <div className="text-center">
                      <h3 className="text-base font-medium text-[#828282] mb-6">MADE BY</h3>
                      <div className="grid grid-cols-3">
                        {brandInfo.materials.map((material, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div className="w-full aspect-square mb-2 bg-transparent overflow-hidden">
                              {material.image && (
                                <img
                                  src={getImageFullUrl(material.image)}
                                  alt={material.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              )}
                            </div>
                            <p className="text-sm text-[#828282] text-center mb-[100px]">{material.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'review' && (
              <div className="space-y-4">
                {/* 정렬 버튼 */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSortOrder('latest')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      sortOrder === 'latest'
                        ? 'bg-main text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    최신순
                  </button>
                  <button
                    onClick={() => setSortOrder('oldest')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      sortOrder === 'oldest'
                        ? 'bg-main text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    오래된순
                  </button>
                </div>

                {/* 후기 목록 */}
                {sortedReviews.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    <p> 사용 후기가 없습니다.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-gray-200 rounded-lg p-4 bg-white"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-800 mb-1">
                              {review.title}
                            </h3>
                            <StarRating rating={review.rating} />
                          </div>
                          <span className="text-xs text-gray-500">
                            {review.date.toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                          {review.content}
                        </p>
                        <p className="text-xs text-gray-500">작성자: {review.author}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'inquiry' && (
              <div className="space-y-6">
                {inquirySubmitted ? (
                  <div className="py-8 text-center">
                    <p className="text-main font-semibold mb-2">문의가 접수되었습니다.</p>
                    <p className="text-sm text-gray-600 mb-4">
                      빠른 시일 내에 답변드리겠습니다.
                    </p>
                    <button
                      onClick={() => {
                        setInquirySubmitted(false);
                        setInquiryForm({ title: '', content: '' });
                      }}
                      className="px-6 py-2 bg-main text-white rounded-lg text-sm font-medium"
                    >
                      새 문의 작성하기
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        문의사항이 있으신가요?
                      </h3>
                      <p className="text-sm text-gray-600">
                        상품에 대한 궁금한 점을 남겨주시면 빠르게 답변드리겠습니다.
                      </p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (inquiryForm.title.trim() && inquiryForm.content.trim()) {
                          setInquirySubmitted(true);
                        }
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          제목
                        </label>
                        <input
                          type="text"
                          value={inquiryForm.title}
                          onChange={(e) =>
                            setInquiryForm({ ...inquiryForm, title: e.target.value })
                          }
                          placeholder="문의 제목을 입력해주세요"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          문의 내용
                        </label>
                        <textarea
                          value={inquiryForm.content}
                          onChange={(e) =>
                            setInquiryForm({ ...inquiryForm, content: e.target.value })
                          }
                          placeholder="문의 내용을 입력해주세요"
                          rows={8}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main resize-none"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-main text-white rounded-lg font-semibold hover:bg-[#3d5a44] transition-colors"
                      >
                        문의하기
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

      {/* 하단 고정 버튼 (하단 네비게이션 자리) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 z-[70]">
        <button
          onClick={handlePurchase}
          className="flex-[2] py-3 bg-main text-white rounded-xl font-semibold"
        >
          구매하기
        </button>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 bg-sub1 text-gray-600 rounded-xl font-semibold"
        >
          장바구니
        </button>
      </div>

      {/* 장바구니 담기 성공 메시지 */}
      {showCartMessage && (
        <div 
          className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          style={{
            animation: 'fadeIn 0.3s ease-in'
          }}
        >
          장바구니에 담겼습니다
        </div>
      )}
    </div>
  );
}
