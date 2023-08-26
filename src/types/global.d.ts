export {}

declare global {
    type squareValues = 'x' | 'o' | ' '
    type playerValues = 'x' | 'o'
    type winnerValues = playerValues | 'draw' | undefined
}
