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

    const bookCards = useMemo(() => books.map((book, index)=>{
      return(
        <BookCard
          key={book.id ? book.id : index}
          book={book}
          selectedBook={props.selectedBook}
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