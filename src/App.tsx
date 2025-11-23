import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import MainPage from './pages/MainPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Join1Page from './pages/Join1Page'
import Join2Page from './pages/Join2Page'
import SearchPage from './pages/SearchPage'
import DetailPage from './pages/DetailPage'
import ShoppingBasketPage from './pages/ShoppingBasketPage'
import PloggingPage from './pages/PloggingPage'
import MyPage from './pages/MyPage'
import PointPage from './pages/PointPage'
import ListPage from './pages/ListPage'
import PurchaseHistoryPage from './pages/PurchaseItem'
import MyPloggingPage from './pages/MyPlogging'
import InquiryPage from './pages/InquiryPage'  // 새로 추가
import ReviewPage from './pages/ReviewPage'      // 새로 추가

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="mobile-frame relative">
            <div className="h-full">
              <Routes>
                <Route path="/" element={<Navigate to="/main" replace />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join1" element={<Join1Page />} />
                <Route path="/join2" element={<Join2Page />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/detail" element={<DetailPage />} />
                <Route path="/shoppingBasket" element={<ShoppingBasketPage />} />
                <Route path="/plogging" element={<PloggingPage />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="/point" element={<PointPage />} />
                <Route path="/list" element={<ListPage />} />
                <Route path="/history" element={<PurchaseHistoryPage/>} />
                <Route path="/my-plogging" element={<MyPloggingPage/>} />
                <Route path="/inquiry" element={<InquiryPage />} />  {/* 문의 페이지 */}
                <Route path="/review" element={<ReviewPage />} />    {/* 리뷰 페이지 */}
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
