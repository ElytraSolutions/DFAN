import { useEffect } from 'react';
import {
    FieldErrors,
    UseFormHandleSubmit,
    UseFormRegister,
    useForm,
} from 'react-hook-form';
import { BsCloudUploadFill } from 'react-icons/bs';
import { joiResolver } from '@hookform/resolvers/joi';
import { EditableUserData } from '~/types/ProfileData';
import { UserProfileSchema } from '~/helpers/validateProfileData';
import useStates from '~/hooks/useStates';
import useCountries from '~/hooks/useCountries';
import { BiArrowBack } from 'react-icons/bi';
import { DatePicker } from '@mui/x-date-pickers';

interface EditProfileProps {
    isNew: boolean;
    submitHandler: Parameters<
        UseFormHandleSubmit<EditableUserData, undefined>
    >[0];
    oldProfile: any;
    includePicture: boolean;
    onCancel: () => void;
}
const EditProfileForm = ({
    submitHandler,
    isNew,
    oldProfile,
    includePicture,
    onCancel,
}: EditProfileProps) => {
    const states = useStates();
    const countries = useCountries();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<EditableUserData>({
        resolver: joiResolver(UserProfileSchema(states, countries)),
    });

    useEffect(() => {
        let isNFA;
        if (
            oldProfile?.NFAMembershipNumber == undefined ||
            oldProfile?.NFAMembershipNumber === null
        ) {
            isNFA = undefined;
        } else {
            isNFA = oldProfile.NFAMembershipNumber ? 'Yes' : 'No';
        }
        const oldProfileData = {
            name: oldProfile?.name || '',
            gender: oldProfile?.gender || '',
            mobile: oldProfile?.mobile || '',
            permanentAddress: oldProfile?.permanentAddress || undefined,
            currentAddress: oldProfile?.currentAddress || undefined,
            employmentStatus: oldProfile?.employmentStatus || undefined,
            employmentType: oldProfile?.employmentType || undefined,
            isNFA: isNFA,
            membershipFrom: oldProfile?.membershipFrom || undefined,
            NFAMembershipNumber: oldProfile?.NFAMembershipNumber || undefined,
            membershipType: oldProfile?.membershipType || null,
            joinedOn: oldProfile?.joinedOn
                ? new Date(oldProfile.joinedOn).toLocaleDateString()
                : null,
            expiresOn: oldProfile?.expiresOn
                ? new Date(oldProfile.expiresOn).toLocaleDateString()
                : null,
            // isLifeMember: oldProfile?.isLifeMember ? 'Yes' : 'No',
            // hasRenewed: oldProfile?.hasRenewed ? 'Yes' : 'No',
            avatar: null,
        };
        reset(oldProfileData);
    }, [countries, oldProfile, setValue, states, reset]);

    const employmentStatus = watch('employmentStatus');
    const employmentType = watch('employmentType');
    const isNFA = watch('isNFA');
    const NFAMembershipNumber = watch('NFAMembershipNumber');
    const isLifeMember = watch('isLifeMember');
    const hasRenewed = watch('hasRenewed');
    const avatar = watch('avatar');
    const membershipType = watch('membershipType');

    let avatarURL: string = oldProfile?.avatar
        ? `/api/avatars/${oldProfile.avatar}`
        : '';
    if (avatar && !avatarURL) {
        avatarURL = URL.createObjectURL(avatar[0]);
    }

    if (employmentStatus === 'Unemployed' && employmentType) {
        setValue('employmentType', null);
    }
    if (isNFA === 'No') {
        setValue('membershipFrom', null);
        if (NFAMembershipNumber) setValue('NFAMembershipNumber', null);
        if (isLifeMember) setValue('isLifeMember', null);
        if (membershipType) setValue('membershipType', null);
        if (hasRenewed) setValue('hasRenewed', null);
    }
    if (isNFA === 'Yes' && isLifeMember === 'Yes' && hasRenewed) {
        setValue('hasRenewed', null);
    }
    const isRejected = oldProfile?.VerificationList?.status === 'rejected';
    return (
        <form onSubmit={handleSubmit(submitHandler)} className="w-full">
            <div className="flex flex-col justify-center">
                <button onClick={onCancel}>
                    <BiArrowBack className="text-3xl ml-2" />
                </button>
                <div className="flex flex-col md:flex-row justify-between border-b border-b-white mb-2 p-2">
                    <div className="flex flex-col justify-center md:w-7/12 font-medium  text-md py-5">
                        {isRejected && (
                            <p className="text-red-500">
                                Your profile has been rejected with message:{' '}
                                {oldProfile.VerificationList.message}
                            </p>
                        )}
                        <TextInput
                            legend="Name:"
                            name="name"
                            type="text"
                            register={register}
                            disabled={false}
                            required={true}
                            errors={errors}
                        />
                        <RadioOptions
                            legend="Gender"
                            values={['Male', 'Female', 'Other']}
                            name="gender"
                            register={register}
                            disabled={false}
                            errors={errors}
                        />
                        <TextInput
                            legend="Mobile Number:"
                            name="mobile"
                            type="number"
                            register={register}
                            disabled={false}
                            required={false}
                            errors={errors}
                        />
                    </div>
                    {includePicture && (
                        <div className="flex flex-col justify-center items-center grow">
                            <ImageInput
                                avatar={avatarURL}
                                register={register}
                                errors={errors}
                            />
                        </div>
                    )}
                    {/* end of column */}
                </div>
                {/* end of section */}

                <div className="flex flex-col justify-between border-b border-b-white mb-2 p-2 pb-8">
                    <SelectOptions
                        legend="Permanent Address:"
                        name="permanentAddress"
                        values={states}
                        register={register}
                        disabled={false}
                        errors={errors}
                    />

                    <SelectOptions
                        legend="Current Address:"
                        name="currentAddress"
                        values={countries}
                        register={register}
                        disabled={false}
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
                        disabled={false}
                        errors={errors}
                    />

                    {employmentStatus === 'Employed' && (
                        <RadioOptions
                            legend="Employment Type"
                            values={['Government Job', 'Non-Government Job']}
                            name="employmentType"
                            register={register}
                            disabled={false}
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
                        disabled={!isNew}
                        errors={errors}
                    />
                    {isNFA === 'Yes' && (
                        <>
                            <SelectOptions
                                legend="DFAN Membership From:"
                                name={'membershipFrom'}
                                values={states}
                                register={register}
                                disabled={!isNew}
                                errors={errors}
                            />

                            <TextInput
                                legend="NFA Membership Number:"
                                name="NFAMembershipNumber"
                                type="number"
                                register={register}
                                disabled={!isNew}
                                required={false}
                                errors={errors}
                            />

                            <SelectOptions
                                legend="Type of Membership:"
                                name="membershipType"
                                values={[
                                    'General Member',
                                    'Lifetime Member',
                                    'Member type A',
                                    'Member type B',
                                    'Member type C',
                                ]}
                                register={register}
                                disabled={!isNew}
                                errors={errors}
                            />

                            {membershipType === 'General Member' && (
                                <>
                                    {/* <RadioOptions
                                        legend="Have you renewed your membership this year?"
                                        values={['Yes', 'No']}
                                        name="hasRenewed"
                                        register={register}
                                        disabled={!isNew}
                                        errors={errors}
                                    /> */}
                                    <DateInput
                                        legend="Member Join Date:"
                                        name="joinedOn"
                                        register={register}
                                        setValue={setValue}
                                        disabled={!isNew}
                                        required={false}
                                        errors={errors}
                                    />
                                    <DateInput
                                        legend="Membership Expiry Date:"
                                        name="expiresOn"
                                        register={register}
                                        setValue={setValue}
                                        disabled={!isNew}
                                        required={false}
                                        errors={errors}
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
            {/* end of section */}
            <div className="flex flex-row justify-center items-center gap-8">
                <button
                    type="submit"
                    className="p-2 px-5 text-lg rounded-[25px] bg-[#C8DADF] mb-4 text-black hover:bg-[#2A4A29] hover:text-gray-300 hover:outline"
                >
                    Submit
                </button>
                <button
                    className="p-2 px-5 text-lg rounded-[25px] bg-[#C8DADF] mb-4 text-black hover:bg-[#2A4A29] hover:text-gray-300 hover:outline"
                    onClick={(e) => {
                        e.preventDefault();
                        onCancel();
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

interface IImageInputProps {
    avatar: any;
    register: UseFormRegister<EditableUserData>;
    errors: FieldErrors<EditableUserData>;
}
export function ImageInput({ avatar, register, errors }: IImageInputProps) {
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
                {errors.avatar && (
                    <span className="text-red-400 text-sm">
                        {errors.avatar?.message as string}
                    </span>
                )}
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
    required,
    errors,
}: {
    legend: string;
    name: keyof EditableUserData;
    type: React.HTMLInputTypeAttribute;
    register: UseFormRegister<EditableUserData>;
    disabled: boolean;
    required: boolean;
    errors: FieldErrors<EditableUserData>;
}) {
    return (
        <>
            <label className="mt-2text-xl mb-1">{legend}</label>
            <input
                type={type}
                className="border rounded-md bg-[#030c0370] outline-none text-white p-1 mb-2"
                {...register(name, {
                    required: required ? `This field is required.` : false,
                    disabled: !!disabled,
                })}
            />
            {errors[name] && (
                <span className="text-red-400 text-sm">
                    {errors[name]?.message as string}
                </span>
            )}
        </>
    );
}

type RadioOptionsProps = {
    legend: string;
    name: keyof EditableUserData;
    values: string[];
    disabled: boolean;
    register: UseFormRegister<EditableUserData>;
    errors: FieldErrors<EditableUserData>;
};
export function RadioOptions({
    legend,
    name,
    values,
    disabled,
    register,
    errors,
}: RadioOptionsProps) {
    return (
        <fieldset>
            <legend className="flex flex-col mt-2 mb-1 text-xl">
                {legend}
            </legend>
            {values.map((v) => {
                return (
                    <label key={v}>
                        <input
                            type="radio"
                            className="ml-5 mb-2 "
                            value={v}
                            {...register(name, {
                                required: false,
                                disabled: !!disabled,
                            })}
                            defaultValue={undefined}
                        />
                        <span className="ml-1 ">{v}</span>
                        <br />
                    </label>
                );
            })}
            {errors[name] && (
                <span className="text-red-400 text-sm">
                    {errors[name]?.message as string}
                </span>
            )}
        </fieldset>
    );
}

type SelectOptionsProps = {
    legend: string;
    name: keyof EditableUserData;
    values: string[];
    disabled: boolean;
    register: UseFormRegister<EditableUserData>;
    errors: FieldErrors<EditableUserData>;
};
export function SelectOptions({
    legend,
    name,
    values,
    disabled,
    register,
    errors,
}: SelectOptionsProps) {
    return (
        <div className="flex flex-col mb-2">
            <label className="mt-2  text-xl font-semibold mb-1">{legend}</label>
            <select
                className="border  bg-[#030c0370] outline-none text-white p-1 w-full md:w-[40%]"
                {...register(name, {
                    disabled: !!disabled,
                    required: false,
                })}
            >
                <option key={name} value={undefined}></option>
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
                    {errors[name]?.message as string}
                </span>
            )}
        </div>
    );
}

export function DateInput({
    legend,
    name,
    register,
    setValue,
    disabled,
    required,
    errors,
}: {
    legend: string;
    name: keyof EditableUserData;
    register: UseFormRegister<EditableUserData>;
    setValue: any;
    disabled: boolean;
    required: boolean;
    errors: FieldErrors<EditableUserData>;
}) {
    const { onChange: _onChange, ...rest } = register(name, {
        required: required ? `This field is required.` : false,
        disabled: !!disabled,
    });
    const changeHandler = (value: any) => {
        setValue(name, value);
    };
    return (
        <>
            <label className="mt-2text-xl mb-1">{legend}</label>
            <DatePicker
                className="text-white"
                onChange={changeHandler!}
                sx={{
                    '& input': {
                        color: 'white',
                    },
                }}
                {...rest}
            />
            {errors[name] && (
                <span className="text-red-400 text-sm">
                    {errors[name]?.message as string}
                </span>
            )}
        </>
    );
}

export default EditProfileForm;
