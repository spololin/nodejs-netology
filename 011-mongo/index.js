require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./routes/api/user");
const booksApiRouter = require("./routes/api/books");
const booksRouter = require("./routes/books");
const indexRouter = require("./routes/index");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/api/user", userRouter);
app.use("/api/books", booksApiRouter);

app.use(errorMiddleware);

async function start(port, db) {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${db}`);
        app.listen(port).on("listening", () => {
            console.log(`Server start on ${port} port`);
        });
    } catch (e) {
        console.log(e);
    }
}

const DB = process.env.DB || "books";
const PORT = process.env.PORT || 3000;

start(PORT, DB).then();
