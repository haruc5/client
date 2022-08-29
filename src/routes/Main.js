import { Link } from "react-router-dom";
import Challenge from "../components/Challenge";
import HotChallenge from "../components/HotChallenge";
import styles from "../components/Main.module.css";
import gray from "../assets/images/icons/gray.svg";
import { useState, useEffect } from "react";
import axios from "axios";

// const challengeData = [
//   {
//     categoryName: "운동",
//     challengeTitle: "주 2회 1만보 걷기",
//     challengeContent: "안녕하세요",
//     challengeStartDate: "2021.07.27",
//     challengeEndDate: "2021.08.10",
//     challengeHoliday: true,
//     challengeImgUrl:
//       "https://d2v80xjmx68n4w.cloudfront.net/gigs/JU2Lp1593392669.jpg",
//     challengePassword: "1234",
//   },
//   {
//     categoryName: "점심",
//     challengeTitle: "주 3회 카페",
//     challengeContent: "커피 맛있어",
//     challengeStartDate: "2021.06.02",
//     challengeEndDate: "2021.07.15",
//     challengeHoliday: true,
//     challengeImgUrl: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
//     challengePassword: "1234",
//   },
//   {
//     categoryName: "잠",
//     challengeTitle: "6시간 자기",
//     challengeContent: "잠 좋아요",
//     challengeStartDate: "2021.08.25",
//     challengeEndDate: "2021.08.30",
//     challengeHoliday: false,
//     challengeImgUrl:
//       "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
//     challengePassword: "1234",
//   },
//   {
//     categoryName: "약먹기",
//     challengeTitle: "주 5회 약",
//     challengeContent: "약약약",
//     challengeStartDate: "2021.04.27",
//     challengeEndDate: "2021.05.10",
//     challengeHoliday: true,
//     challengeImgUrl: "http://blog.jinbo.net/attach/615/200937431.jpg",
//     challengePassword: "1234",
//   },
// ];

function Main() {
  const categorySelect = [
    {
      value: "#금주",
      challenge_category: "NODRINK",
    },
    {
      value: "#금연",
      challenge_category: "NOSMOKE",
    },
    {
      value: "#운동",
      challenge_category: "EXERCISE",
    },
    {
      value: "#생활습관",
      challenge_category: "LIVINGHABITS",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 메인 카테고리
  const [category, setCategory] = useState(
    Array(categorySelect.length).fill(false)
  );
  // const [searchCategory, setSearchCategory] = useState("ALL");

  function categoryCheck(event) {
    const newArr = Array(categorySelect.length).fill(false);
    newArr[event.target.value] = !category[event.target.value];
    setCategory(newArr);
    // setSearchCategory(categorySelect[event.target.value].challenge_category);
  }

  // 메인 핫챌린지
  const [hotChallengeData, setHotChallengeData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [livingData, setLivingData] = useState([]);
  const [nodrinkData, setNodrinkData] = useState([]);
  const [nosmokeData, setNosmokeData] = useState([]);

  let getHotList = async () => {
    try {
      const json = await axios({
        url: `http://10.78.101.23:8085/api/challenge/main`,
        method: "GET",
      });
      setExerciseData(json.data.exercise);
      setLivingData(json.data.livinghabits);
      setNodrinkData(json.data.nodrink);
      setNosmokeData(json.data.nosmoke);
      setHotChallengeData(json.data.popular);
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getHotList();
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
                  onClick={categoryCheck}
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
          {categorySelect[0].value === "#금주" ? (
            <ul className={styles.challenge_list}>
              {nodrinkData.map((challenge, index) => {
                return (
                  <Challenge
                    key={index}
                    title={challenge.challengeTitle}
                    img={challenge.challengeImgUrl}
                    start={challenge.challengeStartDate}
                    end={challenge.challengeEndDate}
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
