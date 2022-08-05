import styles from "../components/Create.module.css";
import down from "../assets/images/icons/down.svg";

function Create() {
  return (
    <div>
      <h1 className={styles.title}>챌린지 개설</h1>
      <form>
        <div className={styles.create_box}>
        <div className={styles.create_left}>
          <div>
            <label>제목</label>
            <input type="text" placeholder="챌린지의 제목을 입력해주세요."  className={styles.create_css}/>
          </div>
          <div className={styles.select_box}>
            <label>카테고리</label>
            <div>
            <select className={`${styles.create_select} ${styles.create_css}`}>
              <option value="CATEGORY">주제</option>
              <option value="NODRINKNOSMOKE">금연/금주</option>
              <option value="EXERCISE">운동</option>
              <option value="LIVINGHABITS">생활습관</option>
            </select>
            </div>
          </div>
          <div className={styles.create_img}>
            <label>대표 이미지 업로드/선택</label>
            <input type="file" accept="image/*" className={styles.create_css}/>
          </div>
        </div>
        <div>
          <div>
            <label>인증 기간 중 주말제외 여부</label>
            <div className={`${styles.holiday} ${styles.create_css}`}>
            <label>주말 제외</label>
            <input type="checkbox" />
            </div>
          </div>
          <div className={styles.create_date}>
            <label>인증기간</label>
            <div>
            <input type="date" className={styles.create_css} />
            <span> ~ </span>
            <input type="date" className={styles.create_css}/>
            </div>
          </div>
          <div className={styles.select_box}>
            <label>모집 방식</label>
            <div>
              <select className={`${styles.create_select} ${styles.create_css}`}>
                <option value="CATEGORY">공개여부 설정</option>
                <option value="PUBLIC">공개</option>
                <option value="PRIVATE">비공개</option>
              </select>
            </div>
          </div>
        </div>
        </div>
        <div className={styles.create_bottom}>
          <label>챌린지 설명</label>
          <textarea placeholder="챌린지를 설명해주세요."  className={styles.create_css}/>
        </div>
      </form>
      <button className={styles.create_btn}>챌린지 개설하기</button>
    </div>
  );
}

export default Create;
