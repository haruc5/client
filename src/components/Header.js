import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

// images
import logo from "../assets/images/logo/medium.png";
import searchBlack from "../assets/images/icons/search.svg";
import searchWhite from "../assets/images/icons/search_white.png";
import login from "../assets/images/icons/login.svg";
import myPage from "../assets/images/icons/profile.svg";
import menu from "../assets/images/icons/menubar.svg";
import close from "../assets/images/icons/close.svg";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../recoil/recoilSearchState";
import List from "../routes/List";
import axios from "axios";

function Header() {
  const [searchBar, setSearchBar] = useState(false);
  const [searchCon, setSearchCon] = useRecoilState(searchState);
  let navigate = useNavigate();

  const showSearchBar = () => {
    setSearchBar(!searchBar);
  };

  const searchWord = (e) => {
    setSearchCon(e.target.value);
    console.log(searchCon);
  };

  const showList = async () => {
    navigate("/list", {
      state: {
        searchCon,
      },
    });
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

            <button onClick={showList}>
              <img src={searchWhite} alt="" />
            </button>
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
