import { useEffect, useState } from "react";
import ChallengeList from "../components/ChallengeList";
import styles from "../components/List.module.css";

function List() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [challengeList, setChallengeList] = useState([]);

  const getList = async () => {
    try {
      const data = await (
        await fetch(`http://10.78.101.25:8082/api/challenge/list`)
      ).json();

      setChallengeList(data);
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  console.log(challengeList);

  if (error) {
    return <span>{error.message}</span>;
  }
  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <p className={styles.count}>
        {challengeList.length}개의 챌린지가 있습니다.
      </p>
      {challengeList.map((list) => (
        <ChallengeList
          key={list.challengeId}
          id={list.challengeId}
          img={list.challengeImgUrl}
          title={list.challengeTitle}
          start={list.challengeStart}
          end={list.challengeEnd}
        />
      ))}
    </div>
  );
}
export default List;
