import React, { createContext, useContext, useState } from 'react'
const BooksContext = createContext();

function BooksProviderWrapper(props) {

    // books state
    const [books, setBooks] = useState([]);
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

    // add books
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

    // delete book
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

    // delete all books
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

    // update book

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
    <BooksContext.Provider value={
      {
        fetchApiBooks,
        fetchBooks,
        handleAddBook,
        handleDeleteBook,
        handleDeleteAllBooks,
        handleUpdateBook,
        books,
        setBooks,
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