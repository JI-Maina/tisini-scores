import axios from "axios";

const FetchRugbyFixtures = async () => {
  const data = await axios.get(
    // "https://apis.tisini.co.ke/apiagent2.php?fixtype=rugby7"
    "https://apis.tisini.co.ke/apiagent2.php?fixture=all&fixtype=rugby7"
  );

  return data;
};

export default FetchRugbyFixtures;
