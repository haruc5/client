import styles from "../components/Detail.module.css";
import { Link, useParams } from "react-router-dom";
import ChallengeInfo from "../components/ChallengeInfo";
import ChallengeShot from "../components/ChallengeShot";
import { useEffect, useState } from "react";
import axios from "axios";

// const challengeData = [
//   {
//     categoryName: "운동",
//     challengeTitle: "주 2회 1만보 걷기",
//     challengeContent: "안녕하세요",
//     challengeStartDate: "2021.07.27",
//     challengeEndDate: "2021.08.10",
//     challengeHoliday: true,
//     challengeAuth: "공개",
//     challengeAuthMethod: "오늘 날짜와 걸음 수가 기록된 화면이나 풍경 사진 올리기",
//     challengeImgUrl:
//       "https://images.unsplash.com/photo-1438557068880-c5f474830377?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
//     challengePassword: "1234",
//   }
// ];

function Detail() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [challengeDetail, setChallengeDetail] = useState();

  const { id } = useParams();

  const getDetail = async () => {
    try {
      const data = await (
        await fetch(`http://10.78.101.22:8085/api/challenge/detail/${id}`)
      ).json();
      // const json = await axios({
      //   url: `http://10.78.101.25:8082/api/challenge/detail/${id}`,
      //   method : "GET",
      // });
      // console.log(json.data);

      setChallengeDetail(data);
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const [challengeInfo, setChallengeInfo] = useState(true);
  const [challengeShot, setChallengeShot] = useState(false);

  const showChallengeInfo = () => {
    setChallengeInfo(true);
    setChallengeShot(false);
  };
  const showChallengeShot = () => {
    setChallengeShot(true);
    setChallengeInfo(false);
  };

  console.log(challengeDetail);

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
          <img src={challengeDetail.challengeImgUrl} alt="" />
          <div className={styles.banner_inner}>
            <h2>{challengeDetail.challengeTitle}</h2>
            <p>참여 8명 | 인증률 99%</p>
          </div>
        </div>
        <div>
          <ul className={styles.challenge_tab}>
            <li
              onClick={showChallengeInfo}
              className={`${challengeInfo ? styles.active : ""}`}
            >
              챌린지 소개
            </li>
            <li
              onClick={showChallengeShot}
              className={`${challengeShot ? styles.active : ""}`}
            >
              인증목록
            </li>
          </ul>
          {challengeInfo ? (
            <ChallengeInfo
              title={challengeDetail.challengeTitle}
              start={challengeDetail.challengeStart}
              end={challengeDetail.challengeEnd}
              auth={challengeDetail.challengeAuth}
              authMethod={challengeDetail.challengeAuthMethod}
              content={challengeDetail.challengeContent}
            />
          ) : null}
          {challengeShot ? (
            <ChallengeShot img={challengeDetail.challengeImgUrl} />
          ) : null}
        </div>
      </div>
      <div className={styles.detail_right}>
        <div className={styles.profile}>
          <p>
            로그인해서
            <br />
            나에게 맞는 챌린지를
            <br />
            찾아보세요.
          </p>
        </div>
        <Link to={`/create`}>
          <button className={styles.detail_btn}>인증하기</button>
        </Link>
        <Link to={`/create`}>
          <button className={styles.detail_btn}>챌린지 신청 취소하기</button>
        </Link>
      </div>
    </div>
  );
}
export default Detail;
