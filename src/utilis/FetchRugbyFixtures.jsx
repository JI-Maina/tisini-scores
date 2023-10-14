import axios from "axios";

const FetchRugbyFixtures = async () => {
  const data = await axios.get(
    "https://apis.tisini.co.ke/apiagent2.php?fixture=all&fixtype=rugby15"
  );

  return data;
};

export default FetchRugbyFixtures;
