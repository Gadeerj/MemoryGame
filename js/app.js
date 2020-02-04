/*
 * Create a list that holds all of your cards
 */
const Allcards = document.querySelectorAll(".card"); // get all cards from HTML
let OpCards= [];
let symbols = [];
let Moves = 0;
let Stars = 3;
let seconds = 0;
let minutes = 0;
let timerHandler;

function initializeGame(){  // this function for the codes that will start when the game starts one time
Allcards.forEach(card => {

    card.addEventListener("click" , Clicked); // to make the card face up when it is clicked
    //collect all aviable symbols names
    let FirstChild = card.children[0]; // to get from each card the first child
     symbols.push(FirstChild.className);  //here I stored classname in the array
});

document.querySelector("#btn-play-again").addEventListener("click", startGame);
document.querySelector("#btn-cancel").addEventListener("click", closeDialog);
document.querySelector(".restart").addEventListener("click", startGame);

}

function flipCardsDown(){
    Allcards.forEach(card=>{
        card.className = "card";
    });
}

function startGame(){
    seconds = 0; // in the beginning of the game it should be 0 
    minutes = 0;
    closeDialog();
    updateScore();
    Moves = 0;
    Stars = 3;
    shuffleAllCards();
    flipCardsDown();
    startTimer();
}
function closeDialog(){
    document.querySelector("#dialog-box").close();
}

function startTimer(){ 
    if(!timerHandler){
        timerHandler = setInterval(function(){
            seconds +=1;
            if(seconds>59){
                seconds=0;
                minutes +=1;
            }
            document.querySelector(".timer").innerText = `${minutes}:${seconds}`;
    
        },1000);  
    }
}
function Start(){ // to view moves = 0 , and starts = 3 when the user restart the game
    Moves= 0;
    Stars = 3;

}
function stopTimer(){
    clearInterval(timerHandler);
    timerHandler = null;
}
function stopStars(){
    clearInterval(Stars);
    Stars = null;
}

function stopMoves(){
    clearInterval(Moves);
  Moves = null;
}
initializeGame();
startGame();
function shuffleAllCards(){ // this for shuffle all cards
symbols = shuffle(symbols);
// assign all cards in sequence using forEach
let g = 0; 
Allcards.forEach(card => {
    let FirstChild = card.children[0];
    FirstChild.className = symbols[g];
    g++;
});
}
// clear the number of moves
function Clicked(e){ // first I need to make sure that the user can't open > 2 cards in the same time
    if(OpCards.length<2){    // OpCards less than 2 then open it
        let pikedcard = e.target;
        if(pikedcard.classList.contains("card")&& !pikedcard.classList.contains("open","show" , "match", "notmatch")){
            pikedcard.classList.add("open" , "show");
            OpCards.push(pikedcard); //add it in OpCards array
        }
  
    if(OpCards.length == 2){ // to know if we have 2 cards in the array
       setTimeout(matchedCards, 1000);
 }}}
  
        
    
function matchedCards(){
 if(OpCards.length==2){  //check if we have 2 cards opened
        let FCard = OpCards [0];
        let SCard = OpCards [1];
        let firstChildClass = FCard.children[0].className;
        let secondChildClass = SCard.children[0].className;
        if(firstChildClass==secondChildClass){
            FCard.classList.add("match");
            SCard.classList.add("match");
          
        } else{
            //flip them 
            // remove show and open when it is not matching
            FCard.classList.remove("open");
            FCard.classList.remove("show");
            SCard.classList.remove("open");
            SCard.classList.remove("show");
        }
    OpCards = []; // in both cases opcards array should be clear

    incrementMoves();
}
const remainingUnOpenedCards = document.querySelectorAll(".card:not(.match)");
if(remainingUnOpenedCards.length==0){
    showDialogBox();

}
}
    function incrementMoves(){
        Moves += 1;
        if( Moves<18){
            Stars = 3;
        } else if (Moves<25){
            Stars = 2;
        } else{
            Stars = 1;
         
        }
        updateScore();
    }
    function updateScore(){ // this function will update the scores in HTML
        const movesElement = document.querySelector(".moves");
        movesElement.innerText = Moves;
        // Also , it will update the stars
        const starsElement = document.querySelector(".stars");
        starsElement.innerHTML = "";
       

        for(let i=0; i<Stars; i++){
            let star = "<li> <i class='fa fa-star'></li></li>"
            starsElement.innerHTML += star;
      
        }
    }
    function showDialogBox(){
        let dialog = document.querySelector("#dialog-box");
        document.querySelector("#span-moves").innerText = Moves;
        document.querySelector("#span-star").innerText =  Stars;
        document.querySelector("#span-timer1").innerText = minutes;
        document.querySelector("#span-timer2").innerText = seconds;
  

  
         dialog.showModal();
     
          stopTimer();
          stopMoves();
          stopStars();
          Start(); 
          //startTimer();

    }

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
