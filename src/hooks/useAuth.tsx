import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  company_id?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('clearscrub_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Mock authentication - in real app, this would call Supabase
      if (email === 'demo@clearscrub.io' && password === 'demo123') {
        const mockUser: User = {
          id: '1',
          email: 'demo@clearscrub.io',
          name: 'Demo User',
          company_id: 'pars_consulting'
        }
        setUser(mockUser)
        localStorage.setItem('clearscrub_user', JSON.stringify(mockUser))
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('clearscrub_user')
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
