import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const PollDetails = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/polls/${id}`
      );
      setPoll(data);
    };
    fetchPoll();

    socket.on("pollUpdated", (updatedPoll) => {
      if (updatedPoll._id === id) {
        setPoll(updatedPoll);
      }
    });

    return () => socket.off("pollUpdated");
  }, [id]);

  const vote = async (optionIndex) => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/polls/${id}/vote`,
      {
        optionIndex,
      }
    );
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{poll.question}</h1>
      {poll.options.map((option, index) => (
        <button
          key={index}
          onClick={() => vote(index)}
          className="bg-gray-200 p-2 w-full rounded mb-2"
        >
          {option.text} ({option.votes} votes)
        </button>
      ))}
    </div>
  );
};

export default PollDetails;
