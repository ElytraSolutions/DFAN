import { useState } from 'react';
import { toast } from 'react-toastify';

function InviteUserForm({
    callback,
}: {
    callback: (data: any) => Promise<any>;
}) {
    const [userEmail, setUserEmail] = useState('');
    const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
        e,
    ) => {
        e.preventDefault();
        const resp = await fetch(`/api/admins/inviteUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail }),
        });
        const data = await resp.json();
        if (!resp.ok) {
            toast.error(data.message || 'Error sending invitation');
            return;
        }
        await callback(data);
        toast.success('Invitation sent successfully');
    };
    return (
        <>
            <form onSubmit={submitHandler}>
                <label htmlFor="email" className="">
                    Email
                </label>
                <input
                    type="email"
                    className="mx-2 border-2 border-gray-300 rounded-md p-1 w-96"
                    id="email"
                    name="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <input
                    type="submit"
                    value="Invite"
                    className="bg-blue-500 text-white rounded-md mx-2 px-6 py-2"
                />
            </form>
        </>
    );
}

export default InviteUserForm;
