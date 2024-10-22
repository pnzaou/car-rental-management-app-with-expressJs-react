import { CiSearch } from "react-icons/ci";

const Search = () => {
    return (
        <di className="p-2 md:p-5 bg-white rounded-md 
        md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center
        w-[60%] ">
            <select className="select select-bordered w-full max-w-xs outline-none md:border-none
                focus:outline-none focus:ring-0 focus:border-none shadow-none text-lg">
                <option disabled selected>Catégories</option>
                <option>Han Solo</option>
                <option>Greedo</option>
            </select>
            <div className="hidden md:block h-8 w-[1px] bg-gray-300 mx-2"></div>
            <select className="select select-bordered w-full max-w-xs outline-none md:border-none
                focus:outline-none focus:ring-0 focus:border-none shadow-none text-lg">
                <option disabled selected>Marques</option>
                <option>Han Solo</option>
                <option>Greedo</option>
            </select>
            <div className="hidden md:block h-8 w-[1px] bg-gray-300 mx-2"></div>
            <select className="select select-bordered w-full max-w-xs outline-none md:border-none
                focus:outline-none focus:ring-0 focus:border-none shadow-none text-lg">
                <option disabled selected>Modèles</option>
                <option>Han Solo</option>
                <option>Greedo</option>
            </select>
            <div>
                <CiSearch className="text-[40px] bg-emerald-600 rounded-full p-2 text-white 
                    hover:scale-105 transition-all cursor-pointer"/>
            </div>
        </di>
    );
}

export default Search;
