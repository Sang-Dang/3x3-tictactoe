type SquareProps = {
    value: squareValues
    handleClick: () => void
}

export default function Square({ value, handleClick }: SquareProps) {
    return (
        <button
            className="block h-20 w-20 bg-slate-500 p-0 text-3xl font-extrabold text-white"
            onClick={handleClick}
        >
            {value}
        </button>
    )
}
