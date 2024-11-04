import PropTypes from "prop-types"
import Search from "./Search";

const Hero = ({categories, marques}) => {
    return (
        <div>
            <div className="flex flex-col items-center mt-16 p-10 py-20
             gap-6 h-[550px] w-full bg-[#eef0fc]">
                <h2 className=" text-center text-lg">Trouvez des voitures à vendres et à louer près de chez vous</h2>
                <h2 className="text-center text-[25px] sm:text-[40px] md:text-[60px] font-bold">Trouvez la voiture de vos rêves</h2>

                <Search categories={categories} marques={marques}/>
                <img src="/img/subscribe-to-tesla-model-3-performance-long-range.png" 
                    className="hidden md:block mt-10"
                />
            </div>
        </div>
    );
}

export default Hero;

Hero.propTypes = {
    categories: PropTypes.object,
    marques: PropTypes.object
}
