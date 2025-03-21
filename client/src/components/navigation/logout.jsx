'use client'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useMediaQuery } from '@/hooks/use-media-query'
import { signOut } from 'aws-amplify/auth'

export default function Logout() {
  const isLaptop = useMediaQuery('(min-width: 1024px)')

  async function handleSignOut() {
    await signOut()
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isLaptop ? (
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        ) : (
          <button
            className="flex flex-col items-center justify-center px-2 text-xs font-medium text-muted-foreground hover:text-primary">
            <LogOut className="h-5 w-5 mb-1" />
            <span>Logout</span>
          </button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
