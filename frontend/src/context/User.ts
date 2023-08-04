import { createContext, Dispatch } from 'react';

export interface UserData {
    state: 'loading' | 'error' | 'done';
    [key: string]: any;
}

export interface IUserContext {
    userData: UserData;
    setUserData: Dispatch<React.SetStateAction<UserData>>;
    refreshUserData: () => void;
}
const UserContext  = createContext<IUserContext>({
    userData: {
        state: 'loading',
    },
    setUserData: () => { },
    refreshUserData: () => { },
});
export default UserContext;
