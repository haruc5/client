import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

// images
import logo from "../assets/images/logo/medium.png";
import searchBlack from "../assets/images/icons/search.svg";
import searchWhite from "../assets/images/icons/search_white.png";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../recoil/recoilSearchState";

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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchWord();
                showList();
              }}
            >
              <input
                type="text"
                placeholder="Search..."
                onChange={searchWord}
              />

              <button onClick={showList}>
                <img src={searchWhite} alt="" />
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
        <div className={styles.header_nav} onClick={showSearchBar}>
          <img src={searchBlack} alt="" />
          <p>검색</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
