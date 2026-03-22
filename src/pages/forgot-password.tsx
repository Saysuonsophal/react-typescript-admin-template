import { PasswordInput } from '@/components/passwordInput'
import { GalleryVerticalEnd } from 'lucide-react'

export const ForgotPassword = () => {
  return (
     <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-6 p-1" />
          </div>
          <h1 className="text-2xl font-light">Shadcn Admin</h1>
        </a>
        <PasswordInput />
      </div>
    </div>
  )
}
