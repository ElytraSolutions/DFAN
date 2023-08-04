import { useContext, useEffect, useState } from 'react';
import {
    FieldErrors,
    UseFormHandleSubmit,
    UseFormRegister,
    useForm,
} from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { EditableUserData } from '~/types/ProfileData';
import UserContext from '~/context/User';
import { UserProfileSchema } from '~/helpers/validateProfileData';
import useStates from '~/hooks/useStates';
import useCountries from '~/hooks/useCountries';

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
        getValues,
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
        <div className="grid h-fit min-h-screen place-items-center my-12">
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="rounded-lg bg-[#335533] w-10/12 md:w-5/12 min-w-fit min-h-fit"
            >
                <div className="flex flex-col justify-center p-8">
                    <div className="flex flex-row justify-between border-b border-b-white mb-2 p-2">
                        <div className="flex flex-col justify-center w-7/12">
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
                        <div className="flex flex-col justify-center items-center grow">
                            <div className="bg-white rounded-full w-12 h-12"></div>
                        </div>
                    </div>
                    {/* end of section */}

                    <div className="flex flex-col justify-between border-b border-b-white mb-2 p-2">
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

                    <div className="flex flex-col justify-between border-b border-b-white mb-2 p-2">
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
                        className="p-2 mx-auto text-lg rounded-md bg-[#C8DADF] mb-4"
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
            <label className="mt-2 text-black">{legend}</label>
            <input
                type={type}
                className="border rounded-md bg-[#030c0370] outline-none text-white p-1"
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
            <legend className="text-black flex flex-col mt-2">{legend}</legend>
            {values.map((v) => {
                return (
                    <label key={v}>
                        <input
                            type="radio"
                            className="ml-2"
                            value={v}
                            {...register(name, {
                                required: `This field is required.`,
                            })}
                        />
                        <span className="ml-1">{v}</span>
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
        <div className="flex flex-col">
            <label className="mt-2 text-black">{legend}</label>
            <select
                className="border rounded-md bg-[#030c0370] outline-none text-white p-1"
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
