import { useContext } from 'react'
import { gameContext } from '@/components/TicTacToe'

export default function useTicTacToe() {
    return useContext(gameContext)
}
