// // import React, { useState, useEffect, useRef } from "react";
// // import Usedebounce from "./components/Usedebounce";
// // import Searchbar from "./components/Searchbar";
// // import Bookcard from "./components/Bookcard";
// // import Spinner from "./components/Spinner";

// // export default function App() {
// //   const [query, setQuery] = useState("");
// //   const debouncedQuery = useDebounce(query, 500);
// //   const [books, setBooks] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [page, setPage] = useState(1);
// //   const [total, setTotal] = useState(0);
// //   const controllerRef = useRef(null);

// //   // fetch a specific page; if replace=true we overwrite results, otherwise append
// //   const fetchPage = async (q, pageNum = 1, replace = true) => {
// //     if (!q.trim()) {
// //       setBooks([]);
// //       setTotal(0);
// //       setError("");
// //       return;
// //     }

// //     // cancel previous
// //     if (controllerRef.current) controllerRef.current.abort();
// //     controllerRef.current = new AbortController();

// //     setLoading(true);
// //     setError("");

// //     try {
// //       const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(q)}&page=${pageNum}`;
// //       const res = await fetch(url, { signal: controllerRef.current.signal });
// //       if (!res.ok) throw new Error("Network response was not ok");
// //       const data = await res.json();

// //       const docs = Array.isArray(data.docs) ? data.docs : [];
// //       setBooks(prev => (replace ? docs : [...prev, ...docs]));
// //       setTotal(data.numFound || 0);
// //       setPage(pageNum);

// //       if (docs.length === 0) setError("No results found");
// //     } catch (err) {
// //       if (err.name !== "AbortError") {
// //         setError(err.message || "Failed to fetch");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // when the debounced query changes, fetch first page
// //   useEffect(() => {
// //     if (debouncedQuery.trim()) {
// //       fetchPage(debouncedQuery, 1, true);
// //     } else {
// //       setBooks([]);
// //       setTotal(0);
// //       setPage(1);
// //       setError("");
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [debouncedQuery]);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // immediate search (not waiting for debounce)
// //     fetchPage(query, 1, true);
// //   };

// //   const loadMore = () => {
// //     fetchPage(debouncedQuery || query, page + 1, false);
// //   };

// //   return (
// //     <div className="min-h-screen p-6">
// //       <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">📚 Book Finder</h1>

// //       <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

// //       {loading && page === 1 && <Spinner />}

// //       {error && <p className="text-center text-red-600 mt-2">{error}</p>}

// //       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
// //         {books.map((book, idx) => (
// //           <BookCard key={`${book.key}-${idx}`} book={book} />
// //         ))}
// //       </div>

// //       {loading && page > 1 && <Spinner />}

// //       {/* Load more */}
// //       {books.length > 0 && books.length < total && !loading && (
// //         <div className="flex justify-center mt-6">
// //           <button
// //             onClick={loadMore}
// //             className="px-5 py-2 rounded-md bg-gray-800 text-white"
// //           >
// //             Load more
// //           </button>
// //         </div>
// //       )}

// //       {/* small footer */}
// //       <p className="text-center text-sm text-gray-600 mt-6">
// //         Results: {books.length} / {total || "?"}
// //       </p>
// //     </div>
// //   );
// // }














// import React, { useState, useEffect, useRef } from "react";
// import useDebounce from "/src/components/UseDebounce";   // ✅ fixed naming
// import SearchBar from "/src/components/SearchBar";       // ✅ fixed naming
// import BookCard from "/src/components/BookCard";         // ✅ fixed naming
// import Spinner from "/src/components/Spinner";

// export default function App() {
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebounce(query, 500);
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const controllerRef = useRef(null);

//   // fetch a specific page; if replace=true we overwrite results, otherwise append
//   const fetchPage = async (q, pageNum = 1, replace = true) => {
//     if (!q.trim()) {
//       setBooks([]);
//       setTotal(0);
//       setError("");
//       return;
//     }

//     // cancel previous
//     if (controllerRef.current) controllerRef.current.abort();
//     controllerRef.current = new AbortController();

//     setLoading(true);
//     setError("");

//     try {
//       const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
//         q
//       )}&page=${pageNum}`;
//       const res = await fetch(url, { signal: controllerRef.current.signal });
//       if (!res.ok) throw new Error("Network response was not ok");
//       const data = await res.json();

//       const docs = Array.isArray(data.docs) ? data.docs : [];
//       setBooks((prev) => (replace ? docs : [...prev, ...docs]));
//       setTotal(data.numFound || 0);
//       setPage(pageNum);

//       if (docs.length === 0) setError("No results found");
//     } catch (err) {
//       if (err.name !== "AbortError") {
//         setError(err.message || "Failed to fetch");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // when the debounced query changes, fetch first page
//   useEffect(() => {
//     if (debouncedQuery.trim()) {
//       fetchPage(debouncedQuery, 1, true);
//     } else {
//       setBooks([]);
//       setTotal(0);
//       setPage(1);
//       setError("");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [debouncedQuery]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // immediate search (not waiting for debounce)
//     fetchPage(query, 1, true);
//   };

//   const loadMore = () => {
//     fetchPage(debouncedQuery || query, page + 1, false);
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
//         📚 Book Finder
//       </h1>

//       <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

//       {loading && page === 1 && <Spinner />}

//       {error && <p className="text-center text-red-600 mt-2">{error}</p>}

//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
//         {books.map((book, idx) => (
//           <BookCard key={`${book.key}-${idx}`} book={book} />
//         ))}
//       </div>

//       {loading && page > 1 && <Spinner />}

//       {/* Load more */}
//       {books.length > 0 && books.length < total && !loading && (
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={loadMore}
//             className="px-5 py-2 rounded-md bg-gray-800 text-white"
//           >
//             Load more
//           </button>
//         </div>
//       )}

//       {/* small footer */}
//       <p className="text-center text-sm text-gray-600 mt-6">
//         Results: {books.length} / {total || "?"}
//       </p>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import useDebounce from "./hooks/UseDebounce";

// Components (check your filenames in /components folder)
import SearchBar from "./components/SearchBar"
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
    <div className="min-h-screen p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        📚 Book Finder
      </h1>

      <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

      {loading && page === 1 && <Spinner />}

      {error && <p className="text-center text-red-600 mt-2">{error}</p>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {books.map((book, idx) => (
          <BookCard key={`${book.key ?? idx}-${idx}`} book={book} />
        ))}
      </div>

      {loading && page > 1 && <Spinner />}

      {books.length > 0 && books.length < total && !loading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-5 py-2 rounded-md bg-gray-800 text-white"
          >
            Load more
          </button>
        </div>
      )}

      <p className="text-center text-sm text-gray-600 mt-6">
        Results: {books.length} / {total || "?"}
      </p>
    </div>
  );
}
