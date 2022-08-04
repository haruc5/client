import { useEffect, useState } from "react";
import styles from "../components/Challenge.module.css";

function Challenge({ title, img, start, end }) {
  return (
    <li>
      <div>
        <img src={img} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>
        {start} - {end}
      </p>
    </li>
  );
}

export default Challenge;
