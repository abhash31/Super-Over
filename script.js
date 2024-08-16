const score = document.querySelector('#score');
const playBtn = document.querySelector('.play-button');
const balls = document.querySelectorAll('.ball');
const targetTxt = document.querySelector('.target');
const comment = document.querySelector('#comment');
const container = document.querySelector('.over-tracker');
// console.log(balls);

const commentary = [
    '"The bowler delivers a dot ball, keeping the batsman scoreless for that delivery."',
    '"A well-placed shot allows the batsman to take a single run."',
    '"The batsman hits the ball into a gap and runs twice."',
    '"The batsman finds ample space and manages to run three."',
    '"The ball crosses the boundary after bouncing, earning four runs."',
    '"A dot ball puts pressure on the batting side as no runs are scored."',
    '"A powerful shot sends the ball over the boundary on the full for six runs."'
];

const commentary2 = [
    '"The team batting first sets a challenging target and secures a victory."',
    '"The team chasing successfully reaches the target to clinch the victory."',
    '"Both teams end up with equal scores, resulting in a draw."',
    '"Innings Break."',
    '"A perfect weather to play some Super-Over."'
]

let index = 0;
let totalRun= 0;
let matchEnd = 0;   
let target = 0;

playBtn.addEventListener('click', function(e){
    if(index<=5 && matchEnd==0){
        let run = randomRun();
        if(run==5) run = 0;
     
        if(index==5 && target==0) {
            playBtn.textContent = 'End First Innings';
        }
        else if(index==5 && target!=0){
            playBtn.textContent = 'End Second Innings';
        }
        comment.textContent = commentary[run];
        balls[index++].textContent = run;
        if(!isNaN(run)) totalRun += run;
        if(target==0) score.textContent = `Score P1: ${totalRun}`;
        else if(target!=0) score.textContent = `Score P2: ${totalRun}`;
        if(target!=0){
            if(totalRun>=target){
                targetTxt.innerHTML = 'Player 2 Wins &#x1F3C6';
                playBtn.textContent = 'End Match';
                comment.textContent = commentary2[1];
                matchEnd = 1;
            }
        }
    } 
    else if(matchEnd==0){
        if(target==0){
            target = totalRun+1;
            targetTxt.textContent = `Player 2 | Second Innings | Target: ${target}`;
            comment.textContent = commentary2[3];
            restart();
        }
        else if(target!=0){
            if(totalRun>=target) {
                targetTxt.innerHTML = 'Player 2 Wins &#x1F3C6';
                comment.textContent = commentary2[1];
            }
            else if(totalRun==target-1){
                targetTxt.textContent = 'Match Draw'
                comment.textContent = commentary2[2];
            }
            else if(totalRun<target) {
                targetTxt.innerHTML = 'Player 1 Wins &#x1F3C6';
                comment.textContent = commentary2[0];
            }
            playBtn.textContent = 'End Match';
            matchEnd = 1;
        }
    }
    else if(matchEnd==1){
        target = 0;
        targetTxt.textContent = 'Player 1 | First Innings';
        comment.textContent = commentary2[4];
        restart();
    }
});

const randomRun = function(){
    return Math.floor(Math.random()*7);
}

function restart(){
    totalRun = 0;
    index = 0;
    matchEnd = 0;
    score.textContent = 'Super-Over';
    playBtn.textContent = 'Play';
    for(let i=0; i<balls.length; i++){
        balls[i].textContent = "";
    }
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        document.querySelector('.light-dark-mode').setAttribute('src', 'dark.png');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        document.querySelector('.light-dark-mode').setAttribute('src', 'light.png');
    }
    localStorage.setItem('theme', theme);
}

document.querySelector('.light-dark-mode').addEventListener('click', () => {
    let currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

let savedTheme = localStorage.getItem('theme');
setTheme(savedTheme);