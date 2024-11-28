const path = require("path");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/file")
const Book = require("../models/Book");
const books = new Array(Math.floor(Math.random() * 9) + 1).fill(null).map((val, idx) => new Book({
    title: `Книга ${idx + 1}`,
    description: `Описание ${idx + 1}`,
    authors: `Автор ${idx + 1}`,
    favorite: Boolean(Math.random() < 0.5 ? 0 : 1),
    fileCover: `Обложка ${idx + 1}`,
    fileName: `file${idx + 1}.pdf`,
    fileBook: `public/books/file${idx + 1}.pdf`
}));

router.get("/", (req, res) => {
    res.render("books/list", {books, title: "Книги"});
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.render("books/view", {book: books[idx], title: "Данные о книге"});
    } else {
        res.redirect('/404');
    }
});

router.get('/create/1', (req, res) => {
    res.render("books/create", {
        title: "Создание книги",
        book: {}
    });
});

router.post('/create/1', (req, res) => {
    const newBook = new Book(req.body);
    books.push(newBook);

    res.redirect("/books");
});

router.get('/update/:id', (req, res) => {
    const {id} = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.render("books/update", {book: books[idx], title: "Редактирование книги"});
    } else {
        res.redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            ...req.body
        };

        res.redirect("/books");
    } else {
        res.redirect('/404');
    }
});

router.get('/delete/:id', (req, res) => {
    const {id} = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }

    books.splice(idx, 1);
    res.redirect(`/books`);
});

router.post("/:id/upload", upload.single("filedata"), (req, res) => {
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books[idx].fileBook = req.file.path;
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("Книга не найдена");
    }
});

router.get("/:id/download", (req, res) => {
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.download(path.join(__dirname, "..", books[idx].fileBook), (err) => {
			if (err) {
				res.status(404).send("Файл книги не найден");
			}
		});
    } else {
        res.status(404);
        res.json("Книга не найдена");
    }
});

module.exports = router;
