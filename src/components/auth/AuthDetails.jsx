import { useEffect, useState, createContext, useContext } from 'react'
import { auth } from '../../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext();

export const AuthDetails = ({children}) => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        });

        return () => listen();
    }, [])

    return (
        <AuthContext.Provider value={authUser}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

export default AuthDetails