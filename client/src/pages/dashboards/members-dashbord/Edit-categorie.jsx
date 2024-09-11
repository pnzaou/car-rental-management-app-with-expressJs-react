import { useState } from 'react'
import CategoryForm from './components/Category-form'
import { Link } from 'react-router-dom'

const EditCategorie = () => {
    const [title, setTitle] = useState("Détails de la catégorie")
  return (
    <div>
        <div className="breadcrumbs text-sm">
            <ul>
                <li><Link to="/members-dashboard">Tableau de bord</Link></li>
                <li><Link to="/members-dashboard/categories">Liste des catégories</Link></li>
                <li>Détails et modification</li>
            </ul>
        </div>
        <div className='text-center'>
            <h1 className='text-2xl font-bold'>{title}</h1>
        </div>
        <CategoryForm isEdit={true} setTitle={setTitle}/>
    </div>
  )
}

export default EditCategorie
