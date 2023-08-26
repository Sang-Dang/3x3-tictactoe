import { useEffect } from 'react'
import useTicTacToe from '../hooks/useTicTacToe'
import Square from './Square'

export default function Board() {
    const { squaresArray, handleSquareClick, winner, resetBoard } = useTicTacToe()

    useEffect(() => {}, [squaresArray])

    return (
        <main>
            <div>{!!winner && `${winner} has won!`}</div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Square value={squaresArray[0]} handleClick={() => handleSquareClick(0)} />
                    <Square value={squaresArray[1]} handleClick={() => handleSquareClick(1)} />
                    <Square value={squaresArray[2]} handleClick={() => handleSquareClick(2)} />
                </div>
                <div className="flex items-center gap-2">
                    <Square value={squaresArray[3]} handleClick={() => handleSquareClick(3)} />
                    <Square value={squaresArray[4]} handleClick={() => handleSquareClick(4)} />
                    <Square value={squaresArray[5]} handleClick={() => handleSquareClick(5)} />
                </div>
                <div className="flex items-center gap-2">
                    <Square value={squaresArray[6]} handleClick={() => handleSquareClick(6)} />
                    <Square value={squaresArray[7]} handleClick={() => handleSquareClick(7)} />
                    <Square value={squaresArray[8]} handleClick={() => handleSquareClick(8)} />
                </div>
            </div>
            <button className="mt-5 w-16 bg-red-500 text-white" onClick={resetBoard}>
                Reset
            </button>
        </main>
    )
}
