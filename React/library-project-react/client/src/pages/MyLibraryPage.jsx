import { useEffect } from 'react';
import { useState } from 'react'
import SidebarMenu from '../components/SidebarMenu';
import ToggleSwitch from '../components/ToggleSwitch';
import BooksList from '../components/BooksList';
import CreateBook from '../components/CreateBook';
import { BooksProviderWrapper, useBooks } from '../context/books.context';
import "./MyLibraryPage.scss"

function MyLibraryPage() {
    const {
        libraryBooks,
        pendingBook,
        fetchBooks,
        handleAddBook,
        handleDeleteBook,
        handleDeleteAllBooks,
        handleUpdateBook,
        newBook,
        setNewBook
     } = useBooks();

    // get books from api rest
    useEffect(()=> {
        fetchBooks();
    }, [fetchBooks]);

  return (
      <main className='my-library-page'>
        <SidebarMenu/>
        <ToggleSwitch/>
        <h2>My library ({libraryBooks.length} libros)</h2>
        <CreateBook/>
        <BooksList type="library"/>
    </main>
  )
}

export default MyLibraryPage