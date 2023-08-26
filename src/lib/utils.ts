import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function squareNumberToText(number: number) {
    switch (number) {
        case 0:
            return 'top-left'
        case 1:
            return 'top-middle'
        case 2:
            return 'top-right'
        case 3:
            return 'middle-left'
        case 4:
            return 'center'
        case 5:
            return 'middle-right'
        case 6:
            return 'bottom-left'
        case 7:
            return 'bottom-middle'
        case 8:
            return 'bottom-right'
        default:
            return 'unknown'
    }
}

export function random(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
