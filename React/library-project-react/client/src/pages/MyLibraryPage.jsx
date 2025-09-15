import { useEffect } from 'react';
import { useState } from 'react'
import SidebarMenu from '../components/SidebarMenu';
import ToggleSwitch from '../components/ToggleSwitch';
import BookCard from '../components/BookCard';
import {useBooks} from '../context/books.context';
function MyLibraryPage() {

    const {fetchBooks, books, handleAddBook, handleDeleteBook, handleDeleteAllBooks, handleUpdateBook, newBook, setNewBook} = useBooks();

    // get books from api rest
    useEffect(()=> {
        fetchBooks();
    }, []);

  return (
      <main>
        <SidebarMenu/>
        <ToggleSwitch/>
        <section>
            <form className='add-book-form' onSubmit={(e)=>{e.preventDefault(); handleAddBook();}}>
                <fieldset>
                    <label htmlFor="title-book">Título: </label>
                    <input type="text" id="title-book" placeholder='Don quijote' value={newBook.title} onChange={(e)=>setNewBook({...newBook, title: e.target.value})} />
                    
                    <label htmlFor="title-book">Autor/a: </label>
                    <input type="text" id="title-book" placeholder='Don quijote' value={newBook.author} onChange={(e)=>setNewBook({...newBook, author: e.target.value})} />
                    
                    <label htmlFor="title-book">Año de publicación: </label>
                    <input type="text" id="title-book" placeholder='Don quijote' value={newBook.year} onChange={(e)=>setNewBook({...newBook, year: e.target.value})} />

                    <label htmlFor="title-book">Imagen: </label>
                    <input type="text" id="title-book" placeholder='Don quijote' value={newBook.image} onChange={(e)=>setNewBook({...newBook, image: e.target.value})} />
                </fieldset>
                <button>Añadir libro</button>
            </form>
        </section>

        <section>
            <h1>My library</h1>
            <div className='books-list'>
            {books.map((book, index)=> (
                <BookCard
                    key={book.id ? book.id : index}
                    book={book}
                    // selectedBook={props.selectedBook}
                    onDelete={handleDeleteBook}
                    onUpdate={handleUpdateBook}
                ></BookCard>
            ))}
            </div>
            {books.length > 0 && (
                <button onClick={handleDeleteAllBooks}>Borrar todos</button>)}
        </section>
    </main>
  )
}

export default MyLibraryPage