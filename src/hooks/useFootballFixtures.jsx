import axios from "axios";
import { useEffect, useState } from "react";

const useFootballFixtures = () => {
  const [ballFixtures, setBallFixtures] = useState([]);
  const [ballState, setBallState] = useState(true);
  const [ballDates, setBallDates] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const data = await axios.get(
          "https://apis.tisini.co.ke/apiagent2.php?fixture=all&fixtype=football"
        );

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

        const groupedData = groupDataByDate(data.data);

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

        const fixtures = groupDataByLeague(groupedData);

        setBallDates(Object.keys(fixtures));
        setBallFixtures(Object.entries(fixtures));
        setBallState(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFixtures();
  }, []);

  return [ballFixtures, ballDates, ballState];
};

export default useFootballFixtures;
