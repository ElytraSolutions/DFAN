import { useContext, useEffect, useState } from 'react';
import {
    FieldErrors,
    UseFormHandleSubmit,
    UseFormRegister,
    useForm,
} from 'react-hook-form';
import { BsCloudUploadFill } from 'react-icons/bs';
import { joiResolver } from '@hookform/resolvers/joi';
import { EditableUserData } from '~/types/ProfileData';
import UserContext from '~/context/User';
import { UserProfileSchema } from '~/helpers/validateProfileData';
import useStates from '~/hooks/useStates';
import useCountries from '~/hooks/useCountries';
import Logo from '../assets/logo.png';

interface EditProfileProps {
    submitHandler: Parameters<
        UseFormHandleSubmit<EditableUserData, undefined>
    >[0];
}
const EditProfileForm = ({ submitHandler }: EditProfileProps) => {
    const { userData } = useContext(UserContext);
    const states = useStates();
    const countries = useCountries();
    const oldProfile = userData.UserProfile ?? {};

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<EditableUserData>({
        criteriaMode: 'all',
        resolver: joiResolver(UserProfileSchema(states, countries)),
    });

    useEffect(() => {
        const oldProfileData = {
            name: oldProfile?.name || '',
            gender: oldProfile?.gender || undefined,
            mobile: oldProfile?.mobile || '',
            permanentAddress: oldProfile?.permanentAddress || undefined,
            currentAddress: oldProfile?.currentAddress || undefined,
            employmentStatus: oldProfile?.employmentStatus || undefined,
            employmentType: oldProfile?.employmentType || undefined,
            isNFA: oldProfile?.NFAMembershipNumber ? 'Yes' : 'No',
            membershipFrom: oldProfile?.membershipFrom || undefined,
            NFAMembershipNumber: oldProfile?.NFAMembershipNumber || undefined,
            isLifeMember: oldProfile?.isLifeMember ? 'Yes' : 'No',
            hasRenewed: oldProfile?.hasRenewed ? 'Yes' : 'No',
            avatar: null,
        };
        for (const [key, value] of Object.entries(oldProfileData)) {
            setValue(key as keyof EditableUserData, value);
        }
    }, []);

    const employmentStatus = watch('employmentStatus');
    const employmentType = watch('employmentType');
    const isNFA = watch('isNFA');
    const NFAMembershipNumber = watch('NFAMembershipNumber');
    const isLifeMember = watch('isLifeMember');
    const hasRenewed = watch('hasRenewed');
    const avatar = watch('avatar');

    let avatarURL: string = oldProfile?.avatar
        ? `/api/avatars/${oldProfile.avatar}`
        : '';
    if (avatar) {
        avatarURL = URL.createObjectURL(avatar[0]);
    }
    console.log(oldProfile);

    if (employmentStatus === 'Unemployed' && employmentType) {
        setValue('employmentType', null);
    }
    if (isNFA === 'No') {
        setValue('membershipFrom', null);
        if (NFAMembershipNumber) setValue('NFAMembershipNumber', null);
        if (isLifeMember) setValue('isLifeMember', null);
        if (hasRenewed) setValue('hasRenewed', null);
    }
    if (isNFA === 'Yes' && isLifeMember === 'Yes' && hasRenewed) {
        setValue('hasRenewed', null);
    }

    return (
        
        <div className="flex-row text-white justify-center items-center h-fit min-h-screen my-2">
            <div className="flex-row md:flex w-full flex-wrap items-center justify-center md:mt-5 px-3 font-semibold ">
                <div className="flex justify-center ml-2">
                    <img
                        src={Logo}
                        className="h-24 mt-3 mb-3 md:mr-7 md:mb-0 list-image-none "
                        alt="DFAN"
                    />
                </div>
                <div className=" text-center ml-2">
                    <a
                        className="text-lg md:text-3xl lg:text-4xl text-[#C8DADF] dark:text-neutral-200"
                        href="#"
                    >
                        Democratic Foresters Association Nepal <br /> (DFAN) 
                    </a>
                </div>
            </div>
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-[90%] xl:w-[75%] 2xl:w-[65%] p-8 rounded-[30px] bg-black-rgba mx-auto my-8 text-white"
            >
                <div className="flex flex-col justify-center p-8">
                    <div className="flex flex-col md:flex-row-reverse justify-between border-b border-b-white mb-2 p-2">
                        <div className="flex flex-col justify-center items-center grow">
                            <ImageInput
                                avatar={avatarURL}
                                register={register}
                            />
                        </div>
                        
                        <div className="flex flex-col justify-center md:w-7/12 font-medium  text-md py-5">
                            <TextInput
                                legend="Name:"
                                name="name"
                                type="text"
                                register={register}
                                disabled={false}
                                errors={errors}
                            />
                            <RadioOptions
                                legend="Gender"
                                values={['Male', 'Female', 'Other']}
                                name="gender"
                                register={register}
                                errors={errors}
                            />
                            <TextInput
                                legend="Mobile Number:"
                                name="mobile"
                                type="number"
                                register={register}
                                disabled={false}
                                errors={errors}
                            />
                        </div>
                        {/* end of column */}
                        
                    </div>
                    {/* end of section */}

                    <div className="flex flex-col justify-between border-b border-b-white mb-2 p-2 pb-8">
                        <SelectOptions
                            legend="Permanent Address:"
                            name="permanentAddress"
                            values={states}
                            register={register}
                            errors={errors}
                        />

                        <SelectOptions
                            legend="Current Address:"
                            name="currentAddress"
                            values={countries}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    {/* end of section */}

                    <div className="flex flex-col justify-between border-b border-b-white mb-2 p-2 pt-4 pb-8">
                        <RadioOptions
                            legend="Employment Status"
                            values={['Employed', 'Unemployed']}
                            name="employmentStatus"
                            register={register}
                            errors={errors}
                        />

                        {employmentStatus === 'Employed' && (
                            <RadioOptions
                                legend="Employment Type"
                                values={[
                                    'Government Job',
                                    'Non-Government Job',
                                ]}
                                name="employmentType"
                                register={register}
                                errors={errors}
                            />
                        )}
                    </div>
                    {/* end of section */}

                    <div className="flex flex-col justify-between border-b border-b-white mb-2 p-2">
                        <RadioOptions
                            legend="Are you a member of Nepal Forest Association?"
                            values={['Yes', 'No']}
                            name="isNFA"
                            register={register}
                            errors={errors}
                        />
                        {isNFA === 'Yes' && (
                            <>
                                <SelectOptions
                                    legend="DFAN Membership From:"
                                    name={'membershipFrom'}
                                    values={states}
                                    register={register}
                                    errors={errors}
                                />

                                <TextInput
                                    legend="NFA Membership Number:"
                                    name="NFAMembershipNumber"
                                    type="number"
                                    register={register}
                                    disabled={false}
                                    errors={errors}
                                />

                                <RadioOptions
                                    legend="Are you a life member of NFA?"
                                    values={['Yes', 'No']}
                                    name="isLifeMember"
                                    register={register}
                                    errors={errors}
                                />

                                {isLifeMember === 'No' && (
                                    <RadioOptions
                                        legend="Have you renewed your membership this year?"
                                        values={['Yes', 'No']}
                                        name="hasRenewed"
                                        register={register}
                                        errors={errors}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
                {/* end of section */}
                <div className="flex flex-col justify-center ">
                    <button
                        type="submit"
                        className="p-2 px-5 mx-auto text-lg rounded-[25px] bg-[#C8DADF] mb-4 text-black hover:bg-[#2A4A29] hover:text-gray-300 hover:outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export function ImageInput({ avatar, register }) {
    return (
        <div className="flex items-center justify-center">
            <label className="relative cursor-pointer">
                <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    {...register('avatar')}
                />
                <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-300">
                    {avatar ? (
                        <img
                            src={avatar}
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200">
                            <span className="text-4xl">
                                <BsCloudUploadFill />
                            </span>
                            <span className="text-gray-400">Upload</span>
                        </div>
                    )}
                </div>
            </label>
        </div>
    );
}

export function TextInput({
    legend,
    name,
    type,
    register,
    disabled,
    errors,
}: {
    legend: string;
    name: keyof EditableUserData;
    type: React.HTMLInputTypeAttribute;
    register: UseFormRegister<EditableUserData>;
    disabled: boolean;
    errors: FieldErrors<EditableUserData>;
}) {
    return (
        <>
            <label className="mt-2 text-white text-xl mb-1">{legend}</label>
            <input
                type={type}
                className="border rounded-md bg-[#030c0370] outline-none text-white p-1 mb-2"
                {...register(name, {
                    required: `This field is required.`,
                    disabled: !!disabled,
                })}
            />
            {errors[name] && (
                <span className="text-red-400 text-sm">
                    {errors[name]?.message}
                </span>
            )}
        </>
    );
}

type RadioOptionsProps = {
    legend: string;
    name: keyof EditableUserData;
    values: string[];
    register: UseFormRegister<EditableUserData>;
    errors: FieldErrors<EditableUserData>;
};
export function RadioOptions({
    legend,
    name,
    values,
    register,
    errors,
}: RadioOptionsProps) {
    return (
        <fieldset>
            <legend className="text-white flex flex-col mt-2 mb-1 text-xl">{legend}</legend>
            {values.map((v) => {
                return (
                    <label key={v}>
                        <input
                            type="radio"
                            className="ml-5 mb-2 "
                            value={v}
                            {...register(name, {
                                required: `This field is required.`,
                            })}
                        />
                        <span className="ml-1 ">{v}</span>
                        <br />
                    </label>
                );
            })}
            {errors[name] && (
                <span className="text-red-400 text-sm">
                    {errors[name]?.message}
                </span>
            )}
        </fieldset>
    );
}

type SelectOptionsProps = {
    legend: string;
    name: keyof EditableUserData;
    values: string[];
    register: UseFormRegister<EditableUserData>;
    errors: FieldErrors<EditableUserData>;
};
export function SelectOptions({
    legend,
    name,
    values,
    register,
    errors,
}: SelectOptionsProps) {
    return (
        <div className="flex flex-col mb-2">
            <label className="mt-2 text-white text-xl font-semibold mb-1">{legend}</label>
            <select
                className="border  bg-[#030c0370] outline-none text-white p-1 w-full md:w-[40%]"
                {...register(name, {
                    required: `This field is required.`,
                })}
            >
                {values.map((v) => {
                    return (
                        <option key={v} value={v}>
                            {v}
                        </option>
                    );
                })}
            </select>
            {errors[name] && (
                <span className="text-red-400 text-sm">
                    {errors[name]?.message}
                </span>
            )}
        </div>
    );
}

export default EditProfileForm;
