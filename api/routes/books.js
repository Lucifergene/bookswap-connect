require("dotenv").config();
const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const verifyToken = require("./middleware/jwt");

// Route: GET /api/books (Public - View all books or specific user's books if authenticated)
router.get("/", async (req, res) => {
  const { user_id } = req.query;
  // If a user_id is specified, require token authentication using the middleware
  if (user_id) {
    return verifyToken(req, res, async () => {
      // Check if the user in the token matches the user_id query
      if (req.user.userId !== user_id) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Access to this user's books is not allowed",
        });
      }

      try {
        // Fetch books for the specific user
        const books = await Book.find(
          { userId: user_id },
          "title author genre condition availabilityStatus"
        );
        return res.status(200).json({
          success: true,
          data: books,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch books. Please try again later.",
        });
      }
    });
  }

  // Public access to fetch all books if no user_id is provided
  try {
    const books = await Book.find(
      {},
      "title author genre condition availabilityStatus"
    );
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch books. Please try again later.",
    });
  }
});

// Route: POST /api/books (Protected - Create a new book)
router.post("/", verifyToken, async (req, res, next) => {
  const { title, author, genre, condition, availabilityStatus } = req.body;
  const { userId } = req.user;

  // Validate required fields
  if (!title || !author || !genre || !condition || !availabilityStatus) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Create a new book entry
    const newBook = new Book({
      userId,
      title,
      author,
      genre,
      condition,
      availabilityStatus,
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    // Send a response with the saved book details
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book: {
        id: savedBook._id,
        userId: savedBook.userId,
        title: savedBook.title,
        author: savedBook.author,
        genre: savedBook.genre,
        condition: savedBook.condition,
        availabilityStatus: savedBook.availabilityStatus,
        createdAt: savedBook.createdAt,
        updatedAt: savedBook.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create book. Please try again later.",
    });
  }
});

// Route: PUT /api/books/:id (Protected - Edit a book)
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, author, genre, condition, availabilityStatus } = req.body;

  try {
    // Find the book by ID
    const book = await Book.findById(id);

    // Check if the book exists
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if the user is the owner of the book
    if (book.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not allowed to edit this book",
      });
    }

    // Update the book details
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.condition = condition || book.condition;
    book.availabilityStatus = availabilityStatus || book.availabilityStatus;

    // Save the updated book to the database
    const updatedBook = await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: {
        id: updatedBook._id,
        userId: updatedBook.userId,
        title: updatedBook.title,
        author: updatedBook.author,
        genre: updatedBook.genre,
        condition: updatedBook.condition,
        availabilityStatus: updatedBook.availabilityStatus,
        createdAt: updatedBook.createdAt,
        updatedAt: updatedBook.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update book. Please try again later.",
    });
  }
});

// Route: DELETE /api/books/:id (Protected - Delete a book)
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    // Find the book by ID
    const book = await Book.findById(id);

    // Check if the book exists
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if the user is the owner of the book
    if (book.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not allowed to delete this book",
      });
    }

    // Delete the book
    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete book. Please try again later.",
    });
  }
});

// Route: GET /api/books/search (Public - Search and filter books)
router.get("/search", async (req, res) => {
  const {
    title,
    author,
    genre,
    availabilityStatus,
    condition,
    page = 1,
    limit = 4,
  } = req.query;

  const query = {};

  if (title) {
    query.title = { $regex: `^${title}`, $options: "i" }; // Case-insensitive partial match
  }
  if (author) {
    query.author = { $regex: `^${author}`, $options: "i" }; // Case-insensitive partial match
  }
  if (genre) {
    const genres = Array.isArray(genre) ? genre : [genre];
    query.genre = { $in: genres.map((g) => new RegExp(`^${g}`, "i")) }; // Case-insensitive match for multiple genres
  }
  if (availabilityStatus) {
    const statuses = Array.isArray(availabilityStatus)
      ? availabilityStatus
      : [availabilityStatus];
    query.availabilityStatus = {
      $in: statuses.map((s) => new RegExp(`^${s}`, "i")),
    }; // Case-insensitive match for multiple statuses
  }
  if (condition) {
    const conditions = Array.isArray(condition) ? condition : [condition];
    query.condition = { $in: conditions.map((c) => new RegExp(`^${c}`, "i")) }; // Case-insensitive match for multiple conditions
  }

  try {
    const totalResults = await Book.countDocuments(query);
    const totalPages = Math.ceil(totalResults / limit);
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select(
        "title author genre condition availabilityStatus createdAt updatedAt"
      );

    res.status(200).json({
      success: true,
      data: {
        books,
        pageInfo: {
          totalResults,
          totalPages,
          currentPage: parseInt(page),
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to search books. Please try again later.",
    });
  }
});

module.exports = router;
