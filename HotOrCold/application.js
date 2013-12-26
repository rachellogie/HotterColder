$(document).ready(function(){

	var actual = Math.floor(Math.random()*101);
	var guess;
	var numGuesses = 0;
	var previousDifference;
	var keepGoing = true;
	
	$(".inputform").submit(function(event){
			event.preventDefault();
			guess = document.getElementById("yourGuess").value;	
			var difference = Math.abs(actual - guess);
			
			console.log("your guess is " + guess + " actual is " + actual);
			
			if(keepGoing){
				if(!inRange(guess)){
					console.log("You must pick a number from 1 to 100");
					setMessage("You must pick a number from 1 to 100!!! Do it right!");
					reset();
				} else if(isCorrect(guess)){
					console.log("You got it!!");
					setMessage("You got it!  Click the button below to start a new game.");
					reset();
					keepGoing = false;
				} else {
					console.log("you are" + check(difference));
					var temperature = check(difference);
					if (numGuesses == 0){
						setMessage("You are " + temperature + ".");
						previousDifference = difference;
						numGuesses++;
					} else {
						var direction = gettingWarmer(difference, previousDifference);
						console.log("difference is " + difference);
						console.log("previousdifference is " + previousDifference);
						console.log(direction);
						console.log(difference);
						setMessage("You are " + temperature + ", and you're getting " + direction + ".");
						previousDifference = difference;
					}

					
					$("ul").append("<li>" + guess + "</li>")
					reset();
				}
			}else {
				setMessage("You already won this one. Click the button below to start a new game.")
				reset();
			}
	});



	$(".clear").click(function(event){
		event.preventDefault();
		$("li").remove();
		numGuesses = 0;
		keepGoing = true;
		setMessage("Let the games begin!");
		actual = Math.floor(Math.random()*101);
		console.log("actual is now " + actual);
	});	


	function gettingWarmer(difference, previousDifference){
		if (previousDifference > difference){
			return "warmer";
		} else {
			return "colder";
		}
	}



	function setMessage(message){
		$(".message").html(message);
	}

	function reset(){
		$(".inputform")[0].reset();
	}
	
	function inRange(guess){
		if(guess < 0 || guess > 100){
			return false;
		} else if (isNaN(guess)) {
			return false;
		} else if ($.trim(guess) == ""){
			return false;
		} else {
			return true;
		}
	}
	

	function isCorrect(guess){
		return guess == actual;
	}



	function check(difference){
		if (difference > 50){
			return("freezing, brrr");
		} else if (difference > 30){
			return("cold");
		} else if (difference > 20){
			return("almost warm");
		} else if (difference > 5){
			return("warm");
		} else if (difference > 1) {
			return('hot');
		} else {
			return("hot hot hot");
		}
	}









});