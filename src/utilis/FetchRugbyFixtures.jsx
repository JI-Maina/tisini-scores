import axios from "axios";

const groupDataByDate = (data) => {
  const groupedData = {};

  data.forEach((item) => {
    const date = item.game_date.split(" ")[0]; // Extract the date without the time part
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(item);
  });

  return groupedData;
};

const groupDataByLeague = (data) => {
  const groupedData = {};

  for (const [key, value] of Object.entries(data)) {
    if (!groupedData[key]) {
      groupedData[key] = {};
    }

    value.forEach((item) => {
      const league = item.league;

      if (!groupedData[key][league]) {
        groupedData[key][league] = [];
      }

      groupedData[key][league].push(item);
    });
  }

  return groupedData;
};

const FetchRugbyFixtures = async () => {
  const data = await axios.get(
    "https://apis.tisini.co.ke/apiagent2.php?fixture=all&fixtype=rugby7"
  );

  const groupedData = groupDataByDate(data.data);

  const fixtures = groupDataByLeague(groupedData);

  return fixtures;
};

export default FetchRugbyFixtures;
