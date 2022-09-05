import styles from "./PostShowModal.module.css";
import green from "../assets/images/icons/green.svg";
import close from "../assets/images/icons/close.svg";

function PostShowModal({ shot, setmodal }) {
  return (
    <div className={styles.modal_box}>
      <div className={styles.modal_inner}>
        <div className={styles.close_btn}>
          <img
            src={close}
            alt=""
            onClick={() => {
              setmodal(false);
            }}
          />
        </div>
        <div className={styles.postingImg}>
          <img src={shot.postingImg} alt="" />
        </div>
        <img src={green} alt="" className={styles.profileImg} />
        <p>{shot.postingContent}</p>
      </div>
    </div>
  );
}

export default PostShowModal;
