let startBtn = document.querySelector('.startBtn');
let restartBtn = document.querySelector('.restartBtn');
let displayLevel = document.querySelector('.displayLevel');

//click counter
let clicks = 0;
let level = 1;
let levelTime = 0;
let counter = 0;

//start game
startBtn.innerHTML="Start level "+level;
startBtn.addEventListener('click', game);


function game(){
    displayLevel.style.display="block";
    displayLevel.innerHTML="Level : "+level;
    startBtn.removeEventListener('click', game);
    let container = document.querySelector('.container');
    let twoFliped = [];
    startBtn.innerHTML="Clicks : "+clicks;
    createTable();
    createTimer();

    let boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.addEventListener('click', flip));
    
    
    function flip(){
        this.removeEventListener('click', flip);
        clicks++;
        startBtn.innerHTML="Clicks : "+clicks;

        twoFliped.push(this);
        let back = this.querySelector('.back');
        let front = this.querySelector('.front');
    
        front.style.transform = "rotateY(180deg)";
        back.style.transform = "rotateY(0deg)";
    
    
        if(twoFliped.length === 2){
            checkTiles();
        }
    }
    
    function checkTiles(){
    
        removeClicks();
    
        let front1 = twoFliped[0].querySelector('.front');
        let back1 = twoFliped[0].querySelector('.back');
        let front2 = twoFliped[1].querySelector('.front');
        let back2 = twoFliped[1].querySelector('.back');
    
        if(back1.innerHTML === back2.innerHTML){ 
            twoFliped[0].className = "selected";
            twoFliped[1].className = "selected";
            twoFliped.length=0;
            addClicks();
        }
        else {
            setTimeout(()=>{
                front1.style.transform = "rotateY(0deg)";
                back1.style.transform = "rotateY(180deg)";
                front2.style.transform = "rotateY(0deg)";
                back2.style.transform = "rotateY(180deg)";
    
                twoFliped.length=0;
                addClicks();
            },700)
        
        }
    }
    
    
    function removeClicks(){
        boxes.forEach(box => box.removeEventListener('click', flip))
    }
    
    function addClicks(){
        let boxes = document.querySelectorAll('.box');
        if(boxes.length===0){
    
            //next level
            level++;
            startBtn.addEventListener('click',game);
            startBtn.innerHTML = "Start level "+level;
            game();
    
        }
        boxes.forEach(box => box.addEventListener('click', flip))
    }
    
    function createTable(){
        icons_copy=icons.slice();
        let text = ``;
        for (let i = 0; i < 36; i++) {
            let rand = Math.floor(Math.random()*icons_copy.length)
            text +=`
                <div class="box">
                    <div class="back">${icons_copy[rand]}</div>
                    <div class="front"></div>
                </div>
            `
            icons_copy.splice(rand,1)
        }
        container.innerHTML=text;
    }
   function createTimer(){
       let timerText = ``;
       for (let i = 0; i < 200-(level*10); i++) {
           timerText+=`
                <div class="cell_of_timer" style="width:${600/(200-(level*10))}px"> </div>
           `
           levelTime++;
       }
       let timer = document.querySelector('.timer');
       timer.innerHTML=timerText;
       timer.style.border="1px solid black";
       const myInterval = setInterval(myTimer, 1000);

       function myTimer(){
        if(counter != levelTime){
            let cell_of_timer = document.querySelector('.cell_of_timer');
            cell_of_timer.className="cell_of_timer_spent";
            ++counter;
            console.log(counter, levelTime);
            }
        else{
            clearInterval(myInterval);
            startBtn.innerHTML= "Game over";
            startBtn.className = "gameOverBtn";
            removeClicks();
            restartBtn.style.display="block";
            restartBtn.innerHTML="Restart game";
            restartBtn.addEventListener('click', restartGame);
        }
        }
   }

   function restartGame(){
       level = 1;
       restartBtn.style.display="none";
       game();
       restartBtn.removeEventListener('click',restartGame);
   }

   
}


