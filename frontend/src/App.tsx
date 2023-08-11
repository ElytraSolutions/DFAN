import { useCallback, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import UserContext, { UserData } from '~/context/User';
import AdminView from './pages/AdminView';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import Lobby from '~/pages/Lobby';
import Login from '~/pages/Login';
import NewProfile from '~/pages/NewProfile';
import Profile from '~/pages/Profile';
import RegisterNew from '~/pages/RegisterNew';
import Logout from './components/Logout';
import CheckUser from './components/CheckUser';
import Invitations from './pages/admin/Invitations';
import PendingVerification from './pages/admin/PendingVerification';
import ShowProfile from './pages/admin/ShowProfile';
import RegisteredUsers from './pages/admin/RegisteredUsers';
import GenderChart from './pages/admin/charts/GenderChart';
import MembershipRegionChart from './pages/admin/charts/MembershipRegionChart';
import Dashboard from './pages/admin/Dashboard';

const router = createBrowserRouter([
    {
        path: '/lobby',
        element: <Lobby />,
    },
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
        element: (
            <CheckUser>
                <NewProfile />
            </CheckUser>
        ),
    },
    {
        path: '/editProfile',
        element: (
            <CheckUser>
                <EditProfile />
            </CheckUser>
        ),
    },
    {
        path: '/admin',
        element: (
            <CheckUser>
                <Dashboard />
            </CheckUser>
        ),
    },
    {
        path: '/admin/invitations',
        element: (
            <CheckUser>
                <Invitations />
            </CheckUser>
        ),
    },
    {
        path: '/admin/pendingVerification',
        element: (
            <CheckUser>
                <PendingVerification />
            </CheckUser>
        ),
    },
    {
        path: '/admin/users',
        element: (
            <CheckUser>
                <RegisteredUsers />
            </CheckUser>
        ),
    },
    {
        path: '/admin/showProfile/:id',
        element: (
            <CheckUser>
                <ShowProfile />
            </CheckUser>
        ),
    },
    {
        path: '/admin/charts/gender',
        element: (
            <CheckUser>
                <GenderChart />
            </CheckUser>
        ),
    },
    {
        path: '/admin/charts/membershipRegion',
        element: (
            <CheckUser>
                <MembershipRegionChart />
            </CheckUser>
        ),
    },
    {
        path: '/adminOld',
        element: (
            <CheckUser>
                <AdminView />
            </CheckUser>
        ),
    },
]);

function App() {
    const [userData, setUserData] = useState<UserData>({
        state: 'loading',
    });
    const refreshUserData = useCallback(() => {
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
                    setUserData({ ...data.data, state });
                } else {
                    console.error('Received non json data', await resp.text());
                    console.error('Headers', resp.headers);
                    setUserData({ state: 'error' });
                }
            } catch (e) {
                console.error('Error in request', e);
                setUserData({ state: 'error' });
            }
        })();
    }, [setUserData]);

    useEffect(() => {
        (async () => {
            await refreshUserData();
        })();
    }, []);

    return (
        <div>
            <ToastContainer />
            <UserContext.Provider
                value={{ userData, setUserData, refreshUserData }}
            >
                <RouterProvider router={router} />
            </UserContext.Provider>
        </div>
    );
}

export default App;
