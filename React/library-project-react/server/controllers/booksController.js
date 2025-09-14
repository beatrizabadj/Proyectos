const LibraryModel = require("../models/LibraryModel");

const library = new LibraryModel();

const getBooks = async(req, res) => {
    try {
        let books = await library.listAll();
        res.json(books);

    } catch(e) {
        console.error("Error getting books", e);
        res.status(500).json({error: "Failed to fetch books"});
    }
}

const createBook = async(req, res) => {
    console.log("New book received:", req.body);
    try {
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
            image: req.body.image
        };

        let result = await library.create(newBook);
        
        // recover book inserted to mongo
        let createdBook = await library.findById( result.insertedId);
        if (createdBook) {
            res.json(createdBook);
        } else {
            res.status(400).json({error: "Error creating new book"});
        }

    } catch(e) {
        console.error("Error creating new book", e);
        res.status(500).json({error: "Failed create new book"});
    }
}

const updateBook = async(req, res) => {
    try {
        let updatedBook = await library.update(req.params.id, {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year
        });

        if (updatedBook) {
            res.json(updatedBook);
        } else {
            res.status(400).json({error: "Error updating book"});
        }
    } catch(e) {
        console.error("Error updating new book", e);
        res.status(500).json({error: "Failed updating book"});
    }
}

const deleteBook = async(req, res) => {
    try {
        let deletedBook = await library.delete(req.params.id);
        if (deletedBook) {
            res.json(deletedBook);
        } else {
            res.status(400).json({error: "Error deleting book"});
        }
    } catch(e) {
        console.error("Error deleting new book", e);
        res.status(500).json({error: "Failed deleting book"});
    }
}

const deleteAllBooks = async(req, res) => {
    try {
        let deleteAll = await library.deleteAll();
        if (deleteAll) {
            res.json(deleteAll);
        } else {
            res.status(500).json({error: "Failed deleting all books"});
        }
    } catch (e) {
        console.error("Error deleting all books", e);
        res.status(500).json({error: "Failed deleting books"});
    }
}

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    deleteAllBooks
}