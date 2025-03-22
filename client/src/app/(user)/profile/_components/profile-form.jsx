'use client'

import { useState } from 'react'
import { useAuthUser, useUpdateUser } from '@/hooks/use-user'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'

export function ProfileForm() {
  const { data: user, isLoading, error } = useAuthUser()
  const updateUser = useUpdateUser()

  const [name, setName] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  // Set initial values when user data is loaded
  useState(() => {
    if (user?.name) {
      setName(user.name)
    }
  })

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let imageUrl = user?.imageUrl

      // Upload image if a new one was selected
      if (imageFile) {
        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", imageFile)
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        imageUrl = data.url
        setIsUploading(false)
      }

      // Update user profile
      await updateUser.mutateAsync({
        userData: {
          name,
          imageUrl,
        },
      })

      toast.success('Your profile has been updated successfully.')
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error('Failed to update profile. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-40" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load profile. Please refresh the page and try again.</AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile details and profile picture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image */}
          <div className="space-y-4">
            <Label htmlFor="profile-image">Profile Image</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={imagePreview || user?.imageUrl} alt={user?.name || user?.username || "Profile"} />
                <AvatarFallback>{user?.name?.charAt(0) || user?.username?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input id="profile-image" type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>
          </div>

          {/* Name (Editable) */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          </div>

          {/* Username (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={user?.username || ""} disabled readOnly />
          </div>

          {/* Email (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email || ""} disabled readOnly />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isUploading || updateUser.isPending} className="ml-auto">
            {(isUploading || updateUser.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

