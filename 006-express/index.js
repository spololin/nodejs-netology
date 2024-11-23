const express = require("express");
const { v4: uuid } = require("uuid");

class Book {
    constructor(data) {
        this.id = uuid();
        this.title = data?.title;
        this.description = data?.description;
        this.authors = data?.authors;
        this.favorite = data?.favorite;
        this.fileCover = data?.fileCover;
        this.fileName = data?.fileName;
    }
}

const store = {
    books: [new Book(), new Book()],
};

const app = express();
app.use(express.json());

app.post("/api/user/login", (req, res) => {
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
});

app.get("/api/books", (req, res) => {
    const { books } = store;
    res.json(books);
});

app.get("/api/books/:id", (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("Книга не найдена");
    }
});

app.post("/api/books/", (req, res) => {
    const { books } = store;
    const newBook = new Book(req.body);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.put("/api/books/:id", (req, res) => {
    const { books } = store;
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

app.delete("/api/books/:id", (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json("ok");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
