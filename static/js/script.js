
function ageindays() {
    var birthyear = prompt("whats your birth year");
    var curryear = 2021;
    var totaldays = (curryear - birthyear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + " " + totaldays + " " + ' days old');
    h1.setAttribute('id', 'totaldays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    console.log(totaldays);

}

function reset() {
    document.getElementById("totaldays").remove();
}

function generatecat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://cdn2.thecatapi.com/images/21g.gif";
    div.appendChild(image);

}

function rpsgame(yourchoice) {
    console.log(yourchoice);
    var humanchoice, botchoice;
    humanchoice = yourchoice.id;
    botchoice = randch(rand());
    console.log('computer choice:', botchoice);
    results = decidewinner(humanchoice, botchoice);
    console.log(results);
    message = finalmessage(results);
    console.log(message);
    rpsfrontend(yourchoice.id, botchoice, message);
}

function rand() {
    return Math.floor(Math.random() * 3);
}

function randch(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decidewinner(yourchoice, botchoice) {
    var rpsdata = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'scissors': 0, 'rock': 1, 'paper': 0.5 },
        'scissors': { 'scissors': 0.5, 'rock': 0, 'paper': 1 }
    }

    var yourscore = rpsdata[yourchoice][botchoice];
    var compscore = rpsdata[botchoice][yourchoice];

    return [yourscore, compscore];
}

function finalmessage([yourscore]) {
    if (yourscore == 0) {
        return { 'message': 'You Lost !', 'color': 'maroon' };

    }
    else if (yourscore == 1) {
        return { 'message': 'You Won !', 'color': 'green' };
    }
    else {
        return { 'message': 'Draw!', 'color': 'white' };
    }
}

function rpsfrontend(humanimagechoice, botimagechoice, finalmessage) {
    var imagedata = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humandiv = document.createElement('div');
    var botdiv = document.createElement('div');
    var messagediv = document.createElement('div');

    humandiv.innerHTML = "<img src='" + imagedata[humanimagechoice] + "' height=150, width=150, style='box-shadow:0ps 10px 50px rgba(37,50,233,1);'>"
    messagediv.innerHTML = "<h1 style='color:" + finalmessage['color'] + "; font-size:60px; padding:30px; '>" + finalmessage['message'] + "</h1>"
    botdiv.innerHTML = "<img src='" + imagedata[botimagechoice] + "' height=150, width=150, style='box-shadow:0ps 10px 50px rgba(243,38,233,1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humandiv);
    document.getElementById('flex-box-rps-div').appendChild(messagediv);
    document.getElementById('flex-box-rps-div').appendChild(botdiv);






}


var all_buttons = document.getElementsByTagName("button");
//console.log(all_buttons);

var copyallbuttons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyallbuttons.push(all_buttons[i].classList[1]);
}

console.log(copyallbuttons);

function colorchange(thing) {
    if (thing.value == 'red') {
        buttonred();
    }

    else if (thing.value == 'green') {
        buttongreen();
    }

    else if (thing.value == 'reset') {
        buttonreset();
    }

    else if (thing.value == 'random') {
        buttonrandom();
    }

}


function buttongreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success");
    }
}


function buttonred() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger");
    }
}

function buttonreset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyallbuttons[i]);
    }
}

function buttonrandom() {
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i = 0; i < all_buttons.length; i++) {
        let randomno = Math.floor(Math.randon() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomno]);

    }
}





