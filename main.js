window.addEventListener('DOMContentLoaded',()=>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    
    for(let i of tiles) i.addEventListener('click', handleButt);
    
    let  table= ['', '', '', '', '', '', '', '', ''];
    let Active=true;
    
    resetButton.onclick = () => {
        table= ['', '', '', '', '', '', '', '', ''];
        for(let i of tiles) {
            i.innerHTML = '';
            i.style.border = "1px solid white";
            i.style.color = "black"
        }
    }
    
    // winningconditions
    const winningConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [2, 5, 8], //comma wanted to kill me
        [6, 7, 8],
        [2, 4, 6],
        [1, 4, 7],
        [3, 4, 5],
    ];
    
    // result text
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';
    let is_x = true
    
    function gameBrain(){
        let check= false;
        let who = ''
        for(let i of winningConditions) {
            if(table[i[0]] === table[i[1]] && table[i[1]]=== table[i[2]]) {
                for(let j of tiles) {
                    if(i.includes(Number(j.id))) {
                        j.style.border = "3px solid green";
                        j.style.color = "green"
                    }
                }
                check = true;
                who = table[i[0]];
                break;
            }
        }
        if(check){
            announcer.style.display = "block";
            announcer.innerHTML = `player ${who} won`
            setTimeout( () => {
                table= ['', '', '', '', '', '', '', '', ''];
                for(let i of tiles) {
                    i.innerHTML = '';
                    i.style.border = "1px solid white";
                    i.style.color = "black"
                }
                announcer.style.display = "none";
            },2000)
            
        }


    }
    function handleButt (e) {
        let button = e.target;
        if(!table[button.id]) {
            button.innerHTML = is_x ? 'X' : "O";
            table[button.id] = is_x ? 'X' : "O";
            is_x = !is_x;
            playerDisplay.innerHTML = is_x ? 'X' : "O"
            if((() => {
                let count = 0;
                for(let k of table) count += k ? 1 : 0;
                return count
            })() >= 5) {
                gameBrain()
            }


        }
    }
    
} );

let  table= ['', '', '', '', '', '', '', '', ''];
let Active=true;

// winningconditions
const winningConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [2, 5, 8],
    [6, 7, 8],
    [2, 4, 6]
    [1, 4, 7],
    [3, 4, 5],
];


