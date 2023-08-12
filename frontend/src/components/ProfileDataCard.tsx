import md5 from 'md5';

function ProfileDataCard({ userData }) {
    const userProfile = userData.UserProfile;
    const expireYear = new Date().getFullYear() + 1;
    return (
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
                                <span> Expires on: 1 Jan {expireYear}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="text-[#C8DADF] flex flex-col gap-0.5 mx-auto">
                <p className="text-red-500 mb-6">
                    Your profile has been rejected with message:
                    {userProfile.VerificationList.message}
                </p>
                <p className="flex flex-col text-center md:flex-row">
                    <span className="font-medium text-md">Full Name:</span>
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
                    <span className="font-medium text-md">Mobile Number:</span>
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
    );
}

export default ProfileDataCard;
