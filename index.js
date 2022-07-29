const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"))

let correct = 0;
let wrong = 0;
let a, b, c;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res, next) => {
  if (req.body.hasOwnProperty("add")) res.redirect("/add");
  else if (req.body.hasOwnProperty("sub")) res.redirect("/sub");
  else if (req.body.hasOwnProperty("mul")) res.redirect("/mul");
  else if (req.body.hasOwnProperty("div")) res.redirect("/div");
  else res.redirect("/result");
});

app.get("/add", (req, res) => {
  // res.sendFile(__dirname + "/pages/add.html");
  a = Math.floor(Math.random() * 10) + 1;
  b = Math.floor(Math.random() * 10) + 1;
  res.render("question", { question: a + " + " + b });
});

app.post("/add", (req, res) => {
  if (Number(req.body.answer) == a + b) {
    correct++;
    res.redirect("/add");
  } else {
    wrong++;
    res.redirect("/wrong");
  }
});

app.get("/sub", (req, res) => {
  a = Math.floor(Math.random() * 10) + 1;
  b = Math.floor(Math.random() * 10) + 1;
  res.render("question", { question: a + " - " + b });
});

app.post("/sub", (req, res) => {
  if (Number(req.body.answer) == a - b) {
    correct++;
    res.redirect("/sub");
  } else {
    wrong++;
    res.redirect("/wrong");
  }
});

app.get("/mul", (req, res) => {
  a = Math.floor(Math.random() * 10) + 1;
  b = Math.floor(Math.random() * 10) + 1;
  res.render("question", { question: a + " x " + b });
});

app.post("/mul", (req, res) => {
  if (Number(req.body.answer) == a * b) {
    correct++;
    res.redirect("/mul");
  } else {
    wrong++;
    res.redirect("/wrong");
  }
});

app.get("/div", (req, res) => {
  a = Math.floor(Math.random() * 10) + 1;
  b = Math.floor(Math.random() * 10) + 1;
  c = a * b;
  res.render("question", { question: c + " / " + b });
});

app.post("/div", (req, res) => {
  if (Number(req.body.answer) == a) {
    correct++;
    res.redirect("/div");
  } else {
    wrong++;
    res.redirect("/wrong");
  }
});

app.get("/wrong", (req, res) => {
  res.render("result", {
    score: "correct: " + correct + " wrong: " + wrong,
    wrong: "wrong",
  });
});

app.post("/wrong", (req, res) => {
  res.redirect("/");
});

app.get("/result", (req, res) => {
  res.render("result", {
    score: "correct: " + correct + " wrong: " + wrong,
    wrong: "",
  });
});

app.listen(3000, () => console.log("3000"));
