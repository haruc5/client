import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ChallengeShot.module.css";
import Pagination from "react-js-pagination";
import "../components/Paging.css";
import PostShowModal from "./PostShowModal";

function ChallengeShot() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shotList, setShotList] = useState([]);
  const [modal, setModal] = useState(false);
  const [shot, setShot] = useState(null);

  function showModal(showShot) {
    setModal(true);
    setShot(showShot);
  }

  const { id } = useParams();

  let getList = async () => {
    try {
      const json = await axios({
        url: `http://10.78.101.23:8085/api/posting/list/1/${id}`,
        method: "GET",
      });
      setShotList(json.data.postList);
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const [page, setPage] = useState(1);
  const limit = 6;
  const offset = (page - 1) * limit;

  const handlePageChange = (page) => {
    setPage(page);
  };

  if (error) {
    return <span>{error.message}</span>;
  }
  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <ul className={styles.shotbox}>
        {shotList.slice(offset, offset + limit).map((showShot, index) => (
          <li
            key={index}
            onClick={() => {
              showModal(showShot);
            }}
          >
            <img src={showShot.postingImg} alt="" />
          </li>
        ))}
      </ul>
      <Pagination
        activePage={page}
        itemsCountPerPage={limit}
        totalItemsCount={shotList.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
      {modal === true ? (
        <PostShowModal id={id} shot={shot} setmodal={setModal} />
      ) : null}
    </div>
  );
}

export default ChallengeShot;
