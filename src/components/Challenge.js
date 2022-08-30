import { Link } from "react-router-dom";
import styles from "../components/Challenge.module.css";

function Challenge({ id, title, img, start, end }) {
  return (
    <Link to={`/detail/${id}`} className={styles.chellenge_box}>
      <li>
        <div className={styles.chellenge_thumbnails}>
          <img src={img} alt={title} />
        </div>
        <div className={styles.chellenge_box_info}>
          <h3>{title}</h3>
          <p>
            {start} - {end}
          </p>
        </div>
      </li>
    </Link>
  );
}

export default Challenge;
