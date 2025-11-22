
import React, { useState } from 'react'; 
import styles from './Join1Page.module.css'; 

import earthIconImage from '../assets/logo.jpg'; 

interface Join1PageProps {
    onGoHome: () => void; // 홈 페이지로 전환하는 함수
    onGoLogin: () => void; // 로그인 페이지로 전환하는 함수
}

const Join1Page: React.FC<Join1PageProps> = ({ onGoHome, onGoLogin }) => { 
    
    // 상태 관리: 0=소개 화면, 1=회원가입 폼, 2=완료 화면
    // useState에 number 타입을 명시합니다.
    const [signupStep, setSignupStep] = useState<number>(0); 

    // Step 0 -> Step 1: "회원가입" 링크 클릭 시 폼으로 이동
    const handleSignupLinkClick = (e: React.MouseEvent) => { 
        e.preventDefault(); 
        setSignupStep(1); 
    };

    // Step 0/2 -> LoginPage: "로그인 후 이용하기" 버튼 클릭 시 로그인 페이지로 이동
    const handleToLogin = () => { 
        if (onGoLogin) {
            onGoLogin(); 
        } else {
            console.error("onGoLogin Prop이 누락되었습니다. App.js를 확인하세요.");
        }
    };
    
    // Step 1 -> Step 2: "가입하기" 버튼 클릭 시 완료 화면으로 전환
    const handleSubmit = (e: React.FormEvent) => { 
        e.preventDefault();

        //다시 2로 이동동
        setSignupStep(2); 
    };

    // Step 3 완료하면느 -> HomePage: "홈으로 가기" 버튼 클릭 시 메인으로 이동
    const handleToHome = () => { 
        if (onGoHome) {
            onGoHome(); 
        } else {
            setSignupStep(0); 
        }
    };


    const renderContent = () => {
        
        // step 2: 회원가입 완료 화면
        if (signupStep === 2) {
            return (
                <div className={styles.completionContainer}>
                    <img src={earthIconImage} alt="RE:BUY 로고" className={styles.earthIconLogo} />
                    
                    <h2 className={styles.completionTitle}>회원가입이 완료되었습니다.</h2>
                    <p className={styles.completionText}>RE:BUY와 함께 더 나은 내일을 만들어 보아요!</p>

                    <p className={styles.completionFooter}>
                        RE:BUY에 관하여 더 궁금하신가요?<br/>
                        <a href="#" className={styles.aboutLink}>about RE:BUY</a>
                    </p>

                    <button className={styles.goHomeButton} onClick={handleToHome}>홈으로 가기</button>
                </div>
            );
        }

        if (signupStep === 1) {
            return (
                <form className={styles.signupFormContainer} onSubmit={handleSubmit}>
                    
                    <h2 className={styles.formTitle}>회원가입</h2>
                    
                    
                    <p className={styles.inputLabel}>아이디</p>
                    <input type="text" placeholder="아이디를 입력해주세요." className={styles.signupInput} required />
                    
                   
                    <p className={styles.inputLabel}>비밀번호</p>
                    <input type="password" placeholder="비밀번호를 입력해주세요." className={styles.signupInput} required />
                    
                   
                    <p className={styles.inputLabel}>비밀번호 확인</p>
                    <input type="password" placeholder="비밀번호를 한번 더 입력해주세요." className={styles.signupInput} required />

                  
                    <p className={styles.inputLabel}>연락처</p>
                    <input type="text" placeholder="연락처를 입력해주세요." className={styles.signupInput} required />
                    
                    <button type="submit" className={styles.submitButton}>가입하기</button>
                </form>
            );
        }

        return (
            <div className={styles.introContainer}>
                
                <div className={styles.infoBox}>
                    <h2 className={styles.infoTitle}>about RE:BUY</h2>
                    <p>RE:BUY는 친환경 제품을 추천해주고 안내해주는 어플이에요!</p>
                    <p>회원가입 후 지구를 지켜주세요!</p>
                </div>

                <button className={styles.loginButton} onClick={handleToLogin}>로그인 후 이용하기</button>
                
                <p className={styles.signupPrompt}>
                    아직 RE:BUY 회원이 아니신가요?
                </p>
                <button className={styles.signupLink} onClick={handleSignupLinkClick}>회원가입</button>
            </div>
        );
    };


    return (
        // 모든 페이지에서 로고와 공통 상단바를 표시
        <>
            <header className={styles.headerBar}>
                <img src={earthIconImage} alt="RE:BUY 로고" className={styles.headerEarthIcon} />
                <span className={styles.rebuyLogoText}>RE:BUY</span>
            </header>
            
            <main className={styles.mainContentSignup}>
                {renderContent()}
            </main>
        </>
    );
}

export default Join1Page;