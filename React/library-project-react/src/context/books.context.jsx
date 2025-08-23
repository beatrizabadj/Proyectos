import React, { createContext, useState } from 'react'
const BooksContext = createContext();

function BooksProviderWrapper(props) {

    // books state
    const [books, setBooks] = useState([]);

    // search for books
    const fetchBooks = async(query, maxResults=10)=>{
        if (!query || query.trim() === "") {
            return [];
        }
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
        const data = await response.json();
        return data.items || [];
    }
  return (
    <BooksContext.Provider value={{fetchBooks, books, setBooks}}>
        {props.children}
    </BooksContext.Provider>
  )
}

export {BooksContext, BooksProviderWrapper}