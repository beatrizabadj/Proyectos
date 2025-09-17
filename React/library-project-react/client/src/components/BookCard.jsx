import React, { useContext } from "react";
import "./BookCard.scss";
import { DarkModeContext } from "../context/theme.context";

function BookCard({ book, selectedBook, onAdd, toRead, onDelete, onUpdate }) {
  const { darkMode } = useContext(DarkModeContext);

  // normalize data
   const normalizedBook = book?.volumeInfo
    ? {
        id: book.id,
        title: book.volumeInfo.title || "",
        author: book.volumeInfo.authors?.join(", ") || "",
        year: book.volumeInfo.publishedDate || "",
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }
    : {
        id: book?._id || book?.id || `pending-${Date.now()}`,
        title: book?.title || "",
        author: book?.author || "",
        year: book?.year || "",
        image: book?.image || "",
      };

  return (
    <div className={darkMode ? "book-card dark" : "book-card"}>
      <div onClick={() => selectedBook && selectedBook(normalizedBook)}>
        <h1>{normalizedBook.title}</h1>
        <h2>{normalizedBook.author}</h2>
        <h3>{normalizedBook.year}</h3>
        <img
          src={
            normalizedBook.image &&
            (normalizedBook.image.startsWith("http") || normalizedBook.image.startsWith("data:image"))
              ? normalizedBook.image
              : "/placeholder.png"
          }
          alt={normalizedBook.title}
        />
      </div>

      {onAdd && (
        <button onClick={() => onAdd(normalizedBook)}>✅ Mark as read</button>
      )}

      {toRead && (
        <button onClick={() => toRead(normalizedBook)}>⌛️ To read</button>
      )}

      {onDelete && (
        <button onClick={() => onDelete(normalizedBook.id || normalizedBook._id)}>🗑️ Delete</button>
      )}
      {onUpdate && (
        <button onClick={() => onUpdate(normalizedBook.id || normalizedBook._id)}>✏️ Edit</button>
      )}
    </div>
  );
}

export default BookCard;