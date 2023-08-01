import { ReactNode, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const ExpandableSidebar = ({
    links,
    children,
}: {
    links: string[];
    children: (currView: string) => ReactNode;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentView, setCurrentView] = useState(links[0]);

    const handleToggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='flex h-screen'>
            <aside
                className={`bg-gray-800 text-white w-52 min-w-max max-w-[50vw] flex-none ${
                    isExpanded ? 'block' : 'hidden'
                }`}
            >
                <h1 className='text-xl font-bold p-4 mt-12'>Menu</h1>
                <ul className='p-4'>
                    {links.map((link) => {
                        return (
                            <li
                                key={link}
                                onClick={(e) =>
                                    setCurrentView(
                                        (e.target as HTMLLinkElement).innerText
                                    )
                                }
                                className={`hover:cursor-pointer pb-4 overflow-hidden text-ellipsis max-w-[50vw] ${
                                    link === currentView
                                        ? 'text-blue-500 underline'
                                        : ''
                                }`}
                            >
                                {link}
                            </li>
                        );
                    })}
                </ul>
            </aside>

            <main className={`flex flex-1 mt-14 mb-4 mx-4`}>
                <button
                    className='fixed top-4 left-4 w-9 h-9 bg-gray-800 p-2 rounded text-white'
                    onClick={handleToggleSidebar}
                >
                    <GiHamburgerMenu className='text-xl' />
                </button>

                {children(currentView)}
            </main>
        </div>
    );
};

export default ExpandableSidebar;
