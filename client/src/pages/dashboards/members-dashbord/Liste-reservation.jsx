import { useContext, useState } from "react"


const ListeReservation = () => {
    const [idMarque, setIdMarque] = useState("")
    const marParPage = 5
    const queryKey = "marData"
    const {token} = useContext(TokenContext)
    const url = "http://localhost:5000/api/marques"
    const supUrl = "http://localhost:5000/api/marque"
    
    return (
        <div>
            
        </div>
    );
}

export default ListeReservation;
