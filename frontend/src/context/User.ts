import { createContext, Dispatch } from 'react';

export interface UserData {
    state: 'loading' | 'error' | 'done';
    [key: string]: any;
}

export interface UserContext {
    userData: UserData;
    setUserData: Dispatch<React.SetStateAction<UserData>>;
}
export default createContext<UserContext>({
    userData: {
        state: 'loading',
    },
    setUserData: () => { },
});
