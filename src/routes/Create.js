function Create() {
  return (
    <div>
      <h1>챌린지 개설</h1>
      <form>
        <div>
          <label>제목</label>
          <input type="text" placeholder="챌린지의 제목을 입력해주세요." />
        </div>
        <div>
          <label>카테고리</label>
          <select>
            <option value="CATEGORY">주제</option>
            <option value="NODRINKNOSMOKE">금연/금주</option>
            <option value="EXERCISE">운동</option>
            <option value="LIVINGHABITS">생활습관</option>
          </select>
        </div>
        <div>
          <label>대표 이미지 업로드/선택</label>
          <input type="file" />
        </div>
        <div>
          <label>인증 기간 중 주말제외 여부</label>
          <input type="checkbox" />
        </div>
        <div>
          <label>인증기간</label>
          <input type="date" />
          <span> ~ </span>
          <input type="date" />
        </div>
        <div>
          <label>모집 방식</label>
          <select>
            <option value="CATEGORY">공개여부 설정</option>
            <option value="PUBLIC">공개</option>
            <option value="PRIVATE">비공개</option>
          </select>
        </div>
        <div>
          <label>챌린지 설명</label>
          <input type="text" placeholder="챌린지를 설명해주세요." />
        </div>
      </form>
      <button>챌린지 개설하기</button>
    </div>
  );
}

export default Create;
