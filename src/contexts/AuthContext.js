// import userEvent from '@testing-library/user-event';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(null);
    const [user, setUer] = useState({});
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUer(user);
            setLoading(false);
            if (user) history.push('/chats');
        })
    }, [user, history]);

    const value = { user };

    return ( <AuthContext.Provider value = { value } > {!loading && children } </AuthContext.Provider>

    )
}