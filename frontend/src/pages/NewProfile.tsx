import { useState } from 'react';
import { UseFormRegister, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginHelper from '~/helpers/login';

interface FormInputs {
    email: string;
    code: string;
    password: string;
    name: string;
    mobile: string;
    permanentAddress: string;
    currentAddress: string;
    membershipFrom: string;
    NFAMembershipNumber: string;
    multipleErrorInput: string;

    gender: string;
    employmentStatus: string;
    employmentType?: string;
    isNFA: string;
    isLifeMember?: string;
    hasRenewed?: string;
}

const NewProfile = () => {
    const [searchParams] = useSearchParams();
    const [email] = useState(
        searchParams.get('email') || sessionStorage.getItem('email')
    );
    const [code] = useState(
        searchParams.get('code') || sessionStorage.getItem('code')
    );

    const { register, handleSubmit, watch, setValue } = useForm<FormInputs>({
        criteriaMode: 'all',
        defaultValues: {
            email: email || 'undefined',
            code: code || 'undefined',
        },
    });

    const employmentStatus = watch('employmentStatus', 'Unemployed');
    const employmentType = watch('employmentType');
    const isNFA = watch('isNFA');
    const NFAMembershipNumber = watch('NFAMembershipNumber');
    const isLifeMember = watch('isLifeMember');
    const hasRenewed = watch('hasRenewed');
    if (employmentStatus === 'Unemployed' && employmentType) {
        setValue('employmentType', undefined);
    }
    if (isNFA === 'No') {
        if (NFAMembershipNumber) setValue('NFAMembershipNumber', '');
        if (isLifeMember) setValue('isLifeMember', undefined);
        if (hasRenewed) setValue('hasRenewed', undefined);
    }

    const navigate = useNavigate();

    if (!email || !code) {
        navigate('/');
        return;
    }

    const onError: Parameters<typeof handleSubmit>[1] = (error) => {
        console.log(error);
        toast.error('Please fill out all the fields.');
    };
    const onSubmit: Parameters<typeof handleSubmit>[0] = async (data) => {
        try {
            const resp = await fetch('/api/users/editProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    email,
                    code,
                }),
            });
            const respData = await resp.json();
            if (!resp.ok) {
                toast.error(respData.message);
                return;
            }

            sessionStorage.removeItem('email');
            sessionStorage.removeItem('code');
            const loginData = await loginHelper(email, data.password);
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
                onSubmit={handleSubmit(onSubmit, onError)}
                className='rounded-lg bg-[#55885126] w-10/12 md:w-5/12 min-w-fit min-h-fit'
            >
                <div className='flex flex-col justify-center p-8'>
                    <div className='flex flex-row justify-between border-b border-b-white mb-2 p-2'>
                        <div className='flex flex-col justify-center w-7/12'>
                            <TextInput
                                legend='Email:'
                                name='email'
                                register={register}
                                disabled={true}
                            />
                            <TextInput
                                legend='Code:'
                                name='code'
                                register={register}
                                disabled={true}
                            />
                            <TextInput
                                legend='Password:'
                                name='password'
                                register={register}
                                disabled={false}
                            />
                            <TextInput
                                legend='Name:'
                                name='name'
                                register={register}
                                disabled={false}
                            />
                            <RadioOptions
                                legend='Gender'
                                values={['Male', 'Female', 'Other']}
                                name='gender'
                                register={register}
                            />
                            <TextInput
                                legend='Mobile Number:'
                                name='mobile'
                                register={register}
                                disabled={false}
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
                            name={'permanentAddress'}
                            register={register}
                            disabled={false}
                        />

                        <TextInput
                            legend='Current Address:'
                            name={'currentAddress'}
                            register={register}
                            disabled={false}
                        />

                        <TextInput
                            legend='DFAN Membership From:'
                            name={'membershipFrom'}
                            register={register}
                            disabled={false}
                        />
                    </div>
                    {/* end of section */}

                    <div className='flex flex-col justify-between border-b border-b-white mb-2 p-2'>
                        <RadioOptions
                            legend='Employment Status'
                            values={['Employed', 'Unemployed']}
                            name='employmentStatus'
                            register={register}
                        />

                        {employmentStatus === 'Employed' && (
                            <RadioOptions
                                legend='Employment Type'
                                values={[
                                    'Government Job',
                                    'Non-Government Job',
                                ]}
                                name='employmentType'
                                register={register}
                            />
                        )}
                    </div>
                    {/* end of section */}

                    <div className='flex flex-col justify-between border-b border-b-white mb-2 p-2'>
                        <RadioOptions
                            legend='Are you a member of Nepal Forest Association?'
                            values={['Yes', 'No']}
                            name='isNFA'
                            register={register}
                        />
                        {isNFA === 'Yes' && (
                            <>
                                <TextInput
                                    legend='NFA Membership Number:'
                                    name='NFAMembershipNumber'
                                    register={register}
                                    disabled={false}
                                />

                                <RadioOptions
                                    legend='Are you a life member of NFA?'
                                    values={['Yes', 'No']}
                                    name='isLifeMember'
                                    register={register}
                                />

                                <RadioOptions
                                    legend='Have you renewed your membership this year?'
                                    values={['Yes', 'No']}
                                    name='hasRenewed'
                                    register={register}
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
    name: keyof FormInputs;
    values: string[];
    register: UseFormRegister<FormInputs>;
};
function RadioOptions({ legend, name, values, register }: RadioOptionsProps) {
    return (
        <fieldset>
            <legend className='text-black flex flex-col mt-2'>{legend}</legend>
            {values.map((v) => {
                return (
                    <label key={v}>
                        <input
                            type='radio'
                            className='ml-2'
                            value={v}
                            {...register(name, {
                                required: `${legend.replace(
                                    ':',
                                    ''
                                )} field is required.`,
                            })}
                        />
                        <span className='ml-1'>{v}</span>
                        <br />
                    </label>
                );
            })}
        </fieldset>
    );
}

function TextInput({
    legend,
    name,
    register,
    disabled,
}: {
    legend: string;
    name: keyof FormInputs;
    register: UseFormRegister<FormInputs>;
    disabled: boolean;
}) {
    return (
        <>
            <label className='mt-2 text-black'>{legend}</label>
            <input
                type='text'
                className='border rounded-md bg-[#030c0370] outline-none text-white p-1'
                {...register(name, {
                    required: `${legend} field is required.`,
                    disabled: !!disabled,
                })}
            />
        </>
    );
}

export default NewProfile;
