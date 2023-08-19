import { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import { useLocation } from 'react-router-dom';
import NavbarUser from './NavbarUser';
import { HashLink } from 'react-router-hash-link';

interface INavbarProps {
    activeLink?: string;
    showUser?: boolean;
    links: Record<string, string>;
}
const Navbar = ({ activeLink, links, showUser }: INavbarProps) => {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState('');
    const toggleVisible = () => {
        setVisible((curValue) => !curValue);
    };
    useEffect(() => {
        if (activeLink) {
            setActive(activeLink);
        }
    }, [activeLink]);
    useEffect(() => {
        if (!activeLink) {
            const currentPath = location.pathname + location.hash;
            const currentLink = Array.from(Object.keys(links)).find(
                (link) => links[link] === currentPath,
            );
            setActive(currentLink || '');
        }
    }, [location.pathname, location.hash, links, activeLink]);
    return (
        <nav
            className="sticky top-0 z-50 flex w-full flex-nowrap items-center justify-between bg-[#233F23] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700  lg:flex-wrap lg:justify-start lg:py-4"
            data-te-navbar-ref
        >
            <div className="flex-row md:flex w-full flex-wrap items-center justify-between px-3">
                <div className="flex justify-center ml-2">
                    <img
                        src={Logo}
                        className="h-20 mb-3 md:mr-7 md:mb-0 list-image-none"
                        alt="DFAN"
                    />
                </div>
                <div className=" text-center ml-2">
                    <a
                        className="text-xl text-[#e5e5e5] dark:text-neutral-200 flex flex-row items-center"
                        href="/"
                    >
                        <div className="flex flex-col">
                            Democratic Foresters Association Nepal (DFAN) <br />
                            <span className="font-nirmala">
                                प्रजातान्त्रिक वन प्राविधिक संघ, नेपाल
                            </span>
                        </div>
                    </a>
                </div>

                {/* <!-- Hamburger button for mobile view --> */}
                <button
                    className="relative w-full p-4 md:w-auto  border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                    type="button"
                    data-te-collapse-init
                    data-te-target="#navbarSupportedContent14"
                    aria-controls="navbarSupportedContent14"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={toggleVisible}
                >
                    {/* <!-- Hamburger icon --> */}
                    <span className="[&>svg]:w-7 absolute bottom-0 right-0 mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </button>

                {/* <!-- Collapsible navbar container --> */}
                <div
                    className={`${
                        visible ? 'block' : 'hidden'
                    } mt-2 flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto`}
                    id="navbarSupportedContent14"
                    onClick={toggleVisible}
                >
                    {/* <!-- Left links --> */}

                    <div className="ml-auto  lg:pr-2 text-xl flex justify-center items-center ">
                        <ul
                            className=" list-style-none mr-auto flex flex-col pl-0 lg:mt-inline-flex lg:flex-row lg:items-center"
                            data-te-navbar-nav-ref
                        >
                            {Object.keys(links).map((link) => (
                                <li
                                    className="mb-4 pl-2 lg:mb-0 lg:pl-2 lg:pr-2"
                                    onClick={() => setActive(link)}
                                    key={link}
                                    data-te-nav-item-ref
                                >
                                    <HashLink
                                        className={`${
                                            active == link && 'active'
                                        } p-0 transition duration-200  hover:ease-in-out disabled:text-black/30 motion-reduce:transition-none text-neutral-300 hover:text-white focus:text-neutral-400 lg:px-2 [&.active]:underline [&.active]:underline-offset-8 [&.active]:text-neutral-50`}
                                        to={links[link]}
                                        data-te-nav-link-ref
                                    >
                                        {link}
                                    </HashLink>
                                </li>
                            ))}
                            {showUser !== false && (
                                <li className="ml-2 mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-2 inline-flex lg:flex-row lg:items-center">
                                    <NavbarUser />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
