import { createContext, useState, useEffect } from "react";

export const UsersAndCatContext = createContext();

export const UsersAndCatContextProvider = ({ children }) => {
    const API = "http://localhost:3000";
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchUser = () => {
            fetch(`${API}/users`)
                .then((response) => response.json())
                .then((result) => setUsers(result));

            fetch(`${API}/categories`)
                .then((response) => response.json())
                .then((result) => setCategories(result));
        };

        fetchUser();
    }, []);

    return (
        <UsersAndCatContext.Provider value={{ categories, users }}>
            {children}
        </UsersAndCatContext.Provider>
    );
};
