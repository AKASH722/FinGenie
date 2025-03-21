'use client'

import { Authenticator } from '@aws-amplify/ui-react'
import Auth from '@/providers/auth'

export default function AuthProvider({ children }) {
  return (
    <Authenticator.Provider>
      <Auth>
        {children}
      </Auth>
    </Authenticator.Provider>
  )
}
