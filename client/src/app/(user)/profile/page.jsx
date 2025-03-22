import { Separator } from "@/components/ui/separator"
import { ProfileForm } from '@/app/(user)/profile/_components/profile-form'

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information
          </p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </div>
  )
}
