let n,
  m,
  l,
  correct = -1,
  wrong = -1;

$("input").hide();
$("#back").hide();

let typeAns = (type) => {
  //string input
  $("#answer").keyup((e) => {
    if (e.key == "Enter") {
      switch (type) {
        case "+":
          if ($("#answer").val() == n + m) correctAns("+");
          else wrongAns("+");
          break;
        case "-":
          if ($("#answer").val() == n - m) correctAns("-");
          else wrongAns("-");
          break;
        case "*":
          if ($("#answer").val() == n * m) correctAns("*");
          else wrongAns("*");
          break;
        case "/":
          if ($("#answer").val() == n) correctAns("/");
          else wrongAns("/");
          break;
      }
    }
  });
};

let correctAns = (type) => {
  //string input
  $("h2").text("CORRECT");
  setTimeout(() => {
    math(type);
  }, 500);
};

let wrongAns = (type) => {
  //string input
  $("h2").text("TRY AGAIN!");
  setTimeout(() => {
    if (type == "/") $("h2").text(l + " " + type + " " + m);
    else if (type == "*") $("h2").text(n + " x " + m);
    else $("h2").text(n + " " + type + " " + m);
  }, 500);
};

let math = (type) => {
  //string input
  n = Math.floor(Math.random() * 10) + 1;
  m = Math.floor(Math.random() * 10) + 1;
  l = n * m;

  switch (type) {
    case "+":
      $("h2").text(n + " + " + m);
      break;
    case "-":
      $("h2").text(n + " - " + m);
      break;
    case "*":
      $("h2").text(n + " x " + m);
      break;
    case "/":
      $("h2").text(l + " / " + m);
      break;
  }
  $("button").hide();
  $("#back").show();
  $("input").show();
};

$("#add").click(() => {
  math("+");
  typeAns("+");
});

$("#sub").click(() => {
  math("-");
  typeAns("-");
});

$("#mul").click(() => {
  math("*");
  typeAns("*");
});

$("#div").click(() => {
  math("/");
  typeAns("/");
});

$("#score").click(() => {
  $("button").hide();
  $("#correct").text("correct: " + correct);
  $("#wrong").text("wrong: " + wrong);
  $("#back").show();
});

$("#back").click(() => {
  $("input").hide();
  $("button").fadeIn();
  $("#back").hide();
  $("h2").html("");
  $("h3").html("");
});
