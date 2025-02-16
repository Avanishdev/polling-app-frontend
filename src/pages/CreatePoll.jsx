import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
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
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/polls`, {
      question,
      options: options.map((option) => ({ text: option, votes: 0 })),
    });
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Poll</h1>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Enter your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
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
        className="bg-gray-500 text-white p-2 rounded mb-2 w-full"
      >
        Add Option
      </button>
      <button
        onClick={submitPoll}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Create Poll
      </button>
    </div>
  );
};

export default CreatePoll;
