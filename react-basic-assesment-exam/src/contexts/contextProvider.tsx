import { createContext, useContext, useState } from "react";

const stateContext = createContext({
    user: null,
    token: null as string | null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN') || null);

    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    const setUserData = (userData: typeof user) => {
        setUser(userData);
        // You might want to update other parts of your app here if needed
    };

    return (
        <stateContext.Provider value={{ user, token, setUser: setUserData, setToken }}>
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => useContext(stateContext);
