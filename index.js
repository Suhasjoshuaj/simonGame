var gamePattern = [];
var userClickedPattern = [];

var colors = ["green", "red", "yellow", "blue"];
var started = false;
var level = 0;

$(".btn").on("click", function() {
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    
});
$(document).on("keydown", function() {
    if(!started){

        $("#level-title").text("Level " + level);
        newSequence();
        started = true;
    }
});


function newSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    
}


function playSound(snippet) {
    var audio = new Audio("sounds/" + snippet + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    });
    
}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success!");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(newSequence, 1000);
            
        }
    } else{
        console.log("fail!");
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];

}   
