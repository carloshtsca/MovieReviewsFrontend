import React from 'react'
import NotificationProvider from './NotificationProvider'
import ThemeProvider from './ThemeProvider'
import AuthProvider from './AuthProvider'

export default function ContextProviders({ children }) {
    return (
        <NotificationProvider>
            <AuthProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </AuthProvider>
        </NotificationProvider>
    )
}
