import { useContext, useEffect, useMemo } from 'react'
import BookCard from './BookCard';
import BooksForm from './SearchBooksForm';
import "./BooksList.scss";
import { useBooks } from '../context/books.context';

function BooksList({type= "search", props}) {

    const { book, searchedBooks, setSearchedBooks,libraryBooks, pendingBooks, setPendingBooks,fetchApiBooks, handleToReadBook, handleDeleteBook, handleUpdateBook, handleDeletePendingBook } = useBooks();

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
          onDelete={() => handleDeleteBook(book._id || book.id)}
          onUpdate={() => handleUpdateBook(book._id || book.id)}
        ></BookCard>
      );
    }), [libraryBooks, handleDeleteBook, handleUpdateBook]);

    
    const pendingBookCards = useMemo(() => pendingBooks.map((book, index) => {
      const normalizedBook = {
          id: book?.id || `pending-${index}`,
          title: book?.title || "",
          author: book?.author || "",
          year: book?.year || "",
          image: book?.image || "",
      };

      return(
        <BookCard
          key={normalizedBook.id}
          book={normalizedBook}
          // selectedBook={props.selectedBook
          onDelete={()=>handleDeletePendingBook(normalizedBook.id)} // arrow function
          onAdd={()=>handleAddBook(normalizedBook)}
        ></BookCard>
      );
    }), [pendingBooks, handleAddBook, handleDeletePendingBook]);

    return (
    <div>
      <section className='books-list'>
        {type==="search" ? searchedBookCards : type==="library" ? libraryBookCards : pendingBookCards}
      </section>
    </div>
  )
}

export default BooksList