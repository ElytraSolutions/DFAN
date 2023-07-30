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
        element: <Profile />,
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
                    setUserData(data);
                } else {
                    console.log('Received non json data', await resp.text());
                    console.log('Headers', resp.headers);
                }
            } catch (e) {
                console.error('Error in request', e);
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
