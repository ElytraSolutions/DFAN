import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';
import Navbar from '~/components/Navbar';
import UserContext from '~/context/User';

const Lobby = () => {
    const { userData } = React.useContext(UserContext);
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

    if (userData && userData.state === 'done') {
        return <Navigate to="/profile" />;
    }

    return (
        <div className="flex flex-col h-screen green-bg overflow-scroll">
            <Navbar links={{ Home: '/' }} showUser={false} />
            <div className="grid place-items-center grow">
                <div className="flex flex-col items-center w-10/12 md:w-4/12">
                    <img src={logo} alt="logo" className="w-7/12 mb-4" />
                    <form onSubmit={onSubmit} className="flex flex-col w-full">
                        <label
                            htmlFor="email"
                            className="text-white font-sans font-bold text-xl ml-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded-xl p-4 m-2 bg-[#C8DADF] h-16 text-xl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                        <button
                            type="submit"
                            className="bg-[#C8DADF] text-[#2B4B2A] text-xl font-bold rounded-[50px] p-2 w-1/3 md:w-1/4 mx-auto my-2 hover:bg-[#2B4B2A] hover:text-[#C8DADF] transition-colors duration-300 hover:shadow-md"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Lobby;
