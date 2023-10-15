const roll_btn = document.querySelector('.btn--roll');
const hold_btn = document.querySelector('.btn--hold');
const new_btn = document.querySelector('.btn--new');
const quit_btn = document.querySelector('.btn--quit');
const play_btn = document.querySelector('.btn--play');

const currentPl0 = document.getElementById('current--0');
const currentPl1 = document.getElementById('current--1');


const diceEl = document.querySelector('.dice');

const scorePl0 = document.querySelector('#score--0');
const scorePl1 = document.querySelector('#score--1');

const player__0 = document.querySelector('.player--0');
const player__1 = document.querySelector('.player--1');



let currentScore,activePlayer,scores,playing;

const switchPlayer = ()=>{
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 1 ? 0 : 1;
    player__0.classList.toggle('player--active');
    player__1.classList.toggle('player--active');
}

const rollDice = ()=>{
    if(playing){
        diceEl.style.display = "block";
        const random_no = parseInt(Math.floor(Math.random()*6 + 1));
        const path = `dice-${random_no}.png`;
        diceEl.setAttribute('src',path);
        if(random_no===1){
            switchPlayer();
        }else{
            currentScore+=random_no;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            console.log(currentScore);
            // if(currentScore>=50){
            //     scores[activePlayer]+=currentScore;
            //     document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
            //     playing = false;
            //     document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            //     document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            // }
        }
    }
}



const check_winner = ()=>{
    if(scores[activePlayer]>=50){    
        playing = false;
        roll_btn.style.pointerEvents = 'none';
        hold_btn.style.pointerEvents = 'none';
        return true;
    }
    return false;
}



const holdScore = ()=>{
    if(playing){
        scores[activePlayer]+=currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if(check_winner()){
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }else{
            switchPlayer();
        }
    }
}

const playGame = ()=>{
    scores = [0,0]
    activePlayer = 0;
    currentScore = 0;
    playing = true

    diceEl.style.display = "none";
    
    scorePl0.textContent = 0;
    scorePl1.textContent = 0;

    currentPl0.textContent = 0;
    currentPl1.textContent = 0;

    player__0.classList.remove('player--winner');
    player__1.classList.remove('player--winner');

    player__0.classList.add('player--active');
    player__1.classList.remove('player--active');

    roll_btn.style.pointerEvents = 'auto';
    hold_btn.style.pointerEvents = 'auto';
}

roll_btn.addEventListener('click',rollDice);
hold_btn.addEventListener('click',holdScore);
new_btn.addEventListener('click',playGame);
quit_btn.addEventListener('click',()=>{
    document.querySelector('.game-container').classList.remove('hidden');
    document.querySelector('.main').classList.add('hidden')
});

play_btn.addEventListener('click',()=>{
    document.querySelector('.main').classList.remove('hidden')
    document.querySelector('.game-container').classList.add('hidden');
    playGame(); 
});

