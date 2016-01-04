// loop through empty boxes to determine if there are any valid moves available
// make sure that you don't use current functions because they will flip pieces

counter = 0;
var $boxes = $('.box');
var empty = 0;
var white = -1;
var black = 1;
var size = 8;
var $scoreboardOne = $('.scoreboardOne');
var $scoreboardTwo = $('.scoreboardTwo')
var oneCounter = 0;
var minusCounter = 0;
var $playerTurn = $('#playerTurn');
var playerBlack = prompt("What's your name, player one?") || "Black Player";
var playerWhite = prompt("What's your name, player two?") || "White Player";

// playerBlack;
// playerWhite;

// var arr = [
//   ["0","0","0","0","0","0","0","0"],
//   ["0","0","0","0","0","0","0","0"],
//   ["0","0","0","0","0","0","0","0"],
//   ["0","0","0",-1,1,"0","0","0"],
//   ["0","0","0",1,-1,"0","0","0",],
//   ["0","0","0","0","0","0","0","0"],
//   ["0","0","0","0","0","0","0","0"],
//   ["0","0","0","0","0","0","0","0"]
// ]

function isEmpty($clickedBox) {
  if ($clickedBox.hasClass("black") || $clickedBox.hasClass("white")) {
    return false;
  }
  else {
    return true;
  }
}

function getElements($start, direction, color){
  var row = $start.data('row');
  var column = $start.data('column');
  var id;
  var elements =[];
//console.log('row:', row, 'column:', column);
  switch (direction){
    case 'up':
      row--;
      id = row * size + column;
      while (row>=0 && !(isEmpty($('#'+id)))){
        elements.push($('#'+id));
        if ($('#'+id).hasClass(color)) {
          break; //breaks while loop
        }
        row--;
        id = row * size + column;
      }
      break; //break case
    case 'up-right':
      row--; column++;
      id = row * size + column;
      while (row>=0 && column<8 && !(isEmpty($('#'+id)))){
        elements.push($('#'+id));
        if ($('#'+id).hasClass(color)) {
          break;
        }
        row --; column++;
        id = row * size + column;
      }
      break;
    case 'right':
      column++;
      id = row * size + column;
      while (column<8 && !(isEmpty($('#'+id)))){
        elements.push($('#'+id));
        if ($('#'+id).hasClass(color)) {
          break;
        }
        column++;
        id = row * size + column;
      }
      break;
    case 'down-right':
      row++; column++;
      id = row * size + column;
      while (row<8 && column<8  && !(isEmpty($('#'+id)))){
        elements.push($('#'+id));
        if ($('#'+id).hasClass(color)) {
          break;
        }
        row++; column++;
        id = row * size + column;
      }
      break;
    case 'down':
      row++;
      id = row * size + column;
      while (row<8 && !(isEmpty($('#'+id)))){
        elements.push($('#'+id));
        if ($('#'+id).hasClass(color)) {
          break;
        }
        row++;
        id = row * size + column;
      }
      break;
    case 'down-left':
      row++; column--;
      id = row * size + column;
      while (row<8 && column>=0 && !(isEmpty($('#'+id)))){
        elements.push($('#'+id));
        if ($('#'+id).hasClass(color)) {
          break;
        }
        row++; column--;
        id = row * size + column;
      }
      break;
    case 'left':
      column--;
      id = row * size + column;
      while (column>=0 && !(isEmpty($('#'+id)))){
        elements.push($('#'+id));
        if ($('#'+id).hasClass(color)) {
          break;
        }
        column--;
        id = row * size + column;
      }
      break;
    case 'up-left':
      row--; column--;
      id = row * size + column;
      while (row>=0 && column>=0 && !(isEmpty($('#'+id)))){
        elements.push($('#'+id));
        if ($('#'+id).hasClass(color)) {
          break;
        }
        row--; column--;
        id = row * size + column;
      }
    default:
      break;//if a case doesn't match any of the cases, then break.
  }
  //console.log('elements:', elements);
  return elements;
}

