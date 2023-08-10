import React from 'react';
import UserContext from '~/context/User';
import { LiaUserEditSolid } from 'react-icons/lia';
import { MdPayment, MdAdminPanelSettings } from 'react-icons/md';
import { BiSolidCloudDownload } from 'react-icons/bi';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import md5 from 'md5';

const Profile = () => {
    const { userData } = React.useContext(UserContext);
    const userProfile = userData.UserProfile;
    const expireYear = new Date().getFullYear() + 1;
    if (!userProfile) {
        return <Navigate to="/newProfile" />;
    }
    const isAdmin =
        ['Central Admin', 'Regional Admin'].indexOf(userData.role) > -1;
    return (
        <div className="green-bg h-screen overflow-scroll">
            <div className="flex-row md:flex w-full flex-wrap items-center justify-center md:pt-5 px-3 font-semibold ">
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

            <div className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-[90%] xl:w-[75%] 2xl:w-[65%] p-8 rounded-[24px] bg-black-rgba mx-auto my-8 text-white py-10">
                <div className="flex flex-col   md:flex-row-reverse justify-center items-center  m-4 ">
                    <div className=" w-full md:w-[30%] mx-auto">
                        <div className="mx-auto">
                            {userProfile.avatar && (
                                <img
                                    src={`/api/avatars/${userProfile.avatar}`}
                                    alt="User's Profile Picture"
                                    className="rounded-full w-36 h-36 mx-auto"
                                />
                            )}
                            {!userProfile.avatar && (
                                <img
                                    src={`https://www.gravatar.com/avatar/${md5(
                                        userData.email,
                                    )}`}
                                    alt="User's Profile Picture"
                                    className="rounded-full w-44  mx-auto"
                                />
                            )}
                        </div>
                        <div className="text-[#C8DADF] text-center my-4">
                            <p>
                                <span className="font-medium text-lg">
                                    Membership ID:
                                </span>
                                <br />
                                <span className="text-xl font-bold text-field">
                                    {userProfile.NFAMembershipNumber}
                                </span>
                            </p>
                        </div>
                        <div className=" mb-4">
                            {userProfile.isLifeMember && (
                                <div className="flex justify-center ">
                                    <span className="bg-[#C8DADF] rounded-tl-[20px] rounded-br-[20px] text-center text-[#264426] font-bold text-2xl py-2 px-4 my-4 md:p-2">
                                        Lifetime Member
                                    </span>
                                </div>
                            )}
                            {!userProfile.isLifeMember && (
                                <>
                                    <div className="flex  text-center justify-center ">
                                        <span className="bg-[#C8DADF] rounded-tl-[20px] rounded-br-[20px] text-center text-[#264426] font-bold text-2xl py-2 px-4  md:p-2">
                                            General Member
                                        </span>
                                    </div>
                                    <div className="text-center text-lg">
                                        <span>
                                            {' '}
                                            Expires on: 1 Jan {expireYear}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="text-[#C8DADF] flex flex-col gap-0.5 mx-auto">
                        <p className="flex flex-col text-center md:flex-row">
                            <span className="font-medium text-md">
                                Full Name:
                            </span>
                            <span className="text-xl font-medium ml-1 text-field">
                                {userProfile.name}
                            </span>
                        </p>
                        <p className="flex flex-col text-center md:flex-row">
                            <span className="font-medium text-md">Gender:</span>
                            <span className="text-xl font-medium ml-1 text-field">
                                {userProfile.gender}
                            </span>
                        </p>
                        <p className="flex flex-col text-center md:flex-row">
                            <span className="font-medium text-md">
                                Mobile Number:
                            </span>
                            <span className="text-xl font-medium ml-1 text-field">
                                {userProfile.mobile}
                            </span>
                        </p>
                        <p className="flex flex-col text-center md:flex-row">
                            <span className="font-medium text-md">Email:</span>
                            <span className="text-xl font-medium ml-1 text-field">
                                {userData.email}
                            </span>
                        </p>
                        <div className="h-4"></div>
                        <p className="flex flex-col text-center md:flex-row">
                            <span className="font-medium text-md">
                                Permanent Address:
                            </span>
                            <span className="text-xl font-medium ml-1 text-field">
                                {userProfile.permanentAddress}
                            </span>
                        </p>
                        <p className="flex flex-col text-center md:flex-row">
                            <span className="font-medium text-md">
                                Current Address:
                            </span>
                            <span className="text-xl font-medium ml-1 text-field">
                                {userProfile.currentAddress}
                            </span>
                        </p>

                        <div className="h-4"></div>
                        {userProfile.NFAMembershipNumber && (
                            <>
                                <p className="flex flex-col text-center md:flex-row">
                                    <span className="font-medium text-md">
                                        DFAN Membership From:
                                    </span>
                                    <span className="text-xl font-medium ml-1 text-field">
                                        {userProfile.membershipFrom}
                                    </span>
                                </p>
                            </>
                        )}
                        <p className="flex flex-col text-center md:flex-row">
                            <span className="font-medium text-md">
                                Employment Status:
                            </span>
                            <span className="text-xl font-medium ml-1 text-field">
                                {userProfile.employmentStatus}
                            </span>
                        </p>
                        {userProfile.employmentStatus === 'Employed' && (
                            <p className="flex flex-col text-center md:flex-row">
                                <span className="font-medium text-md">
                                    Employment Type:
                                </span>
                                <span className="text-xl font-medium ml-1 text-field">
                                    {userProfile.employmentType}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
                <hr className=" sm:mx-15" />
                <div className="flex flex-col md:flex-row md:mx-20 justify-center md:justify-between items-center gap-4 pt-4 ">
                    <Link
                        to="/editProfile"
                        className="inline-flex justify-center items-center w-36 h-10 rounded-2xl bg-gray-300 text-[#2A4A29] font-medium md:mr-4 hover:bg-[#2A4A29] hover:text-gray-300 hover:outline"
                    >
                        <LiaUserEditSolid className="inline-block mr-2 text-2xl" />
                        Edit Profile
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
