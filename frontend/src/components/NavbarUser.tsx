import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '~/context/User';

function NavbarUser() {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    if (!userData || userData.state !== 'done') {
        return (
            <button
                className="bg-[#fff] hover:bg-[#239923] text-[#233F23] hover:text-[#eee] font-bold py-2 px-8 rounded-full "
                onClick={() => navigate('/lobby')}
            >
                Login
            </button>
        );
    }
    return (
        <>
            <div className="flex items-center justify-center gap-2">
                <Link to="/profile">
                    <img
                        src={`/api/avatars/${
                            userData?.UserProfile?.avatar || 'default.png'
                        }`}
                        alt="Avatar"
                        className={`rounded-full w-12 h-12 ${
                            !userData?.UserProfile?.avatar && 'invert-[0.8]'
                        }`}
                    />
                </Link>
                <button
                    className="bg-[#fff] hover:bg-[#239923] text-[#233F23] hover:text-[#eee] font-bold py-2 px-8 rounded-full "
                    onClick={() => navigate('/logout')}
                >
                    Logout
                </button>
            </div>
        </>
    );
}

export default NavbarUser;
