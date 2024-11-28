const PORT = process.env.PORT || 3000;

const express = require("express");
const userRouter = require("./routes/user");
const booksRouter = require("./routes/books");
const indexRouter = require('./routes/index');
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());

app.use('/', indexRouter);
app.use("/api/user", userRouter);
app.use("/books", booksRouter);

app.use(errorMiddleware);

app.listen(PORT);
