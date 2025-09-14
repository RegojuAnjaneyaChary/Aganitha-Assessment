
export default function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/240x320?text=No+Cover";

  return (
    <a
      href={`https://openlibrary.org${book.key}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
    >
      <img src={coverUrl} alt={book.title} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{book.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {book.author_name ? book.author_name.join(", ") : "Unknown author"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          First published: {book.first_publish_year || "N/A"}
        </p>
      </div>
    </a>
  );
}
