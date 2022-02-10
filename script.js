var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var wordBank = ['MOUSE', 'COLOR', 'DWARF', 'WATCH', 'BEADS', 'BOARD', 'KNIFE', 'READY', 'TEAMS', 'FIRED', 'HEXED', 'TRAIN', 'CHORD', 'TOUCH', 'PLANE', 'SUPER', 'SWORD', 'BREAD', 'WATER', 'FALSE','WHITE', 'BROWN', 'BLACK', 'START','PIECE', ];
var correctLetters = [];
var incorrectLetters = [];
var closeLetters = [];
p5.disableFriendlyErrors = true;
var word1 = [];
var word2 = [];
var word3 = [];
var word4 = [];
var word5 = [];
var word1Guessed = false;
var word2Guessed = false;
var word3Guessed = false;
var word4Guessed = false;
var word5Guessed = false;
var ANSWER = "";

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
  
  ANSWER = randomWord(wordBank);
  console.log("ANSWER: " + ANSWER);
  
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

  if (word1.length < 5) {
    addLetter(letter, word1);
    console.log("word 1");
  } else if (word2.length < 5) {
    addLetter(letter, word2);
    console.log("word 2");
  } else if (word3.length < 5) {
    addLetter(letter, word3);
  } else if (word4.length < 5) {
    addLetter(letter, word4);
  } else if (word5.length < 5) {
    addLetter(letter, word5);
  } 
}

function addLetter(letter, wordNum) {
  //add an input letter to the word section
  console.log("Letter: " + letter);
  console.log("Word: " + wordNum);
  if (wordNum == word1) {
    word1.push(letter);
    if (word1.length == 1) {
      console.log("LETTER: " + letter);
      document.getElementById('button1').innerHTML = letter;
    }
    if (word1.length == 2) {
      console.log("LETTER: " + letter);
      document.getElementById('button2').innerHTML = letter;
    }
    if (word1.length == 3) {
      console.log("LETTER: " + letter);
      document.getElementById('button3').innerHTML = letter;
    }
    if (word1.length == 4) {
      console.log("LETTER: " + letter);
      document.getElementById('button4').innerHTML = letter;
    }
    if (word1.length == 5) {
      console.log("LETTER: " + letter);
      document.getElementById('button5').innerHTML = letter;
    }
  }
  if (wordNum == word2) {
    word2.push(letter);
    if (word2.length == 1) {
      console.log("LETTER: " + letter);
      document.getElementById('button6').innerHTML = letter;
    }
    if (word2.length == 2) {
      console.log("LETTER: " + letter);
      document.getElementById('button7').innerHTML = letter;
    }
    if (word2.length == 3) {
      console.log("LETTER: " + letter);
      document.getElementById('button8').innerHTML = letter;
    }
    if (word2.length == 4) {
      console.log("LETTER: " + letter);
      document.getElementById('button9').innerHTML = letter;
    }
    if (word2.length == 5) {
      console.log("LETTER: " + letter);
      document.getElementById('button10').innerHTML = letter;
    }
  }
  if (wordNum == word3) {
    word3.push(letter);
    if (word3.length == 1) {
      console.log("LETTER: " + letter);
      document.getElementById('button11').innerHTML = letter;
    }
    if (word3.length == 2) {
      console.log("LETTER: " + letter);
      document.getElementById('button12').innerHTML = letter;
    }
    if (word3.length == 3) {
      console.log("LETTER: " + letter);
      document.getElementById('button13').innerHTML = letter;
    }
    if (word3.length == 4) {
      console.log("LETTER: " + letter);
      document.getElementById('button14').innerHTML = letter;
    }
    if (word3.length == 5) {
      console.log("LETTER: " + letter);
      document.getElementById('button15').innerHTML = letter;
    }
  }
  if (wordNum == word4) {
    word4.push(letter);
    if (word4.length == 1) {
      console.log("LETTER: " + letter);
      document.getElementById('button16').innerHTML = letter;
    }
    if (word4.length == 2) {
      console.log("LETTER: " + letter);
      document.getElementById('button17').innerHTML = letter;
    }
    if (word4.length == 3) {
      console.log("LETTER: " + letter);
      document.getElementById('button18').innerHTML = letter;
    }
    if (word4.length == 4) {
      console.log("LETTER: " + letter);
      document.getElementById('button19').innerHTML = letter;
    }
    if (word4.length == 5) {
      console.log("LETTER: " + letter);
      document.getElementById('button20').innerHTML = letter;
    }
  }
  if (wordNum == word5) {
    word5.push(letter);
    if (word5.length == 1) {
      console.log("LETTER: " + letter);
      document.getElementById('button21').innerHTML = letter;
    }
    if (word5.length == 2) {
      console.log("LETTER: " + letter);
      document.getElementById('button22').innerHTML = letter;
    }
    if (word5.length == 3) {
      console.log("LETTER: " + letter);
      document.getElementById('button23').innerHTML = letter;
    }
    if (word5.length == 4) {
      console.log("LETTER: " + letter);
      document.getElementById('button24').innerHTML = letter;
    }
    if (word5.length == 5) {
      console.log("LETTER: " + letter);
      document.getElementById('button25').innerHTML = letter;
    }
  }
  let x = document.createElement("guessedLetter");
  x.innerHTML = letter;
  document.getElementById("guessed").appendChild(x);

}

function handleGuess() {
  //the rest of the boxes should be hidden. This unhides the next box, and determines which letters were right / close / wrong
  
  
  if (word1Guessed == false) {
    word1Guessed = true;
    checkWord(word1, 'row1');
    unhideElement('row2');
  } else if (word2Guessed == false) {
    word2Guessed = true;
    checkWord(word2, 'row2');
    document.getElementById('row3').hidden=false;
  } else if (word3Guessed == false) {
    word3Guessed = true;
    checkWord(word3, 'row3');
    document.getElementById('row4').hidden=false;
  } else if (word4Guessed == false) {
    word4Guessed = true;
    checkWord(word4, 'row4')
    document.getElementById('row5').hidden=false;
  } else if (word5Guessed == false) {
    word5Guessed = true;
    checkWord(word5, 'row5');
    gameOver(false);
  }
}

function checkWord(guess, row){
  console.log("GUESS: " + guess.join(''));
  console.log("ANSWER: " + ANSWER);
  if(guess.join('') == ANSWER){
    console.log("GAME OVER ------------------------")
    gameOver(true);
    
  }
  
  console.log("answer: " + ANSWER);
  console.log("guess: " + guess);
  for(let i = 0; i < guess.length; i++){
    checkLetter(guess, guess[i], row, i);
  }
  
}

function checkLetter(guess, letter, row, position){
  //for a letter that's passed in, add it to an array (correct letters, wrong, etc.) and then pass it to updateLetter
  
  
  if(ANSWER.indexOf(letter) == -1 && incorrectLetters.indexOf(letter) == -1){
    incorrectLetters.push(letter);
    updateLetter(letter, 'incorrect', row, position);
    
  }else if(ANSWER.indexOf(letter) == guess.indexOf(letter) && correctLetters.indexOf(letter) == -1){
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
  // hideElement('restartGame');
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

