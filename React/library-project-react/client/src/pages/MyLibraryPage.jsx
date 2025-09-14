import { useEffect } from 'react';
import { useState } from 'react'
import SidebarMenu from '../components/SidebarMenu';
import ToggleSwitch from '../components/ToggleSwitch';
import BookCard from '../components/BookCard';
function MyLibraryPage() {

    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        year: "",
        image: ""
    });

    // get books from api rest
    useEffect(()=> {
        fetchBooks();
    }, []);

    const fetchBooks = async() => {
        fetch("http://localhost:5000/api/books")
        .then((res) => {
            console.log("Fetch response: ", res);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then((data) => {
            console.log("Books received:", data);
            setBooks(data)
        })
        
        .catch((e)=> console.error("Error fetching books from backend", e));
    }

    const handleAddBook = async() => {
        try {
            const res = await fetch("http://localhost:5000/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newBook)
            });
            if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Failed to add book");
            }
            const data = await res.json();
            setBooks(books=>[...books, data]);
            setNewBook({
                title: "",
                author: "",
                year: "",
                image: ""
            });
        } catch(e) {
            console.error("Error adding book", e);
        }
    }

    const handleDeleteBook = async(id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/books/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json"}
            });
            const data = await res.json();
            setBooks(books.filter((book)=>book._id !== id ));
            
        } catch(e) {
            console.error("Error deleting book", e);
        }
    }

    const handleDeleteAllBooks = async() => {
        try {
            const res = await fetch(`http://localhost:5000/api/books`, {
                method: "DELETE"
            });
            
            setBooks([]);
    
        } catch(e) {
            console.error("Error deleting books", e);
        }
    }
    const handleUpdateBook = async(id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/books/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newBook)
            });
            const data = await res.json();
            setBooks(books.map((book)=>book._id === id ? data : book));
            setNewBook({
                title: "",
                author: "",
                year: "",
                image: ""
            });
        } catch(e) {
            console.error("Error updating book", e);
        }
    }

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
            <h2>My library</h2>
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