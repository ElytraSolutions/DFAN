import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#233F23] text-white ">
            <div className="w-[75%] mx-auto py-4 px-6 md:flex md:justify-between md:items-center">
                {/* <!-- Left side (Location) --> */}
                <div className="text-center md:text-left mb-4 md:mb-0 text-lg">
                    <p className=" font-semibold">Location:</p>
                    <p className="font-semibold">Thapathali, Kathmandu</p>
                    <p className="font-semibold">Bagmati, Nepal</p>
                </div>

                {/* <!-- Center (DFAN) --> */}
                <div className="text-center mb-4 md:mb-0">
                    <p className="text-lg font-bold">
                        Democratic Foresters Association Nepal (DFAN)
                    </p>
                    <p className="text-lg font-bold">
                        {' '}
                        प्रजातान्त्रिक वन प्राविधिक संघ, नेपाल{' '}
                    </p>
                </div>

                {/* <!-- Right side (Follow us) --> */}
                <div className="text-center md:text-right">
                    <p className="text-base pb-1">Follow us on:</p>
                    <div className="flex justify-center lg:justify-end space-x-4">
                        <a href="#" className="text-white hover:text-blue-400">
                            <FaFacebook />
                        </a>
                        <a href="#" className="text-white hover:text-blue-400">
                            <FaLinkedin />
                        </a>
                        <a href="#" className="text-white hover:text-blue-400">
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