let blackjackgame = {
    'you': { 'scorespan': '#yourblackjackresult', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scorespan': '#dealerblackjackresult', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsmap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isstand': false,
    'turnsover': false
};

const YOU = blackjackgame['you'];
const DEALER = blackjackgame['dealer'];
const hitsound = new Audio('static/sounds/swish.m4a');
const winsound = new Audio('static/sounds/cash.mp3');
const losssound = new Audio('static/sounds/aww.mp3');


document.querySelector('#bjhitbutton').addEventListener('click', blackjackhit);
document.querySelector('#bjstandbutton').addEventListener('click', dealerlogic);
document.querySelector('#bjdealbutton').addEventListener('click', blackjackdeal);

function blackjackhit() {
    if (blackjackgame['isstand'] === false) {
        let card = randomcard();
        showcard(card, YOU);
        updatescore(card, YOU);
        showscore(YOU);
        console.log(YOU['score']);
    }
}

function randomcard() {
    let randomindex = Math.floor(Math.random() * 13);
    return blackjackgame['cards'][randomindex];
}

function showcard(card, activeplayer) {
    if (activeplayer['score'] <= 21) {
        let cardimage = document.createElement('img');
        cardimage.src = `static/images/${card}.png`;
        document.querySelector(activeplayer['div']).appendChild(cardimage);
        hitsound.play();
    }
}

function sleep(ms)
{
    return new Promise(resolve=>setTimeout(resolve,ms));
}

function blackjackdeal() {
    //showresult(computewinner());
    if (blackjackgame['turnsover'] === true) 
    {
        blackjackgame['isstand']=false;
        let yourimages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerimages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i = 0; i < yourimages.length; i++) {
            yourimages[i].remove();
        }


        for (let i = 0; i < dealerimages.length; i++) {
            dealerimages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#yourblackjackresult').textContent = 0;
        document.querySelector('#dealerblackjackresult').textContent = 0;
        document.querySelector('#yourblackjackresult').style.color = 'white';
        document.querySelector('#dealerblackjackresult').style.color = 'white';
        document.querySelector('#bjresult').textContent = "Let's Play !";
        document.querySelector('#bjresult').style.color = 'black';

        blackjackgame['turnsover']=true;
    }
}

function updatescore(card, activeplayer) {
    if (card == 'A') {
        if (activeplayer['score'] + blackjackgame['cardsmap'][card][1] <= 21) {
            activeplayer['score'] += blackjackgame['cardsmap'][card][1];
        }
        else {
            activeplayer['score'] += blackjackgame['cardsmap'][card][0];
        }
    }
    else {
        activeplayer['score'] = activeplayer['score'] + blackjackgame['cardsmap'][card];
    }
}

function showscore(activeplayer) {
    if (activeplayer['score'] > 21) {
        document.querySelector(activeplayer['scorespan']).textContent = 'BUST!';
        document.querySelector(activeplayer['scorespan']).style.color = 'red';
    }
    else {
        document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];
    }
}

 async function dealerlogic() {
    blackjackgame['isstand'] = true;

    while(DEALER['score']<16 && blackjackgame['isstand']===true)
    {
        let card = randomcard();
        showcard(card, DEALER);
        updatescore(card, DEALER);
        showscore(DEALER);
        await sleep(1000);

        if (DEALER['score'] > 15) {
            blackjackgame['turnsover'] = true;
            let winner = computewinner();
            showresult(winner);
            
        }
    }
}

function computewinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if ((YOU['score'] > DEALER['score']) || (DEALER['score'] > 21)) {
            blackjackgame['wins']++;
            winner = YOU;
        }

        else if (YOU['score'] < DEALER['score']) {
            blackjackgame['losses']++;
            winner = DEALER;
        }

        else if (YOU['score'] == DEALER['score']) {
            blackjackgame['draws']++;
        }
    }

    else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackgame['losses']++;
        winner = DEALER;
    }

    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackgame['draws']++;
    }

    console.log("the winner is", winner);
    return winner;

}

function showresult(winner) {

    let message, messagecolor;

    if(blackjackgame['turnsover']===true)
    {
        if (winner == YOU) {
            document.querySelector('#wins').textContent = blackjackgame['wins'];
            message = "YOU WON !";
            messagecolor = 'green';
            winsound.play();
        }

        else if (winner == DEALER) {
            document.querySelector('#losses').textContent = blackjackgame['losses'];
            message = "YOU LOST !";
            messagecolor = 'red';
            losssound.play();
        }

        else {
            document.querySelector('#draws').textContent = blackjackgame['draws'];
            message = "DRAW !";
            messagecolor = 'white';
        }

        document.querySelector('#bjresult').textContent = message;
        document.querySelector('#bjresult').style.color = messagecolor;
}



}




