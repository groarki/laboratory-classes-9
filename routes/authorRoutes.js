const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// GET /api/authors
router.get("/", authorController.getAllAuthors);

// PUT /api/authors/:id
router.put("/:id", authorController.updateAuthor);

// POST /api/authors
router.post("/", authorController.createAuthor);

// GET /api/authors/:id
router.get("/:id", authorController.getAuthorById);

module.exports = router;
