
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["green", "red", "blue", "yellow"];
var started = false;
var level = 0;





function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function buttonClickedAnimation(currentColor){

    var activeButton = $("." + currentColor);

    activeButton.addClass("pressed");
    setTimeout(function(){

        activeButton.removeClass("pressed");

    },100);

}


function nextSequence(){
    
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    
}

$(document).keypress(function(){
    if (!started) {
        nextSequence();
        started = true;
    }
    

});

$(".btn").click(function(){
    
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    buttonClickedAnimation(userChosenColor);
    checkAnswer(userClickedPattern.length -1 );
}) ;






function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){

            setTimeout(nextSequence(),1000);    
        }

    }
    
    else {

        $("h1").text("Game Over, Press Any Key to Restart")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){

            $("body").removeClass("game-over");
        },200);
        startOver();
        
    }

}


function startOver(){

    level = 0;
    gamePattern = [];
    started = false;

}

