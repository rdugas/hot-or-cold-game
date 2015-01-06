
$(document).ready(function(){
	//do i need so many functions? 

	//question - do this here or in the game function?
	//best way to see what is getting called - console logs or other way in dev tools
	//best way to reload/refresh page
	//what makes the URL track the entry - is that the html?
	//when best to convert to numeric
	//button type needed to be button not submit for page load to not happen
	//can params of diff functions have same name as another global variable -ie: guessednumber

	//future
	//if win, dont let them guess again

	newGame();
	console.log("page load");

	//variables to track
	//secretNumber
	//guess
	//lastGuess
	//numberOfGuesses

	//newGame();

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});
  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

	//on new game button click start new game
	//this way did not work - fired on page load
  	//$("a.newGame").click( newGameButton());

  	//had to do this way otherwise it was firing on page load
  	$("a.newGame").click( function()
  		{
  			newGameButton();
  		});

  	$("#guessButton").click( function() {processGuess();});


  	function newGame(){
  		//need global scope outside of functoin
  		//use var or not?
  		//setup new game when button or page load
  		console.log("newGame called");
  		secretNumber = generateSecretNumber();
  		guessCount = 0;
  		console.log(secretNumber);
  	}
  	
  	function processGuess(){
  		var guessedNumber = getGuess();
		console.log("guess " + guessedNumber);
  		
  		if (isValidEntry(guessedNumber)) {
  			giveFeedbackBasedOnGuess(guessedNumber);
  			updateGuessList(guessedNumber);
  			updateGuessCount();
  		}
  		else {
  			badEntryFeedback();
  		}
  		
  		$("#userGuess").val(""); //remove guess from guess box
  	}

  	function getGuess(){
  		console.log("getGuess Called");
  		return +$("#userGuess").val();  //change to numeric here
  	}

  	function badEntryFeedback(){
  		console.log("badentry called");
  		$("#feedback").text("Someone can't follow instructions - enter a number between 1 and 100 bro!");
  	}

  	function isValidEntry(guessedNumber){
  		console.log("checking if valid- " + guessedNumber);
  		console.log(typeof guessedNumber);
  		
  		return (!isNaN(guessedNumber) &&
  			(guessedNumber % 1) == 0 &&
  			 guessedNumber >= 1 &&	
  			 guessedNumber <=100);
  	}

  	function generateSecretNumber()
  	{
  		//random bw 1-100 return number
  		//added 1 so i could get 1 and 100 using floor
  		return Math.floor(Math.random() * 100 + 1);
  	}

  
  	function giveFeedbackBasedOnGuess(guessedNumber){
  		console.log("feedback called");
  		
  		if (isCorrectGuess(guessedNumber)) {
  			$("#feedback").text("Who wants to be a millonaire! You win, play again!")
  		}
  		else {	
  			var difference = findDifferenceFromSecret(guessedNumber);
  			console.log("difference: " + difference)
  			generateDifferenceRangeFeedbackMessage(difference);
  		}	
  	}

  	function isCorrectGuess(guessedNumber){
  		console.log("is correct: " + (guessedNumber == secretNumber));
  		console.log(secretNumber);
  		console.log(guessedNumber);
  		return (guessedNumber == secretNumber);
  	}

  	function findDifferenceFromSecret(guessedNumber) {
  		return Math.abs(secretNumber - guessedNumber);
  	}

  	function generateDifferenceRangeFeedbackMessage(differenceValue){

  		 if (differenceValue >= 50) {feedbackString = "You are artic Cold";}
  		 else if (differenceValue >= 30) {feedbackString = "You are Alaska Cold";}
  		 else if (differenceValue >= 15) {feedbackString = "Chicago Cold";}
  		 else if (differenceValue >= 10) {feedbackString = "Florida Warm";}
  		 else if (differenceValue >= 5) {feedbackString = "Mexico Hot";}
  		 else if (differenceValue >= 1) {feedbackString = "So close, don't melt.";}
  		 
  		 $("#feedback").text(feedbackString);
  	}

  	function updateGuessList(numberToAddToGuessList)
  	{
  		console.log(numberToAddToGuessList);
  		$('<li>'+numberToAddToGuessList+'</li>').appendTo("#guessList");
  	}

  	function updateGuessCount()
  	{
  		guessCount += 1;
  		$("#count").text(guessCount);
  	}

  	function newGameButton(){
  		
  		console.log("newGameButtonCalled");
  		areYouSure = confirm("Are you sure you want to start a new game?");
  		if (areYouSure) {
  			window.location.reload(true);	
  		}
  	}
  	
});


