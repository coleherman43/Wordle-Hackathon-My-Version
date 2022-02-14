//Currently shortening addLetter. Made array of word1, 2, etc. and changing access of each to pull from words

var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var wordBank = ['MOUSE', 'COLOR', 'DWARF', 'WATCH', 'BEADS', 'BOARD', 'KNIFE', 'READY', 'TEAMS', 'FIRED', 'HEXED', 'TRAIN', 'CHORD', 'TOUCH', 'PLANE', 'SUPER', 'SWORD', 'BREAD', 'WATER', 'FALSE','WHITE', 'BROWN', 'BLACK', 'START','PIECE', ];
var correctLetters = [];
var incorrectLetters = [];
var closeLetters = [];
p5.disableFriendlyErrors = true;

// REVIEW: this is crying out to be an array, e.g.
//
//  let words = [[],[],[],[],[]].
//
// Or better yet:
//
//  let words Array(5).fill().map(() => [])
//
// Try making that change and then adjusting the code to deal with it
// may make a number of places simpler. Or at least will make it
// possible to simplify.

let words = Array(5).fill().map(() => [])

var word1 = [];
var word2 = [];
var word3 = [];
var word4 = [];
var word5 = [];
var answer = "";
var currentWord = 1;


// REVIEW: Since this is completely regular why not just write a
// function like this?
//
//   function keyID(letter) {
//     return "key" + letter;
//   }
//
// Thought, that said, even better would be to not rely on looking up
// DOM elements by id. If you wanted to use a dictionary in a good
// way, you might make a dictionary mapping letters to the DOM objects
// so you could just do:
//
//   letterButtons[letter].className='keyboard correct';
//
// or whatever. You'd need to either build that dictionary once the
// page is loaded or by creating the buttons dynamically on page load
// rather than writing them in your HTML.

var ID_AND_LETTERS = {
  'A' : 'keyA',
  'B' : 'keyB',
  'C' : 'keyC',
  'D' : 'keyD',
  'E' : 'keyE',
  'F' : 'keyF',
  'G' : 'keyG',
  'H' : 'keyH',
  'I' : 'keyI',
  'J' : 'keyJ',
  'K' : 'keyK',
  'L' : 'keyL',
  'M' : 'keyM',
  'N' : 'keyN',
  'O' : 'keyO',
  'P' : 'keyP',
  'Q' : 'keyQ',
  'R' : 'keyR',
  'S' : 'keyS',
  'T' : 'keyT',
  'U' : 'keyU',
  'V' : 'keyV',
  'W' : 'keyW',
  'X' : 'keyX',
  'Y' : 'keyY',
  'Z' : 'keyZ',
}


function setup() {
  createCanvas(0, 0);
  unhideElement('startButton');
  hideElement('restartGame');
  hideElement('drawGrid');
}

function realSetup() {
  //hide start button (and instructions if we make them), unhide keyboard and grid of guesses

  hideElement('startButton');
  unhideElement('restartGame');
  unhideElement('drawGrid');
  unhideElement('gameStuff');
  unhideElement('row1');
  
  answer = randomWord(wordBank);
  console.log("answer: " + answer);
  
  createCanvas(600, 600);

  createKeyboard();
  noLoop();
}

function hideElement(id){
  document.getElementById(id).hidden=true;
}

function unhideElement(id){
  document.getElementById(id).hidden=false;
}

function createKeyboard() {
  //<button onclick="guess(this.id)" id="a" class="notGuessed">a</button>
  //keyboard setup

  for (let i = 0; i < alphabet.length; i++) {
    let x = document.createElement("button");
    x.id = 'key' + alphabet[i];
    x.innerHTML = alphabet[i];
    x.class = keyboard;
    x.onclick = clickLetter;
    document.getElementById("keyboard").appendChild(x);
  }
}

function deleteLetter(id) {
  console.log('buttonDeleted');
  document.getElementById(id).innerHTML = "_";
  word1.splice(0,1);
  word2.splice(0,1);
  word3.splice(0,1);
  word4.splice(0,1);
  word5.splice(0,1);

}

