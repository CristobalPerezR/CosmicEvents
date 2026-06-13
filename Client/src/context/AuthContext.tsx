// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
    display_user: string;
    profile_image: string | null;
    username: string;
}

export interface Location {
    city: string | null;
    country: string | null;
    country_sig: string | null;
}

interface AuthContextType {
    user: User | null;
    location: Location;
    token: string | null;
    login: (userData: User, locData: Location, newToken: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;        // ← útil para evitar parpadeos
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [location, setLocation] = useState<Location>({ 
        city: null, 
        country: null, 
        country_sig: null 
    });

    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Cargar datos guardados al abrir la app
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedLocation = localStorage.getItem("location");
        const savedToken = localStorage.getItem('cosmic_token');

        if (savedUser && savedToken && savedLocation) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
            setLocation(JSON.parse(savedLocation));
        }
        setLoading(false);
    }, []);

    const login = (userData: User, locData: Location, newToken: string) => {
        setUser(userData);
        setLocation(locData);
        setToken(newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('location', JSON.stringify(locData));
        localStorage.setItem('cosmic_token', newToken);
    };

    const logout = () => {
        setUser(null);
        setLocation({ city: null, country: null, country_sig: null });
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem("location");
        localStorage.removeItem('cosmic_token');
    };

    return (
        <AuthContext.Provider value={{ 
            user,
            location,
            token,
            login, 
            logout, 
            isAuthenticated: !!user && !!token,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe estar dentro de AuthProvider');
    }
    return context;
};