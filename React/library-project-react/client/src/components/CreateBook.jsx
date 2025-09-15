import React from 'react'
import { useBooks } from '../context/books.context';
function CreateBook() {
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
  return (
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
  )
}

export default CreateBook