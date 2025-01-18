import logo from '../../assets/logo.png'
import styles from "../login/Login.module.css";

const Login = () => {

    return (
        <div className={styles.loginpage}>
            <div className={styles.login_container}>
                <div className={styles.logo_container}>
                   <img src={logo} alt="Company Logo" className="login-logo" />
                </div>
                <hr className={styles.divider}/>
                <div className={styles.input_container}>
                    <div className={styles.input}>
                        <input type="text" placeholder="id를 입력해주세요" />
                    </div>
                    <div className={styles.input}>
                        <input type="text" placeholder="pw를 입력해주세요" />
                    </div>
                    <div className={styles.submit}><p>LOGIN</p></div>
                </div>

            </div>
        </div>
    )
}

export default Login;