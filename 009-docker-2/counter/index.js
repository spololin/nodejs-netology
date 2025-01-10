const PORT = process.env.PORT || 3001;
const express = require("express")
const {initCounter, saveCounter} = require("./file.utils")
const app = express();
const counter = initCounter();

app.post("/counter/:bookId/incr", async (req, res) => {
    const {bookId} = req.params
    counter[bookId] = counter[bookId] === undefined ? 1 : ++counter[bookId]

    try {
        await saveCounter(counter)
    } catch (e) {
        console.log(e.message);
        res.status(500);
        res.json("Ошибка сохранения");
    }

    res.status(201).json({counter})
})

app.get("/counter/:bookId", (req, res) => {
    const {bookId} = req.params

    try {
        const count = counter[bookId] ?? 0;
        res.json({count});
    } catch (e) {
        console.log(e.message);
        res.status(500);
        res.json("Книга не найдена");
    }
})

app.listen(PORT, () => {
    console.log(`Приложение стартовало на ${PORT} порту`)
})
