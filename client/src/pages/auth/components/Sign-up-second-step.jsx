import PropTypes from "prop-types";

const SignUpSecondStep = ({register, errors}) => {
    return (
        <div>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Numéro Permis*
                </label>
                <input
                  className="
                  text-gray-700 border border-gray-300 
                  rounded py-2 px-4 block w-full focus:outline-2 
                  focus:outline-blue-700"
                  {...register("numeroPermis", {
                    required: true
                  })}
                  type="text"
                  required
                />
                {errors.nom && <span className="
                  mt-2 text-sm text-red-500
                ">
                  Ce champ est obligatoire!
                </span>}
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Date Expiration Permis*
                </label>
                <input
                  className="
                  text-gray-700 border border-gray-300 
                  rounded py-2 px-4 block w-full focus:outline-2 
                  focus:outline-blue-700"
                  {...register("expirationPermis", {
                    required: true
                  })}
                  type="date"
                  required
                />
                {errors.prenom && <span className="
                  mt-2 text-sm text-red-500
                ">
                  Ce champ est obligatoire!
                </span>}
              </div>
            </div>
            <div className="mt-4 flex gap-2 pop-up-options-sm:flex-col pop-up-options-sm:gap-4">
              <div>
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Photo Permis*
                </label>
                <input
                  className="
                  text-gray-700 border border-gray-300 
                  rounded py-2 px-4 block w-full focus:outline-2 
                  focus:outline-blue-700"
                  {...register("photoPermis", {
                    required: true
                  })}
                  type="file"
                  required
                />
                {errors.nom && <span className="
                  mt-2 text-sm text-red-500
                ">
                  Ce champ est obligatoire!
                </span>}
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Photo CNI*
                </label>
                <input
                  className="
                  text-gray-700 border border-gray-300 
                  rounded py-2 px-4 block w-full focus:outline-2 
                  focus:outline-blue-700"
                  {...register("photoCNI", {
                    required: true
                  })}
                  type="file"
                  required
                />
                {errors.prenom && <span className="
                  mt-2 text-sm text-red-500
                ">
                  Ce champ est obligatoire!
                </span>}
              </div>
            </div>
        </div>
    );
}

SignUpSecondStep.propTypes = {
    register: PropTypes.func,
    errors: PropTypes.object
}

export default SignUpSecondStep;
