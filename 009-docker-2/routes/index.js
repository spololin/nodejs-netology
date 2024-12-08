const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Главная",
    })
});

router.get("/signup", (req, res) => {
    res.render("user/signup");
})

router.get("/login", (req, res) => {
    res.render("user/login", {title: "Аутентификация и регистрация"});
})

router.get("/logout", function (req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

router.get("/profile", (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect("/login")
        }
        next()
    },
    (req, res) => {
        res.render("user/profile", { user: req.user, title: "Профиль" })
    })

module.exports = router;
