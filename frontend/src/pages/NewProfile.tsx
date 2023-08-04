import { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditProfileForm from '~/components/EditProfileForm';
import UserContext from '~/context/User';
import { EditableUserData } from '~/types/ProfileData';
import { sanitizer } from '~/helpers/validateProfileData';

const NewProfile = () => {
    const { userData, refreshUserData } = useContext(UserContext);
    const navigate = useNavigate();

    if (userData.UserProfile) {
        toast.success('You already have a profile');
        return <Navigate to="/profile" />;
    }
    const onSubmit: SubmitHandler<EditableUserData> = async (data) => {
        try {
            const { avatar, ...rest } = data;
            const resp = await fetch('/api/users/createProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sanitizer(rest)),
            });
            const respData = await resp.json();
            if (!resp.ok) {
                toast.error(respData.message);
                return;
            }
            if (avatar) {
                const formData = new FormData();
                formData.append('picture', avatar[0]);
                const response = await fetch('/api/users/updatePicture', {
                    method: 'POST',
                    body: formData,
                });
                const responseData = await response.json();
                if (!response.ok) {
                    toast.error(responseData.message);
                    return;
                }
            }
            toast.success('Profile created successfully');
            refreshUserData();
            navigate('/profile');
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        }
    };
    return <EditProfileForm submitHandler={onSubmit} />;
};

export default NewProfile;
