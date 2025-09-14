const express = require('express');
const router = express.Router();
const { getBooks, createBook, updateBook, deleteBook, deleteAllBooks } = require("../controllers/booksController");
router.get("/api/books", getBooks);
router.post("/api/books", createBook);
router.put("/api/books/:id", updateBook);
router.delete("/api/books/:id", deleteBook);
router.delete("/api/books", deleteAllBooks);

module.exports = router;