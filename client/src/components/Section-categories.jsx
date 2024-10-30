import PropTypes from "prop-types";

const SectionCategories = ({ categories }) => {
    return (
        <div className="mt-20 md:mt-44">
            <h2 className="font-bold text-xl text-center mb-6">Parcourir Par Catégories</h2>

            <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-[${categories?.data.length - 2}]
             lg:grid-cols-[${categories?.data.length}] gap-6 px-20`}>
                {categories?.data.map(cat => (
                    <div className="border rounded-xl p-3 items-center 
                    flex flex-col cursor-pointer hover:scale-105 hover:shadow-sm" key={cat._id}>
                        <h2 className="font-semibold">{cat.nom}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SectionCategories;

SectionCategories.propTypes = {
    categories: PropTypes.shape({
        data: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                nom: PropTypes.string.isRequired,
            })
        ),
    })
}
