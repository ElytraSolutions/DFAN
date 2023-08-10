import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import logo from '../assets/logo.png';
import { toast } from 'react-toastify';

const RegisterNew = () => {
    const [searchParams] = useSearchParams();
    const oldEmail = searchParams.get('email');

    const [email, setEmail] = React.useState(oldEmail || '');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, code }),
            });
            const data = await resp.json();
            if (!resp.ok) {
                toast.error(data.message);
                return;
            }
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('code', code);
            navigate('/newProfile');
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
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
                        id='email'
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-300 rounded-xl p-4 m-2 bg-[#C8DADF] md:h-12 text-xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                    <label htmlFor="code" className="text-white font-sans font-bold text-xl  ml-2">
                    Code
                    </label>
                    <input
                        id='code'
                        type="text"
                        placeholder="Enter your code"
                        className="border border-gray-300 rounded-xl p-4 m-2 bg-[#C8DADF] md:h-12 text-xl"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required={true}
                    />
                    <label htmlFor="password" className="text-white font-sans font-bold text-xl  ml-2">
                    Password
                    </label>
                    <input
                        id='password'
                        type="password"
                        placeholder="Enter your password"
                        className="border border-gray-300 rounded-xl p-4 m-2 bg-[#C8DADF] md:h-12 text-xl"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md p-2 w-1/3 mx-auto my-2"
                    >
                        Verify Code
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterNew;
