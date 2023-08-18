import { useCallback, useEffect, useState } from 'react';
import { IUserContext } from '~/context/User';

function useAuth() {
    const [userData, setUserData] = useState<IUserContext['userData']>({
        state: 'loading',
    });
    const refresh = useCallback(() => {
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
                    localStorage.setItem(
                        'userData',
                        JSON.stringify({ ...data.data, state }),
                    );
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
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            setUserData(JSON.parse(savedData));
        } else {
            (async () => {
                await refresh();
            })();
        }
    }, [refresh, setUserData]);
    return { userData, setUserData, refresh };
}

export default useAuth;
