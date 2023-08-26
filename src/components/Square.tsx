import { cn, random } from '@/lib/utils'
import XOtoIcon from './util/XOtoIcon'
import { motion } from 'framer-motion'

type SquareProps = {
    value: squareValues
    handleClick: () => void
}

export default function Square({ value, handleClick }: SquareProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.1, rotate: `${random(-4, 4)}deg` }}
            whileTap={{
                scale: 1
            }}
            transition={{ duration: 0.3 }}
            className={cn(
                'grid h-20 w-20 place-items-center rounded-sm bg-slate-300 p-0 transition-all hover:bg-slate-300/90',
                value === 'x' && 'bg-red-500 hover:bg-red-500/90',
                value === 'o' && 'bg-blue-500 hover:bg-blue-500/90'
            )}
            onClick={handleClick}
        >
            <XOtoIcon current={value} size={40} strokeWidth={2.8} />
        </motion.button>
    )
}
