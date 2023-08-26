import { useState, createContext } from 'react'
import Board from './Board'

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

export default function Game() {
    const [squaresArray, setSquaresArray] = useState<squareValues[]>(defaultGameValues.squaresArray)
    const [currentPlayer, setCurrentPlayer] = useState<playerValues>(
        defaultGameValues.currentPlayer
    )
    const [winner, setWinner] = useState<winnerValues>()

    function resetBoard() {
        setSquaresArray(new Array<squareValues>(9).fill(' '))
        setCurrentPlayer('x')
        setWinner(undefined)
    }

    function calculateWinner(): winnerValues {
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
                squaresArray[a] !== ' ' &&
                squaresArray[a] === squaresArray[b] &&
                squaresArray[a] === squaresArray[c]
            ) {
                return squaresArray[a] as winnerValues
            }
        }

        return squaresArray.includes(' ') ? undefined : 'draw'
    }

    function handleSquareClick(arrayIndex: number) {
        if (squaresArray[arrayIndex] === ' ') {
            squaresArray[arrayIndex] = currentPlayer
            setSquaresArray(squaresArray)
            setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x')

            const result = calculateWinner()
            console.log(result)
            if (result) {
                setWinner(result)
            }
        }
    }

    return (
        <gameContext.Provider value={{ squaresArray, handleSquareClick, winner, resetBoard }}>
            <Board />
        </gameContext.Provider>
    )
}
