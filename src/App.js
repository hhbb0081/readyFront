import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MyPage from "../src/pages/MyPage/MyPage";
import StoreDetailPage from "../src/pages/StoreDetailPage/StoreDetailPage";
import "./App.css";
// import loading from "./assets/animation/loading.json";
import MembershipPage from "../src/pages/MembershipPage/MembershipPage";
import Loading from "./components/views/PageComponent/Loading";
import Auth from "./hoc/auth";
import AuthenticationPage from "./pages/Authentication/AuthenticationPage";
import CartPage from "./pages/CartPage/CartPage";
import CouponPage from "./pages/CouponPage/CouponPage";
import HomePage from "./pages/HomePage/Homepage";
import LoginPage from "./pages/LoginPage/Login";
import FrequentlyAskedQuestionPage from "./pages/MembershipPage/FrequentlyAskedQuestionPage/FrequentlyAskedQuestionPage";
import CustomerServicePage from "./pages/MyPage/CustomerServicePage/CustomerServicePage";
import EventingPage from "./pages/MyPage/EventingPage/EventingPage";
import MyprofilePage from "./pages/MyPage/MyprofilePage/MyprofilePage";
import PolicyPage from "./pages/MyPage/PolicyPage/PolicyPage";
import PositionpolicyPage from "./pages/MyPage/PolicyPage/PositionpolicyPage";
import PrivacyPolicy from "./pages/MyPage/PolicyPage/PrivacypolicyPage";
import TermsOfUse from "./pages/MyPage/PolicyPage/TermsofusePage";
import ThirdpartyPage from "./pages/MyPage/PolicyPage/ThirdpartyPage";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderProcessPage from "./pages/OrderProcessPage/OrderProcessPage";
import PackagingStatusPage from "./pages/PackagingStatusPage/PackagingStatusPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import PaymentFailPage from "./pages/PaymentPage/Redirect/PaymentFailPage";
import PaymentLoadingPage from "./pages/PaymentPage/Redirect/PaymentLoadingPage";
import Splash from "./pages/Splash/Splash";
import StoreSearchPage from "./pages/StoreSearch/StoreSearch";
function App() {
  // const [cookies, , removeCookies] = useCookies();
  // const [isAuth, setIsAuth] = useRecoilState(isAuthenticatedState);
  // const navigate = useNavigate();
  // const apiRoot = process.env.REACT_APP_API_ROOT;
  // const apiVer = "api/v1";
  // const apiUrl = `${apiRoot}/${apiVer}/refresh/token`;

  //false : 로그인 한 유저 못들어감
  const NewLoginPage = Auth(LoginPage, false); // 로그인 페이지

  //true : 로그인 한 유저 들어감
  const NewHomePage = Auth(HomePage, true); // 홈페이지
  const NewAuthentication = Auth(AuthenticationPage, true, 1);
  const NewOrderHistory = Auth(OrderHistory, true, 2);
  const NewOrderDetail = Auth(OrderDetail, true, 2);
  const NewMyprofilePage = Auth(MyprofilePage, true, 2);

  const NewOrderProcessPage = Auth(OrderProcessPage, true, 2);
  const NewMembershipPage = Auth(MembershipPage, true, 2);
  const NewCouponPage = Auth(CouponPage, true, 2);
  const NewCartPage = Auth(CartPage, true, 2);
  const NewPaymentPage = Auth(PaymentPage, true, 2);
  const NewPaymentLoadingPage = Auth(PaymentLoadingPage, true, 2);
  const NewPaymentFailPage = Auth(PaymentFailPage, true, 2);
  // const NewPackagingStatusPage = Auth(PackagingStatusPage, true);

  // const minute = 1000 * 60 * 60 * 24; // 24시간
  //const minute = 1000 * 60 * 10; // 10분
  // const minute = 1000 * 10; // 10초
  // // 주기적으로 실행되는 함수
  // useInterval(() => {
  //   const token = localStorage.getItem("accessToken");
  //   console.log('local token: ', token);
  //   console.log('isAuth: ', isAuth);
  //   // 리프레시 토큰이 존재하고, 비어 있지 않은 경우
  //   if (token) {
  //     // http 요청에 사용될 헤더 설정과 함께 서버에 토큰 갱신 요청
  //     let config = {
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${token ? token : cookies?.accessToken}`
  //       }
  //     };
  //     console.log('AT 재발급');
  //     axios
  //       .get(apiUrl, config)
  //       .then((response) => {
  //         console.log(response);
  //         // 현재 쿠키 삭제
  //         if (response.status !== 200 ) {
  //           message.info("다시 로그인해주세요.");
  //           removeCookies();
  //           localStorage.clear();
  //           setIsAuth(false);
  //           navigate("/login");
  //         } else {
  //           console.log("AT 재발급 성공! ");
  //           console.log(cookies);
  //           debugger;
  //           cookies?.accessToken && localStorage.setItem("accessToken", cookies?.accessToken); // 로컬 스토리지에 AT 저장
  //           removeCookies("accessToken"); // AT 쿠키 삭제
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         message.info("다시 로그인해주세요.");
  //         navigate("/login");
  //       });
  //   }
  // }, minute - 1000); // 24시간 주기에서 1분을 뺀 주기로 주기적 실행

  return (
    <div className="App">
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* 로그인 하지 않아도 볼 수 있는 페이지 */}
            <Route path="/splash" element={<Splash />} />
            {/* 메인페이지 */}
            <Route path="/" element={<NewHomePage />} />
            {/* 없는 경로로 갈 경우 메인페이지로 강제 이동 */}
            <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
            {/* 카페검색*/}
            <Route path="/search" element={<StoreSearchPage />} />
            {/* 로그인*/}
            <Route path="/login" element={<NewLoginPage />} />
            {/* 번호인증 페이지 */}
            <Route path="/authentication" element={<NewAuthentication />} />
            {/* 쿠폰 및 포인트  faq페이지*/}
            <Route path="/faq" element={<FrequentlyAskedQuestionPage />} />
            {/* 마이페이지-약관정책 페이지 */}
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/termsofuse" element={<TermsOfUse />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/thirdparty" element={<ThirdpartyPage />} />
            <Route path="/position" element={<PositionpolicyPage />} />
            {/* 마이페이지-이벤트 페이지 */}
            <Route path="/eventing" element={<EventingPage />} />
            {/* 가게상세 페이지*/}
            <Route path="/store" element={<StoreDetailPage />} />
            {/* 마이페이지*/}
            <Route path="/mypage" element={<MyPage />} />
            {/* 마이페이지-고객센터 페이지 */}
            <Route path="/customerservice" element={<CustomerServicePage />} />

            {/* 로그인 해야지 볼 수 있는 페이지 */}
            {/* 주문내역 페이지*/}
            <Route path="/status" element={<NewOrderHistory />} />
            {/* 주문상세 페이지 - 추후 병합 예정*/}
            <Route path="/orderDetail" element={<NewOrderDetail />} />
            {/* 마이페이지-마이프로필 확인 페이지 */}
            <Route path="/myprofile" element={<NewMyprofilePage />} />
            {/* 포장 여부 선택 페이지 */}
            <Route path="/packagingStatus" element={<PackagingStatusPage />} />
            {/* 주문 과정 페이지 */}
            <Route path="/order" element={<NewOrderProcessPage />} />
            {/* 마이페이지-쿠폰 확인 페이지 */}
            <Route path="/coupon" element={<NewCouponPage />} />
            {/* 멤버십 포인트 페이지 */}
            <Route path="/membership" element={<NewMembershipPage />} />
            {/* 장바구니 페이지 */}
            <Route path="/cart" element={<NewCartPage />} />
            {/* 결제 페이지 */}
            <Route path="/payment" element={<NewPaymentPage />} />
            {/* 결제 중 리다이렉트 페이지 */}
            <Route
              path="/payment/loading"
              element={<NewPaymentLoadingPage />}
            />
            {/* 결제 실패 리다이렉트 페이지 */}
            <Route path="/payment/fail" element={<NewPaymentFailPage />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

export default App;
