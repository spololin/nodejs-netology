const path = require("path");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/file")
const Book = require("../models/Book");
const books = new Array(Math.floor(Math.random() * 9) + 1).fill(null).map(() => new Book());

router.get("/", (req, res) => {
    res.json(books);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("Книга не найдена");
    }
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

router.post("/", (req, res) => {
    const newBook = new Book(req.body);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            ...req.body
        };

        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("Книга не найдена");
    }
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json("ok");
    }
});

module.exports = router;