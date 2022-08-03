import { Link } from "react-router-dom";
import styles from "./Header.module.css";

// images
import logo from "../assets/images/logo/medium.png";
import search from "../assets/images/icons/search.svg";
import login from "../assets/images/icons/login.svg";
import myPage from "../assets/images/icons/profile.svg";
import menu from "../assets/images/icons/menubar.svg";
import close from "../assets/images/icons/close.svg";

function Header() {
  return (
    <div className={styles.header_box}>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <div>
        <ul className={styles.header_nav}>
          <li>
            <Link to="/">
              <img src={search} alt="" />
              <p>검색</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img src={login} alt="" />
              <p>로그인</p>
            </Link>
          </li>
          <li>
            <Link to={`/`}>
              <img src={myPage} alt="" />
              <p>마이페이지</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
