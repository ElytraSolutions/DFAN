import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';

const Home = () => {
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const statusParams = new URLSearchParams({
                email,
            });
            const resp = await fetch(
                `/api/users/status?${statusParams.toString()}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            const data = await resp.json();
            if (!resp.ok) {
                toast.error(data.message);
                return;
            }
            const queryParams = new URLSearchParams({
                email,
            });
            if (data.data.registered) {
                navigate(`/login?${queryParams.toString()}`);
            } else if (data.data.invited) {
                navigate(`/register?${queryParams.toString()}`);
            } else {
                toast.error('This email has not been invited!');
            }
        } catch (err) {
            console.error(err);
            if (err && (err as Error).message) {
                toast.error((err as Error).message);
            } else {
                toast.error('Something went wrong');
                console.error(err);
            }
        }
    };

    return (
        <div className="grid h-screen place-items-center">
            <div className="flex flex-col items-center w-10/12 md:w-4/12">
                <img src={logo} alt="logo" className="w-7/12 m-4" />
                <form onSubmit={onSubmit} className="flex flex-col w-full">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-300 rounded-md p-2 m-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md p-2 w-1/3 mx-auto my-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home;
