import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [sideCollaps, setSideCollaps] = useState(true);

    return (
        <AppContext.Provider value={{ sideCollaps, setSideCollaps }}>
            {children}
        </AppContext.Provider>
    );
};
