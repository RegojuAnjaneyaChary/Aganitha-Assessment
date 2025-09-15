import React from "react";

export default function SearchBar({ query, setQuery, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex justify-center mt-6 px-4"
    >
      <div className="flex w-full max-w-lg gap-2 items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="flex-1 rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-md transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
