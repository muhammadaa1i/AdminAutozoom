import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Models = () => {

  const token = localStorage.getItem('token')

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [data, setData] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [modalInfoOpen, setModalInfoOpen] = useState(false)


  const [name, setName] = useState('')
  const [brandsGet, setBrandsGet] = useState()
  const [selectBrandId, setSelectBrandId] = useState()


  function getCategory() {
    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/models')
      .then((res) => {
        setData(res?.data?.data)
      })
  }

  useEffect(() => {
    getCategory()
  }, [])

  function getBrands() {
    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/brands')
      .then((res) => {
        setBrandsGet(res?.data?.data)
      })
  }

  useEffect(() => {
    getBrands()
  }, [])


  useEffect(() => {
    if (addModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [addModalOpen]);

  function addCategory(e) {
    e.preventDefault()

    const formdata = new FormData()
    formdata.append('name', name)
    formdata.append('brand_id', selectBrandId)

    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/models', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formdata,
    }).then((res) => res.json)
      .then((item) => {
        console.log(item);
        setAddModalOpen(false);
        getCategory();
        toast.success("Category added successfully!")
      })
      .catch((error) => {
        console.error("Error:", error)
      });
  }

  function deleteHandler() {

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${selectedCategoryId}`, {
      method: 'Delete',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => res.json())
      .then((item) => {
        if (item.success) {
          console.log(item);
          toast.success(item?.message)
          setModalInfoOpen(false)
          getCategory()
        }
        else {
          toast.error(item?.message)
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      })
  }

  const [editModalOpen, setEditModalOpen] = useState(false)

  function editCategory(e) {
    e.preventDefault()

    const formData = new FormData();
    formData.append("name", name)
    formData.append('brand_id', selectBrandId)

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${selectedCategoryId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((item) => {
        if (item.success) {
          toast.success(item?.message);
          getCategory();
          setEditModalOpen(false);
        } else {
          toast.error(item?.message);
        }
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      })
  }

  return (
    <div className='main'>
      <ToastContainer position="top-center" autoClose={3000} />

      <span className='flex flex-row'>

        <i className="fa-solid fa-magnifying-glass w-[37px] h-[32px] text-sm flex items-center justify-center border border-gray-400 rounded-l-md "></i>
        <input type="text" placeholder='large size' className='w-[370px] h-[32px] border border-gray-400 rounded-r-md outline-none py-1 px-3 ' />

      </span>

      <div className="main-in">

        <table className='container bg-white mt-5'>

          <thead className='border border-gray-200  '>

            <tr className='border border-gray-200'>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Name</th>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Brand</th>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Action</th>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>
                <button onClick={() => setAddModalOpen(true)} className='add-btn w-[128px] h-[32px] bg-[#1677FF] text-white rounded-lg '>Add brand</button>
              </th>
            </tr>

          </thead>

          <tbody>
            {
              data.map((item, index) => (
                <tr key={index}>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.name}</td>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.brand_title}</td>
                  <td className='w-[300px] h-[102px] p-4 border border-gray-200'>

                    <div className='flex flex-row gap-3 justify-center'>

                      <button
                        onClick={() => {
                          setEditModalOpen(true)
                          setSelectedCategoryId(item.id)
                          setName(item.name)
                          setSelectBrandId(item.brand_id)
                        }}
                        className='btn w-[52px] h-[32px] bg-[#1677FF] rounded-lg '>
                        <i className="fa-solid fa-pencil text-white text-sm"></i>
                      </button>

                      <button
                        onClick={() => {
                          setModalInfoOpen(true)
                          setSelectedCategoryId(item.id)
                        }}
                        className='btn w-[52px] h-[32px] rounded-lg bg-red-500'>
                        <i className="fa-solid fa-trash text-white text-sm"></i>
                      </button>

                      {modalInfoOpen && (
                        <div className='modal'>
                          <div className="modal-wrapper container">
                            <div className="modal-content">
                              <h1>Do you want to delete this brand?</h1>
                              <button
                                className='modal-close-button w-[72px] h-[32px] py-1 px-4 border border-black rounded-md flex justify-center items-center mt-[54px]'
                                onClick={() => setModalInfoOpen(false)}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => deleteHandler()}
                                className='modal-ok-button w-[50px] h-[32px] text-white bg-[#1677FF] rounded-md float-right mr-20 mt-[26px]'
                              >
                                OK
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>

      </div>

      {addModalOpen && (
        <>
          <div className="overlay"></div>

          <div className='container'>

            <form onSubmit={addCategory} className='add-modal w-[520px] h-[400x] m-auto p-5 bg-white rounded-2xl'>

              <div className='flex flex-row justify-between'>
                <h1 className='font-semibold'>Vertically centered modal dialog</h1>
                <button onClick={() => setAddModalOpen(false)}>
                  <i className="fa-solid fa-x text-base text-gray-600"></i>
                </button>
              </div>

              <div className='flex flex-col gap-6 mt-2'>

                <div className='flex flex-col gap-1'>
                  <h1>*Model Name</h1>
                  <input
                    onChange={(e) => setName(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-2'>
                  <h1>*Brand Name</h1>
                  <span className='w-[120px] h-[32px] border border-gray-300 rounded-md flex items-center justify-center px-[11px]'>
                    <select
                      className='outline-none'
                      value={selectBrandId} 
                      onChange={(e) => setSelectBrandId(e?.target?.value)}>
                      {
                        brandsGet.map((item, index) => {
                          return <option
                            className='w-[120px] h-[32px] border border-gray-300 rounded-md' key={index} value={item.id}>
                            {item.title}
                          </option>
                        })
                      }
                    </select>
                  </span>
                </div>

              </div>

              <div className='w-[135px] h-[32px] p-0 flex flex-row float-right justify-between mt-[100px] '>

                <button
                  className='w-[73px] h-[32px] py-1 px-4 border border-gray-300 rounded-md flex justify-center'
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </button>

                <button type='submit' className='w-[46px] h-[32px] py-1 px-4 bg-[#1677FF] text-white rounded-md flex justify-center'>
                  OK
                </button>

              </div>

            </form>

          </div>

        </>
      )}

      {editModalOpen && (
        <>
          <div className="overlay"></div>

          <div className='container'>

            <form onSubmit={editCategory} className='add-modal w-[500px] h-[350px] m-auto p-5 bg-white rounded-2xl'>

              <div className='flex flex-row justify-between'>
                <h1 className='font-semibold'>Edit Category</h1>
                <button onClick={() => setEditModalOpen(false)}>
                  <i className="fa-solid fa-x text-base text-gray-600"></i>
                </button>
              </div>

              <div className='flex flex-col gap-6 mt-2'>

                <div className='flex flex-col gap-1'>
                  <h1>*Model Name</h1>
                  <input
                    onChange={(e) => setName(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    value={name}
                    type="text"
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-2'>
                  <h1>*Brand Name</h1>
                  <span className='w-[120px] h-[32px] border border-gray-300 rounded-md flex items-center justify-center px-[11px]'>
                    <select className='outline-none' onChange={(e) => setSelectBrandId(e?.target?.value)}>
                      {
                        brandsGet.map((item, index) => {
                          return <option
                            className='w-[120px] h-[32px] border border-gray-300 rounded-md' key={index} value={item.id}>
                            {item.title}
                          </option>
                        })
                      }
                    </select>
                  </span>
                </div>

              </div>

              <div className='w-[135px] h-[32px] p-0 flex flex-row float-right justify-between mt-[100px]'>

                <button
                  className='w-[73px] h-[32px] py-1 px-4 border border-gray-300 rounded-md flex justify-center'
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  onClick={(e) => editCategory(e)}
                  type='submit'
                  className='w-[46px] h-[32px] py-1 px-4 bg-[#1677FF] text-white rounded-md flex justify-center'>
                  Save
                </button>

              </div>

            </form>

          </div>

        </>
      )}

    </div>
  )
}

export default Models