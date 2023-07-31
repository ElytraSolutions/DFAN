import { useContext } from 'react';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginHelper from '~/helpers/login';
import UserContext from '~/context/User';
import { EditableUserData } from '~/types/ProfileData';
import EditProfileForm from '~/components/EditProfileForm';

const EditProfile = () => {
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const { email } = userData;

    const onSubmit: Parameters<
        UseFormHandleSubmit<EditableUserData, undefined>
    >[0] = async (data) => {
        try {
            const resp = await fetch('/api/users/editProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    email,
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
            setUserData({ state: 'loading' });
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

export default EditProfile;
