import React, { useState } from "react";
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

  const postCreate = async () => {
    const data = await axios({
      url: "http://10.78.101.23:8085/api/challenge/create",
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
    console.log(data);
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

  // 대표이미지 열림
  function openImgBox() {
    setImgBox(!imgBox);
  }
  // 대표이미지 선택
  function imgCheck(event) {
    const newArr = Array(categoryImgs.length).fill(false);
    newArr[event.target.alt] = true;
    setImgCheckBox(newArr);
    console.log(newArr);
  }

  // 대표이미지 저장
  function inputImg(event) {
    setImgSave(event.target.src);
  }

  // 대표이미지 검사
  function passImg() {
    if (challengeInfo.challengeImgUrl != null) {
      createCategoryImg();
      alert("이미지 선택이 완료되었습니다.");
      setImgBox(false);
    } else {
      alert("이미지를 선택해주세요.");
    }
  }

  const createCategoryImg = (e) => {
    setChallengeInfo({
      ...challengeInfo,
      challengeImgUrl: imgSave,
    });
  };

  // 챌린지 비밀번호 입력
  function inputPw(event) {
    setAuthPw(event.target.value);
  }

  // 챌린지 비밀번호 검사
  function passAuthPw() {
    if (authPw.length > 3 && 9 > authPw.length) {
      createPrivate();
      alert("비밀번호 입력이 완료되었습니다.");
    } else {
      alert("비밀번호를 4 ~ 8자로 입력해주세요.");
    }
  }

  // 챌린지 비밀번호 저장
  const createPrivate = (e) => {
    setChallengeInfo({
      ...challengeInfo,
      challengePassword: authPw,
    });
  };

  const postCheck = () => {
    if (challengeInfo.challengeTitle === "") {
      alert("제목을 입력해주세요.");
    } else if (
      challengeInfo.challengeCategory === "" ||
      challengeInfo.challengeCategory === "CATEGORY"
    ) {
      alert("카테고리를 설정해주세요.");
    } else if (challengeInfo.challengeImgUrl === "") {
      alert("대표이미지를 설정해주세요.");
    } else if (challengeInfo.challengeStart === "") {
      alert("인증시작을 설정해주세요.");
    } else if (challengeInfo.challengeEnd === "") {
      alert("인증종료를 설정해주세요.");
    } else if (
      challengeInfo.challengeAuth === "" ||
      challengeInfo.challengeAuth === "CATEGORY"
    ) {
      alert("모집방식을 설정해주세요.");
    } else if (
      challengeInfo.challengeAuth === "PRIVATE" &&
      challengeInfo.challengePassword === ""
    ) {
      alert("비밀번호를 입력해주세요.");
    } else if (challengeInfo.challengeAuthMethod === "") {
      alert("인증방법을 입력해주세요.");
    } else if (challengeInfo.challengeContent === "") {
      alert("챌린지 설명을 입력해주세요.");
    } else {
      showModal();
      postCreate();
    }
  };

  console.log(challengeInfo.challengeImgUrl);

  return (
    <div className={styles.create_container}>
      <h1 className={styles.title}>챌린지 개설</h1>
      <div className={styles.create_form}>
        <div className={styles.create_box}>
          <div className={styles.create_left}>
            <div>
              <label>제목</label>
              <input
                type="text"
                placeholder="챌린지의 제목을 입력해주세요."
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
              <label>카테고리</label>
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
                  <option value="CATEGORY">주제</option>
                  <option value="NODRINK">금주</option>
                  <option value="NOSMOKE">금연</option>
                  <option value="EXERCISE">운동</option>
                  <option value="LIVINGHABITS">생활습관</option>
                </select>
              </div>
            </div>
            <div className={styles.create_img}>
              <label>대표 이미지 선택</label>
              <button
                className={styles.create_css}
                onClick={openImgBox}
                type="button"
              >
                {challengeInfo.challengeImgUrl === ""
                  ? "이미지 선택"
                  : "이미지 선택이 완료되었습니다."}
              </button>
              <div
                className={`${styles.create_img_box} ${
                  imgBox === true ? styles.create_box_open : ""
                } `}
              >
                <h3>대표 이미지 설정</h3>
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
                  대표 이미지로 설정하기
                </button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>인증 기간 중 주말제외 여부</label>
              <div className={`${styles.holiday} ${styles.create_css}`}>
                <label>주말 제외</label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setChallengeInfo({
                      ...challengeInfo,
                      challengeHoliday: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className={styles.create_date}>
              <label>인증기간</label>
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
              <label>모집 방식</label>
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
                  <option value="CATEGORY">공개여부 설정</option>
                  <option value="PUBLIC">공개</option>
                  <option value="PRIVATE">
                    {challengeInfo.challengePassword === ""
                      ? "비공개"
                      : "비밀번호 설정이 완료되었습니다."}
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
              <h3>챌린지의 비밀번호를 입력해주세요.</h3>
              <p>비밀번호는 4 ~ 8자 입력 가능합니다.</p>
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
                비밀번호 입력
              </button>
            </div>
          </div>
        </div>
        <div className={styles.create_bottom}>
          <label>인증방법</label>
          <input
            type="text"
            placeholder="ex) 1km 달리기 챌린지입니다. 어디든 좋으니 가볍게 달리고 인증샷 올려보세요!!!"
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
          <label>챌린지 설명</label>
          <textarea
            placeholder="챌린지를 설명해주세요."
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
        챌린지 개설하기
      </button>
      {modal === true ? <PostModal /> : null}
    </div>
  );
}

export default Create;
