const Book = require("../models/Book");
const Author = require("../models/Author");

const bookController = {
  async getAllBooks(req, res) {
    try {
      const books = await Book.find()
        .populate("author", "firstName lastName")
        .sort({ title: 1 });

      res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({
        error: "Failed to fetch books",
        details: error.message,
      });
    }
  },

  async createBook(req, res) {
    try {
      const { title, year, author } = req.body;

      if (!title || !year || !author) {
        return res.status(400).json({
          error: "Title, year, and author are required",
        });
      }

      const existingAuthor = await Author.findById(author);
      if (!existingAuthor) {
        return res.status(404).json({
          error: "Author not found",
        });
      }

      const book = new Book({
        title: title.trim(),
        year: parseInt(year),
        author: author,
      });

      const savedBook = await book.save();

      const bookWithAuthor = await Book.findById(savedBook._id).populate(
        "author",
        "firstName lastName"
      );

      res.status(201).json(bookWithAuthor);
    } catch (error) {
      console.error("Error creating book:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          error: "Validation failed",
          details: Object.values(error.errors).map((err) => err.message),
        });
      }

      if (error.name === "CastError") {
        return res.status(400).json({
          error: "Invalid author ID format",
        });
      }

      res.status(500).json({
        error: "Failed to create book",
        details: error.message,
      });
    }
  },

  async deleteBook(req, res) {
    try {
      const { id } = req.params;

      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({
          error: "Book not found",
        });
      }

      await Book.findByIdAndDelete(id);

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting book:", error);

      if (error.name === "CastError") {
        return res.status(400).json({
          error: "Invalid book ID format",
        });
      }

      res.status(500).json({
        error: "Failed to delete book",
        details: error.message,
      });
    }
  },

  async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findById(id).populate(
        "author",
        "firstName lastName"
      );

      if (!book) {
        return res.status(404).json({
          error: "Book not found",
        });
      }

      res.status(200).json(book);
    } catch (error) {
      console.error("Error fetching book:", error);

      if (error.name === "CastError") {
        return res.status(400).json({
          error: "Invalid book ID format",
        });
      }

      res.status(500).json({
        error: "Failed to fetch book",
        details: error.message,
      });
    }
  },
};

module.exports = bookController;
