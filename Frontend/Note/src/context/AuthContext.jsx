import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './auth-context'; // Import from the new file

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = 'https://note-1-3lca.onrender.com/api/auth';

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            // You might want to add a route to get user data from the token
            setLoading(false);
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
            setLoading(false);
        }
    }, [token]);

    const signup = async (email, password) => {
        const res = await axios.post(`${API_URL}/register`, { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
    };

    const login = async (email, password) => {
        const res = await axios.post(`${API_URL}/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, signup, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};