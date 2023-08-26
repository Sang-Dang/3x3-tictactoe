import { useState, createContext, useCallback } from 'react'

type gameContextProps = {
    squaresArray: squareValues[]
    winner: winnerValues
    handleSquareClick: (arrayIndex: number) => void
    resetBoard: () => void
}

const defaultGameValues = {
    squaresArray: new Array<squareValues>(9).fill(' '),
    setSquaresArray: () => {},
    currentPlayer: 'x' as playerValues,
    setCurrentPlayer: () => {},
    setWinner: () => {}
}

// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext<gameContextProps>({
    squaresArray: defaultGameValues.squaresArray,
    winner: undefined,
    handleSquareClick: () => {},
    resetBoard: () => {}
})

type GameProps = {
    children: React.ReactNode
}

export default function Game({ children }: GameProps) {
    const [squaresArray, setSquaresArray] = useState<squareValues[]>(defaultGameValues.squaresArray)
    const [currentPlayer, setCurrentPlayer] = useState<playerValues>(
        defaultGameValues.currentPlayer
    )
    const [winner, setWinner] = useState<winnerValues>()

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
        console.log(currentArray)
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

                setSquaresArray(newSquaresArray)
                setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x')
                setWinner(calculateWinner(newSquaresArray))
            }
        },
        [currentPlayer, squaresArray, winner]
    )

    const resetBoard = useCallback(() => {
        setSquaresArray(new Array<squareValues>(9).fill(' '))
        setCurrentPlayer('x')
        setWinner(undefined)
    }, [])

    return (
        <gameContext.Provider value={{ squaresArray, handleSquareClick, winner, resetBoard }}>
            {children}
        </gameContext.Provider>
    )
}
