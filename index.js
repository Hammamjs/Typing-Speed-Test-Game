document.title = 'Typing Speed Game'

let levels = document.querySelector('.message .lvl');
let second = document.querySelector('.message .second');
let start = document.querySelector('.start');
let words = document.querySelector('.words');
let upcomingWords = document.querySelector('.upcoming-words');
let input = document.querySelector('input');
let spanLevelName = document.querySelector('.control span');
let score = document.querySelector('.got');
let total = document.querySelector('.total');
let timeLeft = document.querySelector('.time span');
let finish = document.querySelector('.finish');
let lis = document.querySelectorAll('.levels li a');
let easy = document.querySelector('.easay');
let normal = document.querySelector('.normal');
let hard = document.querySelector('.hard');
let selectBox = document.querySelector('.choice');
let selectBoxLvl = document.querySelector('.levels');

let wordsArray = [
    'code',
    'facebook',
    'google',
    'linkedin',
    'firefox',
    'twitter',
    'codepen',
    'leetcode',
    'try',
    'Python',
    'PHP',
    'Larvel',
    'Jason',
    'Bootstrap',
    'Java',
    'Manipulation',
    'Funny',
    'Score',
    'congratulations'
];

const lvl = {
    'Easy' : 6,
    'Normal' : 4,
    'Hard' : 3,
}




let defaultLvlName = 'Normal';
let defaultLvlSec = lvl[defaultLvlName];
levels.innerHTML = defaultLvlName ;
second.innerHTML = defaultLvlSec ;
timeLeft.innerHTML = defaultLvlSec;




selectBox.onclick = () => {
    if (selectBox.classList.contains('show')) {
        selectBoxLvl.style.display = 'block';
        selectBox.classList.toggle('show');
    }else {
        selectBoxLvl.style.display = 'none';
        selectBox.classList.toggle('show');
    }
}


function selectLvl () {
    easy = 'Easy';
    normal = 'Normal';
    hard = 'Hard';
    lis.forEach((li)=>{
    li.addEventListener('click' , (li)=> {
        defaultLvlName;
        lis.forEach((li) => {
            li.classList.remove('active');
        })
            li.currentTarget.classList.add('active');
        if (li.currentTarget.classList.contains('ea')) {
            defaultLvlName = easy;
        }
        else if (li.currentTarget.classList.contains('no')) {
            defaultLvlName = normal;
        }
        else if (li.currentTarget.classList.contains('hr')) {
            defaultLvlName = hard;
        } else{
            defaultLvlName = normal;
        }
defaultLvlSec = lvl[defaultLvlName];
levels.innerHTML = defaultLvlName;
second.innerHTML = defaultLvlSec;
timeLeft.innerHTML = defaultLvlSec;
        
    })
})
}


total.innerHTML = wordsArray.length;



let time  = new Date();
selectLvl();
start.onclick =function ()  {
    input.focus();
    this.remove()
    genWords();
}

input.onpaste = () => {
    return false;
}


function genWords() {
    let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    let wordIndex = wordsArray.indexOf(randomWord);
    wordsArray.splice(wordIndex , 1);
    words.innerHTML = '';
    upcomingWords.innerHTML = '';
    words.append(randomWord);
    // generate Word
    for (let i = 0; i < wordsArray.length ; i++ ) {
        let div = document.createElement('div')
        let txt = document.createTextNode(wordsArray[i]);
        div.appendChild(txt);
        upcomingWords.append(div);
    }
    startPlaying();
}



function startPlaying() {
    let start = setInterval(() => {
        let holdOn = setTimeout(()=> {
            timeLeft.innerHTML--;
            +timeLeft.innerHTML <= 0 ? clearTimeout(holdOn) : '';
        },2000)
        // timeLeft.innerHTML--;
        if (timeLeft.innerHTML === '0') {
            clearTimeout(holdOn);
            clearInterval(start);
                timeLeft.innerHTML += 2;
            if (words.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = '';
                score.innerHTML++;
                
                localStorage.setItem('score' , `Your Score is ${score.innerHTML} in the Day ${time.getDay()  +'/' +time.getMonth() + '/' + time.getFullYear() }`)
                if (wordsArray.length > 0) {
                    genWords();
                timeLeft.innerHTML = defaultLvlSec;
                }else {
                    let div = document.createElement('span');
                    div.classList.add('good')
                    let winTxt = document.createTextNode('Congrats You win');
                    div.appendChild(winTxt);
                    finish.append(div);
                    setTimeout (e => {
                        window.location.reload();
                    }, 8000)

                }
            }else {
                let div = document.createElement('span');
                div.classList.add('bad')
                let spanTxt = document.createTextNode('Game Over');
                div.appendChild(spanTxt);
                finish.append(div);
                upcomingWords.remove();
                                    setTimeout (e => {
                        window.location.reload();
                    }, 8000)
            }
        }
    }, 1000)
}


