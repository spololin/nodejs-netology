const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
    const books = await Book.find();

    res.render("books/list", {books, title: "Книги"});
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Создание книги",
        book: {}
    });
});

router.post('/create', async (req, res) => {
    console.log(req.body);
    const newBook = new Book({...req.body, favorite: req.body.favorite === 'on'});

    try {
        await newBook.save();

        res.redirect("/books");
    } catch (e) {
        res.status(500).json(e);
    }

});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);

    console.log(book);

    res.render("books/view", {book, title: "Данные о книге"});
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    const book = await Book.findById(id);

    res.render("books/update", {book, title: "Редактирование книги"});
});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndUpdate(id, {...req.body, favorite: req.body.favorite === 'on'});

    res.redirect(`/books/`);
});

router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id})

        res.redirect(`/books/`);
    } catch (e) {
        res.status(500).json(e)
    }
});

module.exports = router;