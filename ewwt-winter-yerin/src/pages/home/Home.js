import styles from "../home/Home.module.css";
import logo from '../../assets/logo.png'

const Home = () => {
    return (
        <div className={styles.homepage}>
            <div className={styles.container_box}>
                <div className={styles.left_container}>
                    <div className={styles.logo_container}>
                       <img src={logo} alt="Company Logo" className="login-logo" />
                    </div>
                    <div className={styles.nickname_container}>
                       <p>nickname님의 공간</p>
                    </div>
                    <div className={styles.logout_btn}>
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
    )
}

export default Home;