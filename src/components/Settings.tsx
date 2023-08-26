import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import ThemeChanger from './ThemeChanger'
import { Button } from '@/components/ui/button'
import { Settings as LuSettings } from 'lucide-react'

export default function Settings() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-10 p-0">
                    <LuSettings />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>Configure your Tic Tac Toe game!</DialogDescription>
                </DialogHeader>
                <div>
                    <ThemeChanger />
                </div>
            </DialogContent>
        </Dialog>
    )
}
