const User = require("../models/user");

async function verify(username, password, done) {
    try {
        const user = await User.findOne({ login: username }).select("-__v");

        if (!user) {
            return done(null, false);
        }

        if (user.password !== password) {
            return done(null, false);
        }

        return done(null, user);
    } catch (e) {
        return done(e);
    }
}

const options = {
    usernameField: "username",
    passwordField: "password",
}

module.exports = {
    verify,
    options
}