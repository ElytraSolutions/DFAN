import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '~/components/Loading';
import ProfileDataCard from '~/components/ProfileDataCard';

function ShowProfile() {
    const { id } = useParams<{ id: string }>();
    const [userData, setUserData] = useState({});
    useEffect(() => {
        (async () => {
            const resp = await fetch(`/api/admins/getUser/${id}`);
            if (!resp.ok) {
                toast.error('Error fetching profile data');
                return;
            }
            const data = await resp.json();
            setUserData(data.data);
        })();
    }, [id]);
    if (!Object.keys(userData).length) return <Loading />;
    return (
        <div className="green-bg h-screen overflow-scroll">
            <div className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-[90%] xl:w-[75%] 2xl:w-[65%] p-8 rounded-[24px] bg-black-rgba mx-auto my-8 text-white py-10">
                <ProfileDataCard userData={userData} />
            </div>
        </div>
    );
}

export default ShowProfile;
