import React, { useContext, useEffect } from 'react'
import {UserContext} from '../context/user.context';
import { Navigate } from 'react-router-dom';
import BooksList from '../components/BooksList';
import { BooksContext } from '../context/books.context';

function MyLibraryPage() {
    const {user, setUser} = useContext(UserContext)
    if(!user.isLoggedIn) return <Navigate to ={"/login"} />
   
    // const {fetchBooks}=useContext(BooksContext);
   return (
    <main>
      <h1>Mi biblioteca</h1>
      <BooksList>
        
      </BooksList>
    </main>
   )
}

export default MyLibraryPage