import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/berry.png";
import clock from "../../assets/images/icon_clock.svg";
import close from "../../assets/images/icon_close.svg";
import refresh from "../../assets/images/icon_refresh.svg";
import "./OrderStatus.css";

import Progressbar from "../../components/views/ProgressBar/ProgressBar";

function OrderStatus (){
    const [degree, setDegree] = useState(0);
    
    const refreshDegree = () => setDegree((prev) => (prev !== 3 ? prev + 1 : 0));

    return(
        <section className="status-container">
            <div className="status-nav-bar__wrapper">
                <div className="status-nav-bar">
                    <Link to="/storage"><img src={close} className="close-btn" alt={close}/></Link>
                    <img src={refresh} className="refresh-btn" alt={refresh} onClick={refreshDegree}/>
                </div>
                <div className="status-time-wrapper">
                    <div className="status-time">
                        <div className="status-time-img__wrapper">
                            <img src={clock} alt={clock}/>
                        </div>
                        <span><span style={{'color' : "#D82356"}}>2분 후</span> 수령 가능!</span>
                    </div>
                </div>
            </div>
            <div className="status-main-wrapper">
                {degree === 0 ? (
                    <div className="status-top-wrapper space">
                        <div className="status-title-wrapper">
                            <div className="logo-img-wrapper">
                                <img src={logo} className="logo-img" alt={logo}/>
                            </div>
                            <span className="status-title">주문 요청 중 ...</span>
                        </div>
                        <div className="progressbar-wrapper">
                            <Progressbar degree={degree}/>
                        </div>
                    </div>
                ) : (
                    <div className="status-top-wrapper">
                        <div className="status-number-wrapper">
                            <div className="logo-img-wrapper center">
                                <img src={logo} className="logo-img" alt={logo}/>
                            </div>
                            <span className="status-number">258번</span>
                        </div>
                        <div className="progressbar-wrapper">
                            <Progressbar degree={degree}/>
                        </div>
                    </div>
                )}
                    {degree !== 3 && (
                        <div className="status-content-container">
                            <div className="status-content-wrapper">
                                <span className="status-content-subtitle">주문매장</span>
                                <span className="status-content">이디야커피 가톨릭대점</span>
                            </div>
                            <div className="status-content-wrapper">
                                <span className="status-content-subtitle">주문내역</span>
                                <div className="status-content">
                                    <span className="status-history">레몬에이드 외 3잔</span>
                                    <div className="status-detail">
                                        <Link to="/">
                                            주문상세
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                {degree === 0 && (
                    <div className="btn-wrapper">
                        <div className="cancle-btn">주문 취소</div>
                    </div>
                )}

                {degree === 3 && (
                    <div className="compelete-wrapper">
                        <div className="compelete-img">
                            <span className="compelete-text">"소중한 주문"</span>
                            <span className="compelete-text">감사합니다!</span>
                            {/* <div className="compelete-img-gradation"></div> */}
                        </div>
                        <div className="compelete-btn">확인</div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default OrderStatus;