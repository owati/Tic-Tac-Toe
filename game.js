window.addEventListener('DOMContentLoaded',()=>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const Display = document.querySelector('.display');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    
    for(let i of tiles) i.addEventListener('click', handleButt);
    
    let  table= ['', '', '', '', '', '', '', '', ''];
    let Active=true;

    // RESET FUNCTION
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
    
    
    let is_x = true // INITIALIZING X ... TO VARY BTW X AND O
    

    function count(){  // count function
        let count = 0;
        for(let k of table) count += k ? 1 : 0;
        return count
    }

        
    
    function gameBrain(){ // CHECKS WINNING CONDITIONS TO DETERMINE WINNER
        let win= false;
        let draw= false;
        let who = ''
        for(let i of winningConditions) {
            // console.log(i, table,table[i[0]] === table[i[1]] && table[i[1]]=== table[i[2]])
            if(table[i[0]] && (table[i[0]] === table[i[1]] && table[i[1]]=== table[i[2]])) {
                for(let j of tiles) {
                    if(i.includes(Number(j.id))) {
                        // j.style.border = "1px solid green";
                        j.style.color="green";
                        
                        // this styles ⬇ not working ?

                        // j.style.text-shadow = "4px"; 
                        // j.style.webkit-animation-name = "glow";
                        
                    }
                }
                win = true;
                who = table[i[0]];
                break;
            } else{
                draw=true;
            }
        }
        console.log(count());
      
        if(win){ // WIN
            announcer.style.display = "block";
            Display.style.display="none";
            announcer.innerHTML = `player ${who} won 🎉🎉`        
            setTimeout( () => {
                table= ['', '', '', '', '', '', '', '', ''];
                for(let i of tiles) {  //to return board format back to its original view
                    i.innerHTML = '';
                    i.style.border = "1px solid white";
                    i.style.color = "black"
                }
                announcer.style.display = "none";
                Display.style.display="Block";
                
            },2000)
            
            
        } else if (count()>=9 && draw){  // TIE 
            announcer.style.display = "block";
            Display.style.display="none";
            announcer.innerHTML = "TIE😏";
            setTimeout( () => {
                table= ['', '', '', '', '', '', '', '', ''];
                for(let i of tiles) {  
                    i.innerHTML = '';
                    i.style.border = "1px solid white";
                    i.style.color = "black"
                }
                announcer.style.display = "none";
                Display.style.display="Block";
                
            },2000)

        }


        
            
      
        

    }
    function handleButt (e) {
        let button = e.target;
        if(!table[button.id]) {
            button.innerHTML = is_x ? 'X' : "O";
            button.style.color = is_x? 'orangered':'#0C2953';
            table[button.id] = is_x ? 'X' : "O";
            is_x = !is_x;
            playerDisplay.innerHTML = is_x ? 'X' : "O"
            playerDisplay.style.color = is_x? 'red':'#0C2953';

            if (count()>=5){
                console.log(count);
                gameBrain()
            } 

        }
    }
    
} );