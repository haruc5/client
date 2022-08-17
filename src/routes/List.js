import { useEffect, useState } from "react";
import ChallengeList from "../components/ChallengeList";
import styles from "../components/List.module.css";

const categorySelect = [
  {
    id: 1,
    value: "#금주",
  },
  {
    value: "#금연",
  },
  {
    value: "#운동",
  },
  {
    value: "#생활습관",
  },
];

const dateSelect = [
  {
    value: "#1주",
  },
  {
    value: "#2주",
  },
  {
    value: "#3주",
  },
  {
    value: "#4주 이상",
  },
];

const etcSelect = [
  {
    value: "#진행예정",
  },
  {
    value: "#진행중",
  },
];

function List() {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(
    Array(categorySelect.length).fill(false)
  );
  const [date, setDate] = useState(Array(dateSelect.length).fill(false));
  const [etc, setEtc] = useState(Array(etcSelect.length).fill(false));
  const [error, setError] = useState(null);
  const [challengeList, setChallengeList] = useState([]);

  function categoryCheck(event) {
    const newArr = Array(categorySelect.length).fill(false);
    newArr[event.target.value] = true;
    setCategory(newArr);
    console.log(newArr);
  }

  const getList = async () => {
    try {
      const data = await (
        await fetch(`http://10.78.101.22:8085/api/challenge/list`)
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
      <div className={styles.select_box}>
        <ul>
          <b>카테고리</b>
          {categorySelect.map((category, index) => (
            <li
              key={index}
              value={index}
              onClick={categoryCheck}
              className={`${
                category[index] === true ? styles.select_category : ""
              } `}
            >
              {category.value}
            </li>
          ))}
        </ul>
        <ul>
          <b>도전기간</b>
          {dateSelect.map((date, index) => (
            <li
              key={index}
              // className={`${
              //   imgCheckBox[index] === true ? styles.select_img : ""
              // } `}
            >
              {date.value}
            </li>
          ))}
        </ul>
        <ul>
          <b>
            <span>기</span>
            <span>타</span>
          </b>
          {etcSelect.map((etc, index) => (
            <li
              key={index}
              // className={`${
              //   imgCheckBox[index] === true ? styles.select_img : ""
              // } `}
            >
              {etc.value}
            </li>
          ))}
        </ul>
        <button>선택된 조건 검색하기</button>
      </div>
      <p className={styles.count}>
        {challengeList.length}개의 챌린지가 있습니다.
      </p>
      <div className={styles.list_container}>
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
    </div>
  );
}
export default List;
