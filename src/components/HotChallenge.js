import styles from "./HotChallenge.module.css";
import { Link } from "react-router-dom";

function HotChallenge({ id, title, img, view }) {
  return (
    <div>
      <Link to={`detail/${id}`}>
        <li className={styles.hot_chellenge_box}>
          <div className={styles.hot_chellenge_thumbnails}>
            <img src={img} alt={title} />
          </div>
          <div className={styles.hot_chellenge_box_info}>
            <h3>{title}</h3>
            <p>
              {view > 99
                ? `${view}명이 조회했...`
                : `${view}명이 조회했습니다.`}
            </p>
          </div>
        </li>
      </Link>
    </div>
  );
}

export default HotChallenge;
