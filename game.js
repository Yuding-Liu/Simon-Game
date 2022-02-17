var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function nextSequence() {
  ++level;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  console.log(randomChosenColour);
  playSound(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function() {
  if (!gameStarted) {
    gameStarted = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("right");
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  return sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
