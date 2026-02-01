"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  token: string | null
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
  isReady: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function  AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Load token from localStorage on mount
    const savedToken = localStorage.getItem('authToken')
    // Avoid synchronous setState inside an effect body (lint rule).
    queueMicrotask(() => {
      if (savedToken) {
        setToken(savedToken)
      }
      setIsReady(true)
    })
  }, [])

  const login = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem('authToken', newToken)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('authToken')
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, isReady }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
