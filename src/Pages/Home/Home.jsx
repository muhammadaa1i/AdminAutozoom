import React from 'react'
import logo from '../images/logog.jpg'
import Sidebar4 from './Sidebar4'

const Home = () => {
    return (
        <div className='container'>

            {/* <button type="button" className="as-btn w-[45px] h-[30px] rounded-md bg-indigo-700 mb-[16px] absolute top-[16px] left-[275px] z-[999] transition-[0.1s] max-sm:left-[100px] ">

                    <i className="fa-solid fa-bars text-white"></i>

                </button> */}

            {/* <ul className="menu w-[80px] h-[100vh] bg-white border-r-[1px] border-indigo-300 shadow-indigo-300 shadow-md max-sm:w-[60px] ">

                    <li className="menu-in h-[75px] flex items-start ">

                        <img className='menu-img w-full h-[60px] ' src={logo} />

                    </li>

                    <li className='menu-in w-[72px] h-[40px] m-auto hover:bg-indigo-200 rounded-lg flex items-center justify-center mt-2 '>

                        <i className="fa-solid fa-house text-indigo-700 text-base font-semibold "></i>

                    </li>

                    <li className='menu-in w-[72px] h-[40px] m-auto text-white flex justify-center items-center mt-2 hover:bg-indigo-200 rounded-lg '>

                        <i className="fa-solid fa-gear text-indigo-700 font-semibold "></i>

                    </li>

                    <li className='menu-in w-[72px] h-[40px] m-auto text-white flex justify-center items-center mt-2 hover:bg-indigo-200 rounded-lg '>

                        <i className="fa-solid fa-shop text-indigo-700 text-base font-semibold "></i>

                    </li>

                    <li className='menu-in w-[72px] h-[40px] m-auto text-white flex justify-center items-center mt-2 hover:bg-indigo-200 rounded-lg '>

                        <i className="fa-brands fa-cloudflare text-indigo-700 text-base font-semibold "></i>

                    </li>

                    <li className='menu-in w-[72px] h-[40px] m-auto text-white flex justify-center items-center mt-2 hover:bg-indigo-200 rounded-lg '>

                        <i className="fa-solid fa-map-location-dot text-indigo-700 text-base font-semibold"></i>

                    </li>

                    <li className='menu-in w-[72px] h-[40px] m-auto text-white flex justify-center items-center mt-2 hover:bg-indigo-200 rounded-lg '>

                        <i className="fa-solid fa-city text-indigo-700 text-base font-semibold"></i>

                    </li>

                    <li className='menu-in w-[72px] h-[40px] m-auto text-white flex justify-center items-center mt-2 hover:bg-indigo-200 rounded-lg '>

                        <i className="fa-solid fa-car text-indigo-700 text-base font-semibold"></i>

                    </li>

                </ul> */}

            <Sidebar4 />

        </div>
    )
}

export default Home