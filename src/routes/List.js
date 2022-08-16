import { useEffect, useState } from "react";

function List() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [challengeList, setChallengeList] = useState();

  const getList = async () => {
    try {
      const data = await (
        await fetch(`http://10.78.101.25:8082/api/challenge/list`)
      ).json();

      setChallengeList(data);
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  console.log(challengeList);

  if (error) {
    return <span>{error.message}</span>;
  }
  if (isLoading) {
    return <span>Loading...</span>;
  }

  return <div>안녕 나는 리스트!</div>;
}
export default List;
