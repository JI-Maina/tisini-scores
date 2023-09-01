import axios from "axios";

const fetchFootballFixtures = async () => {
  const data = await axios.get(
    "https://apis.tisini.co.ke/apiagent2.php?fixture=all&fixtype=football"
  );

  return data;
};

export default fetchFootballFixtures;
