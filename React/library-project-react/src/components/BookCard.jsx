import React, { useContext } from 'react'
import "./BookCard.scss";
import { DarkModeContext } from '../context/theme.context';
function BookCard(props) {
    const {book, selectedBook} = props;

    const {darkMode} = useContext(DarkModeContext);
  return book.id ? (
    <div className={darkMode ? "book-card-dark" : "book-card"}>
        <ul style={{listStyle: 'none'}}>
          <li onClick={()=>selectedBook(book)}>
              <h1>Title: {book.volumeInfo.title}</h1>
              <h2>Author: {book.volumeInfo.authors}</h2>
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
          </li>
      </ul>
    </div>
  ) : (
    <p>Cargando...</p>
  )
}

export default BookCard