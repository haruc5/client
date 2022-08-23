import { Link } from "react-router-dom";
import styles from "./Header.module.css";

// images
import logo from "../assets/images/logo/medium.png";
import searchBlack from "../assets/images/icons/search.svg";
import searchWhite from "../assets/images/icons/search_white.png";
import login from "../assets/images/icons/login.svg";
import myPage from "../assets/images/icons/profile.svg";
import menu from "../assets/images/icons/menubar.svg";
import close from "../assets/images/icons/close.svg";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../recoil/recoilSearchState";

function Header() {
  const [searchBar, setSearchBar] = useState(false);
  const [searchCon, setSearchCon] = useRecoilState(searchState);

  const showSearchBar = () => {
    setSearchBar(!searchBar);
  };

  const searchWord = (e) => {
    setSearchCon(e.target.value);
    console.log(searchCon);
  };

  return (
    <div className={styles.header_box}>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <div>
        {searchBar ? (
          <div className={styles.search_box}>
            <input type="text" placeholder="Search..." onChange={searchWord} />
            <Link to={`/list`}>
              <button>
                <img src={searchWhite} alt="" />
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}
        <ul className={styles.header_nav}>
          <li onClick={showSearchBar}>
            <img src={searchBlack} alt="" />
            <p>검색</p>
          </li>
          {/* <li>
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
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default Header;
