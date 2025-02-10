import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./Home.module.css";
import logo from '../../assets/logo.png';
import CreateGroup from '../../components/createGroup/CreateGroup';
import Grouplist from '../../components/grouplist/Grouplist';

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

    const handleDeleteAccount = async () => {
        if (window.confirm('정말로 회원 탈퇴하시겠습니까?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete('http://localhost:5000/api/auth/delete-account', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                localStorage.removeItem('token');
                localStorage.removeItem('nickname');
                alert('회원 탈퇴가 완료되었습니다.');
                navigate('/');
            } catch (error) {
                console.error('회원 탈퇴 중 오류 발생:', error);
                alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
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
                    <Grouplist />
                    <div className={styles.logout_btn} onClick={handleLogout}>
                        <p onClick={handleLogout}>로그아웃</p>
                    </div>
                </div>
                <div className={styles.right_container}>
                    <div className={styles.text_btn}>
                        <p onClick={handleDeleteAccount}>회원탈퇴</p>
                    </div>
                    <div className={styles.group_container}>
                        <CreateGroup />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
