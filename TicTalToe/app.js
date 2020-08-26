addEventListener("DOMContentLoaded", () => {

    let game = document.querySelector('.game');
    let res = document.querySelector('.res');
    let buttonGame = document.querySelector('.game-button');
    let cell = document.querySelectorAll('.cell');
    let count =0;
    let step = false;
    let circle = `<svg class="circle">
                    <circle cx="58" cy="58" r="45" stroke = "blue" stroke-width = "10" fill = "none" stroke-linecap = "round"/>
                  </svg>`;
    let cross = `<svg class="cross">
                        <line class = "first" x1="15" y1="15"
                        x2="100" y2="100"
                        stroke="red"
                        stroke-width="10"
                        stroke-linecap = "round"/>

                        <line class = "second" x1="100" y1="15"
                        x2="15" y2="100"
                        stroke="red"
                        stroke-width="10"
                        stroke-linecap = "round"/>
                </svg>`;


    function stepCross(target) {
        target.innerHTML = cross;
        target.classList.add('x');
        let crossAudio = new Audio('audio/cross.mp3');
        crossAudio.play();
        count++;
    }

    function stepZero(target){
        target.innerHTML = circle;
        target.classList.add('o');
        let circleAudio = new Audio('audio/zero.mp3');
        circleAudio.play();
        count++;
    }

    function Init(event) {
        if (!step) stepCross(event.target);
        else stepZero(event.target);
        step = !step;
        win();
    }

    function newGame(){
        step =false;
        count = 0;
        res.innerText = '';
        cell.forEach(item => {
            item.innerHTML = '';
            item.classList.remove('x', 'o', 'active');
        });
        game.addEventListener('click',Init);

    }

    function win(){
        let comb = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (let i =0; i <comb.length;i++){
           
            if (cell[comb[i][0]].classList.contains('x') && cell[comb[i][1]].classList.contains('x') && cell[comb[i][2]].classList.contains('x')){
                setTimeout(()=>{
                    cell[comb[i][0]].classList.add('active');
                    cell[comb[i][1]].classList.add('active');
                    cell[comb[i][2]].classList.add('active');
                    res.innerText = "Выйграли Х";
                    
                },1500);
                game.removeEventListener('click',Init);
            }     

            else if (cell[comb[i][0]].classList.contains('o') && cell[comb[i][1]].classList.contains('o') && cell[comb[i][2]].classList.contains('o')){
                setTimeout(()=>{
                    cell[comb[i][0]].classList.add('active');
                    cell[comb[i][1]].classList.add('active');
                    cell[comb[i][2]].classList.add('active');
                    res.innerText = "Выйграли O";
                    
                },1500);
                game.removeEventListener('click',Init);
            }     

            else if (count  == 9){
                res.innerText = "Ничья";
                 game.removeEventListener('click',Init);
            }
        }
    }


    buttonGame.addEventListener('click', newGame);
    game.addEventListener('click', Init);


});