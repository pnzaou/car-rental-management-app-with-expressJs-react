import Search from "./Search";

const Hero = () => {
    return (
        <div>
            <div className="flex flex-col items-center p-10 py-20
             gap-6 h-[550px] w-full bg-[#eef0fc]">
                <h2 className="text-lg">Trouvez des voitures à vendres et à louer près de chez vous</h2>
                <h2 className="text-[60px] font-bold">Trouvez la voiture de vos rêves</h2>

                <Search/>
                <img src="/img/subscribe-to-tesla-model-3-performance-long-range.png" 
                    className="mt-10"
                />
            </div>
        </div>
    );
}

export default Hero;
