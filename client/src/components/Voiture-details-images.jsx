import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css'
import 'swiper/css/pagination'

const VoitureDetailsImages = ({data}) => {
    return (
        <div>
            <Swiper 
                slidesPerView={1}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper z-10"
            >
             {data?.images.map(image => (
                <SwiperSlide key={image}>
                    <img src={image}
                        className='w-full h-[220px] md:h-[330px] object-cover rounded-xl'
                    />
                </SwiperSlide>
             ))}   
            </Swiper>
        </div>
    );
}

VoitureDetailsImages.propTypes = {
    data: PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default VoitureDetailsImages;
