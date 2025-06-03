const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// GET /api/books
router.get("/", bookController.getAllBooks);

// POST /api/books
router.post("/", bookController.createBook);

// DELETE /api/books/:id
router.delete("/:id", bookController.deleteBook);

// GET /api/books/:id
router.get("/:id", bookController.getBookById);

module.exports = router;
