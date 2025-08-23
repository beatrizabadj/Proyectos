import React from 'react'

function BookCard(props) {
    const {book, selectedBook} = props;
  return book.id ? (
    <ul style={{listStyle: 'none'}}>
        <li onClick={()=>selectedBook(book)}>
            <h1>Title: {book.volumeInfo.title}</h1>
            <h2>Author: {book.volumeInfo.authors}</h2>
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
        </li>
    </ul>
  ) : (
    <p>Cargando...</p>
  )
}

export default BookCard