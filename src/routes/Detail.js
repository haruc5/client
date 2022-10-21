import styles from "../components/Detail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import ChallengeInfo from "../components/ChallengeInfo";
import ChallengeShot from "../components/ChallengeShot";
import { useEffect, useState } from "react";
import axios from "axios";
import ShotModal from "../components/ShotModal";
import gray from "../assets/images/icons/gray.svg";
import { URL } from "../utile/URL";

function Detail() {
  const navigate = useNavigate();
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
      // const data = await (
      //   await fetch(`${URL}/api/challenge/detail/${id}`)
      // ).json();
      const json = await axios({
        url: `${URL}/api/challenge/detail/${id}`,
        method: "GET",
      });

      setChallengeDetail(json.data);
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  const showList = async () => {
    navigate(`/list`);
  };

  const deleteChallenge = async () => {
    try {
      const json = await axios({
        url: `${URL}/api/challenge/delete/${id}`,
        method: "DELETE",
      });

      setIsLoading(false);
      alert("챌린지가 삭제되었습니다.");
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

  const modify = async () => {
    navigate(`/detail/${id}/modify`, { state: id });
  };

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
          <img src={challengeDetail.challengeImgUrl} alt="banner" />
          <div className={styles.banner_inner}>
            <h2>{challengeDetail.challengeTitle}</h2>
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
              category={challengeDetail.challengeCategory}
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
          <img src={gray} alt="" />
          <p>
            건강한 습관을 만들
            <br />
            챌린지에 참여해보세요.
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

        <button
          className={`${styles.modify_btn} ${styles.sub_btn}`}
          onClick={modify}
        >
          챌린지 수정
        </button>
        <button
          className={`${styles.delete_btn} ${styles.sub_btn}`}
          onClick={() => {
            deleteChallenge();
            showList();
          }}
        >
          챌린지 삭제
        </button>
      </div>
    </div>
  );
}

export default Detail;
