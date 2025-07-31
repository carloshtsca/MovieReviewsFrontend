import React from 'react'
import NotificationProvider from './NotificationProvider'
import ThemeProvider from './ThemeProvider'
import AuthProvider from './AuthProvider'
import SearchProvider from './SearchProvider'

export default function ContextProviders({ children }) {
    return (
        <NotificationProvider>
            <SearchProvider>
                <AuthProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </AuthProvider>
            </SearchProvider>
        </NotificationProvider>
    )
}
