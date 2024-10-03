console.log("tic tac toe");
const display=(()=>{
    const displaymessage=(message)=>{
        document.querySelector('.message').innerHTML=message;
    }
    return{
        displaymessage
    }

})();
const GameBoard=(()=>{
    const gameboard=['','','','','','','','',''];

    const render=()=>{
        let boardHTML="";
        gameboard.forEach((square,index)=>{
            boardHTML+=`<div class="square" id="square-${index}"> ${square}</div>`;
        });
            document.querySelector('#gameboard').innerHTML=boardHTML;
            const squares=document.querySelectorAll('.square');
            squares.forEach((square)=>{
                square.addEventListener('click',game.markclick);
            });
           
    }
    const getgameboard=()=>gameboard;
      const update=(index,value)=>{
        gameboard[index]=value;
        render();
      }
    
        return{
            render,
            update,
            getgameboard
        }
    
})();
const createplayer=(name,mark)=>{
    return{
        name,
        mark,
    }
};
const game=(()=>{
    let gameover;
    let currentplayerindex;
    let players=[];
    const start=()=>{
        players=[
            createplayer(document.querySelector('#player1').value,'X'),
            createplayer(document.querySelector('#player2').value,'0'),
        ]
        gameover=false;
        currentplayerindex=0;
        GameBoard.render();
        const squares=document.querySelectorAll('.square');
        squares.forEach((square)=>{
            square.addEventListener('click',markclick);
        });
    };
    const markclick=(event)=>{
        if(gameover){
            return;
        }
        let index=parseInt(event.target.id.split("-")[1]);
        if(GameBoard.getgameboard()[index]!="")return;
        GameBoard.update(index,players[currentplayerindex].mark);
        if(winnercheck(GameBoard.getgameboard(),players[currentplayerindex].mark)){
            gameover=true;
            display.displaymessage(`${players[currentplayerindex].name} win!`);
        }else if(drawcheck(GameBoard.getgameboard())){
            gameover=true;
            display.displaymessage(`Match Draw`);
        }
        currentplayerindex=currentplayerindex==0?1:0;
    }
    function winnercheck(board,mark){
        const winningconditions=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        // for(let i=0;i<winningconditions.length;i++){
        //     const [a,b,c]=winningconditions[i];
        //     if(board[a] && board[a]===board[b]&& board[a]===board[c]){
        //         return true;
        //     }
        //     return false;
        // }
        return winningconditions.some(combination => combination.every(index => board[index] === mark));
    }
    function drawcheck(board){
        return board.every(cell=>cell!="");
    }
    const reset=()=>{
        for(let i=0;i<9;i++){
            GameBoard.update(i,"");
        }
        GameBoard.render();
        gameover=false;
        document.querySelector('message').innerHTML="";
    }
    return{
        start,
        markclick,
        reset,
    }

})();
const startbutton=document.querySelector('#startbtn');
const resetbutton=document.querySelector('#resetbtn');
startbutton.addEventListener('click',()=>{
    game.start();
})
resetbutton.addEventListener('click',()=>{
    game.reset();
})


