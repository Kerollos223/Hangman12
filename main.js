// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {

  // Create Span
let span = document.createElement("span");

  // Create Letter Text Node
let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
span.appendChild(theLetter);

  // Add Class On Span
span.className = 'letter-box';

  // Append Span To The Letters Container
lettersContainer.appendChild(span);

});

// Object Of Words + Categories
const words = {
    programming: ["php", "javascript", "bootstrap", "redux", "html", "css", "mysql", "python"],
    movies: ["The Dark", "God Father", "La Casa De Papel", "Spider Man" , "Iron Man", "Hulk", "Lion King"],
    people: ["Samy", "Romany", "Nagy", "Hanna", "Ghandi" , "Zoza" , "Gova" , "paula samer" , "Morcos" , "Ebram" , "bally"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

// Initial Game Setup
function setupGame() {
    // Clear previous game
    lettersContainer.innerHTML = "";
    document.querySelector(".letters-guess").innerHTML = "";
    document.querySelector(".hangman-draw").className = "hangman-draw";
    lettersArray.forEach(letter => {
        let span = document.createElement("span");
        let theLetter = document.createTextNode(letter);
        span.appendChild(theLetter);
        span.className = 'letter-box';
        lettersContainer.appendChild(span);
    });
    // Get Random Property
    let allKeys = Object.keys(words);
    let randomPropNumber = Math.floor(Math.random() * allKeys.length);
    let randomPropName = allKeys[randomPropNumber];
    let randomPropValue = words[randomPropName];
    let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
    let randomValueValue = randomPropValue[randomValueNumber];
    document.querySelector(".game-info .category span").innerHTML = randomPropName;
    let lettersGuessContainer = document.querySelector(".letters-guess");
    let lettersAndSpace = Array.from(randomValueValue);
    lettersAndSpace.forEach(letter => {
        let emptySpan = document.createElement("span");
        if (letter === ' ') {
            emptySpan.className = 'with-space';
        }
        lettersGuessContainer.appendChild(emptySpan);
    });
    guessSpans = document.querySelectorAll(".letters-guess span");
    wrongAttempts = 0;
    chosenWord = randomValueValue;
}

// Select Guess Spans
let guessSpans;
let wrongAttempts;
let chosenWord;

// Initialize game
setupGame();

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
    let theStatus = false;
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(chosenWord.toLowerCase());
        theChosenWord.forEach((wordLetter, WordIndex) => {
            if (theClickedLetter == wordLetter) {
                theStatus = true;
                guessSpans.forEach((span, spanIndex) => {
                    if (WordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                    }
                });
            }
        });
        if (theStatus !== true) {
            wrongAttempts++;
            document.querySelector(".hangman-draw").classList.add(`wrong-${wrongAttempts}`);
            document.getElementById("fail").play();
            if (wrongAttempts === 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }
        } else {
            document.getElementById("success").play();
        }
    }
});

// End Game Function
function endGame() {
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over, The Word Is ${chosenWord}`);
    div.appendChild(divText);
    div.className = 'popup';
    document.body.appendChild(div);

    // Show full hangman drawing
    document.querySelector(".hangman-draw").classList.add("wrong-8");

    setTimeout(() => {
        document.body.removeChild(div);
        setupGame();
    }, 3000);
}
