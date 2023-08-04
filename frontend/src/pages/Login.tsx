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
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-300 rounded-md p-2 m-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                    <input
                        type="text"
                        placeholder={`Enter your password`}
                        className="border border-gray-300 rounded-md p-2 m-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md p-2 w-1/3 mx-auto my-2"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
