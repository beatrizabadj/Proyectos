import { useContext, useEffect, useMemo } from 'react'
import {BooksContext} from '../context/books.context'
import BookCard from './BookCard';
import BooksForm from './BooksForm';
import "./BooksList.scss";

function BooksList(props) {

    const { books, setBooks, fetchBooks } = useContext(BooksContext);

    useEffect(() => {
      getBooks('harry potter');
    },[])

    const getBooks = async(query)=>{
      const booksArray = await fetchBooks(query);
      setBooks(Array.isArray(booksArray) ? booksArray : []);
    }

     const handleAddBook = async(bookData) => {
        try {
            const res = await fetch("http://localhost:5000/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(bookData)
            });
            const data = await res.json();
            // update with new book
            setBooks(book=>[...book, data]);
        } catch(e) {
            console.error("Error adding book", e);
        }
    }

    const bookCards = useMemo(() => books.map((book, index)=>{
      return(
        <BookCard
          key={book.id ? book.id : index}
          book={book}
          selectedBook={props.selectedBook}
          onAdd={handleAddBook}
        ></BookCard>
      );
    }), [books]);

    return (
    <div>
      <BooksForm getBooks={getBooks}></BooksForm>
      <section className='books-list'>
        {bookCards}
      </section>
    </div>
  )
}

export default BooksList