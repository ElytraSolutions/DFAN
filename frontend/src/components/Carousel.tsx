import React, { useCallback, useEffect } from 'react';

interface ICarouselProps {
    images: Array<{
        image: string;
        caption: string;
    }>;
}
function Carousel({ images }: ICarouselProps) {
    const [slideIndex, setSlideIndex] = React.useState(0);
    const nextIndex = useCallback(
        (cur: number) => (cur + 1) % images.length,
        [images],
    );
    const prevIndex = useCallback(
        (cur: number) => (cur - 1 + images.length) % images.length,
        [images],
    );
    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex(nextIndex);
        }, 2000);
        return () => clearInterval(interval);
    }, [nextIndex]);
    return (
        <>
            <div className="relative w-[80%] mx-auto">
                <div className="slide relative">
                    <img
                        className="w-full h-[450px] object-contain"
                        src={images[slideIndex].image}
                    />
                    <div className="absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white">
                        {images[slideIndex].caption}
                    </div>
                </div>

                {/* <!-- The previous button --> */}
                <a
                    className="absolute left-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer"
                    onClick={() => setSlideIndex(prevIndex)}
                >
                    ❮
                </a>

                {/* <!-- The next button --> */}
                <a
                    className="absolute right-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer"
                    onClick={() => setSlideIndex(nextIndex)}
                >
                    ❯
                </a>
            </div>
            <br />

            {/* <!-- The dots --> */}
            <div className="flex justify-center items-center space-x-5">
                {images.map((_, i: number) => {
                    return (
                        <div
                            key={i}
                            className={`dot w-4 h-4 rounded-full cursor-pointer ${
                                i === slideIndex
                                    ? 'bg-green-600'
                                    : 'bg-yellow-500'
                            }`}
                            onClick={() => setSlideIndex(i)}
                        ></div>
                    );
                })}
            </div>
            <div className="w-full flex justify-center py-20">
                <span className="w-[80%] opacity-60 text-2xl text-center px-4 md:px20">
                    DFAN has been at the forefront of the afforestation movement
                    in Nepal since our inception through strategic partnerships
                    with local communities and governmental organizations.
                </span>
            </div>
        </>
    );
}

export default Carousel;
