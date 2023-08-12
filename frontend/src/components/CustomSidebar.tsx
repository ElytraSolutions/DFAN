import { AiFillMail, AiFillHome } from 'react-icons/ai';
import { MdPending } from 'react-icons/md';
import { PiGenderNeuterFill, PiUsersThreeDuotone } from 'react-icons/pi';
import { TiLocation } from 'react-icons/ti';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

import { useContext, useState } from 'react';
import UserContext from '~/context/User';

function CustomSidebar() {
    const { userData } = useContext(UserContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
    };

    const activeTab = window.location.pathname.split('/')[2];
    return (
        <>
            {!isSidebarOpen && (
                <>
                    <div className="flex flex-col h-full p-8 w-4 ">
                        <button
                            className="top-0 right-0 mx-2 p-2 text-[24px] text-xl font-bold hover:text-[#00aa00] transition-colors"
                            onClick={handleSidebarToggle}
                        >
                            ☰
                        </button>
                    </div>
                </>
            )}
            {isSidebarOpen && (
                <div className="flex flex-col h-full">
                    <Sidebar>
                        <button
                            className="absolute top-5 right-2 mx-2 p-2 text-2xl font-bold hover:text-[#00aa00] transition-colors"
                            onClick={handleSidebarToggle}
                        >
                            &#10005; {/* Close button (X) */}
                        </button>
                        <h1 className="text-2xl font-semibold p-8">Admins</h1>
                        <hr />
                        {userData.UserProfile && (
                            <div className="flex flex-col items-center justify-center gap-2 p-8">
                                <Link to="/profile">
                                    <img
                                        src={`/api/avatars/${
                                            userData.UserProfile.avatar ||
                                            'default.svg'
                                        }`}
                                        alt="Avatar"
                                        className="rounded-full w-24 h-24"
                                    />
                                </Link>
                                <h1 className="text-xl font-semibold">
                                    {userData.UserProfile.name}
                                </h1>
                                <h2 className="text-lg font-semibold">
                                    {userData.role}
                                </h2>
                            </div>
                        )}
                        <Menu
                            menuItemStyles={{
                                button: ({ active }) => {
                                    if (active) {
                                        return {
                                            backgroundColor: '#F3F4F6',
                                            color: '#111827',
                                        };
                                    }
                                },
                            }}
                        >
                            <MenuItem component={<Link to="/admin" />}>
                                <AiFillHome className="inline text-2xl mr-2" />
                                <span>Home</span>
                            </MenuItem>
                            <SubMenu label="Data" defaultOpen>
                                <MenuItem
                                    component={<Link to="/admin/invitations" />}
                                    active={activeTab === 'invitations'}
                                >
                                    <AiFillMail className="inline text-2xl mr-2" />
                                    <span>Invitations</span>
                                </MenuItem>
                                <MenuItem
                                    component={
                                        <Link to="/admin/pendingVerification" />
                                    }
                                    active={activeTab === 'pendingVerification'}
                                >
                                    <MdPending className="inline text-2xl mr-2" />
                                    <span>Pending Verification</span>
                                </MenuItem>
                                <MenuItem
                                    component={<Link to="/admin/users" />}
                                    active={activeTab === 'users'}
                                >
                                    <PiUsersThreeDuotone className="inline text-2xl mr-2" />
                                    <span>Users</span>
                                </MenuItem>
                            </SubMenu>

                            <SubMenu label="Charts" defaultOpen>
                                <MenuItem
                                    component={
                                        <Link to="/admin/charts/gender" />
                                    }
                                    active={activeTab === 'gender'}
                                >
                                    <PiGenderNeuterFill className="inline text-2xl mr-2" />
                                    <span>Gender Chart</span>
                                </MenuItem>
                                <MenuItem
                                    component={
                                        <Link to="/admin/charts/membershipRegion" />
                                    }
                                    active={activeTab === 'membershipRegion'}
                                >
                                    <TiLocation className="inline text-2xl mr-2" />
                                    <span>Membership Region Chart</span>
                                </MenuItem>
                            </SubMenu>
                        </Menu>
                    </Sidebar>
                </div>
            )}
        </>
    );
}

export default CustomSidebar;
