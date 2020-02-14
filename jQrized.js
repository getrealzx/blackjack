var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let suits = ["H", "D", "S", "C"];
let cardValues = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let imgeURL="";
let deck=[];
let value=0;
let stand=0;
let dealCount=0;
let dP=document.getElementById("dealer-points");
let pP=document.getElementById("player-points");
let dealer={hLabel: $("#dealer-hand"), pLabel:dP, points:0, aCount:0};
let player={hLabel: $("#player-hand"), pLabel:pP, points:0, aCount:0, bank:500};
let curCard={};
let bet=0;
let totalBet=0;
let df=0;


suits.forEach(function(suit){
    cardValues.forEach(function(cardValue){
        imageURL="./images/"+cardValue+suit+".jpg";  //   console.log(imageURL);
        new Image().src=imageURL;//preload
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
}); console.log(deck);

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

$("#bet-info").html("Place Your Bet");
$("#bank").html("You have $"+ player.bank+".");
bBtn="";
let fund='<h4>Insufficient Fund</h4><img src="https://images-na.ssl-images-amazon.com/images/I/61cL%2BM-SN%2BL._SX425_.jpg" style="width:180px;height: auto ;" alt="">';

$("#betButton").click((e)=>{
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
        $("#bet-info").html("You are betting $" + totalBet);
        $("#bank").html("You have $"+ player.bank + ".");
    }
    else if(player.bank<bet){
        $("#bet-info").html(fund);
    };
    bet=0;
});

function dealcards(person){
    let imgTag=document.createElement("img");
    curCard=deck.pop();
    imgTag.src=curCard.URL;
    df==1?imgTag.setAttribute("class","cardFlip"):imgTag.setAttribute("class","card");
    person.hLabel.append(imgTag);

    if(curCard.v==11){ //count Aces
        person.aCount++;     console.log(" got an Ace!");
    }
    person.points=curCard.v+person.points;

    if((person.points>21)&&(person.aCount>0)){
        person.points = person.points-10;
        person.aCount = person.aCount -1;
        person.pLabel.textContent=person.points+" Points";
    }
    if(player.points>21){
        player.bank=player.bank-totalBet;
        player.pLabel.textContent=player.points+" Points is over 21!! Lose!!";
        $("#bet-info").html("You lose $" + totalBet);
    }
    else if(person.points==21){
        person.pLabel.textContent="Got A BlackJack!";
    }
    else{
        person.pLabel.textContent=person.points+" Points";
    }
};

function clear(person){
    person.pLabel.innerHTML="";
    person.hLabel.html("");
    $("#bet-info").html("Place Your Bet");
    person.aCount=0;
    person.points=0;
    person.w=0;
    stand=0;
    bet=0;
    totalBet=0;
    dealCount=0;
    df=0;
};

$("#deal-button").click(()=>{
    (stand==1||dealCount==1)?(clear(dealer), clear(player), dealer.hLabel.attr("class","hand")):console.log("nothing");

    setTimeout(() => {dealer.hLabel.attr("class","hand backCard");},300);
    setTimeout(() => {dealcards(player);},600);
    setTimeout(() => {dealcards(dealer);},1200);
    setTimeout(() => {dealcards(player);},1500);
    dealCount=1;
});

document.getElementById("hit-button").addEventListener("click", function(e){
    if(dealCount==0){
        alert("A game hasn't started! Hit the Deal button!");
    }
    if(stand==0){
        setTimeout(() => {dealcards(player);},500);
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
        dealer.hLabel.attr("class","hand");
 
        while (dealer.points<=16){
            df = df + 1;
            dealcards(dealer);
        };
        if (dealer.points>player.points&&(dealer.points<22)){
            dealer.pLabel.textContent=dealer.points +" Points! and the dealer wins!";
            player.pLabel.textContent="You lose $"+totalBet+"!";
            $("#bet-info").html("You lose $" + totalBet);
        }
        else if(dealer.points>21){
            dealer.pLabel.textContent=dealer.points +" points! and the dealer lose!";
            player.pLabel.textContent="You win $"+totalBet+"!";
            $("#bet-info").html(player.pLabel.textContent);
            player.bank=player.bank+2*totalBet;
        }
        else if ((dealer.points<player.points)&&(player.points<22)){
            player.pLabel.textContent=player.points +" points! You win $"+totalBet+"!";
            $("#bet-info").html(player.pLabel.textContent);
            player.bank=player.bank+2*totalBet;
        }
        else if(dealer.points==player.points){
            player.pLabel.textContent=player.points + "points. Friendly Game, Pushed";
            dealer.pLabel.textContent=dealer.points + "points. Friendly Game, Pushed";
            player.bank=player.bank+totalBet;
        }
    }
    $("#bank").html("You have $"+ player.bank + ".");
});

document.getElementById("clear-button").addEventListener("click", function(e){
    if (dealCount==0){
        player.bank=player.bank+totalBet;
    };
    dealer.hLabel.attr("class","hand");
    clear(dealer);
    clear(player);
    $("#bank").html("You have $"+ player.bank + ".");
})