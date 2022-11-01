import { useState } from "react";
import { useParams } from "react-router-dom";
import close from "../assets/images/icons/close.svg";
import styles from "./ShotModal.module.css";
import axios from "axios";
import camera from "../assets/images/icons/camera.svg";
import { URL } from "../utile/URL";

function ShotModal({ showModal }) {
  const { id } = useParams();

  const [shotInfo, setShotInfo] = useState({
    postingImg: "",
    postingContent: "",
  });
  const [imageSrc, setImageSrc] = useState();
  const [files, setFiles] = useState([]);

  const postShotCreate = async () => {
    const formData = new FormData();
    formData.append("imageSrc", files.length && files[0].uploadedFile);

    const value = {
      challengeId: id,
      postingImg: "",
      postingContent: shotInfo.postingContent,
    };

    const blob = new Blob([JSON.stringify(value)], {
      type: "application/json",
    });

    formData.append("createPostingDto", blob);

    const data = await axios({
      url: `${URL}/api/posting/${id}/create`,
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
  };

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

  const previewPostImg = (e) => {
    encodeFileToBase64(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFiles([...files, { uploadedFile: file }]);
  };

  const postContent = (e) => {
    setShotInfo({
      ...shotInfo,
      postingContent: e.target.value,
    });
  };

  function passShot() {
    alert("인증글이 게시되었습니다.");
  }

  return (
    <div className={styles.modal_box}>
      <div className={styles.modal_inner}>
        <div>
          <h3>인증</h3>
          <form className={styles.modal_form} encType="multipart/form-data">
            <div className={styles.img_box}>
              <label htmlFor="selector_img">
                <img src={camera} alt="" />
                <p>업로드할 사진을 선택해주세요.</p>
              </label>
              <input
                type="file"
                accept="image/*"
                id="selector_img"
                encType="multipart/form-data"
                multiple="multiple"
                onChange={(e) => {
                  previewPostImg(e);
                  handleUpload(e);
                }}
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
          <button
            type="button"
            onClick={() => {
              postShotCreate();
              passShot();
              showModal();
            }}
          >
            인증글 올리기
          </button>
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
