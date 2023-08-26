import { cn } from '@/lib/utils'

type SquareProps = {
    value: squareValues
    handleClick: () => void
}

export default function Square({ value, handleClick }: SquareProps) {
    return (
        <button
            className={cn(
                'block h-20 w-20 rounded-sm bg-slate-300 p-0 text-3xl font-extrabold text-white transition-all hover:bg-slate-300/90',
                value === 'x' && 'bg-red-500 hover:bg-red-500/90',
                value === 'o' && 'bg-blue-500 hover:bg-blue-500/90'
            )}
            onClick={handleClick}
        >
            {value}
        </button>
    )
}
