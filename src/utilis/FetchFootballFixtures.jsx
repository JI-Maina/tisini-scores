import axios from "axios";

const groupDataByDate = (data) => {
  const groupedData = {};

  data.forEach((item) => {
    const date = item.game_date.split(" ")[0];
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

const fetchFootballFixtures = async () => {
  const data = await axios.get(
    "https://apis.tisini.co.ke/apiagent2.php?fixture=all&fixtype=football"
  );

  const groupedData = groupDataByDate(data.data);

  const fixtures = groupDataByLeague(groupedData);

  return fixtures;
};

export default fetchFootballFixtures;
