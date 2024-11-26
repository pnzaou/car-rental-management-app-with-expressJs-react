export const reservationDescription = (options, data) => {
    if(options.length === 0) {
        return `Réservation du véhicule ${data?.modele.nom}`
    }

    if(options.length === 1) {
        return `Réservation du véhicule ${data?.modele.nom} avec l'option: ${options[0].optionNom}`
    }

    if(options.length === 2) {
        return `Réservation du véhicule ${data?.modele.nom} avec les options: ${options[0].optionNom} et ${options[1].optionNom}`
    }

    const allButLast = options.slice(0, -1).map(option => option.optionNom).join(', ')
    const lastOption = options[options.length - 1].optionNom

    return `Réservation du véhicule ${data?.modele.nom} avec les options: ${allButLast} et ${lastOption}`
}