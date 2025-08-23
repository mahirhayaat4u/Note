import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
// import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { token, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;