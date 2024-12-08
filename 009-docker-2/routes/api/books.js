const express = require("express");
const router = express.Router();
const Book = require("../../models/book");

router.get("/", async (req, res) => {
    try {
        const books = await Book.find().select("-__v");

        res.json(books)
    } catch (e) {
        res.status(500).json(e)
    }
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const book = await Book.findById(id).select("-__v")

        res.json(book);
    } catch (e) {
        res.status(500).json(e)
    }
});

router.post("/", async (req, res) => {
    const newBook = new Book({...req.body});

    try {
        await newBook.save();

        res.json(newBook);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        await Book.findByIdAndUpdate(id, {...req.body});

        res.redirect("/api/books/${id}")
    } catch (e) {
        res.status(500).json(e);
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id})

        res.json(true);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;
