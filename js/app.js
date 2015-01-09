
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
  	// $("a.newGame").click( newGameButton());

  	//had to do this way otherwise it was firing on page load
  	$("a.newGame").click( function()
  		{
  			newGameButton();
  		});

  	$("#guessButton").click( function() {
  		processGuess();
  	});
	
	$(document).keypress(function(e){
		if (e.which == 13){
			
			e.preventDefault(); //added so the html required model does not popup on enter after value clears.  It does not pop up if click the button
			
			console.log("enter hit");
			$("#guessButton").click();
		}
	});

  	//add enter button logic

  	function newGame(){
  		//need global scope outside of functoin
  		//use var or not?
  		//setup new game when button or page load
  		console.log("newGame called");
  		secretNumber = generateSecretNumber();
  		guessCount = 0;
      guessDifferenceArray = [];
  		gameWon = false; //create this here, do i need this at all?
  		console.log(secretNumber);
  	}
  	
  	function processGuess(){
  		//better place for this?
  		if (gameWon) {
  			$('#feedback').text("You already are a champ, don't get greedy now but use the new game button above!");
  			return;
  		}		

  		var guessedNumber = getGuess();
		  console.log("guess " + guessedNumber);
  		
  		if (isValidEntry(guessedNumber)) {
  			updateGuessCount();
        giveFeedbackBasedOnGuess(guessedNumber);
  			updateGuessList(guessedNumber);
  		}
  		else {
  			badEntryFeedback();
  		}
		
		clearGuess();
  	}

  	function clearGuess(){
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
  			$("#feedback").text("Who wants to be a millonaire! You win, play again!");
  			gameWon = true;
  		}
  		else {	
  			var difference = findDifferenceFromSecret(guessedNumber);
  			console.log("difference: " + difference)
  			storeDifferenceFromSecret(difference); //should be moved out of this method.
        generateDifferenceRangeFeedbackMessage(difference);
        console.log("diff array: " + guessDifferenceArray)

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

    function storeDifferenceFromSecret(differenceAbsValue) {
        guessDifferenceArray.push(differenceAbsValue);
    }

  	function generateDifferenceRangeFeedbackMessage(differenceValue){

       var hotterText = "You are getting warmer, get the sunscreen...";
       var colderText = "Put on a coat, you are getting colder...";
       var sameText = "You must like it here, you are still just as far away...";

       if (differenceValue >= 50) {feedbackString = "You are artic Cold";}
  		 else if (differenceValue >= 30) {feedbackString = "You are Alaska Cold";}
  		 else if (differenceValue >= 15) {feedbackString = "Getting Chicago Cold";}
  		 else if (differenceValue >= 10) {feedbackString = "You are Florida Warm";}
  		 else if (differenceValue >= 3) {feedbackString = "Hot Mexico Hot";}
  		 else if (differenceValue >= 1) {feedbackString = "So close, about to melt.";}
  		
       //this can be moved out to a different method for adding the hot or cold logic. 
       if (guessCount == 1)  //don't do hotter or colder if first guess
       {
          feedbackString = feedbackString;
       }
       else if (differenceValue > guessDifferenceArray[guessDifferenceArray.length - 2]){ //could change to length -1 if change when the guessCount set
          feedbackString = colderText + feedbackString;
       }
       else if (differenceValue < guessDifferenceArray[guessDifferenceArray.length - 2]){
          feedbackString = hotterText + feedbackString;
       }
       else if (differenceValue == guessDifferenceArray[guessDifferenceArray.length - 2]){

          feedbackString = sameText + feedbackString;   //will happen if guess same thing twice or number same difference away.
       }


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


