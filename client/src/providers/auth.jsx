'use client'

import { Authenticator, Heading, useAuthenticator, View } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID,
    },
  },
})

const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: 'Enter your username',
      label: 'Username',
      inputProps: { type: 'username', required: true },
    },
    email: {
      order: 2,
      placeholder: 'Enter your email',
      label: 'Email',
      inputProps: { type: 'email', required: true },
    },
    password: {
      order: 3,
      placeholder: 'Enter your password',
      label: 'Password',
      inputProps: { type: 'password', required: true },
    },
    confirm_password: {
      order: 4,
      placeholder: 'Confirm your password',
      label: 'Confirm password',
      inputProps: { type: 'password', required: true },
    },
  },
}

const components = {
  Header() {
    return (
      <View className="mt-4 mb-7">
        <Heading level={3} className="!text-2xl !font-bold">
          <div className="flex items-center justify-center">
            <Image src="/logo.png" alt="logo" height={64} width={64} />
            FinGenie
          </div>
        </Heading>
      </View>
    )
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator()
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <button
              onClick={toSignUp}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              Sign up here
            </button>
          </p>
        </View>
      )
    },
  },
  SignUp: {
    Footer() {
      const { toSignIn } = useAuthenticator()
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={toSignIn}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              Sign in
            </button>
          </p>
        </View>
      )
    },
  },
}

export default function Auth({ children }) {
  const { user } = useAuthenticator((context) => [context.user])
  const router = useRouter()
  const pathname = usePathname()

  const isAuthPage = pathname.match(/^\/(signin|signup)$/)
  const publicPage = pathname === '/'

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (user && isAuthPage) {
      router.push('/dashboard')
    }
  }, [user, isAuthPage, router, publicPage])

  // Allow access to public pages without authentication
  if (!isAuthPage && publicPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-dvh">
      <Authenticator
        initialState={pathname.includes('signup') ? 'signUp' : 'signIn'}
        components={components}
        formFields={formFields}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  )
}