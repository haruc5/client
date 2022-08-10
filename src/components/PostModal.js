import { Link } from "react-router-dom";
import styles from "./PostModal.module.css";
import green from "../assets/images/icons/green.svg";

function PostModal() {
  return (
    <div className={styles.modal_box}>
      <div className={styles.modal_inner}>
        <div>
          <img src={green} alt="" />
          <h1>챌린지 개설 완료</h1>
          <p>챌린지가 개설되었습니다.</p>
          <Link to={`/`}>
            <button>메인화면 바로가기</button>
          </Link>
          <Link to={`/detail`}>
            <button style={{ marginLeft: "20px" }}>상세페이지 바로가기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
