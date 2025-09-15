import { useContext, useEffect, useMemo } from 'react'
import BookCard from './BookCard';
import BooksForm from './BooksForm';
import "./BooksList.scss";
import { useBooks } from '../context/books.context';

function BooksList({type= "search", props}) {

    const { searchedBooks, setSearchedBooks,libraryBooks, pendingBooks, fetchApiBooks, handleToReadBook, handleDeleteBook, handleUpdateBook } = useBooks();

     const handleAddBook = async(bookData) => {
        try {
            const res = await fetch("http://localhost:5000/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(bookData)
            });

            await res.json()
            
        } catch(e) {
            console.error("Error adding book", e);
        }
    }

    const searchedBookCards = useMemo(() => searchedBooks.map((book, index)=>{
      return(
        <BookCard
          key={book.id ? book.id : index}
          book={book}
          // selectedBook={props.selectedBook}
          onAdd={handleAddBook}
          toRead={handleToReadBook}
        ></BookCard>
      );
    }), [searchedBooks, handleAddBook, handleToReadBook]);
    
    const libraryBookCards = useMemo(() => libraryBooks.map((book, index)=>{
      return(
        <BookCard
          key={book.id ? book.id : index}
          book={book}
          // selectedBook={props.selectedBook
          onDelete={handleDeleteBook}
          toUpdate={handleUpdateBook}
        ></BookCard>
      );
    }), [libraryBooks, handleDeleteBook, handleUpdateBook]);

    const pendingBookCards = useMemo(() => pendingBooks.map((book, index)=>{
      return(
        <BookCard
          key={book.id ? book.id : index}
          book={book}
          // selectedBook={props.selectedBook
          onDelete={handleDeleteBook}
          onAdd={handleAddBook}
        ></BookCard>
      );
    }), [pendingBooks, handleDeleteBook, handleAddBook]);

    return (
    <div>
      

      <section className='books-list'>
        {type==="search" ? searchedBookCards : type==="library" ? libraryBookCards : pendingBookCards}
      </section>
    </div>
  )
}

export default BooksList