let suits = ["H", "D", "S", "C"];
let cardValues = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let imgeURL="";
let deck=[];
let value=0;
let stand=0;
let dealCount=0;

suits.forEach(function(suit){
    cardValues.forEach(function(cardValue){
        imageURL="./images/"+cardValue+suit+".jpg";  //   console.log(imageURL);
        if (cardValue=="J"||cardValue=="Q"||cardValue=="K"){
            value=10;
        }
        else if (cardValue=="A"){
            value=11;
        }
        else{
            value=cardValue;
        };  console.log(value);
        let imgAndValue={URL:imageURL, v:value};
        deck.push(imgAndValue);
        deck.push(imgAndValue); //two decks;
    })
});
console.log(deck);

function shuffleArray(deck) {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
};


shuffleArray(deck);
console.log(deck);

let dH=document.getElementById("dealer-hand");
let pH=document.getElementById("player-hand");
let dP=document.getElementById("dealer-points");
let pP=document.getElementById("player-points");
let dealer={hLabel:dH, pLabel:dP, points:0, aCount:0};
let player={hLabel:pH, pLabel:pP, points:0, aCount:0, bank:500};
let curCard={};

let bet=0;
let totalBet=0;
let betInfo=document.getElementById("bet-info");
betInfo.innerHTML="Place Your Bet";
let bank=document.getElementById("bank");
bank.innerHTML="You have $"+ player.bank+" to play.";
bBtn="";
let fund='<h4>Insufficient Fund</h4><img src="https://images-na.ssl-images-amazon.com/images/I/61cL%2BM-SN%2BL._SX425_.jpg" style="width:180px;height: auto ;" alt="">';

let betButton=document.getElementById("betButton");
betButton=addEventListener("click",function(e){
   
    bBtn=e.target.textContent;
    if((bBtn=="$10"||bBtn=="$25"||bBtn=="$100")&&(dealCount!=0)){
    
        alert("Not More Bet after Deal!");

    }
    else if(bBtn=="$10"){
        bet=10;
    }
    else if(bBtn=="$25"){
        bet=25;
    }
    else if(bBtn=="$100"){
        bet=100;
        };

    if(player.bank>=bet&&bet!=0){
        totalBet = totalBet + bet;
        player.bank = player.bank-bet;
        betInfo.innerHTML = "You are betting $" + totalBet;
        bank.innerHTML = "You have $"+ player.bank + " to play.";
    }
    else if(player.bank<bet){
        betInfo.innerHTML = fund;
    };
    bet=0;
});

function dealcards(person){
    let imgTag=document.createElement("img");
    curCard=deck.pop();
    imgTag.src=curCard.URL;
    imgTag.setAttribute("class","card");
    person.hLabel.appendChild(imgTag);

    if(curCard.v==11){ //count Aces
        person.aCount++;     console.log("got an Ace!");
    }

    person.points=curCard.v+person.points;

    if((person.points>21)&&(person.aCount>0)){
        person.points = person.points-10;
        person.aCount = person.aCount -1;
        person.pLabel.textContent=person.points+" Points";
    }

    else if(person.points==21){
        person.pLabel.textContent="Got 21!";
    }
    else{
        person.pLabel.textContent=person.points+" Points";
    }
};

function clear(person){
    person.pLabel.innerHTML="";
    person.hLabel.innerHTML="";
    betInfo.innerHTML="Place Your Bet";
    person.aCount=0;
    person.points=0;
    person.w=0;
    stand=0;
    bet=0;
    totalBet=0;
    dealCount=0
};

document.getElementById("deal-button").addEventListener("click", function(e){

    if (stand==1||dealCount==1){
    clear(dealer);
    clear(player);
    dealer.hLabel.setAttribute("class","hand");
    };
    dealcards(dealer);
    dealcards(player);
    dealer.hLabel.setAttribute("class","hand backCard");
    dealcards(player);
    dealCount=1;
});

document.getElementById("hit-button").addEventListener("click", function(e){
    if(dealCount==0){
        alert("A game hasn't started! Hit the Deal button!");
    }
    else if(stand==0){
        dealcards(player);
        if(player.points>21){
            player.pLabel.textContent=player.points+" Points is over 21!! Lose!!";
            betInfo.innerHTML="You lose $" + totalBet;
        }
    }
    else if(stand==1){
        player.pLabel.textContent="You have already Stood!"
    }
});

document.getElementById("stand-button").addEventListener("click", function(e){
    stand=1;
    if(dealCount==0){
        alert("A game hasn't started! Hit the Deal button!");
    }
    else if(player.points<22){
        dealer.hLabel.setAttribute("class","hand");

        while (dealer.points<=16){
                dealcards(dealer);
        };
        if (dealer.points>player.points&&(dealer.points<22)){
            dealer.pLabel.textContent=dealer.points +" Points! and the dealer wins!";
        }
        else if(dealer.points>21){
            dealer.pLabel.textContent=dealer.points +" points! and the dealer lose!";
            player.pLabel.textContent="You win $"+totalBet+"!";
            betInfo.innerHTML=player.pLabel.textContent;
            player.bank=player.bank+2*totalBet;
        }
        else if ((dealer.points<player.points)&&(player.points<22)){
            player.pLabel.textContent=player.points +" points! You win $"+totalBet+"!";
            betInfo.innerHTML=player.pLabel.textContent;
            player.bank=player.bank+2*totalBet;
        }
        else if(dealer.points==player.points){
            player.pLabel.textContent=player.points + " Friendly Game, Pushed";
            dealer.pLabel.textContent=dealer.points + " Friendly Game, Pushed";
            player.bank=player.bank+totalBet;
        }
        
    }
    bank.innerHTML = "You have $"+ player.bank + " to play.";
});

document.getElementById("clear-button").addEventListener("click", function(e){
    if (dealCount==0){
        player.bank=player.bank+totalBet;
    };
    dealer.hLabel.setAttribute("class","hand");
    clear(dealer);
    clear(player);
    bank.innerHTML = "You have $"+ player.bank + " to play.";
})


///deal empty card, then clear empty
//display bank info