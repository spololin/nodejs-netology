const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/user");

router.get("/login", (req, res) => {
    res.render("user/login", {title: "Аутентификация и регистрация"});
})

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/")
})

router.post("/signup", async (req, res) => {
    if (req.body.password === req.body["password-repeat"]) {
        try {
            const user = new User({
                login: req.body.username,
                password: req.body.password,
                username: req.body.displayName,
                email: req.body.email,
            });

            await user.save();

            res.redirect("/");
        } catch (e) {
            console.error(e);
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
})

module.exports = router;