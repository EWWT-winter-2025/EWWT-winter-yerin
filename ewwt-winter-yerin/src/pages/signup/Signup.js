import styles from "../signup/Signup.module.css";
import logo from '../../assets/logo.png'

const Signup = () => {
    return (
        <div className={styles.signuppage}>
                    <div className={styles.signup_container}>
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
                            <div className={styles.input}>
                                <input type="text" placeholder="pw를 입력해주세요" />
                            </div>
                            <div className={styles.input}>
                                <input type="text" placeholder="별명을 입력해주세요" />
                            </div>
                            <div className={styles.submit}><p>회원가입</p></div>
                        </div>
        
                    </div>
                </div>
    );
}

export default Signup;