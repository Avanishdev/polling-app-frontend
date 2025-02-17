import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PollDetails = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/polls/${id}`
        );
        setPoll(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching poll", error);
        setError("Failed to load poll. Please try again.");
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  const vote = async (optionIndex) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/polls/${id}/vote`,
        { optionIndex }
      );
      setPoll(data);
    } catch (error) {
      console.error("Error voting", error);
      setError("Failed to submit vote. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!poll) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link to="/" className="text-blue-500 mb-4 block">
        &larr; Back to Polls
      </Link>
      <h1 className="text-2xl font-bold mb-4">{poll?.question}</h1>
      {poll?.options?.map((option, index) => (
        <button
          key={index}
          onClick={() => vote(index)}
          className="bg-gray-100 p-2 w-full rounded mb-2 text-left hover:bg-gray-200"
        >
          {option.text} ({option.votes} votes)
        </button>
      ))}
    </div>
  );
};

export default PollDetails;
