import React, { useState, useEffect, useRef } from "react";
import useDebounce from "./hooks/UseDebounce";

import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import Spinner from "./components/Spinner";

export default function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const controllerRef = useRef(null);

  const fetchPage = async (q, pageNum = 1, replace = true) => {
    if (!q.trim()) {
      setBooks([]);
      setTotal(0);
      setError("");
      return;
    }

    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    setError("");

    try {
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
        q
      )}&page=${pageNum}`;
      const res = await fetch(url, { signal: controllerRef.current.signal });
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();

      const docs = Array.isArray(data.docs) ? data.docs : [];
      setBooks((prev) => (replace ? docs : [...prev, ...docs]));
      setTotal(data.numFound || 0);
      setPage(pageNum);

      if (docs.length === 0) setError("No results found");
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Failed to fetch");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchPage(debouncedQuery, 1, true);
    } else {
      setBooks([]);
      setTotal(0);
      setPage(1);
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPage(query, 1, true);
  };

  const loadMore = () => {
    fetchPage(debouncedQuery || query, page + 1, false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-800">
        📚 Book Finder
      </h1>

      {/* Search */}
      <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

      {/* Loading for first page */}
      {loading && page === 1 && <Spinner />}

      {/* Error message */}
      {error && (
        <p className="text-center text-red-600 mt-4 font-medium">{error}</p>
      )}

      {/* Books grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {books.map((book, idx) => (
          <BookCard key={`${book.key ?? idx}-${idx}`} book={book} />
        ))}
      </div>

      {/* Loading more spinner */}
      {loading && page > 1 && <Spinner />}

      {/* Load more button */}
      {books.length > 0 && books.length < total && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-md transition"
          >
            Load more
          </button>
        </div>
      )}

      {/* Footer */}
      <p className="text-center text-sm text-gray-600 mt-8">
        Showing <span className="font-medium">{books.length}</span> of{" "}
        <span className="font-medium">{total || "?"}</span> results
      </p>
    </div>
  );
}
