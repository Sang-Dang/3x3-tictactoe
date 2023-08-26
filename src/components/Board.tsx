import Square from '@/components/Square'
import { Button } from '@/components/ui/button'
import useTicTacToe from '@/hooks/useTicTacToe'
import { cn } from '@/lib/utils'
import Settings from '@/components/Settings'
import { useEffect, useState } from 'react'
import { useToast } from './ui/use-toast'
import { ToastAction } from './ui/toast'
import HistoryViewer from './HistoryViewer'

export default function Board() {
    const { squaresArray, handleSquareClick, winner, resetBoard } = useTicTacToe()
    const { toast } = useToast()
    const [showHistory, setShowHistory] = useState<boolean>(false)

    useEffect(() => {}, [squaresArray])
    useEffect(() => {
        if (winner) {
            if (winner === 'draw') {
                toast({
                    title: "It's a draw!",
                    description: 'Play again and see if either of you win!',
                    action: (
                        <ToastAction altText="Try again" onClick={resetBoard}>
                            Try again
                        </ToastAction>
                    )
                })
            } else {
                toast({
                    title: `${winner} has won the game!`,
                    description: "Play again and see if you'll win!",
                    action: (
                        <ToastAction altText="Try again" onClick={resetBoard}>
                            Try again
                        </ToastAction>
                    )
                })
            }
        }
    }, [resetBoard, toast, winner])

    return (
        <main
            className={cn(
                'relative min-h-screen w-screen place-items-center bg-white py-20 transition-all duration-100 dark:bg-slate-800 lg:h-screen lg:py-0',
                winner === 'x' && 'bg-red-50',
                winner === 'o' && 'bg-blue-50'
            )}
        >
            <div
                className={cn(
                    'grid h-full w-full grid-cols-1 place-items-center gap-10 lg:gap-0 lg:px-96',
                    showHistory && 'lg:grid-cols-2'
                )}
            >
                <section>
                    <header className="mb-5">
                        <h1 className="text-center text-4xl font-extrabold">Tic Tac Toe</h1>
                    </header>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Square
                                value={squaresArray[0]}
                                handleClick={() => handleSquareClick(0)}
                            />
                            <Square
                                value={squaresArray[1]}
                                handleClick={() => handleSquareClick(1)}
                            />
                            <Square
                                value={squaresArray[2]}
                                handleClick={() => handleSquareClick(2)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Square
                                value={squaresArray[3]}
                                handleClick={() => handleSquareClick(3)}
                            />
                            <Square
                                value={squaresArray[4]}
                                handleClick={() => handleSquareClick(4)}
                            />
                            <Square
                                value={squaresArray[5]}
                                handleClick={() => handleSquareClick(5)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Square
                                value={squaresArray[6]}
                                handleClick={() => handleSquareClick(6)}
                            />
                            <Square
                                value={squaresArray[7]}
                                handleClick={() => handleSquareClick(7)}
                            />
                            <Square
                                value={squaresArray[8]}
                                handleClick={() => handleSquareClick(8)}
                            />
                        </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3">
                        <Settings />
                        <Button
                            className="w-full bg-slate-300"
                            onClick={() => setShowHistory(!showHistory)}
                        >
                            History
                        </Button>
                        <Button
                            variant="destructive"
                            className="w-16 bg-red-500 p-1 px-3 text-white transition-all hover:bg-red-500/80"
                            onClick={resetBoard}
                            disabled={squaresArray.every((val) => val === ' ')}
                        >
                            Reset
                        </Button>
                    </div>
                </section>
                {showHistory && <HistoryViewer handleClose={() => setShowHistory(!showHistory)} />}
            </div>
        </main>
    )
}
