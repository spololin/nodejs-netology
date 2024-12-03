require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./routes/user");
const booksRouter = require("./routes/books");
const indexRouter = require("./routes/index");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());

app.use("/", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/books", booksRouter);

app.use(errorMiddleware);

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB);
        app.listen(PORT).on("listening", () => {
            console.log(`Server start on ${PORT} port`);
        });
    } catch (e) {
        console.log(e);
    }
}

const DB = process.env.DB
const PORT = process.env.PORT || 3000;

start(PORT, DB).then();
