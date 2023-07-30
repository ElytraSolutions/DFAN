import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginHelper from '~/helpers/login';

const NewProfile = () => {
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [currentAddress, setCurrentAddress] = React.useState('');
    const [permanentAddress, setPermanentAddress] = React.useState('');
    const [membershipFrom, setMembershipFrom] = React.useState('');
    const [employmentStatus, setEmploymentStatus] = React.useState('');
    const [employmentType, setEmploymentType] = React.useState('');
    const [isNFA, setIsNFA] = React.useState('No');
    const [NFAMembershipNumber, setNFAMembershipNumber] = React.useState('');
    const [isLifeMember, setIsLifeMember] = React.useState('');
    const [hasRenewed, setHasRenewed] = React.useState('');

    const navigate = useNavigate();

    const [email] = useState(sessionStorage.getItem('email'));
    const [code] = useState(sessionStorage.getItem('code'));

    if (!email || !code) {
        navigate('/');
        return;
    }

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch('/api/users/editProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    code,
                    name,
                    gender,
                    mobile,
                    currentAddress,
                    permanentAddress,
                    membershipFrom,
                    employmentStatus,
                    employmentType,
                    NFAMembershipNumber,
                    isLifeMember,
                    hasRenewed,
                }),
            });
            const data = await resp.json();
            if (!resp.ok) {
                toast.error(data.message);
                return;
            }

            sessionStorage.removeItem('email');
            sessionStorage.removeItem('code');
            const loginData = await loginHelper(email, password);
            if (loginData) {
                navigate('/profile');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        }
    };
    return (
        <div className='grid h-fit min-h-screen place-items-center my-12'>
            <form
                onSubmit={onSubmit}
                className='rounded-lg bg-[#55885126] w-10/12 md:w-5/12 min-w-fit min-h-fit'
            >
                <div className='flex flex-col justify-center p-8'>
                    <div className='flex flex-row justify-between border-b border-b-white mb-2 p-2'>
                        <div className='flex flex-col justify-center w-7/12'>
                            <TextInput
                                legend='Email:'
                                value={email}
                                setValue={() => {}}
                                disabled={true}
                            />
                            <TextInput
                                legend='Code:'
                                value={code}
                                setValue={() => {}}
                                disabled={true}
                            />
                            <TextInput
                                legend='Password:'
                                value={password}
                                setValue={setPassword}
                            />
                            <TextInput
                                legend='Name:'
                                value={name}
                                setValue={setName}
                            />

                            <RadioOptions
                                legend='Gender'
                                values={['Male', 'Female', 'Other']}
                                value={gender}
                                setValue={setGender}
                            />

                            <TextInput
                                legend='Mobile Number:'
                                value={mobile}
                                setValue={setMobile}
                            />
                        </div>
                        {/* end of column */}
                        <div className='flex flex-col justify-center items-center grow'>
                            <div className='bg-white rounded-full w-12 h-12'></div>
                        </div>
                    </div>
                    {/* end of section */}

                    <div className='flex flex-col justify-between border-b border-b-white mb-2 p-2'>
                        <TextInput
                            legend='Permanent Address:'
                            value={permanentAddress}
                            setValue={setPermanentAddress}
                        />

                        <TextInput
                            legend='Current Address:'
                            value={currentAddress}
                            setValue={setCurrentAddress}
                        />

                        <TextInput
                            legend='DFAN Membership From:'
                            value={membershipFrom}
                            setValue={setMembershipFrom}
                        />
                    </div>
                    {/* end of section */}

                    <div className='flex flex-col justify-between border-b border-b-white mb-2 p-2'>
                        <RadioOptions
                            legend='Employment Status'
                            values={['Employed', 'Unemployed']}
                            value={employmentStatus}
                            setValue={setEmploymentStatus}
                        />

                        {employmentStatus === 'Employed' && (
                            <RadioOptions
                                legend='Employment Type'
                                values={[
                                    'Government Job',
                                    'Non-Government Job',
                                ]}
                                value={employmentType}
                                setValue={setEmploymentType}
                            />
                        )}
                    </div>
                    {/* end of section */}

                    <div className='flex flex-col justify-between border-b border-b-white mb-2 p-2'>
                        <RadioOptions
                            legend='Are you a member of Nepal Forest Association?'
                            values={['Yes', 'No']}
                            value={isNFA}
                            setValue={setIsNFA}
                        />
                        {isNFA === 'Yes' && (
                            <>
                                <TextInput
                                    legend='NFA Membership Number:'
                                    value={NFAMembershipNumber}
                                    setValue={setNFAMembershipNumber}
                                />

                                <RadioOptions
                                    legend='Are you a life member of NFA?'
                                    values={['Yes', 'No']}
                                    value={isLifeMember}
                                    setValue={setIsLifeMember}
                                />

                                <RadioOptions
                                    legend='Have you renewed your membership this year?'
                                    values={['Yes', 'No']}
                                    value={hasRenewed}
                                    setValue={setHasRenewed}
                                />
                            </>
                        )}
                    </div>
                </div>
                {/* end of section */}
                <div className='flex flex-col justify-center '>
                    <button
                        type='submit'
                        className='p-2 mx-auto text-lg rounded-md bg-[#C8DADF] mb-4'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

type RadioOptionsProps = {
    legend: string;
    values: string[];
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
};
function RadioOptions({ legend, values, value, setValue }: RadioOptionsProps) {
    return (
        <fieldset>
            <legend className='text-black flex flex-col mt-2'>{legend}</legend>
            {values.map((v) => {
                return (
                    <label key={v}>
                        <input
                            type='radio'
                            value={v}
                            checked={value === v}
                            onChange={() => setValue(v)}
                            className='ml-2'
                        />
                        <span className='ml-1'>{v}</span>
                        <br />
                    </label>
                );
            })}
        </fieldset>
    );
}

type TextInputProps = {
    legend: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    disabled?: boolean;
};
function TextInput({ legend, value, setValue, disabled }: TextInputProps) {
    return (
        <>
            <label htmlFor={legend.toLowerCase()} className='mt-2 text-black'>
                {legend}
            </label>
            <input
                type='text'
                className='border rounded-md bg-[#030c0370] outline-none text-white p-1'
                id={legend.toLowerCase()}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required={true}
                disabled={!!disabled}
            />
        </>
    );
}

export default NewProfile;
