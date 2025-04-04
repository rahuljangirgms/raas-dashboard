// src/guards/AuthGuard.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';  // Your Zustand store for authentication state
import { Navigate } from '@tanstack/react-router';  // Import Navigate for redirect
import { authService } from '@/services/authService';  // Import authService for session validation

// Define the types for the component props, including 'children'
interface AuthGuardProps {
    children: ReactNode;  // Children can be any valid React node (component, element, string, etc.)
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { user, setUser } = useAuthStore((state) => state.auth);  // Get user from Zustand store and setUser for updating
    // const [loading, setLoading] = useState(true);  // Manage loading state while checking user
    const [error, setError] = useState<string | null>(null);  // For handling error state

    useEffect(() => {
        // Validate the session when the component mounts
        const checkSession = async () => {
            const { user, error } = await authService.validateSession();  // Use validateSession to check if user is authenticated

            if (error) {
                setError(error);
                // setLoading(false);
                return;
            }

            if (user) {
                setUser(user);  // Set the user in the Zustand store
            } else {
                setUser(null);  // If no user, set it to null
            }

            // setLoading(false);  // Finish loading
        };

        checkSession();
    }, [setUser]);  // Re-run effect when setUser is updated

    // if (loading) {
    //     return <div>Loading...</div>;  // Show a loading spinner or some loading state while validating the session
    // }

    if (error || !user) {
        // If there is an error or no user is authenticated, redirect to the login page
        return <Navigate to="/sign-in" />;
    }

    return <>{children}</>;  // If authenticated, render the children (the protected route)
};

export default AuthGuard;
