import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import logo from '../assets/logo.png';
import { toast } from 'react-toastify';

const RegisterNew = () => {
    let [searchParams] = useSearchParams();
    const oldEmail = searchParams.get('email');

    const [email, setEmail] = React.useState(oldEmail || '');
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch('/api/users/verifyCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code }),
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
        console.log(email);
    };

    return (
        <div className='grid h-screen place-items-center'>
            <div className='flex flex-col items-center w-10/12 md:w-5/12'>
                <img src={logo} alt='logo' className='w-7/12 m-4' />
                <form onSubmit={onSubmit} className='flex flex-col w-full'>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        className='border border-gray-300 rounded-md p-2 m-2'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                    <input
                        type='text'
                        placeholder='Enter your code'
                        className='border border-gray-300 rounded-md p-2 m-2'
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required={true}
                    />

                    <button
                        type='submit'
                        className='bg-blue-500 text-white rounded-md p-2 w-1/3 mx-auto my-2'
                    >
                        Verify Code
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterNew;
