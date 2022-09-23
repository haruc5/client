import { useEffect, useState } from "react";
import ChallengeList from "../components/ChallengeList";
import styles from "../components/List.module.css";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { searchState } from "../recoil/recoilSearchState";
import Pagination from "react-js-pagination";
import "../components/Paging.css";
import { URL } from "../utile/URL";

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

const dateSelect = [
  {
    value: "#1주",
    period: 1,
  },
  {
    value: "#2주",
    period: 2,
  },
  {
    value: "#3주",
    period: 3,
  },
  {
    value: "#4주 이상",
    period: 4,
  },
];

const etcSelect = [
  {
    value: "#진행예정",
    progress: 1,
  },
  {
    value: "#진행중",
    progress: 2,
  },
  {
    value: "#진행완료",
    progress: 3,
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

  const searchWord = useRecoilValue(searchState);
  const [searchCategory, setSearchCategory] = useState("ALL");
  const [searchPeriod, setSearchPeriod] = useState(0);
  const [searchProgress, setSearchProgress] = useState(0);

  function categoryCheck(event) {
    const newArr = Array(categorySelect.length).fill(false);
    newArr[event.target.value] = !category[event.target.value];
    setCategory(newArr);
    setSearchCategory(categorySelect[event.target.value].challenge_category);
  }
  function dateCheck(event) {
    const newArr = Array(dateSelect.length).fill(false);
    newArr[event.target.value] = !date[event.target.value];
    setDate(newArr);
    setSearchPeriod(dateSelect[event.target.value].period);
  }
  function etcCheck(event) {
    const newArr = Array(etcSelect.length).fill(false);
    newArr[event.target.value] = !etc[event.target.value];
    setEtc(newArr);
    setSearchProgress(etcSelect[event.target.value].progress);
  }

  let getList = async () => {
    try {
      const json = await axios({
        url: `${URL}/api/search/${searchWord}/${searchCategory}/${searchPeriod}/${searchProgress}`,
        method: "GET",
      });
      setChallengeList(
        json.data.challengeList.map((challengeList) => challengeList.challenge)
      );
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
    console.log(
      "searchWord : ",
      searchWord,
      "searchCategory : ",
      searchCategory,
      "searchPeriod : ",
      searchPeriod,
      "searchProgress : ",
      searchProgress
    );
  };

  useEffect(() => {
    getList();
  }, []);

  const [page, setPage] = useState(1);
  const limit = 12;
  const offset = (page - 1) * limit;

  const handlePageChange = (page) => {
    setPage(page);
  };

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
        <ul>
          <b>도전기간</b>
          {dateSelect.map((dateS, index) => (
            <li
              key={index}
              value={index}
              onClick={dateCheck}
              className={`${
                date[index] === true
                  ? styles.select_category
                  : styles.non_select_category
              } `}
            >
              {dateS.value}
            </li>
          ))}
        </ul>
        <button onClick={getList}>선택된 조건 검색하기</button>
      </div>
      <p className={styles.count}>
        {challengeList.length}개의 챌린지가 있습니다.
      </p>
      <div className={styles.list_container}>
        {challengeList.slice(offset, offset + limit).map((list) => (
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
      <Pagination
        activePage={page}
        itemsCountPerPage={limit}
        totalItemsCount={challengeList.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </div>
  );
}
export default List;
