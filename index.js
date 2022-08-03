const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let correct = 0;
let wrong = 0;
let a, b, c;
let isItWrong = false;

let randomNumberEasy = () => {
  a = Math.floor(Math.random() * 10) + 1;
  b = Math.floor(Math.random() * 10) + 1;
  c = a * b;
};

let randomNumberMedium = () => {
  a = Math.floor(Math.random() * 15) + 10;
  b = Math.floor(Math.random() * 15) + 10;
  c = a * b;
};

let randomNumberHard = () => {
  a = Math.floor(Math.random() * 25) + 25;
  b = Math.floor(Math.random() * 25) + 25;
  c = a * b;
};

let nextQuestion = (isItWrong, diff) => {
  if (!isItWrong) {
    if (diff === "easy") randomNumberEasy();
    else if (diff === "medium") randomNumberMedium();
    else if (diff === "hard") randomNumberHard();
  }
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/add/:diff", (req, res) => {
  let diff = req.params.diff;
  nextQuestion(isItWrong, diff);
  res.render("question", {
    question: a + " + " + b,
    isItWrong: isItWrong,
  });
  isItWrong = false;
});

app.post("/add/:diff", (req, res) => {
  let diff = req.params.diff;
  if (Number(req.body.answer) == a + b) {
    correct++;
    res.redirect("/add/" + diff);
  } else {
    wrong++;
    isItWrong = true;
    res.redirect("/add/" + diff);
  }
});

app.get("/sub/:diff", (req, res) => {
  let diff = req.params.diff;
  nextQuestion(isItWrong, diff);
  res.render("question", {
    question: a + " - " + b,
    isItWrong: isItWrong,
  });
  isItWrong = false;
});

app.post("/sub/:diff", (req, res) => {
  let diff = req.params.diff;
  if (Number(req.body.answer) == a - b) {
    correct++;
    res.redirect("/sub/" + diff);
  } else {
    wrong++;
    isItWrong = true;
    res.redirect("/sub/" + diff);
  }
});

app.get("/mul/:diff", (req, res) => {
  let diff = req.params.diff;
  nextQuestion(isItWrong, diff);
  res.render("question", {
    question: a + " x " + b,
    isItWrong: isItWrong,
  });
  isItWrong = false;
});

app.post("/mul/:diff", (req, res) => {
  let diff = req.params.diff;
  if (Number(req.body.answer) == a * b) {
    correct++;
    res.redirect("/mul/" + diff);
  } else {
    wrong++;
    isItWrong = true;
    res.redirect("/mul/" + diff);
  }
});

app.get("/div/:diff", (req, res) => {
  let diff = req.params.diff;
  nextQuestion(isItWrong, diff);
  res.render("question", {
    question: a + " / " + b,
    isItWrong: isItWrong,
  });
  isItWrong = false;
});

app.post("/div/:diff", (req, res) => {
  let diff = req.params.diff;
  if (Number(req.body.answer) == a) {
    correct++;
    res.redirect("/div/" + diff);
  } else {
    wrong++;
    isItWrong = true;
    res.redirect("/div/" + diff);
  }
});

app.get("/result", (req, res) => {
  res.render("result", {
    score: "correct: " + correct + " incorrect: " + wrong,
    wrong: "",
  });
});

app.listen(3000, () => console.log("3000"));
