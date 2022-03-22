//CURRENT: Created grid dynamically. Fixed color. Now trying to fix win screen (changes have been trying to fix this and overall change usage from id to element children of grid)
//PRIMARY: 
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var wordBank = ['MOUSE', 'COLOR', 'DWARF', 'WATCH', 'BEADS', 'BOARD', 'KNIFE', 'READY', 'TEAMS', 'FIRED', 'HEXED', 'TRAIN', 'CHORD', 'TOUCH', 'PLANE', 'SUPER', 'SWORD', 'BREAD', 'WATER', 'FALSE','WHITE', 'BROWN', 'BLACK', 'START','PIECE', 'PROXY'];
var correctLetters = [];
var incorrectLetters = [];
var closeLetters = [];
p5.disableFriendlyErrors = true;
var words = Array(5).fill().map(() => []);
var answer = "";
var currentWord = 0;

function setup() {
  createCanvas(0, 0);
  unhideElement('startButton');
  hideElement('restartGame');
}

function realSetup() {
  //hide start button (and instructions if we make them), unhide keyboard and grid of guesses
  hideElement('startButton');
  unhideElement('restartGame');
  answer = randomWord(wordBank);
  console.log("answer: " + answer);
  createKeyboard();
  createGrid();
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
  let deleteButton = document.createElement("button");
  deleteButton.id = 'deleteButton';
  deleteButton.innerHTML = 'DELETE';
  deleteButton.class = keyboard;
  deleteButton.onclick = deleteLetter;
  document.getElementById("keyboard").appendChild(deleteButton);
}

function createGrid(){
  for(let i = 0; i < 5; i++){ //loops through rows
    let x = document.createElement("div");
    //x.id = "row" + i;
    document.getElementById("grid").appendChild(x);
    for(let a = 0; a < 5; a++){ //loops through boxes
      let z = document.createElement("button");
      z.id = "button" + (i*5 + a);
      z.innerHTML = "_";
      x.appendChild(z);
    }
  }
}

function deleteLetter() {
  let curr = getButton(null, null);
  curr.innerHTML="_";
  words[currentWord].pop();
}

function clickLetter(e) {
  //called through HTML when a letter is clicked  
  let letter = e.target.innerHTML;
  console.log(e.target.innerHTML);
  if(words[currentWord].length < 5){
    addLetter(letter, currentWord);
  }
}

function getButton(wordNum, pos){
  //returns the button at the most recent position if both are null, otherwise returns button at specified position
  let grid = document.getElementById("grid");
  console.log("//////// getButton ///////");
  console.log("WORDNUM: " + wordNum);
  console.log("POSITION: " + (pos));
  if(wordNum == null && pos == null){
    return grid.children[currentWord].children[words[currentWord].length-1];
  }else{
    return grid.children[wordNum].children[pos];
  }
  
}

// function getKeyboardKey(key){
//   let keyboard = document.getElementById("keyboard");
  
//   keyboard.children[]
// }

function addLetter(letter, wordNum) {
  //add an input letter to the word section
  console.log("Letter: " + letter);
  console.log("Word: " + wordNum);
  console.log("Arr: " + words[wordNum]);

  words[wordNum].push(letter);
  let pos = words[wordNum].length-1;
  let button = getButton(wordNum, pos);
  button.innerHTML=letter;
}

function handleGuess() {
  //the rest of the boxes should be hidden. This unhides the next box, and determines which letters were right / close / wrong

  let currentRow = currentWord;
  let nextRow = currentWord+1;

  
  //loss case - when you're out of guesses
  if(currentWord == 4){
    checkWord(words[currentWord], currentRow);
    gameOver(false);
  }

  console.log(currentWord);
  console.log("words[currentWord]: " + words[currentWord]);
  
  checkWord(words[currentWord], currentRow);
  
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
  console.log("////// UNDER CHECKLETTER //////");
  console.log("ROW: " + row);
  console.log("POSITION: " + position);
  let button = getButton(row, position);
  console.log("BUTTON: " + button);
    
  if(answer.indexOf(letter) == -1){
    incorrectLetters.push(letter);
    updateLetter('incorrect', letter, button);
    
  }else if(answer.indexOf(letter) == guess.indexOf(letter)){
    correctLetters.push(letter);
    updateLetter('correct', letter, button);
    
  }else{
    closeLetters.push(letter);
    updateLetter('close', letter, button);
  }
}

function updateLetter(category, letter, button){
  //take a letter and which type it is (right, wrong, close) and give it a color
  //TO FIX HERE: getButton NEEDS TO BE ABLE TO SPECIFY A POSITION (BC THIS FUNCTION IS AFTER SUBMITTING A WORD) INSTEAD OF USING LAST BUTTON

  let id = keyID(letter);


  console.log("UNDER UPDATELETTER ------");

  if(category == 'correct'){
    // document.getElementById(id).className='keyboard correct';
    changeButtonColor(button, 'green');
  }
  if(category == 'incorrect'){
    document.getElementById(id).className='keyboard incorrect';
    //MAYBE REPLACE LINE ABOVE BY FINDING BUTTON IN DOM AND UPDATING LIKE THAT
    changeButtonColor(button, 'red');
  }
  if(category == 'close'){
    // document.getElementById(id).className='keyboard close';
    changeButtonColor(button, 'yellow');
  }
}

function changeButtonColor(button, color){
  console.log("UNDER CHANGEBUTTONCOLOR -----");
  // console.log(button.id);
  console.log("color " + color);
  button.style.backgroundColor=color;
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

