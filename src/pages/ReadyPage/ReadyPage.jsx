import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ReadyPage.css";
import Header from "../../components/views/Header/Header";
import StateBox from "../../components/views/StateBox/StateBox";
// import empty from "../../assets/images/storage_empty.svg";
import useFetchFastOrderHistory from "../../hooks/useFetchFastOrderHistory";

function ReadyPage() {
  const navigate = useNavigate();
  const storageList = useFetchFastOrderHistory();

  return (
    <section className="main-container">
      <Header
        headerProps={{ pageName: "바로주문", isClose: false, linkTo: "/" }}
      />
      <main className="content-container">
        {storageList.length ? (
          storageList.map((e, i) => (
            <div
              onClick={() =>
                navigate(
                  `/payment?storeId=${e?.storeId}&inout=${e?.inOut}&cartId=${e?.cartId}`,
                  {
                    state: { returnTo: `/ready` },
                  }
                )
              }
            >
              <StateBox
                id={e.orderId}
                date={e.dateTime}
                name={e.name}
                menu={e.orderName}
                imgUrl={e.imgUrl}
                amount={e.amount}
                isLast={storageList.length - 1 === i}
                state={3}
              />
            </div>
          ))
        ) : (
          <div className="empty-order-wrapper">
            <div className="empty-img-wrapper">
              {/* <img src={empty} className="empty-img" alt={empty} /> */}
            </div>
            <span className="empty-text">주문 내역이 없습니다</span>
          </div>
        )}
      </main>
    </section>
  );
}

export default ReadyPage;
