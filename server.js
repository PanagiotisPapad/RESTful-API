const express = require("express");
const mongoose = require("mongoose");
const eventsRouter = require("../BookIT/api/routes/eventRouter");
const articlesRouter = require("./routes/articleRouter");

mongoose
  .connect("mongodb://127.0.0.1:27017/wikiDB", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log("Connection to database failed", err);
    process.exit();
  });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", articlesRouter)

app.get("/", (req, res) => {
    res.json({ 
        message: "Server is running"
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})

