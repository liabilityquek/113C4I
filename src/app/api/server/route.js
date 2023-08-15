const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const { createUser, login, logout, resetPassword } = require('../../../lib/userController');

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.get("/api/server", (req, res) => {
    const users = [
        {id: 1, name: "John"},
        {id: 2, name: "Sally"},

    ]
    return res.status(200).json({ users })
})

app.post("/api/server/user", createUser);
app.post("/api/server/login", login);
app.post("/api/server/logout", logout);
app.post("/api/server/reset-password", resetPassword);

app.listen(port, () => {
  console.log(`113C4I app listening on port ${port}`);
});

module.exports = app;