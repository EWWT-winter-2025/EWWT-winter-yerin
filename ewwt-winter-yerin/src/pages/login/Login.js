import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./Login.module.css";
import logo from '../../assets/logo.png';

//sweetalert 사용하여 alert 구현
import Swal from 'sweetalert2'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('nickname', response.data.nickname);
            navigate('/home');
        } catch (error) {
            Swal.fire({
                title: "존재하지 않는 아이디거나 비밀번호가 일치하지 않습니다!",
                showDenyButton: true,
                confirmButtonText: "회원가입",
                denyButtonText: `창 닫기`,
                width: 600,
                padding: "3em",
                color: "#000000",
                background: "#FFFFFF"
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/signup');
                } 
              });;
        }
    };

    return (
        <div className={styles.loginpage}>
            <div className={styles.login_container}>
                <div className={styles.logo_container}>
                   <img src={logo} alt="Company Logo" className="login-logo" />
                </div>
                <hr className={styles.divider}/>
                <form onSubmit={handleLogin} className={styles.input_container}>
                    <div className={styles.input}>
                        <input 
                            type="text" 
                            placeholder="id를 입력해주세요" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.input}>
                        <input 
                            type="password" 
                            placeholder="pw를 입력해주세요" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.submit}>LOGIN</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
