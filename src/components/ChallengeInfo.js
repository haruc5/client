import styles from "./ChallengeInfo.module.css";

function ChallengeInfo({title, start, end, auth, authMethod, content}){
  return(
    <div className={styles.info_box}>
      <h4>기본정보</h4> 
      <ul className={styles.info_list}>
        <li>
          <p>카테고리</p>
          <p>{title}</p>
        </li>
        <li>
          <p>인증기간</p>
          <p>{start} - {end}</p>
        </li>
        <li>
          <p>모집방식</p>
          <p>{auth}</p>
        </li>
        <li>
          <p>인증방법</p>
          <p>{authMethod}</p>
        </li>
      </ul>
      <h4>소개글</h4>
      <p>{content}</p>
      <h4>참가자</h4>
      <p>1/10명이 도전 중이에요!</p>
    </div>
  );
}

export default ChallengeInfo;