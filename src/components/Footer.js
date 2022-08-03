import FooterLogo from "../assets/images/logo/large.png";
import stlyes from "./Footer.modelu.css";

function Footer () {
  return (
    <div className="Footer_box">
      <div className="Footer_left">
        <img src={FooterLogo} alt="하루조각"/>
        <p>당신의 건강 챌린지를 도와주는 서비스 하루조각</p>
      </div>
      <p className="Footer_copy">Copyrightⓒ2022 HaruPiece All rights reserved.</p>
    </div>
  );
}

export default Footer; 