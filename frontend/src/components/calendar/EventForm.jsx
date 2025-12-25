import React, { useState } from "react";

export default function EventForm() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const event_date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL
        }/api/calendar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description: desc,
          event_date,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create event");
      }

      // reset form
      setDay("");
      setMonth("");
      setYear("");
      setTitle("");
      setDesc("");

    } catch (err) {
      console.error(err);
      alert("Could not add event");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 rounded-xl p-4 space-y-4">

 
      <div>
        <label className="block mb-1 font-semibold">Date *</label>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="DD"
            min="1"
            max="31"
            required
            className="border rounded-md px-2 py-2"
          />
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="MM"
            min="1"
            max="12"
            required
            className="border rounded-md px-2 py-2"
          />
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="YYYY"
            min="1900"
            max="2100"
            required
            className="border rounded-md px-2 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength={5}
          maxLength={25}
          className="w-full border rounded-md px-3 py-2"
          placeholder="Event title"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={2}
          maxLength={40}
          className="w-full border rounded-md px-3 py-2"
          placeholder="Optional description"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="button-89"
      >
        {loading ? "Adding..." : "Add new event"}
      </button>
    </form>
  );
}
