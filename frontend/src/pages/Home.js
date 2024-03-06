import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGoalsContext } from "../hooks/useGoalsContext";

//components
import GoalDetails from "../components/GoalDetails";
import Navbar from "../components/Navbar";

const Home = () => {
  const { goals, dispatch } = useGoalsContext();
  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch("api/goals");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_GOALS", payload: json });
      }
    };

    fetchGoals();
  }, [dispatch]);

  return (
    <div className="Home">
      <Navbar />

      <div className="goals">
        {goals &&
          goals.map((goal) => <GoalDetails key={goal._id} goal={goal} />)}
      </div>

      <div className="add-goal">
        <Link to="/add-goal">
          <p>Agregar Meta</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
