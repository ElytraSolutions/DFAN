import { useContext } from 'react';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginHelper from '~/helpers/login';
import UserContext from '~/context/User';
import { EditableUserData } from '~/types/ProfileData';
import EditProfileForm from '~/components/EditProfileForm';
import { sanitizer } from '~/helpers/validateProfileData';

const EditProfile = () => {
    const { refreshUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit: Parameters<
        UseFormHandleSubmit<EditableUserData, undefined>
    >[0] = async (data) => {
        try {
            const resp = await fetch('/api/users/editProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sanitizer(data)),
            });
            const respData = await resp.json();
            if (!resp.ok) {
                toast.error(respData.message);
                return;
            }
            toast.success('Profile updated successfully');
            refreshUserData();
            navigate('/profile');
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        }
    };

    return <EditProfileForm submitHandler={onSubmit} />;
};

export default EditProfile;
