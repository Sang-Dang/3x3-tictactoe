import { useEffect } from 'react'
import useTicTacToe from '../hooks/useTicTacToe'
import Square from './Square'

export default function Board() {
    const { squaresArray, handleSquareClick, winner, resetBoard } = useTicTacToe()

    useEffect(() => {}, [squaresArray])

    return (
        <main className="grid h-screen w-screen place-items-center">
            <section>
                <header className="mb-5">
                    <h1 className="text-center text-4xl font-extrabold">Tic Tac Toe</h1>
                </header>
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
                <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="block h-full w-full bg-slate-200 p-1 px-3">
                        {winner === 'draw' ? (
                            "It's a draw!"
                        ) : winner ? (
                            <>
                                <span className="font-bold">{winner}</span> has won the game!
                            </>
                        ) : (
                            'Playing game...'
                        )}
                    </div>
                    <button
                        className="w-16 bg-red-500 p-1 text-white disabled:bg-red-500/10"
                        onClick={resetBoard}
                        disabled={squaresArray.every((val) => val === ' ')}
                    >
                        Reset
                    </button>
                </div>
            </section>
        </main>
    )
}
