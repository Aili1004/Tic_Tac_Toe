
// var anyAvailableMoves;

$(document).ready(function() {

	var imageWidth = "100px";
	var imageHeight = "100px";

	var createImage = function () {
		$("#1").css("background-image", "url(images/cat.jpg)");
		$("#2").css("background-image", "url(images/dog.png)");
		$("#3").css("background-image", "url(images/chicken.jpg)");
		$("#4").css("background-image", "url(images/dragon.jpg)");
		$("#5").css("background-image", "url(images/horse.jpg)");
		$("#6").css("background-image", "url(images/monkey.jpg)");
		$("#7").css("background-image", "url(images/mouse.jpg)");
		$("#8").css("background-image", "url(images/rabbit.jpg)");
		$("#9").css("background-image", "url(images/pig.jpg)");
	};

	createImage();

	var numOfClicks = 0;
	var numOfDraws = 0;
	var numOfOWins = 0;
	var numOfXWins = 0;


	$("td.tile").on("click", function (event) {

		if ($("#dropDownID option:selected").text() === "Choose an opponent") {
				alert("Please choose an apponent");
				return;
		}

		var $this = $(this);
		$this.css("background-image", "");

		numOfClicks++;
		$this.html("X");

		if ($("#dropDownID option:selected").text() === "Silly Computer"){
			getRandomMove();
			numOfClicks++;
		}

		else if ($("#dropDownID option:selected").text() === "2 Players") {
			if (numOfClicks % 2 === 0){ 
				$this.html("O");
			} 
		}

		else if ($("#dropDownID option:selected").text() === "High Level") {
			getHighLevelComputerMove();
		}

		if (isHorizontalWin($this.parent().attr("id")) || isVerticalWin($this.attr("id")) || isDiagonalWin($this.attr("id"))) {
				alertMessage($this.attr("id"));
				return true;
		} 

		else if (numOfClicks >= 9){
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


	var getHighLevelComputerMove = function () {

		// var $computerMove = "";

		// if ($("#5").html() === ""){
		// 	$computerMove = $("#5");
		// }

		// else if ($("#1").html() === "X" && $("#9").html() === "") {
		// 	$computerMove = $("#9");
		// }

		// else if ($("#3").html() === "X" && $("#7").html() === "") {
		// 	$computerMove = $("#7");
		// }

		// else if ($("#7").html() === "X" && $("#3").html() === "") {
		// 	$computerMove = $("#3");
		// }

		// else if ($("#9").html() === "X" && $("#1").html() === "") {
		// 	$computerMove = $("#1");
		// }

		// else if ($("#2").html() === "") {
		// 	$computerMove = $("#2");
		// }
		// else if ($("#4").html() === "") {
		// 	$computerMove = $("#4");
		// }
		// else if ($("#6").html() === "") {
		// 	$computerMove = $("#6");
		// }
		// else if ($("#8").html() === "") {
		// 	$computerMove = $("#8");
		// }

		// $computerMove.html("O");
		// isTwoInARow("X");
	};


	var isTwoInARow = function (arg) {
		var numInARow = 1;
		var row = [];


		for (var i = 0; i < $("#row1 .tile").length; i++){

			if ($($("#row1 .tile")[i+1]).html() !== "") {
				numInARow++;
				row.push($($("#row1 .tile")[i+1]).html());
			}
		}
	};


	var alertMessage = function(colID) {
		if ($("#" + colID).html() === "O") {
			alert ("O WON!");
			numOfOWins++;
			$("#numOfOWins").html(numOfOWins);

		} else {
			alert ("X WON!");
			numOfXWins++;
			$("#numXWins").html(numOfXWins);
		}
	};


	var isHorizontalWin = function (rowID) {
		var $firstColumn = $("#" + rowID).children().first().html();
		var $secondColumn = $("#" + rowID).children().first().next().html();
		var $lastColumn = $("#" + rowID).children().last().html();

		if ($firstColumn === $secondColumn && $secondColumn === $lastColumn) {
			return true;
		} 
		return false;
	};

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

		// if user clicks middle celll, there are two diagnals to check
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
		$("td.tile").html("");
		numOfClicks = 0;
		numOfDraws = 0;
		numOfOWins = 0;
		numOfXWins = 0;
		$("#dropDownID").val('default');
		$("#numXWins").html(numOfXWins);
		$("#numOfOWins").html(numOfOWins);
		$("#numOfTies").html(numOfDraws);
		createImage();
	};
	
	$("#reset").on("click", function () {
		reset();
	});
});