// Check line and flip pieces, used for actual game
function checkLine(elements, color){
  if (elements.length <2){ //either there is an empty space or the immediate next is the same color
    return 0;
  } else if (elements[elements.length-1].hasClass(color)){
      elements.forEach(function($el){
        $el.attr('class', 'box').addClass(color); // this is where the flip occurs
      })
      return 1;
  } else {
    return 0;
  }
}

//Same as checkLine() only to see if pieces CAN be flipped, returns true/false.
//Used for determining if game is over
function inspectLine(elements, color){
  if (elements.length<2){
    return 0;
  } else if (elements[elements.length-1].hasClass(color)){
    return 1;
  } else {
    return 0;
  }
}


function walk($start) { //ask bensen about this callback later
  if (counter%2 === 0) { //player black's turn
    $start.addClass("black");
  }
  else {
    $start.addClass("white"); //player white's turn
  }
  var color = $start.hasClass('white') ? 'white' : 'black'; //shortened if/else statement
  var directions = ['up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left', 'up-left']

  //var moveResults = [];
  var validMove = 0;
  for (var i = 0; i < directions.length; i++) {
    //loop through the directions
    var elements = getElements($start, directions[i], color);
    validMove += checkLine(elements, color);
  }

  return validMove;
}

$boxes.click(function() { //click function
  var $that = $(this);

  if (isEmpty($(this))) {
    var validMove = walk($(this)); //walk() returns true/false
    //console.log(this);

    if (validMove > 0){ //reference walk function for validMove variable
      counter++;
      printScore();
      whoseTurn();
    } else {
      $that.attr('class', 'box') // attr(which attr you'd like to change, what you would like to change it to)
      console.log('invalid move'); // change this to an alert
    }
  }
  checkWin();
})

function printScore() { //updates scoreboard on bottom of page with current scores
  $scoreboardOne.text(playerBlack + "'s Score: " + $('.black').length);
  $scoreboardTwo.text(playerWhite + "'s Score: " + $('.white').length);
};
printScore();

// live updates whose turn it is & changes font color
function whoseTurn() {
  if (counter%2 === 0) {
    $playerTurn.text('Place a black piece, ' + playerBlack + '!');
    $playerTurn.removeClass("textWhite").removeClass("textRed").addClass("textBlack");

  } else if (counter%2 === 1) {
    $playerTurn.text('Place a white piece, ' + playerWhite + '!');
    $playerTurn.removeClass("textBlack").removeClass("textRed").addClass("textWhite");

  }
};
whoseTurn();

function clearBoard() { //resets the entire game board
  $(".box").removeClass('white').removeClass('black');
  $("#27,#36").addClass('black');
  $("#28,#35").addClass('white');
  printScore();
  whoseTurn();
}

function returnPrompt() { //prompts at the beginning of the game whose turn it is
  playerBlack = prompt("What's your name, player one?") || "Black Player";
  playerWhite = prompt("What's your name, player two?") || "White Player";
  whoseTurn();
  printScore();
}

function checkWin(){ //if there are no valid moves left, innerHTML for player turns
  //changes to game over text
  // console.log('checkwin firing')
  var hasValidMove = false; //default to there being no valid moves
  var color = 'black';
  if (counter%2 !== 0) {
    color = "white";
  }

  //Loop through the board, check each empty square to see if there is a valid move
  for (i=0; i<=63; i++){
    if (isEmpty($('#' + i))){

      var directions = ['up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left', 'up-left']
      var validMove = 0;
      for (var j = 0; j < directions.length; j++) {
        //loop through the directions
        var elements = getElements($('#'+i), directions[j], color);
        validMove += inspectLine(elements, color);
        //console.log("===========",validMove)
      }
      if (validMove>0){
        //if we detect a valid move, break loop, game can continue
        hasValidMove = true;
        console.log('hasValidMove, id: ', i);
        break;
        return;//stops function
      }
    }
  }

  if(!hasValidMove) {
    //Once we finish looping the board, if validMove is still false, game end
    document.getElementById('playerTurn').innerHTML = 'GAME OVER. See score below!';
    $playerTurn.addClass('textRed');
  }
};
