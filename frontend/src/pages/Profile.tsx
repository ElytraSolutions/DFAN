import React from 'react';
import UserContext from '~/context/User';
import { LiaUserEditSolid } from 'react-icons/lia';
import { MdPayment } from 'react-icons/md';
import { BiSolidCloudDownload } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { userData } = React.useContext(UserContext);
    return (
        <div>
            <div className='w-10/12 md:w-7/12 p-6 rounded-md bg-[#558851] mx-auto my-8 text-white'>
                <div className='flex flex-row justify-between items-center gap-24 m-4'>
                    <div className='flex flex-col gap-0.5'>
                        <p>
                            <span className='font-medium text-md'>
                                Full Name:
                            </span>
                            <span className='ml-1'>{userData.name}</span>
                        </p>
                        <p>
                            <span className='font-medium text-md'>Gender:</span>
                            <span className='ml-1'>{userData.gender}</span>
                        </p>
                        <p>
                            <span className='font-medium text-md'>
                                Mobile Number:
                            </span>
                            <span className='ml-1'>{userData.mobile}</span>
                        </p>
                        <p>
                            <span className='font-medium text-md'>Email:</span>
                            <span className='ml-1'>{userData.email}</span>
                        </p>
                        <div className='h-4'></div>
                        <p>
                            <span className='font-medium text-md'>
                                Permanent Address:
                            </span>
                            <span className='ml-1'>
                                {userData.permanentAddress}
                            </span>
                        </p>
                        <p>
                            <span className='font-medium text-md'>
                                Current Address:
                            </span>
                            <span className='ml-1'>
                                {userData.currentAddress}
                            </span>
                        </p>
                        <div className='h-4'></div>
                        <p>
                            <span className='font-medium text-md'>
                                DFAN Membership From:
                            </span>
                            <span className='ml-1'>
                                {userData.membershipFrom}
                            </span>
                        </p>
                        <p>
                            <span className='font-medium text-md'>
                                Employment Status:
                            </span>
                            <span className='ml-1'>
                                {userData.employmentStatus}
                            </span>
                        </p>
                        {userData.employmentStatus === 'Employed' && (
                            <p>
                                <span className='font-medium text-md'>
                                    Employment Type:
                                </span>
                                <span className='ml-1'>
                                    {userData.employmentType}
                                </span>
                            </p>
                        )}
                        {userData.NFAMembershipNumber && (
                            <>
                                <p>
                                    <span className='font-medium text-md'>
                                        NFA Membership Number:
                                    </span>
                                    <span className='ml-1'>
                                        {userData.NFAMembershipNumber}
                                    </span>
                                </p>
                                <p>
                                    <span className='font-medium text-md'>
                                        Life Member:
                                    </span>
                                    <span className='ml-1'>
                                        {userData.isLifeMember ? 'Yes' : 'No'}
                                    </span>
                                </p>
                            </>
                        )}
                    </div>
                    <div className=''>Profile Picture</div>
                </div>
                <div className='pt-4 border-t border-t-white m-4'>
                    <Link
                        to='/editProfile'
                        className='inline-flex justify-center items-center w-36 h-10 rounded-2xl bg-gray-300 text-[#2A4A29] font-medium mr-4'
                    >
                        <LiaUserEditSolid className='inline-block mr-2 text-2xl' />
                        Edit Profile
                    </Link>
                    <button className='inline-flex justify-center items-center w-36 h-10 rounded-2xl bg-gray-300 text-[#2A4A29] font-medium mr-4'>
                        <MdPayment className='inline-block mr-2 text-2xl' />
                        Renew
                    </button>
                    <button className='inline-flex justify-center items-center w-36 h-10 rounded-2xl bg-gray-300 text-[#2A4A29] font-medium mr-4 float-right'>
                        <BiSolidCloudDownload className='inline-block mr-2 text-2xl' />
                        Digital Card
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
