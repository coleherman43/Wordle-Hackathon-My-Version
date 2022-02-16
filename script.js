//CURRENT: 
//PRIMARY: WIN AND LOSE SCENARIOS DONT WORK
// SECONDARY: IF STATEMENTS UNDER CHECKLETTER ARE CAUSING ISSUES WITH COLOR CODING
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var wordBank = ['MOUSE', 'COLOR', 'DWARF', 'WATCH', 'BEADS', 'BOARD', 'KNIFE', 'READY', 'TEAMS', 'FIRED', 'HEXED', 'TRAIN', 'CHORD', 'TOUCH', 'PLANE', 'SUPER', 'SWORD', 'BREAD', 'WATER', 'FALSE','WHITE', 'BROWN', 'BLACK', 'START','PIECE', ];
var correctLetters = [];
var incorrectLetters = [];
var closeLetters = [];
p5.disableFriendlyErrors = true;
let words = Array(5).fill().map(() => [])
var word1 = [];
var word2 = [];
var word3 = [];
var word4 = [];
var word5 = [];
var answer = "";
var currentWord = 0;

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
  if(words[currentWord].length < 5){
    addLetter(letter, currentWord);
  }
}

function addLetter(letter, wordNum) {
  //add an input letter to the word section
  console.log("Letter: " + letter);
  console.log("Word: " + wordNum);
  console.log("Arr: " + words[wordNum]);

  words[wordNum].push(letter);
  let button = "button" + ((wordNum)*5 + words[wordNum].length).toString();
  console.log("button text: " + button);
  document.getElementById(button).innerHTML=letter;
  
  let x = document.createElement("guessedLetter");
  x.innerHTML = letter;
  document.getElementById("guessed").appendChild(x);

}

function handleGuess() {
  //the rest of the boxes should be hidden. This unhides the next box, and determines which letters were right / close / wrong

  let currentRow = 'row' + (currentWord+1);
  let nextRow = 'row' + (currentWord+2);
  console.log("CURRENT ROW: " + currentRow);
  console.log("NEXT ROW: " + nextRow);
  
  if(currentWord == 4){
  checkWord(words[currentWord], currentRow);
  gameOver(false);
}

  
  console.log(currentWord);
  console.log("words[currentWord]: " + words[currentWord]);
  checkWord(words[currentWord], currentRow);
  document.getElementById(nextRow).hidden=false;
  
  currentWord++;
}



function checkWord(guess, row){
  console.log("GUESS: " + guess);
  console.log("ROW: " + row);
  console.log("answer: " + answer);
  if(guess.join('') == answer){
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
  let id = keyID(letter);
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

function keyID(letter){
  return ("key" + letter).toString();
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

