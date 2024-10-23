import { useQuery } from 'react-query'
import axios from 'axios'
import Header from "./components/Header"
import Hero from "./components/Hero"

const fetchCategories = async () => {
  const {data} = await axios.get('http://localhost:5000/api/public/categories')
  return data
}

const fetchMarques = async () => {
  const {data} = await axios.get('http://localhost:5000/api/public/marques')
  return data
}

// const fetchModels = async (id) => {
//   const {data} = await axios.get(`http://localhost:5000/api/public/modeles/${id}`)
// }

const App = () => {

  const {data: categories, isLoading: isLoadingCategories} = useQuery('categories', fetchCategories)
  const {data: marques, isLoading:isLoadingMarques} = useQuery('marques', fetchMarques)
  //const {} = useQuery()

  if(isLoadingCategories || isLoadingMarques) {
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
    </div>
  )
}

export default App
