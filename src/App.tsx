import React, { ReactNode, useState } from 'react';
import './App.css';

type SquarValue = 'X' | 'O' | null;

interface SquareProps {
  onClick: () => void;
  value: SquarValue;
}

interface BoardProps {
  onClick: (i: number) => void;
  squares: SquarValue[];
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board: React.FC = () => {
  const [boardSquares, setBoard] = useState<SquarValue[]>(Array(9).fill(null));

  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick: Function = (index: number): void | null => {
    const squares = [...boardSquares];
    console.log('isNext', xIsNext); //true

    // if the index is filled with values
    if (calculateWinner(boardSquares) || squares[index]) return null;

    //mutate X | O

    squares[index] = xIsNext ? 'X' : 'O';
    console.log('squareIndex', squares[index]); //X

    //Calucate next values;

    setBoard(squares); // [1,null,null]
    console.log('bordset', boardSquares);

    setXIsNext(!xIsNext); //false
    console.log('setXIsNext', xIsNext);
  };

  const renderSquare = (i: number): ReactNode => {
    return <Square value={boardSquares[i]} onClick={() => handleClick(i)} />;
  };

  //intial Status
  let status: string;
  const winner: SquarValue = calculateWinner(boardSquares);
  status = winner
    ? `Winner is ${winner}`
    : `Next Player : ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const calculateWinner = (squares: SquarValue[]): SquarValue => {
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

function App() {
  return (
    <div>
      <Board />
    </div>
  );
}

export default App;
