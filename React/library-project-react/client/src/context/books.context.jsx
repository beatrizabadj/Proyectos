import React, { createContext, useContext, useState } from 'react'
const BooksContext = createContext();

function BooksProviderWrapper(props) {

    // searched books
    const [searchedBooks, setSearchedBooks] = useState([]);

    // library books
    const [libraryBooks, setLibraryBooks] = useState([]);
    
    // pending books
    const [pendingBooks, setPendingBooks] = useState([]);
    
    // manually created books
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        year: "",
        image: ""
    });

    // search for books
    const fetchApiBooks = async(query, maxResults=10)=>{
      if (!query || query.trim() === "") {
            return [];
        }
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
        const data = await response.json();
        return data.items || [];
    }

    // load books from user data
    const fetchBooks = async() => {
        fetch("http://localhost:5000/api/books")
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then((data) => {
            setLibraryBooks(data)
        })
        
        .catch((e)=> {
          console.error("Error fetching books from backend", e);
        })
    }

    // add books
    const handleAddBook = async(bookToAdd) => {
        try {
          const bookData = bookToAdd || newBook;
            const res = await fetch("http://localhost:5000/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(bookData)
            });
            if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Failed to add book");
            }
            const data = await res.json();
            setLibraryBooks(prevBooks => [...prevBooks, data]);
            if(!bookToAdd) {
              setNewBook({
                  title: "",
                  author: "",
                  year: "",
                  image: ""
              });
            }
        } catch(e) {
            console.error("Error adding book", e);
        }
    }

    // delete book
    const handleDeleteBook = async(id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/books/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json"}
            });
            await res.json();
            setLibraryBooks(prevBooks => prevBooks.filter((book)=>book._id !== id ));
            
        } catch(e) {
            console.error("Error deleting book", e);
        }
    }

    // delete all books
    const handleDeleteAllBooks = async() => {
        try {
            const res = await fetch(`http://localhost:5000/api/books`, {
                method: "DELETE"
            });
            
            setLibraryBooks([]);
    
        } catch(e) {
            console.error("Error deleting books", e);
        }
    }

    // update book
    const handleUpdateBook = async(id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/books/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newBook)
            });
            const data = await res.json();
            setLibraryBooks(prevBooks.map((prevBook)=>prevBook._id === id ? data : prevBook));
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

    // mark to read
    const handleToReadBook = async(book) => {
      try {

        const bookToAdd = {
            title: book.title || "",
            author: book.author || "",
            year: book.year || "",
            image: book.image || "",
            id: book.id || Date.now().toString()
        };
        // add book to pending
        setPendingBooks((p)=> [...p, bookToAdd]);
      } catch(e) {
        console.error("Error updating book", e);
      }
    }

    // delete pending book (not from database)
    const handleDeletePendingBook = (id) => {
        setPendingBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    }

    const handleDeleteAllPendingBooks = () => {
        setPendingBooks([]);
    }

  return (
    <BooksContext.Provider value={
      {
        fetchApiBooks,
        fetchBooks,
        libraryBooks,
        handleAddBook,
        handleDeleteBook,
        handleDeleteAllBooks,
        handleUpdateBook,
        handleToReadBook,
        handleDeletePendingBook,
        handleDeleteAllPendingBooks,
        pendingBooks,
        setPendingBooks,
        searchedBooks,
        setSearchedBooks,
        newBook,
        setNewBook
      }
    }>
    {props.children}
    </BooksContext.Provider>
  )
}

// custom hook
export function useBooks() {
  return useContext(BooksContext);
}

export {BooksProviderWrapper};