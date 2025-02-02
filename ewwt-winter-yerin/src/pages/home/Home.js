import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";
import logo from '../../assets/logo.png';

const Home = () => {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedNickname = localStorage.getItem('nickname');
        if (storedNickname) {
            setNickname(storedNickname);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nickname');
        navigate('/');
    };

    return (
        <div className={styles.homepage}>
            <div className={styles.container_box}>
                <div className={styles.left_container}>
                    <div className={styles.logo_container}>
                       <img src={logo} alt="Company Logo" className="login-logo" />
                    </div>
                    <div className={styles.nickname_container}>
                       <p>{nickname}님의 공간</p>
                    </div>
                    <div className={styles.logout_btn} onClick={handleLogout}>
                        <p>로그아웃</p>
                    </div>
                </div>
                <div className={styles.right_container}>
                    <div className={styles.text_btn}>
                        <p>회원탈퇴</p>
                    </div>
                    <div className={styles.group_container}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
