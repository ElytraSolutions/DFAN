import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';
import loginHelper from '~/helpers/login';
import UserContext from '~/context/User';

const Login = () => {
    const [searchParams] = useSearchParams();
    const oldEmail = searchParams.get('email');

    const [email, setEmail] = React.useState(oldEmail || '');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const { setUserData } = React.useContext(UserContext);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const data = await loginHelper(email, password);
            if (data) {
                setUserData({ ...data.data, state: 'done' });
                navigate('/profile');
            }
        } catch (err) {
            if (err && (err as Error).message) {
                toast.error((err as Error).message);
            } else {
                toast.error('Something went wrong');
                console.error('Error from login page', err);
            }
        }
    };

    return (
        <div className="grid h-screen place-items-center">
            <div className="flex flex-col items-center w-10/12 md:w-4/12">
                <img src={logo} alt="logo" className="w-7/12 m-4" />
                <form onSubmit={onSubmit} className="flex flex-col w-full">
                <label htmlFor="email" className="text-white font-sans font-bold text-xl  ml-2">
                    Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-300 rounded-xl p-4 m-2 bg-[#C8DADF] md:h-16 text-xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                    <label htmlFor="password" className="text-white font-sans font-bold text-xl  ml-2">
                    Password
                    </label>
                    <input
                        type="password"
                        placeholder={`Enter your password`}
                        className="border border-gray-300 rounded-xl p-4 m-2 bg-[#C8DADF] md:h-16 text-xl"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                    <button
                        type="submit"
                        className="bg-[#C8DADF] text-[#2B4B2A] text-xl font-bold rounded-[50px] p-2 w-1/3 md:w-1/4 mx-auto my-2 hover:bg-[#2B4B2A] hover:text-[#C8DADF] transition-colors duration-300 hover:shadow-md"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
