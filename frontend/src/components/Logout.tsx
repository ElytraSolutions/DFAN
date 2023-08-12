import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '~/context/User';

const Logout = () => {
    const { setUserData } = React.useContext(UserContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        (async () => {
            const resp = await fetch('/api/logout', { method: 'POST' });
            if (resp.ok) {
                setUserData({ state: 'loading' });
            }
            navigate('/');
        })();
    }, [setUserData, navigate]);
    return null;
};

export default Logout;
