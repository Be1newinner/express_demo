require('dotenv').config()

const express = require("express");
const morgan = require("morgan");

const app = express();


console.log(process.env.API)

app.use(morgan())
app.use(express.json());
// app.use(express.static('static'))

const users = [
    { id: 1, name: "John Doe", email: "john@example.com", password: "123" },
    {
        id: 2, name: "Jane Doe", email: "jane@example.com",
        password: "456"
    },
]

// app.use('/static', express.static('index.html'))

app.get("/", (req, res) => {
    console.log(req.query)
    res.end(JSON.stringify({ name: "Vijay" }))
});

app.get("/auth/:name", (req, res) => {
    console.log(req.params.name)
    // console.log(req.body.email)
    res.end("hello")
})

app.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find((user) => user.email === email && user.password === password);

        if (user?.id) {
            res.end(JSON.stringify(user));
        } else {
            res.end(JSON.stringify({ error: "user Not Found" }))
        }
    } catch (e) {
        console.log(e);
        res.end(JSON.stringify({ error: "Unknown error" }))
    }
})

app.listen(3000)