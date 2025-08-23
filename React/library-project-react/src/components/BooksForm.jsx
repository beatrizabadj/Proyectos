import React, { use, useContext, useState } from 'react'
import {BooksContext} from '../context/books.context';

function BooksForm() {

    const [searchBook, setSearchBook] = useState('');
    const {fetchBooks, books, setBooks} =useContext(BooksContext);

    const handleSearchBook=(e)=>{
        setSearchBook(e.target.value); 
    }

    const handleSubmit=async(e)=> {
        e.preventDefault();
        const booksArray = await fetchBooks(searchBook, 10);
        setBooks(booksArray);
    }
  return (
    <form onSubmit={handleSubmit}>
        <fieldset>
            <label htmlFor="search-book">Buscar libro:</label>
            <input type="text" id="search-book" placeholder='Don quijote' onChange={handleSearchBook} />
        </fieldset>
        <button>Buscar</button>
    </form>
  )
}

export default BooksForm