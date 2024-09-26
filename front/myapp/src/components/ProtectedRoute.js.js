import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
    const user = useSelector((state) => state.auth.user);
    // const location = useLocation();

    if (!user) {
        // If the user is not authenticated, redirect to login and store the current location
        return <Navigate to="/login"  replace />;
    }

    // If authenticated, render the component
    return <Component />;
};

export default ProtectedRoute;
