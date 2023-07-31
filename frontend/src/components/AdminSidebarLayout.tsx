import { ReactNode, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const ExpandableSidebar = ({ children }: { children: ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='flex h-screen'>
            {/* Sidebar */}
            <aside
                className={`bg-gray-800 text-white w-36 flex-none ${
                    isExpanded ? 'block' : 'hidden'
                }`}
            >
                {/* Add your sidebar content here */}
                <h1 className='text-xl font-bold p-4 mt-12'>Menu</h1>
                <ul className='p-4'>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 p-8 mt-8 ml-2`}>
                <button
                    className='fixed top-4 left-4 bg-gray-800 p-2 rounded text-white'
                    onClick={handleToggleSidebar}
                >
                    <GiHamburgerMenu className='text-xl' />
                </button>

                {children}
            </main>
        </div>
    );
};

export default ExpandableSidebar;
