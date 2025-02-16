import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/polls`
      );
      setPolls(data);
    };
    fetchPolls();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Quick Polling App</h1>
      <Link
        to="/create"
        className="bg-blue-500 text-white p-2 rounded block text-center"
      >
        Create New Poll
      </Link>
      <div className="mt-4">
        {polls.map((poll) => (
          <Link
            key={poll._id}
            to={`/poll/${poll._id}`}
            className="block bg-gray-100 p-3 mb-2 rounded"
          >
            {poll.question}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
