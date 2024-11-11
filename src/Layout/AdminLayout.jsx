import React, { useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import './AdminLayout.css'
import logo from '../Components/images/logog.jpg'

const AdminLayout = () => {

    const navigate = useNavigate();
    const [isSidebarOpen, setisSidebarOpen] = useState(false)

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("login");
    }

    const toggleSidebar = () => {
        setisSidebarOpen(!isSidebarOpen);
    }

    const isActiveLink = (path) => location.pathname.includes(path);

    return (
        <div className='main p-0 flex'>

            <div className={`menu flex flex-col float-left ${isSidebarOpen ? 'w-[80px]' : 'w-[230px]'} h-[100vh] bg-blue-950 text-white`}>

                <div className={`w-full h-[55px] mt-2 flex items-center justify-center ${isSidebarOpen ? '' : 'px-[4px]'}`}>
                    {isSidebarOpen && (
                        <img src={logo} alt="Logo" className="w-[40px] h-[40px]" />
                    )}
                    <a href="/" className={`font-sans font-medium text-2xl ${!isSidebarOpen ? 'block' : 'hidden'}`}>AutozoomAdmin</a>
                </div>

                <div className={`menu-in flex flex-col gap-1 px-1 ${isSidebarOpen ? 'mt-3' : ''} `} >

                    <Link className={`menu-link w-[${!isSidebarOpen ? '225px' : '72px'}] h-[40px] hover:bg-[#1677FF] rounded-md flex items-center pl-7 gap-3 ${isActiveLink('dashboard') ? 'bg-[#1677FF]' : 'hover:bg-[#1677FF]'}`} to={'dashboard'}
                        onMouseEnter={(e) => isActiveLink('') ? e.currentTarget.classList.remove('hover:bg-[#1677FF]') : e.currentTarget.classList.add('hover:bg-[#1677FF]')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('hover:bg-[#1677FF]')}>
                        <i className="fa-solid fa-house"></i>
                        {!isSidebarOpen && <span>Dashboard</span>}
                    </Link>

                    <Link className={`menu-link w-[${!isSidebarOpen ? '225px' : '72px'}] h-[40px] hover:bg-[#1677FF] rounded-md flex items-center pl-7 gap-3 ${isActiveLink('settings') ? 'bg-[#1677FF]' : 'hover:bg-[#1677FF]'}`} to={'settings'}
                        onMouseEnter={(e) => isActiveLink('') ? e.currentTarget.classList.remove('hover:bg-[#1677FF]') : e.currentTarget.classList.add('hover:bg-[#1677FF]')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('hover:bg-[#1677FF]')}
                    >
                        <i className="fa-solid fa-gear"></i>
                        {!isSidebarOpen && <span>Settings</span>}
                    </Link>

                    <Link className={`menu-link w-[${!isSidebarOpen ? '225px' : '72px'}] h-[40px] hover:bg-[#1677FF] rounded-md flex items-center pl-7 gap-3 ${isActiveLink('brands') ? 'bg-[#1677FF]' : 'hover:bg-[#1677FF]'}`} to={'brands'}
                        onMouseEnter={(e) => isActiveLink('') ? e.currentTarget.classList.remove('hover:bg-[#1677FF]') : e.currentTarget.classList.add('hover:bg-[#1677FF]')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('hover:bg-[#1677FF]')}
                    >
                        <i className="fa-brands fa-wordpress"></i>
                        {!isSidebarOpen && <span>Brands</span>}
                    </Link>

                    <Link className={`menu-link w-[${!isSidebarOpen ? '225px' : '72px'}] h-[40px] hover:bg-[#1677FF] rounded-md flex items-center pl-7 gap-3 ${isActiveLink('models') ? 'bg-[#1677FF]' : 'hover:bg-[#1677FF]'}`} to={'models'}
                        onMouseEnter={(e) => isActiveLink('') ? e.currentTarget.classList.remove('hover:bg-[#1677FF]') : e.currentTarget.classList.add('hover:bg-[#1677FF]')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('hover:bg-[#1677FF]')}
                    >
                        <i className="fa-brands fa-slack"></i>
                        {!isSidebarOpen && <span>Models</span>}
                    </Link>

                    <Link className={`menu-link w-[${!isSidebarOpen ? '225px' : '72px'}] h-[40px] hover:bg-[#1677FF] rounded-md flex items-center pl-7 gap-3 ${isActiveLink('locations') ? 'bg-[#1677FF]' : 'hover:bg-[#1677FF]'}`} to={'locations'}
                        onMouseEnter={(e) => isActiveLink('') ? e.currentTarget.classList.remove('hover:bg-[#1677FF]') : e.currentTarget.classList.add('hover:bg-[#1677FF]')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('hover:bg-[#1677FF]')}
                    >
                        <i className="fa-solid fa-location-dot"></i>
                        {!isSidebarOpen && <span>Locations</span>}
                    </Link>

                    <Link className={`menu-link w-[${!isSidebarOpen ? '225px' : '72px'}] h-[40px] hover:bg-[#1677FF] rounded-md flex items-center pl-7 gap-3 ${isActiveLink('cities') ? 'bg-[#1677FF]' : 'hover:bg-[#1677FF]'}`} to={'cities'}
                        onMouseEnter={(e) => isActiveLink('') ? e.currentTarget.classList.remove('hover:bg-[#1677FF]') : e.currentTarget.classList.add('hover:bg-[#1677FF]')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('hover:bg-[#1677FF]')}
                    >
                        <i className="fa-solid fa-city"></i>
                        {!isSidebarOpen && <span>Cities</span>}
                    </Link>

                    <Link className={`menu-link w-[${!isSidebarOpen ? '225px' : '72px'}] h-[40px] hover:bg-[#1677FF] rounded-md flex items-center pl-7 gap-3 ${isActiveLink('cars') ? 'bg-[#1677FF]' : 'hover:bg-[#1677FF]'}`} to={'cars'}
                        onMouseEnter={(e) => isActiveLink('') ? e.currentTarget.classList.remove('hover:bg-[#1677FF]') : e.currentTarget.classList.add('hover:bg-[#1677FF]')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('hover:bg-[#1677FF]')}
                    >
                        <i className="fa-solid fa-car"></i>
                        {!isSidebarOpen && <span>Cars</span>}
                    </Link>

                </div>

            </div>

            <div className="flex flex-col flex-grow">

                <nav className={`container w-full h-[65px] top-0 left-0  z-10 flex py-[10px] items-center `}>

                    <button onClick={toggleSidebar} className={`w-[46px] h-[32px] rounded-md bg-[#1677FF] absolute ${!isSidebarOpen ? 'left-[250px]' : 'left-[100px]'} transition-all duration-300`}>
                        <i className="fa-solid fa-bars text-white"></i>
                    </button>

                    <button className="btn absolute right-[40px] border-2 border-gray-400 w-[145px] h-[42px] px-[20px] flex items-center justify-between text-xl font-sans rounded-xl">
                        <i className="fa-regular fa-user"></i>
                        Admin
                    </button>

                    <button onClick={handleLogout} className="logout-btn hidden absolute top-[65px] right-[40px] w-[145px] h-[40px] border-2 border-gray-400 text-center text-xl pb-2 pt-1 rounded-xl">
                        Logout
                    </button>

                </nav>

                <div className="flex-grow bg-blue-200 p-4">
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

export default AdminLayout