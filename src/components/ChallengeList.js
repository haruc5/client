import { Link } from "react-router-dom";
import styles from "./ChallengeList.module.css";

function ChallengeList({ id, img, title, start, end }) {
  return (
    <Link to={`/detail/${id}`} className={styles.list_box}>
      <div className={styles.list_img_box}>
        <img src={img} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>
        <span>{start}</span> ~ <span>{end}</span>
      </p>
    </Link>
  );
}

export default ChallengeList;
