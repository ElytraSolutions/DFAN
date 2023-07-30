import React from 'react';
import UserContext from '~/context/User';

/*
NFAMembershipNumber: "345"
admin: false
createdAt: "2023-07-30T13:24:11.210Z"
currentAddress: "curr"
email: "newUser@a"
employmentStatus: "Employed"
employmentType: "Government Job"
gender: "Male"
hasInitailized: false
hasRenewed: "Yes"
id: "5b27b62a-c3a7-4c20-ad2b-713df635782c"
isLifeMember: "Yes"
membershipFrom: "Tokha"
mobile: 123
name: "User2"
password: "password"
permanentAddress: "perma"
updatedAt: "2023-07-30T13:24:11.210Z"
*/
const Profile = () => {
    const { userData } = React.useContext(UserContext);
    console.log(userData);
    return (
        <div>
            <div className='w-fit p-6 rounded-md bg-[#558851] mx-auto my-8 text-white'>
                <div className='flex flex-row justify-between items-center gap-24 m-4'>
                    <div className='flex flex-col'>
                        <p>
                            <span>Full Name:</span>
                            <span className='ml-1'>{userData.name}</span>
                        </p>
                        <p>
                            <span>Gender:</span>
                            <span className='ml-1'>{userData.gender}</span>
                        </p>
                        <p>
                            <span>Mobile Number:</span>
                            <span className='ml-1'>{userData.mobile}</span>
                        </p>
                        <p>
                            <span>Email:</span>
                            <span className='ml-1'>{userData.email}</span>
                        </p>
                        <div className='h-4'></div>
                        <p>
                            <span>Permanent Address:</span>
                            <span className='ml-1'>
                                {userData.permanentAddress}
                            </span>
                        </p>
                        <p>
                            <span>Current Address:</span>
                            <span className='ml-1'>
                                {userData.currentAddress}
                            </span>
                        </p>
                        <div className='h-4'></div>
                        <p>
                            <span>DFAN Membership From:</span>
                            <span className='ml-1'>
                                {userData.membershipFrom}
                            </span>
                        </p>
                        <p>
                            <span>Employment Status:</span>
                            <span className='ml-1'>
                                {userData.employmentStatus}
                            </span>
                        </p>
                        (userData.employmentStatus === 'Employed' && (
                        <p>
                            <span>Employment Type:</span>
                            <span className='ml-1'>
                                {userData.employmentType}
                            </span>
                        </p>
                        ))
                    </div>
                    <div className=''>Profile Picture</div>
                </div>
                <div className='pt-4 border-t border-t-white m-4'>
                    Action bar
                </div>
            </div>
        </div>
    );
};

export default Profile;
