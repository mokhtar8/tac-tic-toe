import React, { useState } from 'react';
import styles from './parent.module.css'
import {X,O} from './util/main'

export default function Parent() {
  const X = 'X';
 const O = 'O';
const [square, setSquare] = useState(Array(9).fill(null));
const [xIsNext, setXIsNext] = useState(true);
const [scores, setScores] = useState({ X: 0, O: 0 });


// win state f
const getWinner = (squares) => {
    const lines = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7],
      [2, 5, 8], 
      [0, 4, 8],
      [2, 4, 6], 
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; 
      }
    }
    return null; 
  };


const clickhandler =(index) =>{
  if (square[index] || getWinner(square))return
  const newSquare = [...square];
  newSquare[index] = xIsNext ? X: O;
  setSquare(newSquare);
  setXIsNext(!xIsNext);
//update scores f
  const winner = getWinner(newSquare);
    if (winner) {
      setScores((prevScores) => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1,
      }));
    }
}
// render squar f
const renderSquare = (index)=>{
return <button className={styles.square} onClick={ () => clickhandler(index)}>{square[index]}</button>
}
//reset f
const reset = () => {
    setSquare(Array(9).fill(null));
    setXIsNext(true);
   setScores({ X: 0, O: 0 })
  };
  //next game f
const nextGame = () => {
    setSquare(Array(9).fill(null));
    setXIsNext(true);
  };

const winner = getWinner(square);
  const status = winner ? `برنده: ${winner}` : `نوبت بازیکن: ${xIsNext ? X: O } `;

  return (
    <div>
<h2>{status}</h2>
        <div className={styles.players}>  

            <h3>player X : {scores.X}</h3>
            <h3> player O : {scores.O}</h3>
        </div>
        <div className={styles.board}>
      <div className={styles.boardrow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles.boardrow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles.boardrow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div> 

    <div className={styles.newgame}>
      <button className={styles.reset} onClick={ () => reset()}>reset</button>
      <button className={styles.nextGame} onClick={ () => nextGame()}>next</button>
    </div>
     </div>
        
     
  )
}
