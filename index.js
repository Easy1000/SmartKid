const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let correct = 0;
let wrong = 0;
let a, b, c;
let isItWrong = false;

let randomNumber = () => {
  a = Math.floor(Math.random() * 10) + 1;
  b = Math.floor(Math.random() * 10) + 1;
  c = a * b;
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res, next) => {
  if (req.body.hasOwnProperty("add")) res.redirect("/add");
  else if (req.body.hasOwnProperty("sub")) res.redirect("/sub");
  else if (req.body.hasOwnProperty("mul")) res.redirect("/mul");
  else if (req.body.hasOwnProperty("div")) res.redirect("/div");
  else if (req.body.hasOwnProperty("score")) res.redirect("/result");
  else res.redirect("/")
});

app.get("/add", (req, res) => {
  if (!isItWrong) {
    randomNumber();
  }
  isItWrong = false;
  res.render("question", { question: a + " + " + b });
});

app.post("/add", (req, res) => {
  if (Number(req.body.answer) == a + b) {
    correct++;
    res.redirect("/add");
  } else {
    wrong++;
    isItWrong = true;
    res.redirect("/add");
  }
});

app.get("/sub", (req, res) => {
  if (!isItWrong) {
    randomNumber();
  }
  isItWrong = false;
  res.render("question", { question: a + " - " + b });
});

app.post("/sub", (req, res) => {
  if (Number(req.body.answer) == a - b) {
    correct++;
    res.redirect("/sub");
  } else {
    wrong++;
    isItWrong = true;
    res.redirect("/sub");
  }
});

app.get("/mul", (req, res) => {
  if (!isItWrong) {
    randomNumber();
  }
  isItWrong = false;
  res.render("question", { question: a + " x " + b });
});

app.post("/mul", (req, res) => {
  if (Number(req.body.answer) == a * b) {
    correct++;
    res.redirect("/mul");
  } else {
    wrong++;
    isItWrong = true;
    res.redirect("/mul");
  }
});

app.get("/div", (req, res) => {
  if (!isItWrong) {
    randomNumber();
  }
  isItWrong = false;
  res.render("question", { question: c + " / " + b });
});

app.post("/div", (req, res) => {
  if (Number(req.body.answer) == a) {
    correct++;
    res.redirect("/div");
  } else {
    wrong++;
    isItWrong = true;
    res.redirect("/div");
  }
});

app.get("/wrong", (req, res) => {
  res.render("result", {
    score: "correct: " + correct + " wrong: " + wrong,
    wrong: "Wrong",
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
