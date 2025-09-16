import React, { useContext, useEffect } from 'react'
import {UserContext} from '../context/user.context.jsx';
import { Navigate } from 'react-router-dom';
import BooksForm from '../components/BooksForm.jsx';
import BooksList from '../components/BooksList.jsx';
import ToggleSwitch from '../components/ToggleSwitch.jsx';
import "./MyLibraryPage.scss";
import SidebarMenu from '../components/SidebarMenu.jsx';
import "./SearchBooksPage.scss";
import { useBooks } from '../context/books.context.jsx';
function SearchBooksPage() {
    const { setSearchedBooks, fetchApiBooks } = useBooks();
    
    useEffect(() => {
      getBooks('harry potter');
    },[])

    const getBooks = async(query)=>{
      const booksArray = await fetchApiBooks(query);
      setSearchedBooks(Array.isArray(booksArray) ? booksArray : []);
    }
    const {user, setUser} = useContext(UserContext)
    // if(!user.isLoggedIn) return <Navigate to ={"/login"} />
   
    // const {fetchBooks}=useContext(BooksContext);
   return (
    <main className="search-books-page">
        <ToggleSwitch/>
        <h1>Buscar libros</h1>
        <BooksForm getBooks={getBooks}></BooksForm>
        <SidebarMenu/>
        <BooksList type="search"/>
    </main>
   )
}

export default SearchBooksPage