import styles from "./HotChallenge.module.css";

function HotChallenge({ title, img }) {
  let num = 5;
  return (
    <div>
      <li className={styles.hot_chellenge_box}>
        <div className={styles.hot_chellenge_thumbnails}>
          <img src={img} alt={title} />
        </div>
        <div className={styles.hot_chellenge_box_info}>
          <h3>{title}</h3>
          <p>{num}명이 대화에 참여중</p>
        </div>
      </li>
    </div>
  );
}

export default HotChallenge;
