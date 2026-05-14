import { useState } from "react";

function AddCityForm({ onAddCity }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    onAddCity(city);

    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 mb-8"
    >

      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold"
      >
        Add
      </button>

    </form>
  );
}

export default AddCityForm;