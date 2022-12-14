import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../components/Create.module.css";
import PostModal from "../components/PostModal";
import categoryImg1 from "../assets/images/category_img/exercise_1.jpg";
import categoryImg2 from "../assets/images/category_img/exercise_2.jpg";
import categoryImg3 from "../assets/images/category_img/livinghabits_1.jpg";
import categoryImg4 from "../assets/images/category_img/livinghabits_2.jpg";
import categoryImg5 from "../assets/images/category_img/livinghabits_3.jpg";
import categoryImg6 from "../assets/images/category_img/livinghabits_4.jpg";
import categoryImg7 from "../assets/images/category_img/livinghabits_5.jpg";
import categoryImg8 from "../assets/images/category_img/nodrink_1.jpg";
import categoryImg9 from "../assets/images/category_img/nosmoke_1.jpg";
import { URL } from "../utile/URL";

function Create() {
  const [challengeInfo, setChallengeInfo] = useState({
    challengeTitle: "",
    challengeCategory: "",
    challengeImgUrl: "",
    challengeHoliday: "",
    challengeStart: "",
    challengeEnd: "",
    challengeAuth: "",
    challengeAuthMethod: "",
    challengeContent: "",
    challengePassword: "",
  });
  const [listLength, setListLength] = useState("");

  const postCreate = async () => {
    const data = await axios({
      url: `${URL}/api/challenge/create`,
      method: "POST",
      data: {
        challengeTitle: challengeInfo.challengeTitle,
        challengeCategory: challengeInfo.challengeCategory,
        challengeImgUrl: challengeInfo.challengeImgUrl,
        challengeHoliday: challengeInfo.challengeHoliday,
        challengeStart: challengeInfo.challengeStart,
        challengeEnd: challengeInfo.challengeEnd,
        challengeAuth: challengeInfo.challengeAuth,
        challengeAuthMethod: challengeInfo.challengeAuthMethod,
        challengeContent: challengeInfo.challengeContent,
        challengePassword: challengeInfo.challengePassword,
      },
    });
    // console.log(data);
  };

  const getList = async () => {
    const data = await (
      await fetch(`${URL}/api/challenge/list/ALL`)
    ).json();
    const nextId = data.length + 1;
    setListLength(nextId);
  };

  useEffect(() => {
    getList();
  }, []);

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

  const [modal, setModal] = useState(false);
  const [imgBox, setImgBox] = useState(false);
  const [imgCheckBox, setImgCheckBox] = useState(
    Array(categoryImgs.length).fill(false)
  );
  const [imgSave, setImgSave] = useState(null);
  const [authPw, setAuthPw] = useState(null);

  function showModal() {
    setModal(true);
  }

  // ??????????????? ??????
  function openImgBox() {
    setImgBox(!imgBox);
  }
  // ??????????????? ??????
  function imgCheck(event) {
    const newArr = Array(categoryImgs.length).fill(false);
    newArr[event.target.alt] = true;
    setImgCheckBox(newArr);
  }

  // ??????????????? ??????
  function inputImg(event) {
    setImgSave(event.target.src);
  }

  // ??????????????? ??????
  function passImg() {
    if (challengeInfo.challengeImgUrl != null) {
      createCategoryImg();
      alert("????????? ????????? ?????????????????????.");
      setImgBox(false);
    } else {
      alert("???????????? ??????????????????.");
    }
  }

  const createCategoryImg = (e) => {
    setChallengeInfo({
      ...challengeInfo,
      challengeImgUrl: imgSave,
    });
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
    setChallengeInfo({
      ...challengeInfo,
      challengePassword: authPw,
    });
  };

  const postCheck = () => {
    if (challengeInfo.challengeTitle === "") {
      alert("????????? ??????????????????.");
    } else if (
      challengeInfo.challengeCategory === "" ||
      challengeInfo.challengeCategory === "CATEGORY"
    ) {
      alert("??????????????? ??????????????????.");
    } else if (challengeInfo.challengeImgUrl === "") {
      alert("?????????????????? ??????????????????.");
    } else if (challengeInfo.challengeStart === "") {
      alert("??????????????? ??????????????????.");
    } else if (challengeInfo.challengeEnd === "") {
      alert("??????????????? ??????????????????.");
    } else if (
      challengeInfo.challengeAuth === "" ||
      challengeInfo.challengeAuth === "CATEGORY"
    ) {
      alert("??????????????? ??????????????????.");
    } else if (
      challengeInfo.challengeAuth === "PRIVATE" &&
      challengeInfo.challengePassword === ""
    ) {
      alert("??????????????? ??????????????????.");
    } else if (challengeInfo.challengeAuthMethod === "") {
      alert("??????????????? ??????????????????.");
    } else if (challengeInfo.challengeContent === "") {
      alert("????????? ????????? ??????????????????.");
    } else {
      showModal();
      postCreate();
    }
  };

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
                placeholder="???????????? ????????? ??????????????????."
                className={styles.create_css}
                onChange={(e) => {
                  setChallengeInfo({
                    ...challengeInfo,
                    challengeTitle: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.select_box}>
              <label>????????????</label>
              <div>
                <select
                  className={`${styles.create_select} ${styles.create_css}`}
                  onChange={(e) => {
                    setChallengeInfo({
                      ...challengeInfo,
                      challengeCategory: e.target.value,
                    });
                  }}
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
                {challengeInfo.challengeImgUrl === ""
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
                <input
                  type="checkbox"
                  onChange={(e) => {
                    e.target.checked === true
                      ? setChallengeInfo({
                          ...challengeInfo,
                          challengeHoliday: e.target.value,
                        })
                      : setChallengeInfo({
                          ...challengeInfo,
                          challengeHoliday: "",
                        });
                  }}
                />
              </div>
            </div>
            <div className={styles.create_date}>
              <label>????????????</label>
              <div>
                <input
                  type="date"
                  className={styles.create_css}
                  onChange={(e) => {
                    setChallengeInfo({
                      ...challengeInfo,
                      challengeStart: e.target.value,
                    });
                  }}
                />
                <span> ~ </span>
                <input
                  type="date"
                  className={styles.create_css}
                  onChange={(e) => {
                    setChallengeInfo({
                      ...challengeInfo,
                      challengeEnd: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className={styles.select_box}>
              <label>?????? ??????</label>
              <div>
                <select
                  className={`${styles.create_select} ${styles.create_css}`}
                  onChange={(e) => {
                    setChallengeInfo({
                      ...challengeInfo,
                      challengeAuth: e.target.value,
                    });
                  }}
                >
                  <option value="CATEGORY">???????????? ??????</option>
                  <option value="PUBLIC">??????</option>
                  <option value="PRIVATE">
                    {challengeInfo.challengePassword === ""
                      ? "?????????"
                      : "???????????? ????????? ?????????????????????."}
                  </option>
                </select>
              </div>
            </div>
            <div
              className={`${styles.private_box} ${
                challengeInfo.challengeAuth === "PRIVATE"
                  ? styles.private_box_open
                  : ""
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
            placeholder="ex) 1km ????????? ??????????????????. ????????? ????????? ????????? ????????? ????????? ???????????????!!!"
            className={styles.create_css}
            onChange={(e) => {
              setChallengeInfo({
                ...challengeInfo,
                challengeAuthMethod: e.target.value,
              });
            }}
          />
        </div>
        <div className={styles.create_bottom}>
          <label>????????? ??????</label>
          <textarea
            placeholder="???????????? ??????????????????."
            className={styles.create_css}
            onChange={(e) => {
              setChallengeInfo({
                ...challengeInfo,
                challengeContent: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <button onClick={postCheck} className={styles.create_btn}>
        ????????? ????????????
      </button>
      {modal === true ? <PostModal id={listLength} /> : null}
    </div>
  );
}

export default Create;
