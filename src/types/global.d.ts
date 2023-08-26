export {}

declare global {
    type squareValues = 'x' | 'o' | ' '
    type playerValues = 'x' | 'o'
    type winnerValues = playerValues | 'draw' | undefined
    type Theme = 'dark' | 'light' | 'system'
    type historyEntry = {
        player: playerValues
        selectedSquare: number
        createdAt: Date
        winStatus: winnerValues
    }
}
