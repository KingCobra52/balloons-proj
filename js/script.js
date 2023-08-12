let colors = ['yellow','red','blue','violet','green'];
let windowWidth = window.innerWidth;
let body = document.body
let scores = document.querySelectorAll('.score'); //List of nodes containing class .score
let num = 0; //The amount of balloons popped
let total = 10; //The goal balloons to be popped
let currentBalloon = 0; //The amount of Balloons created and unique id for each balloon
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow')

function createBalloon(){
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[rand];
    
    rand = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = rand + 'px';
    div.dataset.number = currentBalloon;
    //Gives the distinct id of each div tag
    currentBalloon++;

    body.appendChild(div); //Makes sure div tag is appended inside the body 
    animateBalloon(div);
}

function animateBalloon(element){
    let pos = 0;
    let random = Math.floor(Math.random() * 6 - 3); //Range -> -3 to +3
    let interval = setInterval(frame, 10 - Math.floor(num/10) + random); //-num/10 -> makes balloon move faster as game goes on 

    function frame(){
        // console.log(pos);
        //Logs the vertical location of the balloon on screen 
        if(pos >= (window.innerHeight + 200) && (document.querySelector('[data-number="'+element.dataset.number+'"]') !== null)){ //Checks if balloon div exists 
            clearInterval(interval);
            gameOver = true;
            // deleteBalloon(element);
        } else{
            pos++;
            element.style.top = window.innerHeight - pos + 'px';
        }
    }
}


function deleteBalloon(element){
    element.remove();
    num++;
    updateScore();
}

function updateScore(){
    for(let i = 0; i < scores.length; i++){
        scores[i].textContent = num;
    }
}
function startGame(){
    restartGame();
    let timeout = 0;
    let loop = setInterval(function(){ 
        if(!gameOver && num !== total){ //gameOver = false 
            timeout = Math.floor(Math.random() * 600 -100)
            createBalloon();
        } else if(num !== total){ //gameOver = true 
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.lose').style.display = 'block'; //Takes up avalibile screen width ig 
        } else{
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block';
        }
    },800 + timeout)
}

function restartGame(){
    let forRemoving = document.querySelectorAll('.balloon'); //All balloons 
    for(i = 0;i < forRemoving.length; i++){
        forRemoving[i].remove();
    }
    gameOver = false;
    num = 0;
    updateScore();
}

document.addEventListener('click',function(event){
    if(event.target.classList.contains('balloon')){
        deleteBalloon(event.target);
    }
});

document.querySelector('.restart').addEventListener('click',function(){
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    startGame();
})

document.querySelector('.cancel').addEventListener('click',function(){
    totalShadow.style.display = 'none';
})
startGame();

