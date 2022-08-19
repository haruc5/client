import styles from "../components/Detail.module.css";
import { Link, useParams } from "react-router-dom";
import ChallengeInfo from "../components/ChallengeInfo";
import ChallengeShot from "../components/ChallengeShot";
import { useEffect, useState } from "react";
import axios from "axios";
import ShotModal from "../components/ShotModal";

function Detail() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [challengeDetail, setChallengeDetail] = useState();
  const [modal, setModal] = useState(false);

  const { id } = useParams();

  function showModal() {
    setModal(!modal);
  }

  const getDetail = async () => {
    try {
      const data = await (
        await fetch(`http://10.78.101.23:8085/api/challenge/detail/${id}`)
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

        <button
          className={styles.detail_btn}
          onClick={() => {
            showModal();
          }}
        >
          인증하기
        </button>
        {modal === true ? <ShotModal showModal={showModal} /> : null}

        <Link to={`/create`}>
          <button className={styles.detail_btn}>챌린지 신청 취소하기</button>
        </Link>
      </div>
    </div>
  );
}

export default Detail;
