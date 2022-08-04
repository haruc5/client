import { useEffect, useState } from "react";
import styles from "../components/Challenge.module.css";

function Challenge({ title, img, start, end }) {
  return (
    <li className={styles.chellenge_box}>
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
  );
}

export default Challenge;
