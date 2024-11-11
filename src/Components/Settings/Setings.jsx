import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Settings.css'
import AddModal from './AddModal';
import ChangeModal from './ChangeModal';
import DeleteModal from './DeleteModal';

const Setings = () => {

  const [data, setData] = useState([])
  // const url = 'https://autoapi.dezinfeksiyatashkent.uz/api/categories'

  function getCategory() {
    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
      .then((res) => {
        setData(res?.data?.data)
      })
  }

  useEffect(() => {
    getCategory()
  }, [])
  console.log(data);

  return (
    <div className='main'>

      <span className='flex flex-row'>

        <i className="fa-solid fa-magnifying-glass w-[37px] h-[32px] text-sm flex items-center justify-center border border-gray-400 rounded-l-md "></i>
        <input type="text" placeholder='large size' className='w-[370px] h-[32px] border border-gray-400 rounded-r-md outline-none py-1 px-3 ' />

      </span>

      <div className="main-in">

        <AddModal />

        <table className='container bg-white mt-5 '>

          <thead className='border border-gray-200  '>

            <tr className='border border-gray-200'>
              <th className='w-[177px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>name_en</th>
              <th className='w-[177px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>name_ru</th>
              <th className='w-[177px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Image</th>
              <th className='w-[177px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Action</th>
              <th className='w-[177px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>
                <button className='w-[128px] h-[32px] bg-[#1677FF] text-white rounded-lg '>Add categories</button>
              </th>
            </tr>

          </thead>

          <tbody>
            {
              data.map((item, index) => (
                <tr key={index}>
                  <td className='w-[177px] h-[101px] p-4 border border-gray-200 '>{item?.name_en}</td>
                  <td className='w-[177px] h-[101px] p-4 border border-gray-200 '>{item?.name_ru} </td>
                  <td className='w-[255px] h-[101px] p-4 flex justify-center border border-gray-200 '><img className='w-[100px] h-[62px] ' src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`} /></td>
                  <td className='w-[400px] h-[102px] p-4 border border-gray-200'>
                    <div className='flex flex-row gap-3 justify-center'>
                      <button className='btn w-[52px] h-[32px] bg-[#1677FF] rounded-lg '>
                        <i className="fa-solid fa-pencil text-white text-sm"></i>
                      </button>
                      
                      <button className='btn w-[52px] h-[32px] rounded-lg bg-red-500'>
                        <i className="fa-solid fa-trash text-white text-sm"></i>
                      </button>
                      <ChangeModal />
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Setings