import React, { useContext, useEffect } from 'react'
import {UserContext} from '../context/user.context.jsx';
import { Navigate } from 'react-router-dom';
import BooksList from '../components/BooksList.jsx';
import { BooksContext } from '../context/books.context.jsx';
import ToggleSwitch from '../components/ToggleSwitch.jsx';
import "./MyLibraryPage.scss";
import SidebarMenu from '../components/SidebarMenu.jsx';
function SearchBooksPage() {
    const {user, setUser} = useContext(UserContext)
    // if(!user.isLoggedIn) return <Navigate to ={"/login"} />
   
    // const {fetchBooks}=useContext(BooksContext);
   return (
    <main className="search-books-page">
        <SidebarMenu/>
        <ToggleSwitch/>
        <h1>Buscar libros</h1>
        <BooksList/>
    </main>
   )
}

export default SearchBooksPage