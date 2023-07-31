import { useState } from 'react';
import { SubmitHandler, UseFormRegister, useForm } from 'react-hook-form';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditProfileForm from '~/components/EditProfileForm';
import loginHelper from '~/helpers/login';
import { EditableUserData } from '~/types/ProfileData';

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
    const navigate = useNavigate();

    if (!email || !code) {
        return <Navigate to='/' />;
    }

    const onSubmit: SubmitHandler<EditableUserData> = async (data) => {
        try {
            const resp = await fetch('/api/users/newProfile', {
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
    return <EditProfileForm submitHandler={onSubmit} email={email} />;
};

export default NewProfile;
