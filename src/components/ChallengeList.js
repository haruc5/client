import { Link } from "react-router-dom";
import styles from "./ChallengeList.module.css";

function ChallengeList({ id, img, title, start, end }) {
  return (
    <div className={styles.list_box}>
      <div className={styles.list_img_box}>
        <img src={img} alt={title} />
      </div>
      <Link to={`/detail/${id}`}>{title}</Link>
      <p>
        <span>{start}</span> ~ <span>{end}</span>
      </p>
    </div>
  );
}

export default ChallengeList;
