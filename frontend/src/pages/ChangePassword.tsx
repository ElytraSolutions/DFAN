import { Button } from '@mui/material';
import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '~/components/Navbar';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (password === '') {
            toast.error('Password cannot be empty');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        const resp = await fetch('/api/users/changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword, password }),
        });
        const data = await resp.json();
        if (resp.ok) {
            toast.success(data.message);
            setOldPassword('');
            setPassword('');
            setConfirmPassword('');
            navigate('/profile');
        } else {
            toast.error(data.message);
            data?.errors.forEach((e: { message: string }) => {
                toast.error(e.message);
            });
        }
    };
    return (
        <div className="flex-row text-white justify-center items-center h-fit min-h-screen pb-2 green-bg">
            <Navbar links={{ Home: '/' }} />
            <div className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-[90%] xl:w-[75%] 2xl:w-[65%] p-8 mx-auto my-8 rounded-[30px] bg-black-rgba text-white">
                <h1 className="text-3xl font-bold text-center">
                    Change Password
                </h1>
                <form
                    onSubmit={submitHandler}
                    className="flex flex-col space-y-4 mt-4"
                >
                    <label htmlFor="oldPassword">Old Password</label>
                    <input
                        type="password"
                        id="oldPassword"
                        className="p-2 rounded-md bg-black-rgba"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />

                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="p-2 rounded-md bg-black-rgba"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="p-2 rounded-md bg-black-rgba"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="mx-auto">
                        <Button
                            variant="contained"
                            sx={{ padding: '0.7rem', borderRadius: '0.5rem' }}
                            type="submit"
                        >
                            Change password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
