import { useQuery } from 'react-query'
import axios from 'axios'
import Header from "./components/Header"
import Hero from "./components/Hero"
import SectionCategories from './components/Section-categories'
import SectionNosVehicules from './components/Section-nos-vehicules'
import Footer from './components/Footer'

const fetchCategories = async () => {
  const {data} = await axios.get('http://localhost:5000/api/public/categories')
  return data
}

const fetchMarques = async () => {
  const {data} = await axios.get('http://localhost:5000/api/public/marques')
  return data
}

const fetchVoitures = async () => {
  const {data} = await axios.get(`http://localhost:5000/api/voitures-rent-client`)
  return data
}

const App = () => {

  const {data: categories, isLoading: isLoadingCategories} = useQuery('categories', fetchCategories)
  const {data: marques, isLoading: isLoadingMarques} = useQuery('marques', fetchMarques)
  const {data: voitures, isLoading: isLoadingVoitures} = useQuery('voitures', fetchVoitures)

  if(isLoadingCategories || isLoadingMarques || isLoadingVoitures) {
    return (
      <div className='flex items-center justify-center h-screen'>
          <img src="img/LOGO_LPCY.png" alt="logo du site" className='h-60 w-60 animate-bounce'/>
      </div>
    )
  }

  return (
    <div>
        <Header/>
        <Hero categories={categories} marques={marques}/>
        <SectionCategories categories={categories}/>
        <SectionNosVehicules voitures={voitures}/>
        <Footer/>
    </div>
  )
}

export default App
