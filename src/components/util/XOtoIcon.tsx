import { Circle, LucideProps, X } from 'lucide-react'

type XOtoIconProps = {
    current: squareValues
} & LucideProps

export default function XOtoIcon({ current, ...otherProps }: XOtoIconProps) {
    if (current === 'o') {
        return <Circle {...otherProps} />
    } else if (current === 'x') {
        return <X {...otherProps} />
    } else {
        return
    }
}
