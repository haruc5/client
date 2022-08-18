import { useState, useEffect } from "react";
import close from "../assets/images/icons/close.svg";
import styles from "./ShotModal.module.css";
import axios from "axios";
import camera from "../assets/images/icons/camera.svg";

function ShotModal({ showModal }) {
  const [shotInfo, setShotInfo] = useState({
    postingImg: "",
    postingContent: "",
  });

  const postShotCreate = async () => {
    const data = await axios({
      url: "http://10.78.101.22:8085/api/detail/posting",
      method: "POST",
      data: {
        postingImg: shotInfo.postingImg,
        postingContent: shotInfo.postingContent,
      },
    });
    console.log(data);
  };

  const previewPostImg = (e) => {
    encodeFileToBase64(e.target.files[0]);
    setShotInfo({
      ...shotInfo,
      postingImg: e.target.value,
    });
  };

  // const postImg = (e) => {
  //   setShotInfo({
  //     ...shotInfo,
  //     postingImg: e.target.value,
  //   });
  // };

  const postContent = (e) => {
    setShotInfo({
      ...shotInfo,
      postingContent: e.target.value,
    });
  };

  const [imageSrc, setImageSrc] = useState("");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  console.log(shotInfo.postingImg);
  console.log(shotInfo.postingContent);

  return (
    <div className={styles.modal_box}>
      <div className={styles.modal_inner}>
        <div>
          <h3>인증</h3>
          <form className={styles.modal_form}>
            <div className={styles.img_box}>
              <label for="selector_img">
                <img src={camera} alt="" />
                <p>업로드할 사진을 선택해주세요.</p>
              </label>
              <input
                type="file"
                accept="image/*"
                id="selector_img"
                onChange={previewPostImg}
              />
            </div>
            <div
              className={`${styles.preview_non} ${
                imageSrc ? styles.preview : ""
              } `}
            >
              {imageSrc && <img src={imageSrc} alt="preview-img" />}
            </div>
            <textarea
              placeholder="이번챌린지에서 느낀 점을 기록해보세요."
              onChange={postContent}
            ></textarea>
          </form>
          <button onClick={postShotCreate}>인증글 올리기</button>
        </div>
        <img
          src={close}
          alt=""
          onClick={() => {
            showModal();
          }}
          className={styles.close_btn}
        />
      </div>
    </div>
  );
}

export default ShotModal;
