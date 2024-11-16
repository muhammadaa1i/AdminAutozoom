import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Cars = () => {

  const token = localStorage.getItem('token');

  const [data, setData] = useState([])
  const [modalInfoOpen, setModalInfoOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [addModalOpen, setAddModalOpen] = useState(false)

  function getCategory() {
    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cars')
      .then((res) => {
        setData(res?.data?.data)
      })
  }
  console.log(data);

  useEffect(() => {
    getCategory()
  }, [])

  const [category, SetCategory] = useState()
  const [brand, setBrand] = useState()
  const [model, setModel] = useState()
  const [location, setLocation] = useState()
  const [city, setCity] = useState()
  const [color, setColor] = useState()
  const [yil, setYil] = useState()
  const [seconds, setSeconds] = useState()
  const [speed, setSpeed] = useState()
  const [maxpeople, setMaxPeople] = useState()
  const [motor, setMotor] = useState()
  const [transmission, setTransmission] = useState()
  const [driverside, setDriverSide] = useState()
  const [yoqilgi, setYoqilgi] = useState()
  const [limitperday, setLimitPerDay] = useState()
  const [deposit, setDeposit] = useState()
  const [protectionprice, setProtectionPrice] = useState()
  const [aed, setAed] = useState()
  const [usdotd, setUsdOtd] = useState()
  const [aedotd, setAedOtd] = useState()
  const [usd, setUsd] = useState()

  function addCategory(e) {
    e.preventDefault()

    const formdata = new FormData()
    formdata.append('category_id', category)
    formdata.append('brand_id', brand)
    formdata.append('model_id', model)
    formdata.append('location_id', location)
    formdata.append('city_id', city)

    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/locations', {
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

  const [selectCategoryId, setSelectCategoryId] = useState()
  const [categoryGet, setCategoryGet] = useState()

  function getCategories() {
    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
      .then((res) => {
        setCategoryGet(res?.data?.data)
      })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div>

      <div className="main-in">
        <ToastContainer position="top-center" autoClose={3000} />

        <table className='container bg-white mt-5'>

          <thead className='border border-gray-200  '>

            <tr className='border border-gray-200'>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Brand</th>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Model</th>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Color</th>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>City</th>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Action</th>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>
                <button onClick={() => setAddModalOpen(true)} className='add-btn w-[128px] h-[32px] bg-[#1677FF] text-white rounded-lg '>Add categories</button>
              </th>
            </tr>

          </thead>

          <tbody>
            {
              data.map((item, index) => (
                <tr key={index}>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.brand?.title}</td>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.model?.name}</td>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.color}</td>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.city?.name}</td>
                  <td className='w-[300px] h-[102px] p-4 border border-gray-200'>

                    <div className='flex flex-row gap-3 justify-center'>

                      <button
                        onClick={() => {
                          setEditModalOpen(true)
                          setSelectedCategoryId(item.id)
                        }}
                        className='btn w-[52px] h-[32px] bg-[#1677FF] rounded-lg '>
                        <i className="fa-solid fa-pencil text-white text-sm"></i>
                      </button>

                      <button onClick={() => {
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
          <div className="overlay fixed inset-0 bg-black opacity-50 z-10"></div>

          <div className='container fixed inset-0 z-20 flex items-center justify-center p-5'>

            <form onSubmit={addCategory} className='add-modal w-[520px] max-h-[90vh] overflow-y-auto m-auto py-10 px-5 bg-white rounded-2xl'>

              <div className='flex flex-row justify-between'>
                <h1 className='font-semibold'>Add New Category</h1>
                <button onClick={() => setAddModalOpen(false)}>
                  <i className="fa-solid fa-x text-base text-gray-600"></i>
                </button>
              </div>

              <div className='flex flex-col gap-6 mt-2'>

                <div className='flex flex-col gap-1'>
                  <h1>*Category</h1>
                  <select
                    className='outline-none border border-gray-300 rounded-md p-1'
                    value={selectCategoryId}
                    onChange={(e) => setSelectCategoryId(e?.target?.value)}>
                    {
                      categoryGet.map((item, index) => {
                        return <option
                          className='w-[120px] h-[32px] border border-gray-300 rounded-md' key={index} value={item.id}>
                          {item.name_en}
                        </option>
                      })
                    }
                  </select>
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Brand</h1>
                  <input
                    onChange={(e) => setBrand(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Model</h1>
                  <input
                    onChange={(e) => setModel(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Location</h1>
                  <input
                    onChange={(e) => setLocation(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*City</h1>
                  <input
                    onChange={(e) => setCity(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Color</h1>
                  <input
                    onChange={(e) => setColor(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Yil</h1>
                  <input
                    onChange={(e) => setYil(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Seconds</h1>
                  <input
                    onChange={(e) => setSeconds(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Speed</h1>
                  <input
                    onChange={(e) => setSpeed(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Max People</h1>
                  <input
                    onChange={(e) => setMaxPeople(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Motor</h1>
                  <input
                    onChange={(e) => setMotor(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Transmission</h1>
                  <input
                    onChange={(e) => setTransmission(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Driver Side</h1>
                  <input
                    onChange={(e) => setDriverSide(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Yoqilg'i</h1>
                  <input
                    onChange={(e) => setYoqilgi(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Limit Per Day</h1>
                  <input
                    onChange={(e) => setLimitPerDay(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Deposit</h1>
                  <input
                    onChange={(e) => setDeposit(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Premium Protection Price</h1>
                  <input
                    onChange={(e) => setProtectionPrice(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in AED</h1>
                  <input
                    onChange={(e) => setAed(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in USD(Otd)</h1>
                  <input
                    onChange={(e) => setUsdOtd(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in AED (Otd)</h1>
                  <input
                    onChange={(e) => setUsdOtd(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in USD</h1>
                  <input
                    onChange={(e) => setUsd(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

              </div>

              <div className='w-[135px] h-[32px] p-0 flex flex-row float-right justify-between mt-[50px]'>

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

    </div>
  )
}

export default Cars