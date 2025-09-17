import React, { useEffect } from 'react'
import SidebarMenu from '../components/SidebarMenu';
import ToggleSwitch from '../components/ToggleSwitch';
import { useBooks } from '../context/books.context';
import BooksList from '../components/BooksList';
import CreateBook from '../components/CreateBook';
function ToReadPage() {

  const { pendingBooks, fetchBooks, handleDeleteAllPendingBooks, handleDeleteAllBooks, handleAddBook} = useBooks();
  
  useEffect(()=> {
    fetchBooks();
  },[]);

  return (
    <main>
      <SidebarMenu/>
      <ToggleSwitch/>
      <h1>Books yet to read!</h1>
      <CreateBook type="to-read"/>
      <BooksList type="to-read"/>
     
    </main>
  )
}

export default ToReadPage
