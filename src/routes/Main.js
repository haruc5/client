import { Link } from "react-router-dom";
import Challenge from "../components/Challenge";
import HotChallenge from "../components/HotChallenge";
import styles from "../components/Main.module.css";
import gray from "../assets/images/icons/gray.svg";
import { useState, useEffect } from "react";
import axios from "axios";

function Main() {
  const categorySelect = [
    {
      value: "#금주",
      challenge_name: "nodrink",
    },
    {
      value: "#금연",
      challenge_name: "nosmoke",
    },
    {
      value: "#운동",
      challenge_name: "exercise",
    },
    {
      value: "#생활습관",
      challenge_name: "livinghabits",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("nodrink");

  // 메인 카테고리
  const [category, setCategory] = useState(Array(true, false, false, false));

  function categoryCheck(e) {
    const newArr = Array(categorySelect.length).fill(false);
    newArr[e.target.value] = !category[e.target.value];
    setCategory(newArr);
    setCategoryName(categorySelect[e.target.value].challenge_name);
  }

  // 메인 핫챌린지
  const [hotChallengeData, setHotChallengeData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [livingData, setLivingData] = useState([]);
  const [nodrinkData, setNodrinkData] = useState([]);
  const [nosmokeData, setNosmokeData] = useState([]);

  console.log("livingData1", livingData);

  let getList = async () => {
    try {
      const json = await axios({
        url: `http://10.78.101.23:8085/api/challenge/main`,
        method: "GET",
      });
      setNodrinkData(json.data.nodrink);
      setNosmokeData(json.data.nosmoke);
      setExerciseData(json.data.exercise);
      setLivingData(json.data.livinghabits);
      setHotChallengeData(json.data.popular);
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  if (error) {
    return <span>{error.message}</span>;
  }
  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.banner}>
          <img
            src="https://www.stopbook.com/file/event/list_banner_02.jpg"
            alt=""
          />
        </div>
        <div className={styles.main_challenge}>
          <h2 className={styles.main_title}>
            <span>하루조각</span> 건강챌린지
          </h2>
          <div className={styles.select_box}>
            <ul>
              {categorySelect.map((categoryS, index) => (
                <li
                  key={index}
                  value={index}
                  onClick={(e) => {
                    categoryCheck(e);
                  }}
                  className={`${
                    category[index] === true
                      ? styles.select_category
                      : styles.non_select_category
                  } `}
                >
                  {categoryS.value}
                </li>
              ))}
            </ul>
          </div>
          {categoryName === "nodrink" ? (
            <ul className={styles.challenge_list}>
              {nodrinkData.map((challenge, index) => {
                return (
                  <Challenge
                    key={index}
                    id={challenge.challengeId}
                    title={challenge.challengeTitle}
                    img={challenge.challengeImgUrl}
                    start={challenge.challengeStart}
                    end={challenge.challengeEnd}
                  />
                );
              })}
            </ul>
          ) : categoryName === "nosmoke" ? (
            <ul className={styles.challenge_list}>
              {nosmokeData.map((challenge, index) => {
                return (
                  <Challenge
                    key={index}
                    id={challenge.challengeId}
                    title={challenge.challengeTitle}
                    img={challenge.challengeImgUrl}
                    start={challenge.challengeStart}
                    end={challenge.challengeEnd}
                  />
                );
              })}
            </ul>
          ) : categoryName === "exercise" ? (
            <ul className={styles.challenge_list}>
              {exerciseData.map((challenge, index) => {
                return (
                  <Challenge
                    key={index}
                    id={challenge.challengeId}
                    title={challenge.challengeTitle}
                    img={challenge.challengeImgUrl}
                    start={challenge.challengeStart}
                    end={challenge.challengeEnd}
                  />
                );
              })}
            </ul>
          ) : categoryName === "livinghabits" ? (
            <ul className={styles.challenge_list}>
              {livingData.map((challenge, index) => {
                return (
                  <Challenge
                    key={index}
                    id={challenge.challengeId}
                    title={challenge.challengeTitle}
                    img={challenge.challengeImgUrl}
                    start={challenge.challengeStart}
                    end={challenge.challengeEnd}
                  />
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        <div className={styles.profile}>
          <p>
            로그인해서
            <br />
            나에게 맞는 챌린지를
            <br />
            찾아보세요.
          </p>
          <img src={gray} alt="" />
        </div>
        <Link to={`/create`}>
          <button className={styles.create_btn}>챌린지 등록하기+</button>
        </Link>
        <div className={styles.hot_challenge}>
          <h2 className={styles.main_title}>
            <span>Hot</span> 챌린지
          </h2>
          <ul className={styles.hot_challenge_list}>
            {hotChallengeData.map((challenge, index) => {
              return (
                <HotChallenge
                  key={index}
                  id={challenge.challengeId}
                  title={challenge.challengeTitle}
                  img={challenge.challengeImgUrl}
                  view={challenge.viewCount}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Main;
