import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./Signup.module.css";
import logo from '../../assets/logo.png';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setUsernameError('');
        setPasswordError('');

        if (password !== confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/signup', { username, password, confirmPassword, nickname });
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data.message.includes('이미 존재하는 아이디')) {
                setUsernameError('중복된 아이디입니다.');
            } else {
                setUsernameError(error.response.data.message || '회원가입에 실패했습니다.');
            }
        }
    };

    return (
        <div className={styles.signuppage}>
            <div className={styles.signup_container}>
                <div className={styles.logo_container}>
                   <img src={logo} alt="Company Logo" className="login-logo" />
                </div>
                <hr className={styles.divider}/>
                <form onSubmit={handleSignup} className={styles.input_container}>
                    <div className={styles.input}>
                        <input 
                            type="text" 
                            placeholder="id를 입력해주세요" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {usernameError && <p className={styles.error_message}>{usernameError}</p>}
                    </div>
                    <div className={styles.input}>
                        <input 
                            type="password" 
                            placeholder="pw를 입력해주세요" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.input}>
                        <input 
                            type="password" 
                            placeholder="pw를 다시 입력해주세요" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {passwordError && <p className={styles.error_message}>{passwordError}</p>}
                    </div>
                    <div className={styles.input}>
                        <input 
                            type="text" 
                            placeholder="별명을 입력해주세요" 
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.submit}>회원가입</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
