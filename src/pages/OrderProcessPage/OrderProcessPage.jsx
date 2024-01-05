import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import minus from "../../assets/images/icon_minus.png";
import minusDisabled from "../../assets/images/icon_minus_disabled.png";
import plus from "../../assets/images/icon_plus.png";
import noImageMenu from "../../assets/images/no_image_menu.svg";
import toggleDown from "../../assets/images/toggle_down.svg";
import toggleUp from "../../assets/images/toggle_up.svg";
import Header from "../../components/views/Header/Header";
import Modal from "../../components/views/Modal/Modal";
import TEXT from "../../constants/text";
import "./OrderProcess.css";
import useFetchFoodOptionInfo from "../../hooks/useFetchFoodOptionInfo";
import useUpdateCart from "../../hooks/useUpdateCart";
import useResetCart from "../../hooks/useResetCart";

const OrderProcessPage = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  const foodieId = params.get("foodie_id");
  const status = params.get("status");
  const [optionOpen, setOptionOpen] = useState(false);
  const [orderCnt, setOrderCnt] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const foodOptionInfo = useFetchFoodOptionInfo(storeId, foodieId, inout);
  const updateCart = useUpdateCart();
  const resetCart = useResetCart();

  const handleCartUpdate = () => {
    let body = {
      storeId: storeId,
      foodieId: foodieId,
      options: [...essentialOptionIdx, ...optionIdx],
      count: orderCnt,
      inout: inout,
    };

    updateCart(body)
      .then((res) => {
        // 성공적으로 처리된 경우의 로직
        setOptionIdx(
          foodOptionInfo?.category
            ?.filter((el) => el?.essential)
            ?.map((e) => e?.options[0]?.idx)
        );
        setEssentialOptionIdx(
          foodOptionInfo?.category
            ?.filter((e) => e.essential)
            ?.map((cate) => cate.options[0].idx)
        );
        navigate(`/store?storeId=${storeId}&inout=${inout}`);
      })
      .catch((error) => {
        let title = "에러 발생";
        // 에러가 발생한 경우에 대한 로직
        console.error("Error resetting cart", error);

        if (error.response.status === 400) {
          // 다른 가게 메뉴를 담으려고 할 때
          title = TEXT.cartModal400;
          setIsOpen(true);
          setModalTitle(title);
        } else if (error.response.status === 409) {
          // 포장 상태가 다른 메뉴를 담을 때
          title = TEXT.cartModal409;
          setIsOpen(true);
          setModalTitle(title);
        }
      });
  };

  const handleCancle = () => {
    setIsOpen((prev) => !prev);

    resetCart()
      .then(() => {
        // 성공적으로 리셋된 후, 장바구니 업데이트 로직
        let body = {
          storeId: storeId,
          foodieId: foodieId,
          options: [...essentialOptionIdx, ...optionIdx],
          count: orderCnt,
          inout: inout,
        };

        return updateCart(body); // 장바구니 업데이트 함수 호출, body 데이터 전달
      })
      .then(() => {
        // 장바구니 업데이트 후의 로직
        navigate(`/store?storeId=${storeId}&inout=${inout}`);
      })
      .catch((error) => {
        // 에러 처리 로직
        console.error("Error in cart operation", error);
      });
    // 모달을 닫습니다.
    setIsOpen(false);
  };

  const [activeToggles, setActiveToggles] = useState(
    foodOptionInfo?.category?.filter((el) => el?.essential).map(() => false)
  );
  const [selectedRadioTexts, setSelectedRadioTexts] = useState(
    foodOptionInfo &&
      foodOptionInfo.category
        ?.filter((el) => el?.essential)
        .map((e) => `${e.options[0]?.name}`)
  );
  const [totalAmount, setTotalAmount] = useState(
    foodOptionInfo && foodOptionInfo.price && foodOptionInfo?.price
  );
  const [prevRadioPrice, setPrevRadioPrice] = useState(
    foodOptionInfo?.category?.map(() => 0)
  );
  const [optionIdx, setOptionIdx] = useState([]);
  const [essentialOptionIdx, setEssentialOptionIdx] = useState({});

  useEffect(() => {
    setActiveToggles(
      foodOptionInfo?.category?.filter((e) => e?.essential).map(() => false)
    );
    setSelectedRadioTexts(
      foodOptionInfo.category
        ?.filter((el) => el?.essential)
        .map((e) => `${e?.options[0]?.name}`)
    );
    setTotalAmount(
      orderCnt &&
        orderCnt *
          (foodOptionInfo?.price +
            parseInt(
              foodOptionInfo?.category
                ?.filter((el) => el?.essential)
                .map((e) => parseInt(e?.options[0]?.price))
                .reduce((prev, curr) => prev + curr, 0)
            ))
    );
    setPrevRadioPrice(
      foodOptionInfo?.category
        ?.filter((el) => el?.essential)
        ?.map((e) => e?.options[0]?.price)
    );
    setEssentialOptionIdx(
      foodOptionInfo?.category
        ?.filter((e) => e?.essential)
        ?.map((cate) => cate?.options[0]?.idx)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodOptionInfo]);

  const handleToggle = (index) => {
    setActiveToggles((prevToggles) => {
      const toggles = [...prevToggles];
      toggles[index] = !toggles[index];
      return toggles;
    });

    // if (!activeToggles[index] && index < activeToggles.length - 1) {
    //   setActiveToggleIndex(index + 1);
    // }
  };

  const handleRadioChange = (index, text, price, idx) => {
    setSelectedRadioTexts((prevTexts) => {
      const texts = [...prevTexts];
      texts[index] = text;
      return texts;
    });

    setTotalAmount((prevAmount) => prevAmount - prevRadioPrice[index] + price);

    setPrevRadioPrice((prevPrices) => {
      const prices = [...prevPrices];
      prices[index] = price;
      return prices;
    });

    setEssentialOptionIdx((prevOptions) => {
      const options = [...prevOptions];
      options[index] = idx;
      return options;
    });
  };

  const handleOptionChange = (idx, price, e) => {
    e.target.checked
      ? setTotalAmount((prevAmount) => prevAmount + price)
      : setTotalAmount((prevAmount) => prevAmount - price);
    e.target.checked
      ? setOptionIdx((prev) => [...prev, idx])
      : setOptionIdx((prev) => prev.filter((e) => e !== idx));
  };

  const handleCntUp = () => {
    const newOrderCnt = orderCnt + 1;
    setOrderCnt(newOrderCnt);
  };

  const handleCntDown = () => {
    const newOrderCnt = orderCnt === 1 ? 1 : orderCnt - 1;
    setOrderCnt((prev) => (prev === 1 ? 1 : newOrderCnt));
  };

  return (
    <div className="order-process-page">
      <Header
        headerProps={{
          pageName: "",
          isClose: false,
          linkTo: `/store?storeId=${storeId}&inout=${inout}`,
        }}
      />

      <img
        className="order-process-page__menu__img"
        src={foodOptionInfo?.imgUrl ? foodOptionInfo.imgUrl : noImageMenu}
        alt="menuImg"
      />

      <div className="order-process-page__menu__name">
        {foodOptionInfo?.name}
      </div>

      <div className="order-process-page__toggle">
        {foodOptionInfo?.category?.length ? (
          foodOptionInfo.category
            .filter((c, i) => c?.essential)
            .map((category, index) => (
              <div
                className="order-process-page__toggle__container"
                key={index}
              >
                <div
                  className={`order-process-page__toggle__header ${
                    activeToggles?.length && activeToggles[index] && "open"
                  }`}
                  onClick={() => handleToggle(index)}
                >
                  <span className="order-process-page__toggle__name">
                    {category.name}
                  </span>
                  <span className="order-process-page__toggle__btn">
                    {selectedRadioTexts?.length && selectedRadioTexts[index] ? (
                      <span className="order-process-page__selected-radio">
                        {selectedRadioTexts[index]}
                      </span>
                    ) : (
                      <span className="order-process-page__selected-radio"></span>
                    )}
                    <img
                      className="order-process-page__toggle__header__img"
                      src={
                        activeToggles?.length && activeToggles[index]
                          ? toggleUp
                          : toggleDown
                      }
                      alt={
                        activeToggles?.length && activeToggles[index]
                          ? "Toggle Up"
                          : "Toggle Down"
                      }
                    />
                  </span>
                </div>

                {activeToggles?.length && activeToggles[index] && (
                  <div
                    className={`order-process-page__toggle__body__container open`}
                    key={index}
                  >
                    {category?.options?.map((option, optionIndex) => (
                      <div
                        className="order-process-page__toggle__body__radio"
                        key={optionIndex}
                      >
                        <label htmlFor={`radio_${index}_${optionIndex}`}>
                          <input
                            type="radio"
                            id={`radio_${index}_${optionIndex}`}
                            name={`radio_${index}_${optionIndex}`}
                            value={optionIndex}
                            checked={
                              selectedRadioTexts?.length &&
                              selectedRadioTexts[index] === option.name
                            }
                            onChange={() =>
                              handleRadioChange(
                                index,
                                option.name,
                                option.price,
                                option.idx
                              )
                            }
                          />
                          {option?.price === 0 ? (
                            <span className="radio-txt">{option?.name}</span>
                          ) : (
                            <span className="radio-txt">
                              {option?.name} (+{option?.price}원)
                            </span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
        ) : (
          <></>
        )}
        {foodOptionInfo?.category?.filter((e) => !e?.essential).length ? (
          <div className="order-process-page__toggle__container">
            <div
              className={`order-process-page__toggle__header ${
                optionOpen && "open"
              }`}
              onClick={() => setOptionOpen((prev) => !prev)}
            >
              <span className="order-process-page__toggle__name">추가옵션</span>
              <img
                className="order-process-page__toggle__header__img"
                src={optionOpen ? toggleUp : toggleDown}
                alt={optionOpen ? "Toggle Up" : "Toggle Down"}
              />
            </div>

            <div
              className={`order-process-page__toggle__body ${
                optionOpen && "open"
              }`}
              style={{
                maxHeight: "100%",
                paddingTop: "1.56rem",
                paddingBottom: "1.91rem",
              }}
            >
              {optionOpen &&
                foodOptionInfo?.category?.length &&
                foodOptionInfo.category
                  .filter((c, i) => !c.essential)
                  .map((category, index) => (
                    <React.Fragment key={index}>
                      {index !== 0 && <div className="option__line"></div>}
                      <span className="order-process-page__option__title__wrapper">
                        <span className="order-process-page__option__title">
                          {category?.name}
                        </span>
                      </span>
                      {category?.options?.map((option, i) => (
                        <React.Fragment key={option.idx}>
                          <div className="option__checkbox__wrapper">
                            <label htmlFor={`option_${option.idx}`}>
                              <input
                                type="checkbox"
                                id={`option_${option.idx}`}
                                name={`option_${option.idx}`}
                                onChange={(e) =>
                                  handleOptionChange(
                                    option.idx,
                                    option.price,
                                    e
                                  )
                                }
                              />

                              {option.price === 0 ? (
                                <span className="radio-txt">{option.name}</span>
                              ) : (
                                <span className="radio-txt">
                                  {option.name} (+{option.price}원)
                                </span>
                              )}
                            </label>
                          </div>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="order-process-page__toggle__container">
          <div className="order-process-page__toggle__header">
            <span className="order-process-page__toggle__name">수량</span>
            <div className="order-process-page-quantity__wrapper">
              <span
                className="order-process-page__img__wrapper"
                onClick={handleCntDown}
              >
                <img
                  src={orderCnt === 1 ? minusDisabled : minus}
                  alt={orderCnt === 1 ? "minusDisabled" : "minus"}
                />
              </span>
              <span className="order-process-page-quantity__txt">
                {orderCnt}
              </span>
              <span
                className="order-process-page__img__wrapper"
                onClick={handleCntUp}
              >
                <img src={plus} alt="plus" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-process-page__total-amount">
        <text className="order-process-page__total-amount__name">총 금액</text>
        <text className="order-process-page__total-amount__price">
          {isNaN(totalAmount * orderCnt)
            ? "0원"
            : (totalAmount * orderCnt)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
        </text>
      </div>

      {status === "true" ? (
        <div
          className="order-process-page__cart__btn"
          onClick={handleCartUpdate}
        >
          장바구니 담기
        </div>
      ) : (
        <div className="order-process-page__store-close">
          지금은 준비중입니다.
        </div>
      )}

      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          handleCancle={handleCancle}
          title={modalTitle.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
          subtitle={"확인 버튼을 누르시면, 이전에 담은 메뉴가 삭제됩니다."}
        />
      )}
    </div>
  );
};

export default OrderProcessPage;
