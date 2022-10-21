import { Link } from "react-router-dom";
import FooterLogo from "../assets/images/logo/large.png";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer_box}>
      <div className={styles.footer_left}>
        <Link to={`/`}>
          <img src={FooterLogo} alt="하루조각" />
        </Link>
        <p>당신의 건강 챌린지를 도와주는 서비스 하루조각</p>
      </div>
      <p className={styles.footer_copy}>
        Copyrightⓒ2022 HaruPiece All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
