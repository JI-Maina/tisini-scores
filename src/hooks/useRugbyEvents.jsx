import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useRugbyEvents = () => {
  const { fixtureId } = useParams();

  const [loading, setLoading] = useState(true);

  const [details, setDetails] = useState([]);
  const [home, setHome] = useState([]);
  const [away, setAway] = useState([]);
  const [scores, setScores] = useState([]);
  const [lineups, setLineups] = useState([]);
  const [cards, setCards] = useState([]);
  const [league, setLeague] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await axios(
          `https://apis.tisini.co.ke/apiagent2.php?event=${fixtureId}`
        );

        setDetails(stats.data[0][0]);
        setHome(stats.data[1]);
        setAway(stats.data[2]);
        setScores(stats.data[3]);
        setLineups(stats.data[4]);
        setCards(stats.data[5]);
        setLeague(stats.data[7]);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [fixtureId]);

  return [details, home, away, scores, lineups, cards, league, loading];
};

export default useRugbyEvents;
