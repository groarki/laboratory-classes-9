const Author = require("../models/Author");
const Book = require("../models/Book");

const authorController = {
  async getAllAuthors(req, res) {
    try {
      const authors = await Author.find().sort({ lastName: 1, firstName: 1 });
      res.status(200).json(authors);
    } catch (error) {
      console.error("Error fetching authors:", error);
      res.status(500).json({
        error: "Failed to fetch authors",
        details: error.message,
      });
    }
  },

  async updateAuthor(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName } = req.body;

      if (!firstName || !lastName) {
        return res.status(400).json({
          error: "Both firstName and lastName are required",
        });
      }

      const existingAuthor = await Author.findById(id);
      if (!existingAuthor) {
        return res.status(404).json({
          error: "Author not found",
        });
      }

      const updatedAuthor = await Author.findByIdAndUpdate(
        id,
        { firstName: firstName.trim(), lastName: lastName.trim() },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json(updatedAuthor);
    } catch (error) {
      console.error("Error updating author:", error);

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
        error: "Failed to update author",
        details: error.message,
      });
    }
  },

  async createAuthor(req, res) {
    try {
      const { firstName, lastName } = req.body;

      if (!firstName || !lastName) {
        return res.status(400).json({
          error: "Both firstName and lastName are required",
        });
      }

      const author = new Author({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      const savedAuthor = await author.save();
      res.status(201).json(savedAuthor);
    } catch (error) {
      console.error("Error creating author:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          error: "Validation failed",
          details: Object.values(error.errors).map((err) => err.message),
        });
      }

      res.status(500).json({
        error: "Failed to create author",
        details: error.message,
      });
    }
  },

  async getAuthorById(req, res) {
    try {
      const { id } = req.params;
      const author = await Author.findById(id);

      if (!author) {
        return res.status(404).json({
          error: "Author not found",
        });
      }

      res.status(200).json(author);
    } catch (error) {
      console.error("Error fetching author:", error);

      if (error.name === "CastError") {
        return res.status(400).json({
          error: "Invalid author ID format",
        });
      }

      res.status(500).json({
        error: "Failed to fetch author",
        details: error.message,
      });
    }
  },
};

module.exports = authorController;
