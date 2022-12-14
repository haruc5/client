import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../components/Create.module.css";
import categoryImg1 from "../assets/images/category_img/exercise_1.jpg";
import categoryImg2 from "../assets/images/category_img/exercise_2.jpg";
import categoryImg3 from "../assets/images/category_img/livinghabits_1.jpg";
import categoryImg4 from "../assets/images/category_img/livinghabits_2.jpg";
import categoryImg5 from "../assets/images/category_img/livinghabits_3.jpg";
import categoryImg6 from "../assets/images/category_img/livinghabits_4.jpg";
import categoryImg7 from "../assets/images/category_img/livinghabits_5.jpg";
import categoryImg8 from "../assets/images/category_img/nodrink_1.jpg";
import categoryImg9 from "../assets/images/category_img/nosmoke_1.jpg";
import { useLocation } from "react-router-dom";
import { URL } from "../utile/URL";

function Modify() {
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  const [titleValue, setTitleValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [imgValue, setImgValue] = useState("");
  const [holidayValue, setHolidayValue] = useState("");
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [authValue, setAuthValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [authMethodValue, setAuthMethodValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const modifyTitle = (e) => {
    setTitleValue(e.target.value);
  };
  const modifyCategory = (e) => {
    setCategoryValue(e.target.value);
  };
  const modifyImg = (e) => {
    setImgValue(e.target.value);
  };
  const modifyHoliday = (e) => {
    {
      e.target.checked ? setHolidayValue("on") : setHolidayValue("");
    }
  };
  const modifyStart = (e) => {
    setStartValue(e.target.value);
  };
  const modifyEnd = (e) => {
    setEndValue(e.target.value);
  };
  const modifyAuth = (e) => {
    setAuthValue(e.target.value);
  };
  const modifyPassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const modifyAuthMethod = (e) => {
    setAuthMethodValue(e.target.value);
  };
  const modifyContent = (e) => {
    setContentValue(e.target.value);
  };

  const challengeGet = async () => {
    const json = await axios({
      url: `${URL}/api/challenge/detail/${state}`,
      method: "GET",
    });
    const {
      challengeTitle,
      challengeCategory,
      challengeImgUrl,
      challengeHoliday,
      challengeStart,
      challengeEnd,
      challengeAuth,
      challengePassword,
      challengeAuthMethod,
      challengeContent,
    } = json.data;

    setTitleValue(challengeTitle);
    setCategoryValue(challengeCategory);
    setImgValue(challengeImgUrl);
    setHolidayValue(challengeHoliday);
    setStartValue(challengeStart);
    setEndValue(challengeEnd);
    setAuthValue(challengeAuth);
    setPasswordValue(challengePassword);
    setAuthMethodValue(challengeAuthMethod);
    setContentValue(challengeContent);
    setIsLoading(false);
    console.log(json);
  };

  useEffect(() => {
    challengeGet();
  }, []);

  const challengeUpdate = async () => {
    const data = await axios({
      url: `${URL}/api/challenge/update`,
      method: "PUT",
      data: {
        challengeId: state,
        challengeTitle: titleValue,
        challengeCategory: categoryValue,
        challengeImgUrl: imgValue,
        challengeHoliday: holidayValue,
        challengeStart: startValue,
        challengeEnd: endValue,
        challengeAuth: authValue,
        challengeAuthMethod: authMethodValue,
        challengeContent: contentValue,
        challengePassword: passwordValue,
      },
    });
  };

  let categoryImgs = [
    categoryImg1,
    categoryImg2,
    categoryImg3,
    categoryImg4,
    categoryImg5,
    categoryImg6,
    categoryImg7,
    categoryImg8,
    categoryImg9,
  ];

  // const [modal, setModal] = useState(false);
  const [imgBox, setImgBox] = useState(false);
  const [imgCheckBox, setImgCheckBox] = useState(
    Array(categoryImgs.length).fill(false)
  );
  const [imgSave, setImgSave] = useState(null);
  const [authPw, setAuthPw] = useState(null);

  // ??????????????? ??????
  function openImgBox() {
    setImgBox(!imgBox);
  }
  // ??????????????? ??????
  function imgCheck(event) {
    const newArr = Array(categoryImgs.length).fill(false);
    newArr[event.target.alt] = true;
    setImgCheckBox(newArr);
    console.log(newArr);
  }

  // ??????????????? ??????
  function inputImg(event) {
    setImgSave(event.target.src);
  }

  // ??????????????? ??????
  function passImg() {
    if (imgValue != null) {
      createCategoryImg();
      alert("????????? ????????? ?????????????????????.");
      setImgBox(false);
    } else {
      alert("???????????? ??????????????????.");
    }
  }

  const createCategoryImg = (e) => {
    setImgValue(imgSave);
  };

  // ????????? ???????????? ??????
  function inputPw(event) {
    setAuthPw(event.target.value);
  }

  // ????????? ???????????? ??????
  function passAuthPw() {
    if (authPw.length > 3 && 9 > authPw.length) {
      createPrivate();
      alert("???????????? ????????? ?????????????????????.");
    } else {
      alert("??????????????? 4 ~ 8?????? ??????????????????.");
    }
  }

  // ????????? ???????????? ??????
  const createPrivate = (e) => {
    // setChallengeInfo({
    //   ...challengeInfo,
    //   challengePassword: authPw,
    // });
    setPasswordValue(authPw);
  };

  const postCheck = () => {
    if (titleValue === "") {
      alert("????????? ??????????????????.");
    } else if (categoryValue === "" || categoryValue === "CATEGORY") {
      alert("??????????????? ??????????????????.");
    } else if (imgValue === "") {
      alert("?????????????????? ??????????????????.");
    } else if (startValue === "") {
      alert("??????????????? ??????????????????.");
    } else if (endValue === "") {
      alert("??????????????? ??????????????????.");
    } else if (authValue === "" || authValue === "CATEGORY") {
      alert("??????????????? ??????????????????.");
    } else if (authValue === "PRIVATE" && passwordValue === "") {
      alert("??????????????? ??????????????????.");
    } else if (authMethodValue === "") {
      alert("??????????????? ??????????????????.");
    } else if (contentValue === "") {
      alert("????????? ????????? ??????????????????.");
    } else {
      alert("???????????? ?????????????????????.");
      challengeUpdate();
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className={styles.create_container}>
      <h1 className={styles.title}>????????? ??????</h1>
      <div className={styles.create_form}>
        <div className={styles.create_box}>
          <div className={styles.create_left}>
            <div>
              <label>??????</label>
              <input
                type="text"
                value={titleValue}
                placeholder="???????????? ????????? ??????????????????."
                className={styles.create_css}
                onChange={modifyTitle}
              />
            </div>
            <div className={styles.select_box}>
              <label>????????????</label>
              <div>
                <select
                  className={`${styles.create_select} ${styles.create_css}`}
                  value={categoryValue}
                  onChange={modifyCategory}
                >
                  <option value="CATEGORY">??????</option>
                  <option value="NODRINK">??????</option>
                  <option value="NOSMOKE">??????</option>
                  <option value="EXERCISE">??????</option>
                  <option value="LIVINGHABITS">????????????</option>
                </select>
              </div>
            </div>
            <div className={styles.create_img}>
              <label>?????? ????????? ??????</label>
              <button
                className={styles.create_css}
                onClick={openImgBox}
                type="button"
              >
                {imgValue === ""
                  ? "????????? ??????"
                  : "????????? ????????? ?????????????????????."}
              </button>
              <div
                className={`${styles.create_img_box} ${
                  imgBox === true ? styles.create_box_open : ""
                } `}
              >
                <h3>?????? ????????? ??????</h3>
                <ul>
                  {categoryImgs.map((categoryImg, index) => (
                    <li
                      key={index}
                      onClick={imgCheck}
                      className={`${
                        imgCheckBox[index] === true ? styles.select_img : ""
                      } `}
                    >
                      <img src={categoryImg} alt={index} onClick={inputImg} />
                    </li>
                  ))}
                </ul>
                <button className={styles.create_btn} onClick={passImg}>
                  ?????? ???????????? ????????????
                </button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>?????? ?????? ??? ???????????? ??????</label>
              <div className={`${styles.holiday} ${styles.create_css}`}>
                <label>?????? ??????</label>
                {holidayValue == "on" ? (
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={modifyHoliday}
                    value={holidayValue || ""}
                  />
                ) : (
                  <input
                    type="checkbox"
                    onChange={modifyHoliday}
                    value={holidayValue || ""}
                  />
                )}
              </div>
            </div>
            <div className={styles.create_date}>
              <label>????????????</label>
              <div>
                <input
                  type="date"
                  className={styles.create_css}
                  value={startValue}
                  onChange={modifyStart}
                />
                <span> ~ </span>
                <input
                  type="date"
                  className={styles.create_css}
                  value={endValue}
                  onChange={modifyEnd}
                />
              </div>
            </div>
            <div className={styles.select_box}>
              <label>?????? ??????</label>
              <div>
                <select
                  className={`${styles.create_select} ${styles.create_css}`}
                  value={authValue}
                  onChange={modifyAuth}
                >
                  <option value="CATEGORY">???????????? ??????</option>
                  <option value="PUBLIC">??????</option>
                  <option value="PRIVATE">
                    {passwordValue === ""
                      ? "?????????"
                      : "???????????? ????????? ?????????????????????."}
                  </option>
                </select>
              </div>
            </div>
            <div
              className={`${styles.private_box} ${
                authValue === "PRIVATE" ? styles.private_box_open : ""
              } `}
            >
              <h3>???????????? ??????????????? ??????????????????.</h3>
              <p>??????????????? 4 ~ 8??? ?????? ???????????????.</p>
              <input
                className={styles.create_css}
                type="password"
                minLength="4"
                maxLength="8"
                onChange={inputPw}
              />
              <button
                className={styles.create_btn}
                onClick={passAuthPw}
                type="button"
              >
                ???????????? ??????
              </button>
            </div>
          </div>
        </div>
        <div className={styles.create_bottom}>
          <label>????????????</label>
          <input
            type="text"
            className={styles.create_css}
            value={authMethodValue}
            onChange={modifyAuthMethod}
          />
        </div>
        <div className={styles.create_bottom}>
          <label>????????? ??????</label>
          <textarea
            className={styles.create_css}
            value={contentValue}
            onChange={modifyContent}
          />
        </div>
      </div>
      <button onClick={postCheck} className={styles.create_btn}>
        ????????? ????????????
      </button>
    </div>
  );
}

export default Modify;
