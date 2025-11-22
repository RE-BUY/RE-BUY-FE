import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'

function App() {
  return (
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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
