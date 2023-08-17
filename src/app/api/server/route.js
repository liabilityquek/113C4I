const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const cors = require('cors');
const { createUser, logout, resetPassword } = require('../../../lib/userController');

const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL


app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(cors({
  origin: `${NEXTAUTH_URL}`
}))

// app.get("/api/server", (req, res) => {
//     const users = [
//         {id: 1, name: "John"},
//         {id: 2, name: "Sally"},

//     ]
//     return res.status(200).json({ users })
// })

app.post("/api/server/user", createUser);
app.post("/api/server/logout", logout);
app.post("/api/server/reset-password", resetPassword);

app.listen(port, () => {
  console.log(`113C4I app listening on port ${port}`);
});

module.exports = app;