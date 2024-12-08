require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./routes/api/user");
const booksApiRouter = require("./routes/api/books");
const booksRouter = require("./routes/books");
const indexRouter = require("./routes/index");
const errorMiddleware = require("./middleware/error");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const {verify, options} = require("./utils/passport");
const socketIO = require("socket.io");
const http = require("http");

passport.use("local", new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findById(id).select("-__v");

        cb(null, user);
    } catch (e) {
        return cb(e);
    }
})

const app = express();
const server = http.Server(app);
const io = socketIO(server);

io.on("connection", (socket) => {
    const {bookId} = socket.handshake.query;

    socket.join(bookId);

    socket.on("message-to-room", (msg) => {
        socket.to(bookId).emit("message-to-room", msg);
        socket.emit("message-to-room", msg);
    })

    socket.on("disconnect", () => {});
})

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(session({secret: "SECRET"}));
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/api/user", userRouter);
app.use("/api/books", booksApiRouter);

app.use(errorMiddleware);

async function start(port, db) {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${db}`);
        server.listen(port).on("listening", () => {
            console.log(`Server start on ${port} port`);
        });
    } catch (e) {
        console.log(e);
    }
}

const DB = process.env.DB || "books";
const PORT = process.env.PORT || 3000;

start(PORT, DB).then();
