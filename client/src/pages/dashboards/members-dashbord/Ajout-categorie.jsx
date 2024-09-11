import CategoryForm from './components/Category-form'
import { Link } from 'react-router-dom'

const AjoutCategorie = () => {
  return (
    <div>
      <div className="breadcrumbs text-sm">
        <ul>
            <li><Link to="/members-dashboard">Tableau de bord</Link></li>
            <li><Link to="/members-dashboard/categories">Liste des catégories</Link></li>
            <li>Ajout</li>
        </ul>
      </div>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Ajout d&apos;une catégorie</h1>
      </div>
      <CategoryForm isEdit={false}/>
    </div>
  )
}

export default AjoutCategorie