import styles from "../components/Detail.module.css";
import { Link } from "react-router-dom";
import challengeImg from "../assets/images/category_img/exercise_1.jpg";
import ChallengeInfo from "../components/ChallengeInfo";
import ChallengeShot from "../components/ChallengeShot";
import { useState } from "react";

const challengeData = [
  {
    categoryName: "운동",
    challengeTitle: "주 2회 1만보 걷기",
    challengeContent: "안녕하세요",
    challengeStartDate: "2021.07.27",
    challengeEndDate: "2021.08.10",
    challengeHoliday: true,
    challengeAuth: "공개",
    challengeAuthMethod: "오늘 날짜와 걸음 수가 기록된 화면이나 풍경 사진 올리기",
    challengeImgUrl:
      "https://images.unsplash.com/photo-1438557068880-c5f474830377?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    challengePassword: "1234",
  }
];

function Detail(){

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

  console.log(challengeData);
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.banner}>
          <img
            src={challengeData[0].challengeImgUrl}
            alt=""
          />
          <div className={styles.banner_inner}>
            <h2>{challengeData[0].challengeTitle}</h2>
            <p>참여 8명 | 인증률 99%</p>
          </div>
          
        </div>
        <div className={styles.challenge_tab}>
          <h3 onClick={showChallengeInfo}>챌린지 소개</h3>
          <h3 onClick={showChallengeShot}>인증목록</h3>
          {challengeInfo ? <ChallengeInfo
                    title={challengeData[0].challengeTitle}
                    start={challengeData[0].challengeStartDate}
                    end={challengeData[0].challengeEndDate}
                    auth={challengeData[0].challengeAuth}
                    authMethod={challengeData[0].challengeAuthMethod}
                    content={challengeData[0].challengeContent} /> 
                    : null}
          {challengeShot ? <ChallengeShot img={challengeData[0].challengeImgUrl} /> : null}
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