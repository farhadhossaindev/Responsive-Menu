import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../Style/Style.css';
import sliderImage01 from '../assets/Sliderimage01.png';
import sliderImage02 from '../assets/Sliderimage02.png';
import sliderImage03 from '../assets/Sliderimage03.png';




// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Slider() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
    return (
        <>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 6500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper z-40 "
            >
                <SwiperSlide>
                    <img src={sliderImage03} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={sliderImage01} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={sliderImage02} />
                </SwiperSlide>



                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>
    )
}

export default Slider