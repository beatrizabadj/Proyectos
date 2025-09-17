import { useState } from 'react';
import { useBooks } from '../context/books.context';
import "./CreateBook.scss"
function CreateBook({type= "my-library"}) {
    const {
            libraryBooks,
            pendingBooks,
            handleAddBook,
            handleToReadBook,
            handleDeleteAllBooks,
            handleDeleteAllPendingBooks,
            newBook,
            setNewBook
         } = useBooks();

         const [showForm, setShowForm] = useState(false);
        //  const [showDeleteButton, setShowDeleteButton] = useState(false);

        //  show form
        const showBookForm = ()=> {
            setShowForm(!showForm);
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            if (type === "my-library"){
                handleAddBook();
            } else {
                handleToReadBook(newBook);
                setNewBook({
                    title: "",
                    author: "",
                    year: "",
                    image: ""
                });
            }
        }

  return (
    <div className="manage-book-container">
        {/* buttons  */}
        <div>
            <button onClick={showBookForm}>+</button>

            {libraryBooks.length > 0 && type === "my-library" && (
                <button onClick={handleDeleteAllBooks}> Delete all</button>         
            )}

            {pendingBooks.length > 0 && type === "to-read" && (
                <button onClick={handleDeleteAllPendingBooks}> Delete all</button>     
            )}
        </div>

        <section className={showForm ? 'visible' : 'hidden'}>
            <form className='add-book-form' onSubmit={handleSubmit}>
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
    </div>
  )
}

export default CreateBook