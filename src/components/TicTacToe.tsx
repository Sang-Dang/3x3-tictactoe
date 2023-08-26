import { useState, createContext, useCallback } from 'react'

type gameContextProps = {
    squaresArray: squareValues[]
    winner: winnerValues
    handleSquareClick: (arrayIndex: number) => void
    resetBoard: () => void
    history: historyEntry[]
}

const defaultValues = Object.freeze({
    squaresArray: new Array<squareValues>(9).fill(' '),
    currentPlayer: 'x' as playerValues,
    winner: undefined
})

// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext<gameContextProps>({
    squaresArray: defaultValues.squaresArray,
    winner: undefined,
    handleSquareClick: () => {},
    resetBoard: () => {},
    history: []
})

type GameProps = {
    children: React.ReactNode
}

export default function Game({ children }: GameProps) {
    const [squaresArray, setSquaresArray] = useState<squareValues[]>(defaultValues.squaresArray)
    const [currentPlayer, setCurrentPlayer] = useState<playerValues>(defaultValues.currentPlayer)
    const [winner, setWinner] = useState<winnerValues>()
    const [history, setHistory] = useState<historyEntry[]>([])

    function calculateWinner(currentArray: squareValues[]): winnerValues {
        const winningPositions = [
            [0, 4, 8],
            [2, 4, 6],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ]
        for (const [a, b, c] of winningPositions) {
            if (
                currentArray[a] !== ' ' &&
                currentArray[a] === currentArray[b] &&
                currentArray[a] === currentArray[c]
            ) {
                return currentArray[a] as winnerValues
            }
        }

        return currentArray.includes(' ') ? undefined : 'draw'
    }

    const handleSquareClick = useCallback(
        (arrayIndex: number) => {
            if (winner === undefined && squaresArray[arrayIndex] === ' ') {
                const newSquaresArray = [...squaresArray]
                newSquaresArray[arrayIndex] = currentPlayer

                const isWinner = calculateWinner(newSquaresArray)

                setSquaresArray(newSquaresArray)
                setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x')
                setWinner(isWinner)

                setHistory((prev) => {
                    prev.push({
                        createdAt: new Date(),
                        player: currentPlayer,
                        selectedSquare: arrayIndex,
                        winStatus: isWinner
                    })
                    return prev
                })
            }
        },
        [currentPlayer, squaresArray, winner]
    )

    const resetBoard = useCallback(() => {
        setSquaresArray(defaultValues.squaresArray)
        setCurrentPlayer(defaultValues.currentPlayer)
        setWinner(defaultValues.winner)
        setHistory([])
    }, [])

    return (
        <gameContext.Provider
            value={{ squaresArray, handleSquareClick, winner, resetBoard, history }}
        >
            {children}
        </gameContext.Provider>
    )
}
