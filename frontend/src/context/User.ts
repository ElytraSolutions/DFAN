import { createContext, Dispatch } from 'react';

export interface UserData {
    state: 'loading' | 'error' | 'done';
    [key: string]: any;
}

export interface IUserContext {
    userData: UserData;
    setUserData: Dispatch<React.SetStateAction<UserData>>;
    refresh: () => void;
}
const UserContext = createContext<IUserContext>({
    userData: {
        state: 'loading',
    },
    setUserData: () => {},
    refresh: () => {},
});
export default UserContext;
