import { AiFillMail, AiFillHome } from 'react-icons/ai';
import { MdPending } from 'react-icons/md';
import { PiGenderNeuterFill, PiUsersThreeDuotone } from 'react-icons/pi';
import { TiLocation } from 'react-icons/ti';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

function CustomSidebar() {
    const activeTab = window.location.pathname.split('/')[2];
    return (
        <div className="flex flex-col h-full p-8">
            <Sidebar>
                <h1 className="text-2xl font-semibold">Admins</h1>
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
                            component={<Link to="/admin/pendingVerification" />}
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
                            component={<Link to="/admin/charts/gender" />}
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
    );
}

export default CustomSidebar;
