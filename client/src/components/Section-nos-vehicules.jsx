import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { LuFuel } from "react-icons/lu";
import { GiGearStickPattern } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { MdOpenInNew } from "react-icons/md";
import {Link} from "react-router-dom"

import 'swiper/css'
import 'swiper/css/pagination'
import '../css/slider-pagination.css'


const SectionNosVehicules = ({voitures}) => {

    return (
        <div className="mx-10 sm:mx-24 mb-20">
            <h2 className="font-bold text-3xl text-center mt-16 mb-8">Nos Véhicules</h2>

            <Swiper slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    998: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {voitures?.data.map(voiture => (
                    <SwiperSlide key={voiture._id}>
                        <div className="rounded-xl bg-white border hover:shadow-md cursor-pointer mb-10">
                            <div>
                                <img src={voiture.images[0]} width={300} height={250}
                                    className="rounded-t-xl object-center h-[200px] w-full"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="font-bold text-black text-lg mb-2">{voiture.modele}</h2>
                                <div className="border-t border-gray-400 my-1"></div>
                                <div className="grid grid-cols-3 mt-5">
                                    <div className="flex flex-col items-center">
                                        <LuFuel className="text-lg mb-2" />
                                        <h2>{voiture.typeCarburant}</h2>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <GiGearStickPattern className="text-lg mb-2" />
                                        <h2>{voiture.typeBoite}</h2>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <HiUserGroup className="text-lg mb-2" />
                                        <h2>{voiture.capaciteDassise} Places</h2>
                                    </div>
                                </div>
                                <div className="border-t border-gray-400 my-1"></div>
                                <div className="flex items-center justify-between">
                                    <h2 className="font-semibold text-xl">{voiture.prixLocation}F/J</h2>
                                    <Link className="text-primary text-sm flex gap-2 items-center" to="">
                                        Voir Les Détails
                                        <MdOpenInNew />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SectionNosVehicules;

SectionNosVehicules.propTypes = {
    voitures: PropTypes.shape({
        data: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                images: PropTypes.array.isRequired,
                modele: PropTypes.string.isRequired,
                typeCarburant: PropTypes.string.isRequired,
                typeBoite: PropTypes.string.isRequired,
                capaciteDassise: PropTypes.number.isRequired
            })
        ),
    })
}