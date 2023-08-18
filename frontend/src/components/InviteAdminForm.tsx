import {
    MenuItem,
    Select,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { toast } from 'react-toastify';
import useStates from '~/hooks/useStates';

function InviteUserForm({ callback }) {
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [role, setRole] = useState('');
    const [region, setRegion] = useState('');
    const states = useStates();

    const reset = () => {
        setName('');
        setUserEmail('');
        setRole('');
        setRegion('');
    };

    const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
        e,
    ) => {
        e.preventDefault();
        const body = {
            email: userEmail,
            name,
            role,
        };
        if (role === 'Regional Admin') {
            body['region'] = region;
        }
        const resp = await fetch(`/api/admins/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await resp.json();
        if (!resp.ok) {
            toast.error(data.message || 'Error sending invitation');
            return;
        }
        reset();
        toast.success(data.message);
        await callback(data);
    };

    return (
        <>
            <form
                onSubmit={submitHandler}
                className="flex flex-col gap-4 w-fit"
            >
                <label htmlFor="name" className="">
                    Name
                </label>
                <TextField
                    type="text"
                    className="w-96"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="email" className="">
                    Email
                </label>
                <TextField
                    type="email"
                    className="w-96"
                    id="email"
                    name="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                />
                <label htmlFor="role" className="">
                    Role
                </label>
                <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    name="role"
                    id="role"
                    className="w-96"
                    sx={{}}
                    required
                >
                    <MenuItem value="Central Admin">Central Admin</MenuItem>
                    <MenuItem value="Regional Admin">Regional Admin</MenuItem>
                </Select>
                {role === 'Regional Admin' && (
                    <>
                        <label htmlFor="region" className="">
                            Region
                        </label>
                        <Select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            name="region"
                            id="role"
                            className="w-96"
                            required
                        >
                            {states.map((state) => {
                                return (
                                    <MenuItem value={state} key={state}>
                                        {state}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </>
                )}
                <input
                    type="submit"
                    value="Invite"
                    className="bg-blue-500 text-white rounded-md px-6 py-2 w-96"
                />
            </form>
        </>
    );
}

export default InviteUserForm;
