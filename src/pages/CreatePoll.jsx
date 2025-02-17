import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const submitPoll = async () => {
    if (!question.trim() || options?.some((option) => !option.trim())) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/polls`, {
        question,
        options: options.map((option) => ({ text: option, votes: 0 })),
      });
      navigate("/");
    } catch (err) {
      setError("Failed to create poll. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Poll</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Enter your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options?.map((option, index) => (
        <input
          key={index}
          type="text"
          className="border p-2 w-full mb-2"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      ))}
      <button
        onClick={addOption}
        className="bg-gray-300 p-2 rounded w-full mb-4 hover:bg-gray-400"
      >
        Add Option
      </button>
      <button
        onClick={submitPoll}
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
      >
        Create Poll
      </button>
    </div>
  );
};

export default CreatePoll;
