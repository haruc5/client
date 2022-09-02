import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import close from "../assets/images/icons/close.svg";
import styles from "./ShotModal.module.css";
import axios from "axios";
import camera from "../assets/images/icons/camera.svg";

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
    formData.append("postingImg", files.length && files[0].uploadedFile);
    // formData.append("postingContent", shotInfo.postingContent);
    formData.append("challengeId", id, { type: "application/json" });
    formData.append("postingContent", shotInfo.postingContent, {
      type: "application/json",
    });

    // const idValue = { challengeId: id };
    // const contentValue = { postingContent: shotInfo.postingContent };

    // const idBlob = new Blob([JSON.stringify(idValue)], {
    //   type: "application/json",
    // });
    // const contentBlob = new Blob([JSON.stringify(contentValue)], {
    //   type: "application/json",
    // });

    // formData.append("challengeId", idBlob);
    // formData.append("postingContent", contentBlob);

    console.log("formData : ", formData);

    const data = await axios({
      url: `http://10.78.101.23:8085/api/posting/${id}/create`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // data: { createPostingDto: formData },
      data: {
        createPostingDto: formData,
      },
    });
    console.log("data : ", data);

    // FormData의 console 확인
    for (let key of formData.keys()) {
      console.log("FormData key : ", key);
    }
    for (let value of formData.values()) {
      console.log("FormData value : ", value);
    }
  };

  // const postSubmit = () => {
  //   const formData = new FormData();
  //   formData.append("postingImg", files.length && files[0].uploadedFile);
  //   formData.append("postingContent", shotInfo.postingContent);
  //   formData.append("challengeId", id);

  //   axios({
  //     url: `http://10.78.101.23:8085/api/posting/${id}/create`,
  //     method: "POST",
  //     data: formData,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: localStorage.getItem("access_token"),
  //     },
  //   });
  //   console.log("formData : ", formData);
  // };

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
    // setShotInfo({
    //   ...shotInfo,
    //   postingImg: e.target.files[0].name,
    // });
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

  // console.log(id);
  // console.log(shotInfo.postingImg);
  // console.log("imageSrc", imageSrc);
  console.log("postingImg", files.length && files[0].uploadedFile);
  console.log("postingContent", shotInfo.postingContent);

  return (
    <div className={styles.modal_box}>
      <div className={styles.modal_inner}>
        <div>
          <h3>인증</h3>
          <form className={styles.modal_form}>
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
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   postSubmit();
            // }}
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
