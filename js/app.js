
$(document).ready(function(){
	
	//question - do this here or in the game function?
	
	//variables to track
	//secretNumber
	//guess
	//lastGuess
	//numberOfGuesses

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

	//on new game button click start new game
  	$("a.new").click(newGameButton());


  	function newGame(){
  		//need global scope outside of functoin
  		//use var or not?
  		//setup new game when button or page load
  	}

  	function isValidEntry(guessedNumber){
  		//numeric bw 1 and 100
  		//bool
  	}

  	function generateSecretNumber()
  	{
  		//random bw 1-100 return number
  		//return global scope variable
  	}

  	function isCorrectGuess(guessedNumber){
  		//compare to secret return bool
  	}

  	function giveFeedbackBasedOnGuess(guessedNumber){
  		if (isCorrectGuess) {
  			//display correct
  		}
  		else {	
  			var difference = findDifferenceFromSecret(guessedNumber);
  			console.log("difference: " + difference)
  			alert(generateDifferenceRangeMessage(difference));
  			//update guess list
  		}	
  	}

  	function findDifferenceFromSecret(guessedNumber) {
  		return Math.abs(secret - guessedNumber);
  	}

  	function generateDifferenceRangeMessage(differenceValue){
  		 //>= 50
  		 //35 and 50
  		 //20 and 35
  		 //10 and 20
  		 //5 and 10
  		 //1 and 5

  		 $("#feedback").text(feedbackString);
  	}

  	function updateGuessList(numberToAddToGuessList)
  	{
  		numberToAddToGuessList.appendTo("#guessList");
  	}

  	function newGameButton(){
  		areYouSure = confirm("Are you sure you want to start a new game?");
  		if (areYouSure) {
  			newGame();	
  		}
  	}
  	


});


