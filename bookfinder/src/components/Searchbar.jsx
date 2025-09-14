


import React from "react";

export default function SearchBar({ query, setQuery, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="border p-2 flex-1"
        />
        <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded">
          Search
        </button>
      </div>
    </form>
  );
}
