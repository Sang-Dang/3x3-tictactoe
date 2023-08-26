import { ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'
import useTicTacToe from '@/hooks/useTicTacToe'
import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { cn, squareNumberToText } from '@/lib/utils'
import XOtoIcon from './util/XOtoIcon'
import { AnimatePresence, motion } from 'framer-motion'

type HistoryViewerProps = {
    handleClose: () => void
}

export default function HistoryViewer({ handleClose }: HistoryViewerProps) {
    const { history } = useTicTacToe()

    /**
     * the purpose of this is solely to move the scrollbar
     * to the bottommost position in the history container
     * (see scrollAreaRef and endOfHistoryRef)
     *
     * historyLength is not used anywhere else =)
     */
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const endOfHistoryRef = useRef<HTMLDivElement>(null)
    const [historyLength, setHistoryLength] = useState<number>(history.length)
    useEffect(() => {
        setHistoryLength(history.length)
        endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [historyLength, history.length])

    return (
        <AnimatePresence>
            <motion.section
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="flex h-96 w-[50vw] flex-col justify-between gap-6 rounded-lg bg-slate-300 p-6 dark:bg-slate-700 lg:w-full"
            >
                <header className="flex justify-between gap-2">
                    <Button className="px-3" onClick={handleClose}>
                        <ArrowLeft />
                    </Button>
                    <h3 className="bg-primary grid h-10 w-full place-items-center rounded-md font-bold text-slate-100 dark:text-slate-800">
                        History
                    </h3>
                </header>
                <ScrollArea className="relative h-full" ref={scrollAreaRef}>
                    <AnimatePresence>
                        {history.length === 0 && (
                            <motion.div
                                exit={{ opacity: 0 }}
                                initial={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 cursor-default select-none text-lg font-extrabold tracking-wider text-slate-800/70"
                            >
                                Click a tile to begin!
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="flex flex-col gap-3">
                        {history.map((entry, index) => (
                            <motion.div
                                key={entry.createdAt.toISOString()}
                                className={cn(
                                    'cursor-pointer select-none rounded-md bg-slate-900/40 p-3 transition-all duration-100 hover:bg-slate-900/20'
                                )}
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                transition={{ type: 'spring' }}
                            >
                                <span>{index + 1}. </span>
                                <span
                                    className={cn(
                                        'mx-2 inline-grid h-6 w-6 place-items-center rounded-md font-extrabold',
                                        entry.player === 'x' && 'bg-red-500',
                                        entry.player === 'o' && 'bg-blue-500'
                                    )}
                                >
                                    <XOtoIcon current={entry.player} size={15} strokeWidth={4} />
                                </span>
                                <span> went </span>
                                <span>{squareNumberToText(entry.selectedSquare)}</span>
                            </motion.div>
                        ))}

                        {history.at(-1)?.winStatus === 'draw' ? (
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                transition={{ type: 'spring', delay: 0.4 }}
                                className="cursor-pointer select-none rounded-md bg-yellow-400 p-3 text-center text-xl font-bold text-yellow-900 transition-all duration-100 hover:bg-yellow-400/80"
                            >
                                It's a draw!
                            </motion.div>
                        ) : history.at(-1)?.winStatus === 'o' ? (
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                transition={{ type: 'spring', delay: 0.4 }}
                                className="cursor-pointer select-none rounded-md bg-blue-500 p-3 text-center text-xl font-bold text-blue-900 transition-all duration-100 hover:bg-blue-500/80"
                            >
                                O wins the game!
                            </motion.div>
                        ) : history.at(-1)?.winStatus === 'x' ? (
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                transition={{ type: 'spring', delay: 0.4 }}
                                className="cursor-pointer select-none rounded-md bg-red-500 p-3 text-center text-xl font-bold text-red-900 transition-all duration-100 hover:bg-red-500/80"
                            >
                                X wins the game!
                            </motion.div>
                        ) : undefined}
                    </div>
                    <div ref={endOfHistoryRef} />
                </ScrollArea>
            </motion.section>
        </AnimatePresence>
    )
}
