import Navbar from '~/components/Navbar';
import Carousel from '~/components/Carousel';
import LeftTree from '~/assets/LeftTree.png';
import RightTree from '~/assets/RightTree.png';
import MapOfNepal from '~/assets/mapofnepal.png';
import Footer from '~/components/Footer';
import carousel1 from '~/assets/carousel1.png';
import carousel2 from '~/assets/carousel2.png';
import carousel3 from '~/assets/carousel3.png';
import { useMemo } from 'react';

const Home = () => {
    const images = useMemo(
        () => [
            {
                image: carousel1,
                caption: 'Image 1',
            },
            {
                image: carousel2,
                caption: 'Image 2',
            },
            {
                image: carousel3,
                caption: 'Image 3',
            },
        ],
        [],
    );
    const links = {
        Home: '#hero',
        'About Us': '#about',
        'Contact Us': '#contact',
    };
    return (
        <div className="w-screen h-screen z-50 bg-[#ECECEC] overflow-scroll scroll-smooth">
            <Navbar links={links} />
            <div
                id="hero"
                className="scroll-mt-[115px] relative h-[450px] w-full flex items-center text-center justify-center  "
            >
                <div className="relative flex-row w-full md:w-[55%] p-5">
                    <div className="text-base font-semibold">
                        Welcome to the Democratic Foresters Association Nepal
                        (DFAN)
                    </div>
                    <div className="text-lg md:text-3xl font-bold py-4 md:py-8">
                        Empowering Communities to Combat Climate Change through
                        Afforestation
                    </div>
                    <div className="text-base font-semibold mb-4">
                        Nurturing Nature, Empowering Communities since 2068 B.S.
                    </div>
                    <button className="bg-[#63A964] hover:bg-[#233F23] text-white font-bold py-2 px-5 rounded-full opacity-80">
                        CONTACT US
                    </button>
                </div>

                <img
                    src={LeftTree}
                    className="h-[50vw] md:h-[30vw] absolute bottom-0 left-0 opacity-60"
                />
                <img
                    src={RightTree}
                    className="h-[50vw] md:h-[30vw] absolute bottom-0 right-0 opacity-60"
                />
            </div>
            {/* About us section */}
            <div id="about" className="scroll-mt-[115px] bg-[#D5DFC8]">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-semibold text-center text-[#233F23] pt-12 pb-10 md:pt-20 md:pb-12 opacity-75">
                        ABOUT US
                    </h1>
                </div>
                <Carousel images={images} />
                <div className="w-full flex justify-center py-20">
                    <span className="w-[80%] opacity-60 text-2xl text-center px-4 md:px20">
                        DFAN has been at the forefront of the afforestation
                        movement in Nepal since our inception through strategic
                        partnerships with local communities and governmental
                        organizations.
                    </span>
                </div>
            </div>
            {/* End of about us section */}

            {/* Mission section */}
            <div className="flex-row items-center">
                <div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-semibold text-center text-[#233F23] pt-12 pb-10 md:pt-20 md:pb-12 opacity-75">
                            OUR MISSION
                        </h1>
                    </div>
                </div>
                <div className=" flex justify-center p-10">
                    <span className="w-[80%]  text-justify text-lg">
                        Committed to combatting the pressing challenge of
                        climate change through afforestation initiatives across
                        Nepal. Our mission is to empower local communities to
                        actively participate in preserving and rejuvenating the
                        natural ecosystems, while building a sustainable and
                        green future for generations to come.
                    </span>
                </div>
                <div className="flex justify-center text-center ">
                    <div className="w-[80%] flex-row md:flex items-center justify-around">
                        <div className="bg-[#233F23]  p-5 md:p-8 md:w-[25%]  mx-auto my-5 text-[#ececec] font-semibold rounded-xl">
                            COMMUNITY ENGAGEMENT
                        </div>
                        <div className="bg-[#233F23]  p-5 md:p-8  md:w-[25%] mx-auto my-5 text-[#ececec] font-semibold rounded-xl">
                            FOREST RESTORATION
                        </div>
                        <div className="bg-[#233F23]   p-5 md:p-8 md:w-[25%] mx-auto my-5 text-[#ececec] font-semibold rounded-xl">
                            CLIMATE RESILIENCE
                        </div>
                    </div>
                </div>
                <div className="flex justify-center p-10">
                    <span className="w-[80%] text-justify text-lg">
                        DFAN aims to continue its mission of afforestation and
                        climate action, scaling up our initiatives to have a
                        more significant impact on the environment and
                        communities. Together, we can restore the balance of
                        nature, combat climate change, and create a greener,
                        healthier Nepal for generations to come.
                    </span>
                </div>
            </div>
            {/* End of mission section */}

            <hr className="w-[80%] h-px mx-auto  bg-[#D5DFC8] border-0 rounded md:mt-10 md:mb-0 dark:bg-gray-700" />

            {/* Contact us section */}
            <div className="relative flex-row items-center " id="contact">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-semibold text-center text-[#233F23] pt-12 pb-10 md:pt-20 md:pb-12 opacity-75">
                        CONTACT US
                    </h1>
                </div>
                <div className="flex-row md:flex w-[75%] mx-auto text-center mb-10 items-center">
                    <div className="w-full md:w-[75%] pt-10 mb-10">
                        <img className="mx-auto " src={MapOfNepal} alt="" />
                    </div>
                    <div className=" md:w-[35%] font-semibold italic mb-10">
                        "Join us in our endeavor to make a difference today!
                        Together building a sustainable future for Nepal and the
                        world."
                        <br />
                        <br />
                        <span className="not-italic font-bold text-[#233F23] opacity-80 text-xl">
                            +977-986197XXXX | 980137XXXX
                        </span>
                        <br />
                        <span className="not-italic font-bold text-[#233F23] opacity-90 text-xl">
                            contact@dfan.np
                        </span>
                    </div>
                </div>
            </div>
            {/* End of contact us section */}

            {/* Footer section */}
            <Footer />
            {/* End of footer section */}
        </div>
    );
};

export default Home;
