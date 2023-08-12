import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '~/context/User';
import Loading from './Loading';

function CheckUser({ children }: { children: React.ReactNode }) {
    const { userData } = useContext(UserContext);

    if (userData.state === 'loading') {
        return <Loading />;
    } else if (userData.state === 'done') {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" />;
    }
}

export default CheckUser;
