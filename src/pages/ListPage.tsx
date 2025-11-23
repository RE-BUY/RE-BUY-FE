import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";
import SearchBar from "../components/SearchBar";
import CategorySidebar from "../components/CategorySidebar";
import { getProducts, type Product } from "../services/productService";
import { products as localProducts } from "../data/products";

export default function ListPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [scrollY, setScrollY] = useState(0);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hideThreshold = 100; // (TopNav + SearchBar 높이)

  // URL 파라미터 변경 시 카테고리 및 검색어 업데이트
  useEffect(() => {
    const category = searchParams.get("category");
    const query = searchParams.get("q");
    
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("all");
    }
    
    if (query !== null) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // API에서 상품 목록 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const categoryParam = selectedCategory !== "all" ? selectedCategory.toUpperCase() as any : undefined;
        const response = await getProducts({
          category: categoryParam,
          q: searchQuery || undefined,
          page: 0,
          size: 100, // 충분히 큰 값으로 설정
        });
        setApiProducts(response.items);
      } catch (error) {
        console.error('상품 목록 조회 실패:', error);
        // 에러 발생 시 로컬 데이터 사용
        setApiProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      setScrollY(scrollContainer.scrollTop);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // 스크롤 위치에 따른 검색창 transform 및 opacity 계산
  // TopNav 높이(약 56px) + SearchBar 높이(약 60px) = 약 116px까지 올라가야 완전히 사라짐
  const searchBarOpacity = Math.max(0, 1 - scrollY / hideThreshold);
  const searchBarTransform = -Math.min(scrollY, hideThreshold);
  
  // 검색창이 사라질 때 상품 그리드가 위로 올라오도록 margin-top 조정
  const productGridMarginTop = Math.min(scrollY, hideThreshold);
  const initialPaddingTop = 100; // 검색창과 상품 이미지 사이 여백 (기존 116px에서 줄임)

  // 검색어 및 카테고리로 상품 필터링 (로컬 데이터만 필터링, API는 서버에서 필터링됨)
  const filteredProducts = apiProducts.length > 0 
    ? apiProducts 
    : localProducts.filter((product) => {
        // 카테고리 필터링 (전체가 아닐 때만)
        if (selectedCategory && selectedCategory !== "all" && product.category !== selectedCategory) {
          return false;
        }
        
        // 검색어 필터링
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesSearch = 
            product.brand.toLowerCase().includes(query) ||
            product.type.toLowerCase().includes(query) ||
            (product.model && product.model.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }
        
        return true;
      });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full relative">
        <div className="relative z-50 bg-white">
          <TopNav />
        </div>
        <div
          className="absolute top-0 left-0 right-0 transition-all duration-300 ease-out z-40"
          style={{
            opacity: searchBarOpacity,
            transform: `translateY(${searchBarTransform}px)`,
            pointerEvents: scrollY > hideThreshold ? "none" : "auto",
            marginTop: '82px', // TopNav 높이만큼
          }}
        >
          <SearchBar 
            showMenuIcon={true}
            onMenuClick={() => setIsCategoryOpen(true)}
            onSearch={handleSearch}
            onChange={handleSearch}
          />
        </div>
        
        {/* Product Grid - 스크롤 가능 */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 transition-all duration-300 ease-out relative z-45"
          style={{ 
            WebkitOverflowScrolling: "touch",
            paddingTop: `${Math.max(0, initialPaddingTop - productGridMarginTop)}px`, // 검색창이 사라질 때 padding 감소
            paddingBottom: "100px", // 하단바 높이(55px) + 여유 공간(65px) - 다양한 기기 대응
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            {isLoading ? (
              <div className="col-span-2 text-center py-8 text-gray-500">
                상품을 불러오는 중...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-2 text-center py-8 text-gray-500">
                {searchQuery ? "검색 결과가 없습니다." : "상품이 없습니다."}
              </div>
            ) : (
              filteredProducts.map((product) => {
                // API 응답 형식인지 로컬 형식인지 확인
                const isApiProduct = 'imageUrl' in product;
                const productImage = isApiProduct ? (product as Product).imageUrl : (product as any).image;
                const productName = isApiProduct ? (product as Product).name : (product as any).brand;
                const productType = isApiProduct ? (product as Product).description : (product as any).type;
                const productPrice = isApiProduct ? (product as Product).price : (product as any).price;
                
                return (
                  <div
                    key={product.id}
                    className="flex flex-col cursor-pointer"
                    onClick={() => navigate(`/detail?id=${product.id}`)}
                  >
                    {/* Product Image */}
                    <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 border border-gray-200">
                      <img
                        src={productImage}
                        alt={productName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // 이미지 로드 실패 시 숨기고 배경색만 표시
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="px-1 pb-2">
                      <p className="text-sm font-medium text-gray-800">{productName}</p>
                      <p className="text-xs text-gray-600 mb-1">{productType}</p>
                      <p className="text-sm font-bold text-red1">
                        {productPrice.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        <CategorySidebar
          isOpen={isCategoryOpen}
          onClose={() => setIsCategoryOpen(false)}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            navigate(`/list${category !== "all" ? `?category=${category}` : ""}`);
          }}
        />
      </div>
    </Layout>
  );
}

