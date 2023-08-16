import React from 'react';
import UserContext from '~/context/User';
import { LiaUserEditSolid } from 'react-icons/lia';
import { MdPayment, MdAdminPanelSettings, MdPassword } from 'react-icons/md';
import { BiSolidCloudDownload } from 'react-icons/bi';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import md5 from 'md5';
import ProfileDataCard from '~/components/ProfileDataCard';
import Navbar from '~/components/Navbar';

const Profile = () => {
    const { userData } = React.useContext(UserContext);
    const userProfile = userData.UserProfile;
    const expireYear = new Date().getFullYear() + 1;
    if (userData.state !== 'done') {
        return <Navigate to="/lobby" />;
    }
    if (!userProfile) {
        return <Navigate to="/newProfile" />;
    }
    const isAdmin =
        ['Central Admin', 'Regional Admin'].indexOf(userData.role) > -1;
    const isPending = userProfile.VerificationList.status === 'pending';
    return (
        <div className="green-bg h-screen  overflow-y-scroll ">
            <Navbar links={{ Home: '/' }} />

            <div className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-[90%] xl:w-[75%] 2xl:w-[65%] p-8 rounded-[24px] bg-black-rgba mx-auto my-8 text-white py-10">
                <ProfileDataCard userData={userData} />
                <hr className=" sm:mx-15" />
                <div className="flex flex-col md:flex-row md:mx-20 justify-center md:justify-between items-center gap-4 pt-4 ">
                    <Link
                        to="/editProfile"
                        className={`${
                            isPending &&
                            'opacity-50 cursor-not-allowed pointer-events-none'
                        } inline-flex justify-center items-center w-36 h-10 rounded-2xl bg-gray-300 text-[#2A4A29] font-medium md:mr-4 hover:bg-[#2A4A29] hover:text-gray-300 hover:outline`}
                    >
                        <LiaUserEditSolid className="inline-block mr-2 text-2xl" />
                        Edit Profile
                    </Link>
                    <Link
                        to="/changePassword"
                        className={`inline-flex justify-center items-center w-52 h-10 rounded-2xl bg-gray-300 text-[#2A4A29] font-medium md:mr-4 hover:bg-[#2A4A29] hover:text-gray-300 hover:outline`}
                    >
                        <MdPassword className="inline-block mr-2 text-2xl" />
                        Change Password
                    </Link>
                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="inline-flex justify-center items-center w-36 h-10 rounded-2xl bg-gray-300 text-[#2A4A29] font-medium md:mr-4 hover:bg-[#2A4A29] hover:text-gray-300 hover:outline"
                        >
                            <MdAdminPanelSettings className="inline-block mr-2 text-2xl" />
                            Admin View
                        </Link>
                    )}
                    {!userProfile.isLifeMember && (
                        <button className="inline-flex justify-center items-center w-36 h-10 rounded-2xl bg-gray-300 text-[#2A4A29] font-medium md:mr-4 hover:bg-[#2A4A29] hover:text-gray-300 hover:outline">
                            <MdPayment className="inline-block mr-2 text-2xl" />
                            Renew
                        </button>
                    )}
                    <button className="inline-flex justify-center items-center w-36 h-10 rounded-2xl bg-gray-300 text-[#2A4A29] font-medium md:mr-4 float-right hover:bg-[#2A4A29] hover:text-gray-300 hover:outline">
                        <BiSolidCloudDownload className="inline-block mr-2 text-2xl" />
                        Digital Card
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
