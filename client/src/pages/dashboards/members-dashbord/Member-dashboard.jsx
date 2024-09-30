import { useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom';


const MemberDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if(localStorage.getItem("sidebarState") === 'false') return false
    return true
  });

  const toggleSidebar = () => {
    localStorage.setItem("sidebarState", !isSidebarOpen)
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='min-h-screen flex'>
        <SideBar isOpen={isSidebarOpen} className="transition-all duration-300"/>
        <div className={`flex-1 ${isSidebarOpen ? "ml-80" : "ml-0"}`}>
          <NavBar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} isDash={true}/>
          <div className="p-4 mt-16 overflow-auto">
            <Outlet/>
          </div>
        </div>
    </div>
  )
}

export default MemberDashboard
