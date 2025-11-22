import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";
import TopNav from "../components/TopNav";
import { useNavigate } from "react-router-dom";

// API 함수들 import
import { getMyPageInfo } from "../api/mypage";
import {
  getRecommendations,
  getCurrentReport,
  getMonthlyReport,
} from "../api/ai";

interface Product {
  id: number;
  name: string;
  img: string;
  brand: string;
}

interface UserInfo {
  name: string;
  waterSaved: number;
  treesSaved: number;
}

interface ReportData {
  month: string;
  totalUsage: number;
  savedWater: number;
}

export default function MyPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [recentItems, setRecentItems] = useState<Product[]>([]);
  const [currentReport, setCurrentReport] = useState<ReportData | null>(null);
  const [monthlyReport, setMonthlyReport] = useState<ReportData[]>([]);

  useEffect(() => {
    // 1. 마이페이지 정보
    getMyPageInfo()
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.error("mypage error:", err));

    // 2. 최근 본 상품 + 추천
    getRecommendations()
      .then((res) => setRecentItems(res.data))
      .catch((err) => console.error("recommendations error:", err));

    // 3. 이번 달 리포트
    getCurrentReport()
      .then((res) => setCurrentReport(res.data))
      .catch((err) => console.error("current report error:", err));

    // 4. 월별 리포트
    getMonthlyReport()
      .then((res) => setMonthlyReport(res.data))
      .catch((err) => console.error("monthly report error:", err));
  }, []);

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white overflow-y-auto pb-20">
        <TopNav />

        {/* ------------------ 유저 기본 정보 ------------------ */}
        {userInfo && (
          <section className="px-6 pt-4 pb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {userInfo.name}님
            </h1>
            <p className="text-main font-medium text-sm">
              물 {userInfo.waterSaved}L · 나무 {userInfo.treesSaved}그루 절약중!
            </p>
          </section>
        )}

        {/* ------------------ 최근 본 상품 / 추천 ------------------ */}
        <section className="px-6 mb-8 space-y-2">
          <h2 className="font-bold text-gray-800 mb-3">최근 본 상품</h2>

          <div className="bg-sub1 rounded-xl p-2">
            <div className="flex gap-4 overflow-x-auto py-4 px-2 scroll-smooth scrollbar-thin">
              {recentItems.map((item) => (
                <div
                  key={item.id}
                  className="w-44 h-44 flex-shrink-0 bg-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition"
                  onClick={() => navigate(`/detail?id=${item.id}`)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------ 이번 달 리포트 ------------------ */}
        {currentReport && (
          <section className="px-6 mb-6">
            <h2 className="font-bold text-gray-800 mb-3">이번 달 녹색 소비</h2>
            <div className="bg-sub2 p-4 rounded-xl">
              <p className="font-semibold text-gray-900">
                사용량: {currentReport.totalUsage}개
              </p>
              <p className="text-main">
                절약한 물: {currentReport.savedWater}L
              </p>
            </div>
          </section>
        )}

        {/* ------------------ 월별 리포트 ------------------ */}
        {monthlyReport.length > 0 && (
          <section className="px-6 mb-20">
            <h2 className="font-bold text-gray-800 mb-3">월별 리포트</h2>

            <div className="space-y-3">
              {monthlyReport.map((m, idx) => (
                <div key={idx} className="bg-gray-100 p-4 rounded-xl">
                  <p className="font-bold text-gray-900">{m.month}</p>
                  <p className="text-gray-700">사용량: {m.totalUsage}개</p>
                  <p className="text-main">절약한 물: {m.savedWater}L</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <BottomNav className="absolute bottom-0 left-0 right-0" />
    </Layout>
  );
}
