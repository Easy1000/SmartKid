const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let correct = 0;
let incorrect = 0;
let number1, number2, number3;
let isItWrong = false;

let randomNumberEasy = () => {
  number1 = Math.floor(Math.random() * 10) + 1;
  number2 = Math.floor(Math.random() * 10) + 1;
  number3 = number1 * number2;
};

let randomNumberMedium = () => {
  number1 = Math.floor(Math.random() * 15) + 10;
  number2 = Math.floor(Math.random() * 15) + 10;
  number3 = number1 * number2;
};

let randomNumberHard = () => {
  number1 = Math.floor(Math.random() * 25) + 25;
  number2 = Math.floor(Math.random() * 25) + 25;
  number3 = number1 * number2;
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
    question: number1 + " + " + number2,
    isItWrong: isItWrong,
  });
  isItWrong = false;
});

app.post("/add/:diff", (req, res) => {
  const diff = req.params.diff;
  const question = "/add/" + diff;
  if (Number(req.body.answer) == number1 + number2) {
    correct++;
    res.redirect(question);
  } else {
    incorrect++;
    isItWrong = true;
    res.redirect(question);
  }
});

app.get("/sub/:diff", (req, res) => {
  let diff = req.params.diff;
  nextQuestion(isItWrong, diff);
  res.render("question", {
    question: number1 + " - " + number2,
    isItWrong: isItWrong,
  });
  isItWrong = false;
});

app.post("/sub/:diff", (req, res) => {
  const diff = req.params.diff;
  const question = "/sub/" + diff;
  if (Number(req.body.answer) == number1 - number2) {
    correct++;
    res.redirect(question);
  } else {
    incorrect++;
    isItWrong = true;
    res.redirect(question);
  }
});

app.get("/mul/:diff", (req, res) => {
  let diff = req.params.diff;
  nextQuestion(isItWrong, diff);
  res.render("question", {
    question: number1 + " x " + number2,
    isItWrong: isItWrong,
  });
  isItWrong = false;
});

app.post("/mul/:diff", (req, res) => {
  const diff = req.params.diff;
  const question = "/mul/" + diff;
  if (Number(req.body.answer) == number1 * number2) {
    correct++;
    res.redirect(question);
  } else {
    incorrect++;
    isItWrong = true;
    res.redirect(question);
  }
});

app.get("/div/:diff", (req, res) => {
  let diff = req.params.diff;
  nextQuestion(isItWrong, diff);
  res.render("question", {
    question: number3 + " / " + number2,
    isItWrong: isItWrong,
  });
  isItWrong = false;
});

app.post("/div/:diff", (req, res) => {
const diff = req.params.diff;
  const question = "/div/" + diff;
  
  if (Number(req.body.answer) == number1) {
    correct++;
    res.redirect(question);
  } else {
    incorrect++;
    isItWrong = true;
    res.redirect(question);
  }
});

app.get("/result", (req, res) => {
  res.render("result", {
    score: "correct: " + correct + " incorrect: " + incorrect,
    wrong: "",
  });
});

app.listen(3000, () => console.log("3000"));
