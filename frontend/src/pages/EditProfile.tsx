import { useContext } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '~/context/User';
import { EditableUserData } from '~/types/ProfileData';
import EditProfileForm from '~/components/EditProfileForm';
import { sanitizer } from '~/helpers/validateProfileData';
import Navbar from '~/components/Navbar';

const EditProfile = () => {
    const { userData, refresh } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit: Parameters<
        UseFormHandleSubmit<EditableUserData, undefined>
    >[0] = async (data) => {
        try {
            const { avatar, ...rest } = data;
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
            const resp = await fetch('/api/users/editProfile', {
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
            toast.success('Profile updated successfully');
            await refresh();
            navigate('/profile');
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        }
    };

    const isAdmin =
        ['Central Admin', 'Regional Admin'].indexOf(userData.role) > -1;

    return (
        <div className="flex-row text-white justify-center items-center h-fit min-h-screen pb-2 green-bg">
            <Navbar links={{ Home: '/' }} />
            <div className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-[90%] xl:w-[75%] 2xl:w-[65%] p-8 mx-auto my-8 rounded-[30px] bg-black-rgba text-white">
                <EditProfileForm
                    submitHandler={onSubmit}
                    isNew={isAdmin}
                    oldProfile={userData.UserProfile}
                    includePicture={true}
                    onCancel={() => navigate('/profile')}
                />
            </div>
        </div>
    );
};

export default EditProfile;
