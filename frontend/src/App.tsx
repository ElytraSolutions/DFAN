import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import UserContext from '~/context/User';
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
import RejectedUsers from './pages/admin/RejectedUsers';
import Admins from './pages/admin/Admins';
import UpdateRequest from './pages/admin/UpdateRequest';
import ChangePassword from './pages/ChangePassword';
import GetCard from './pages/GetCard';
import useAuth from './hooks/useAuth';

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
        path: '/changePassword',
        element: (
            <CheckUser>
                <ChangePassword />
            </CheckUser>
        ),
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
        path: '/card',
        element: (
            <CheckUser>
                <GetCard />
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
        path: '/admin/admins',
        element: (
            <CheckUser>
                <Admins />
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
        path: '/admin/rejections',
        element: (
            <CheckUser>
                <RejectedUsers />
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
        path: '/admin/updateRequest',
        element: (
            <CheckUser>
                <UpdateRequest />
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
]);

function App() {
    const authValues = useAuth();

    return (
        <div>
            <ToastContainer />
            <UserContext.Provider value={authValues}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <RouterProvider router={router} />
                </LocalizationProvider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
