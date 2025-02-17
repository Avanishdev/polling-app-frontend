import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/polls`
        );
        setPolls(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching polls", error);
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Quick Polling App</h1>
      <Link
        to="/create"
        className="block w-full text-center bg-blue-500 text-white py-2 rounded mb-6 hover:bg-blue-600"
      >
        Create New Poll
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {polls?.length > 0 ? (
          polls?.map((poll) => (
            <Link
              key={poll._id}
              to={`/poll/${poll._id}`}
              className="bg-white p-4 rounded shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">{poll.question}</h2>
            </Link>
          ))
        ) : (
          <div className="col-span-2 text-center">No polls found!</div>
        )}
      </div>
    </div>
  );
};

export default Home;