function clickLetter(e) {
  //called through HTML when a letter is clicked  
  let letter = e.target.innerHTML;
  console.log(e.target.innerHTML);
  addLetter(letter, currentWord);
}

function addLetter(letter, wordNum) {
  //add an input letter to the word section
  console.log("Letter: " + letter);
  console.log("Word: " + wordNum);
  console.log("Arr: " + words[wordNum]);

  words[wordNum].push(letter);
  let button = "button" + ((wordNum-1)*5 + words[wordNum].length).toString();
  console.log("button text: " + button);
  document.getElementById(button).innerHTML=letter;
  
  let x = document.createElement("guessedLetter");
  x.innerHTML = letter;
  document.getElementById("guessed").appendChild(x);

}

function handleGuess() {
  //the rest of the boxes should be hidden. This unhides the next box, and determines which letters were right / close / wrong
  if (currentWord == 1) {
    currentWord++;
    checkWord(word1, 'row1');
    unhideElement('row2');
  } else if (currentWord == 2) {
    currentWord++;
    checkWord(word2, 'row2');
    document.getElementById('row3').hidden=false;
  } else if (currentWord == 3) {
    currentWord++;
    checkWord(word3, 'row3');
    document.getElementById('row4').hidden=false;
  } else if (currentWord == 4) {
    currentWord++;
    checkWord(word4, 'row4')
    document.getElementById('row5').hidden=false;
  } else if (currentWord == 5) {
    currentWord++;
    checkWord(word5, 'row5');
    gameOver(false);
  }
}

function checkWord(guess, row){
  console.log("GUESS: " + guess.join(''));
  console.log("ROW: " + row);
  console.log("answer: " + answer);
  if(guess.join('') == answer){
    console.log("GAME OVER ------------------------")
    gameOver(true);
    
  }
  
  console.log("answer: " + answer);
  console.log("guess: " + guess);
  for(let i = 0; i < guess.length; i++){
    checkLetter(guess, guess[i], row, i);
  }
  
}

function checkLetter(guess, letter, row, position){
  //for a letter that's passed in, add it to an array (correct letters, wrong, etc.) and then pass it to updateLetter
  
  
  if(answer.indexOf(letter) == -1 && incorrectLetters.indexOf(letter) == -1){
    incorrectLetters.push(letter);
    updateLetter(letter, 'incorrect', row, position);
    
  }else if(answer.indexOf(letter) == guess.indexOf(letter) && correctLetters.indexOf(letter) == -1){
    correctLetters.push(letter);
    updateLetter(letter, 'correct', row, position);
  }else if(closeLetters.indexOf(letter) == -1){
    closeLetters.push(letter);
    updateLetter(letter, 'close', row, position);
  }
  console.log("correct letters arr: " + correctLetters);
  console.log("incorrect letters arr: " + incorrectLetters);
  console.log("close letters arr: " + closeLetters);
}

function updateLetter(letter, category, row, position){
  //take a letter and which type it is (right, wrong, close) and give it a color
  //to get the id of the element we're using a dictionary, which has a key (the letter) and a value (the id), just makes it much easier than typing 27 if statements
  let id = ID_AND_LETTERS[letter].toString();
  console.log("ID: " + id);
  
  if(category == 'correct'){
    document.getElementById(id).className='keyboard correct';

  }
  if(category == 'incorrect'){
    document.getElementById(id).className='keyboard incorrect';
  }
  if(category == 'close'){
    document.getElementById(id).className='keyboard close';
  }
}


function randomWord(wordBank) {
  // Calls random word from the word game for the user to guess
  return wordBank[Math.floor(Math.random() * wordBank.length)];
}


function restart() {
window.location = ""; // reloads tab :))
}

function gameOver(win) {
  //display text for whether you guessed the word or not, have a restart button to call restart function

  hideElement('gameStuff');
  if(win){
    screenMessage('YOU WIN');
  }else{
    screenMessage('YOU LOSE');
  }
}

function screenMessage(message){
  background(0);
  textSize(60);
  textAlign(CENTER);
  fill(1000, 0, 0);
  text(message, width / 2, height / 2);
  noLoop();
}

