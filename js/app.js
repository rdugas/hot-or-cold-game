
$(document).ready(function(){
	//do i need so many functions? 

	//question - do this here or in the game function?
	//best way to see what is getting called - console logs or other way in dev tools
	//best way to reload/refresh page
	//what makes the URL track the entry - is that the html?
	//when best to convert to numeric
	//button type needed to be button not submit for page load to not happen


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
  		console.log(secretNumber);
  		window.location.reload(true);
  	}

  	function processGuess(){
  		guessedNumber = getGuess();
  		console.log("guess " + guessedNumber);
  		$("#userGuess").val(""); //remove gues from guess box
  	}

  	function getGuess(){
  		console.log("getGuess Called");
  		var entry = +$("#userGuess").val();  //change to numeric here
  		
  		if (isValidEntry(entry)) {
  			console.log("type of entry:" + typeof entry);
  			return entry;	//not sure if have to convert
  		}
  		else
  		{
  			badEntryFeedback();
  		}
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
  		
  		console.log("newGameButtonCalled");
  		areYouSure = confirm("Are you sure you want to start a new game?");
  		if (areYouSure) {
  			newGame();	
  		}
  	}
  	
});


