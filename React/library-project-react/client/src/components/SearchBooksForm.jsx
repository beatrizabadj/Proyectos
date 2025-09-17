import React, { use, useContext, useState } from 'react'
import {useBooks} from '../context/books.context';
import './SearchBooksForm.scss';

function BooksForm() {

    const [searchBook, setSearchBook] = useState('');
    const {fetchApiBooks, setSearchedBooks} =useBooks();

    const handleSearchBook=(e)=>{
        setSearchBook(e.target.value); 
    }

    const handleSubmit=async(e)=> {
        e.preventDefault();
        const booksArray = await fetchApiBooks(searchBook, 10);
        setSearchedBooks(booksArray);
    }
  return (
    <form className='books-form' onSubmit={handleSubmit}>
        <fieldset>
            <label htmlFor="search-book">Buscar libro:</label>
            <input type="text" id="search-book" placeholder='Don quijote' onChange={handleSearchBook} />
        </fieldset>
        <button>Buscar</button>
    </form>
  )
}

export default BooksForm