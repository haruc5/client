import styles from "./ChallengeInfo.module.css";

function ChallengeInfo({ category, start, end, auth, authMethod, content }) {
  return (
    <div className={styles.info_box}>
      <h4>기본정보</h4>
      <ul className={styles.info_list}>
        <li>
          <p>카테고리</p>
          <p>
            {category === "NODRINK"
              ? "금주"
              : category === "NOSMOKE"
              ? "금연"
              : category === "EXERCISE"
              ? "운동"
              : category === "LIVINGHABITS"
              ? "생활습관"
              : ""}
          </p>
        </li>
        <li>
          <p>인증기간</p>
          <p>
            {start} ~ {end}
          </p>
        </li>
        <li>
          <p>모집방식</p>
          <p>{auth === "PUBLIC" ? "공개" : "비공개"}</p>
        </li>
        <li>
          <p>인증방법</p>
          <p>{authMethod}</p>
        </li>
      </ul>
      <h4>소개글</h4>
      <p>{content}</p>
    </div>
  );
}

export default ChallengeInfo;
