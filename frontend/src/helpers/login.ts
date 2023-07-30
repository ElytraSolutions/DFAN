import { toast } from 'react-toastify';

export default async function (email: string, password: string) {
    const resp = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: password }),
    });
    const data = await resp.json();
    if (!resp.ok) {
        toast.error(data.message);
        return null;
    }
    return data;
}
