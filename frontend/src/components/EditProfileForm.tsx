import { useContext } from 'react';
import { UseFormHandleSubmit, UseFormRegister, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EditableUserData } from '~/types/ProfileData';
import UserContext from '~/context/User';

interface EditProfileProps {
    email: string;
    submitHandler: Parameters<
        UseFormHandleSubmit<EditableUserData, undefined>
    >[0];
}
const EditProfileForm = ({ email, submitHandler }: EditProfileProps) => {
    const { userData } = useContext(UserContext);
    const { register, handleSubmit, watch, setValue } =
        useForm<EditableUserData>({
            criteriaMode: 'all',
            defaultValues: {
                ...userData,
                isNFA: userData.NFAMembershipNumber ? 'Yes' : 'No',
            },
        });

    const employmentStatus = watch('employmentStatus');
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

    if (!email) {
        return <Navigate to='/' />;
    }

    const onError: Parameters<typeof handleSubmit>[1] = (error) => {
        console.log(error);
        toast.error('Please fill out all the fields.');
    };
    return (
        <div className='grid h-fit min-h-screen place-items-center my-12'>
            <form
                onSubmit={handleSubmit(submitHandler, onError)}
                className='rounded-lg bg-[#55885126] w-10/12 md:w-5/12 min-w-fit min-h-fit'
            >
                <div className='flex flex-col justify-center p-8'>
                    <div className='flex flex-row justify-between border-b border-b-white mb-2 p-2'>
                        <div className='flex flex-col justify-center w-7/12'>
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

export function TextInput({
    legend,
    name,
    register,
    disabled,
}: {
    legend: string;
    name: keyof EditableUserData;
    register: UseFormRegister<EditableUserData>;
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

type RadioOptionsProps = {
    legend: string;
    name: keyof EditableUserData;
    values: string[];
    register: UseFormRegister<EditableUserData>;
};
export function RadioOptions({
    legend,
    name,
    values,
    register,
}: RadioOptionsProps) {
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

export default EditProfileForm;
