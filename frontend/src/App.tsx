import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import UserContext, { UserData } from '~/context/User';
import Home from '~/pages/index';
import Login from '~/pages/Login';
import RegisterNew from '~/pages/RegisterNew';
import Profile from '~/pages/Profile';
import NewProfile from '~/pages/NewProfile';
import Logout from './components/Logout';
import CheckUser from './components/CheckUser';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <RegisterNew />,
    },
    {
        path: '/profile',
        element: (
            <CheckUser>
                <Profile />
            </CheckUser>
        ),
    },
    {
        path: '/logout',
        element: <Logout />,
    },
    {
        path: '/newProfile',
        element: <NewProfile />,
    },
]);

function App() {
    const [userData, setUserData] = useState<UserData>({
        state: 'loading',
    });

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch('/api/users/me');
                if (
                    resp.headers
                        .get('content-type')
                        ?.startsWith('application/json')
                ) {
                    const data = await resp.json();
                    const state = resp.ok ? 'done' : 'error';
                    setUserData({ ...data, state });
                } else {
                    console.error('Received non json data', await resp.text());
                    console.error('Headers', resp.headers);
                    setUserData({ state: 'error' })
                }
            } catch (e) {
                console.error('Error in request', e);
                setUserData({ state: 'error' });
            }
        })();
    }, []);

    return (
        <div>
            <ToastContainer />
            <UserContext.Provider value={{ userData, setUserData }}>
                <RouterProvider router={router} />
            </UserContext.Provider>
        </div>
    );
}

export default App;
