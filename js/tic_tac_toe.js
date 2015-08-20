//  _____  _  ____    _____  ____  ____    _____  ____  _____
// /__ __\/ \/   _\  /__ __\/  _ \/   _\  /__ __\/  _ \/  __/
//   / \  | ||  /      / \  | / \||  /      / \  | / \||  \  
//   | |  | ||  \_     | |  | |-|||  \_     | |  | \_/||  /_ 
//   \_/  \_/\____/    \_/  \_/ \|\____/    \_/  \____/\____\
                                                          

$(document).ready(function() {

	// create 9 images instead of tiles for the board
	var createImage = function () {
		$("#1").css("background-image", "url(images/cat.png)");
		$("#2").css("background-image", "url(images/dog.png)");
		$("#3").css("background-image", "url(images/chicken.png)");
		$("#4").css("background-image", "url(images/dragon.png)");
		$("#5").css("background-image", "url(images/horse.png)");
		$("#6").css("background-image", "url(images/monkey.png)");
		$("#7").css("background-image", "url(images/mouse.png)");
		$("#8").css("background-image", "url(images/rabbit.png)");
		$("#9").css("background-image", "url(images/pig.png)");
	};

	createImage();

	var numOfClicks = 0;
	var numOfDraws = 0;
	var numOfOWins = 0;
	var numOfXWins = 0;

	// when the mouse hover the image, change the background color and make it shake
	$("td.tile").hover(function(){
    	$(this).css("background-color", "#99FF99");
    	if ($(this).html() !== "X" && $(this).html() !== "O") {
    		$(this).effect("shake", 5);
    	}

  	}, function () {
  		$(this).css("background-color", "");
  	});


	$("td.tile").on("click", function (event) {

		// if the user hasn't selected the opponent, alert the message and return
		if ($("#dropDownID option:selected").text() === "Choose an opponent") {
				alert("Please choose an apponent");
				return;
		}

		var $this = $(this);
		numOfClicks++;

		// when clicks on the image, the image should disappear
		$this.css("background-image", ""); 

		// when clicks on the image, replace it with "X"
		$this.html("X");  

		// if the user is playing with silly computer
		if ($("#dropDownID option:selected").text() === "Silly Computer"){

			// if the user already wins after this click, do not let the computer continue playing
			if (isHorizontalWin($this.parent().attr("id")) || isVerticalWin($this.attr("id")) || isDiagonalWin($this.attr("id"))) {
				alertMessage($this.attr("id"));
				return true;
			} 

			// if the user did not win after the click, let the computer play randomly
			getRandomMove();
			numOfClicks++;
		}

		// if 2 players are playing, every second click is an "O"
		else if ($("#dropDownID option:selected").text() === "2 Players") {
			if (numOfClicks % 2 === 0){ 
				$this.html("O");
			} 
		}

		if (isHorizontalWin($this.parent().attr("id")) || isVerticalWin($this.attr("id")) || isDiagonalWin($this.attr("id"))) {
				alertMessage($this.attr("id"));
				return true;
		} 

		// if there are more than 9 clicks, and no one wins, it is a draw
		if (numOfClicks >= 9){
			alert("a draw.");
			numOfDraws++;
			$("#numOfTies").html(numOfDraws);
			return true;
		}
	});


	var anyAvailableMoves = function () {
		// Go through all TDs and if any don't have X or O, return true
		var availableTiles = false;
		$("td.tile").each(function (index, element) {
			if ($(element).html() === ""){
				availableTiles = true;
			}
		});
		return availableTiles;
	};


	// let the computer put an "O" randomly in the board if it is an empty tile
	var getRandomMove = function () {
		var randomNum = Math.floor(Math.random() * 8) + 1;
		if ( anyAvailableMoves() ) {
			if ($("#"+randomNum).html() === "") {
				$("#"+randomNum).html("O");
				$("#"+randomNum).css("background-image", "");

				if (isHorizontalWin($("#"+randomNum).parent().attr("id")) || isVerticalWin($("#"+randomNum).attr("id")) || isDiagonalWin($("#"+randomNum).attr("id"))) {
					alertMessage($("#"+randomNum).attr("id"));
					return true; 
				}
			} 
			else {
				getRandomMove();
			}
		}
	};

	// alert message if either X or O wins
	var alertMessage = function(colID) {
		if ($("#" + colID).html() === "O") {
			alert ("O WON!");
			numOfOWins++;
			$("#numOfOWins").html(numOfOWins); // change the number of "O Wins: "

		} else {
			light_blue_touchpaper(); // call the function in fireworks.js to load fireworks
			alert ("X WON!");
			numOfXWins++;
			$("#numXWins").html(numOfXWins); // change the number of "X wins: "
		}
	};

	// function to check if three in a row
	var isHorizontalWin = function (rowID) {
		var $firstColumn = $("#" + rowID).children().first().html();
		var $secondColumn = $("#" + rowID).children().first().next().html();
		var $lastColumn = $("#" + rowID).children().last().html();

		if ($firstColumn === $secondColumn && $secondColumn === $lastColumn) {
			return true;
		} 
		return false;
	};

	// function to check if three in a column
	var isVerticalWin = function (colID) {
		 var $firstRow = "";
		 var $secondRow = "";
		 var $thirdRow = "";

		if ($("#" + colID).parent().attr("id") === "row1") {
			$firstRow = $("#" + colID).html();
			$secondRow = $("#" + (parseInt(colID)+3)).html();
			$thirdRow = $("#" + (parseInt(colID)+6)).html();

		} else if ($("#" + colID).parent().attr("id") === "row2"){
			$firstRow = $("#" + (parseInt(colID)-3)).html();
			$secondRow = $("#" + colID).html();
			$thirdRow = $("#" + (parseInt(colID)+3)).html();

		} else {
			$firstRow = $("#" + (parseInt(colID)-6)).html();
			$secondRow = $("#" + (parseInt(colID)-3)).html();
			$thirdRow = $("#" + colID).html();
		}

		if ($firstRow === $secondRow && $secondRow === $thirdRow) {
			return true;
		} 
		return false;
		
	};

	// function to check if three in diagonals 
	var isDiagonalWin = function (colID) {
		var $firstDiagonal = 0; // set default
		var $secondDiagonal = 1; // set default
		var $thirdDiagonal = 2; // set default


		if (colID === "1"){
			$firstDiagonal = $("#" + colID).html();
			$secondDiagonal = $("#" + (parseInt(colID)+4)).html();
			$thirdDiagonal = $("#" + (parseInt(colID)+8)).html();
		} 

		else if (colID === "3"){
			$firstDiagonal = $("#" + colID).html();
			$secondDiagonal = $("#" + (parseInt(colID)+2)).html();
			$thirdDiagonal = $("#" + (parseInt(colID)+4)).html();
		}

		// if user clicks middle cell, there are two diagonals to check
		else if (colID === "5"){
			$firstDiagonal = $("#" + (parseInt(colID)+2)).html();
			$secondDiagonal = $("#" + colID).html();
			$thirdDiagonal = $("#" + (parseInt(colID)-2)).html();
		}
		if (colID === "5"){
			$firstDiagonal = $("#" + (parseInt(colID)+4)).html();
			$secondDiagonal = $("#" + colID).html();
			$thirdDiagonal = $("#" + (parseInt(colID)-4)).html();
		}

		else if (colID === "7"){
			$firstDiagonal = $("#" + colID).html();
			$secondDiagonal = $("#" + (parseInt(colID)-2)).html();
			$thirdDiagonal = $("#" + (parseInt(colID)-4)).html();
		}

		else if (colID === "9"){
			$firstDiagonal = $("#" + colID).html();
			$secondDiagonal = $("#" + (parseInt(colID)-4)).html();
			$thirdDiagonal = $("#" + (parseInt(colID)-8)).html();
		}

		if ($firstDiagonal === $secondDiagonal && $secondDiagonal === $thirdDiagonal) {
			return true;
		} 
		return false;
		
	};


	// clear the board
	$("#clearBoard").on("click", function () {
		$("td.tile").html("");
		numOfClicks = 0;
		createImage();
	});

	// reset everything to default
	var reset = function () {
		location.reload(); // refresh the page
	};
	
	$("#reset").on("click", function () {
		reset();
	});
});




