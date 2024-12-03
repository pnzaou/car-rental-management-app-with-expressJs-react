import PropTypes from "prop-types";

const SignUpFirstStep = ({register, errors, password}) => {
    const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

    return (
        <div>
            <div className="mt-4 flex gap-2">
              <div>
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Votre Nom*
                </label>
                <input
                  className="
                  text-gray-700 border border-gray-300 
                  rounded py-2 px-4 block w-full focus:outline-2 
                  focus:outline-blue-700"
                  {...register("nom", {
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
                  Votre Prénom*
                </label>
                <input
                  className="
                  text-gray-700 border border-gray-300 
                  rounded py-2 px-4 block w-full focus:outline-2 
                  focus:outline-blue-700"
                  {...register("prenom", {
                    required: true
                  })}
                  type="text"
                  required
                />
                {errors.prenom && <span className="
                  mt-2 text-sm text-red-500
                ">
                  Ce champ est obligatoire!
                </span>}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <div>
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Votre Email*
                </label>
                <input
                  className="
                  text-gray-700 border border-gray-300 
                  rounded py-2 px-4 block w-full focus:outline-2 
                  focus:outline-blue-700"
                  {...register("email", {
                    required: true,
                    pattern: emailRegex
                  })}
                  type="email"
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
                  Votre Téléphone*
                </label>
                <input
                  className="
                  text-gray-700 border border-gray-300 
                  rounded py-2 px-4 block w-full focus:outline-2 
                  focus:outline-blue-700"
                  {...register("tel", {
                    required: true
                  })}
                  type="tel"
                  required
                />
                {errors.prenom && <span className="
                  mt-2 text-sm text-red-500
                ">
                  Ce champ est obligatoire!
                </span>}
              </div>
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Votre Mot de Passe*
                </label>
              </div>
              <input
                className="
                text-gray-700 border border-gray-300
                rounded py-2 px-4 block w-full focus:outline-2 
                focus:outline-blue-700"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  pattern: mdpRegex
                })}
                type="password"
                required
              />
              {errors.password && <span className="
                mt-2 text-sm text-red-500
              ">
                Champ requis! Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car
              </span>}
              
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Confirmer le Mot de Passe*
                </label>
              </div>
              <input
                className="
                text-gray-700 border border-gray-300
                rounded py-2 px-4 block w-full focus:outline-2 
                focus:outline-blue-700"
                {...register("confirmPassword", {
                  required: true,
                  minLength: 8,
                  pattern: mdpRegex,
                  validate: value =>
                    value === password || "Champ requis! Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car"
                })}
                type="password"
                required
              />
              {errors.password && <span className="
                mt-2 text-sm text-red-500
              ">
                Champ requis! Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car
              </span>}
            </div>
        </div>
    );
}

SignUpFirstStep.propTypes = {
    register: PropTypes.func,
    errors: PropTypes.object,
    password: PropTypes.string
}

export default SignUpFirstStep;
