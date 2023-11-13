import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../src/pages/HomePage/Homepage";
import MyPage from "../src/pages/MyPage/MyPage";
import StoreDetailPage from "../src/pages/StoreDetailPage/StoreDetailPage";
import TestPage from "../src/pages/TestPage/TestPage";
import "./App.css";
import OrderProcessPage from "./pages/OrderProcessPage/OrderProcessPage";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import OrderStorage from "./pages/OrderStorage/OrderStorage";
import PackagingStatusPage from "./pages/PackagingStatusPage/PackagingStatusPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={<HomePage />} />
        {/* 없는 경로로 갈 경우 메인페이지로 강제 이동 */}
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        {/* 테스트 페이지 - 카페검색*/}
        <Route path="/search" element={<TestPage />} />
        {/* 주문내역 페이지*/}
        <Route path="/storage" element={<OrderStorage />} />
        {/* 주문상태 페이지 - 추후 병합 예정*/}
        <Route path="/status" element={<OrderStatus />} />
        {/* 테스트 페이지 - 바로주문*/}
        <Route path="/ready" element={<TestPage />} />
        {/* 테스트 페이지 - 마이페이지*/}
        <Route path="/mypage" element={<MyPage />} />
        {/* 테스트 페이지 - 로그인*/}
        <Route path="/login" element={<TestPage />} />
        {/* 테스트 페이지 - 이벤트*/}
        <Route path="/event" element={<TestPage />} />
        {/* 카페 상세 페이지*/}
        <Route path="/store" element={<StoreDetailPage />} />
        {/* 포장 여부 선택 페이지 */}
        <Route path="/packagingStatus" element={<PackagingStatusPage />} />
        {/* 주문 과정 페이지 */}
        <Route path="/order" element={<OrderProcessPage />} />
      </Routes>
    </div>
  );
}

export default App;
