import React, { useEffect } from 'react'
import SidebarMenu from '../components/SidebarMenu';
import ToggleSwitch from '../components/ToggleSwitch';
import { useBooks } from '../context/books.context';
import BooksList from '../components/BooksList';

function ToReadPage() {

  const { pendingBooks, fetchBooks, handleDeleteBook, handleDeleteAllBooks, handleAddBook} = useBooks();
  
  useEffect(()=> {
    fetchBooks();
  },[]);

  return (
    <main>
      <SidebarMenu/>
      <ToggleSwitch/>
      <section>

      <h1>Books yet to read!</h1>
      <BooksList type="to-read"/>
      {pendingBooks.length > 0 && (
        <button onClick={handleDeleteAllBooks}>Borrar todos</button>
      )}
      </section>
    </main>
  )
}

export default ToReadPage
