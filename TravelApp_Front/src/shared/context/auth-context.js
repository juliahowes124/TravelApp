import { createContext, useState } from 'react';


export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});