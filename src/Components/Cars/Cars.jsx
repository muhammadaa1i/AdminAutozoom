import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Cars = () => {

  const token = localStorage.getItem('token');

  const [data, setData] = useState([])
  const [oneData, setOneData] = useState([])
  const [modalInfoOpen, setModalInfoOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectCategoryId, setSelectCategoryId] = useState()
  const [selectBrandId, setSelectBrandId] = useState('')

  function getCategory() {
    axios.get('https://realauto.limsa.uz/api/cars')
      .then((res) => {
        setData(res?.data?.data)
      })
  }

  function getCategoryOne(id) {
    axios.get(`https://realauto.limsa.uz/api/cars/${id}`)
      .then((res) => {
        setOneData([res?.data?.data])
        setSelectCategoryId(res?.data?.data?.category_id)
        setSelectBrandId(res?.data?.data?.title)
      })
  }
  useEffect(() => {
    getCategory()
    getCategoryOne()
  }, [])



  const [color, setColor] = useState('')
  const [yil, setYil] = useState('')
  const [seconds, setSeconds] = useState('')
  const [speed, setSpeed] = useState('')
  const [maxpeople, setMaxPeople] = useState('')
  const [motor, setMotor] = useState('')
  const [transmission, setTransmission] = useState('')
  const [driverside, setDriverSide] = useState('')
  const [yoqilgi, setYoqilgi] = useState('')
  const [limitperday, setLimitPerDay] = useState('')
  const [deposit, setDeposit] = useState('')
  const [protectionprice, setProtectionPrice] = useState('')
  const [aed, setAed] = useState('')
  const [usdotd, setUsdOtd] = useState('')
  const [aedotd, setAedOtd] = useState('')
  const [usd, setUsd] = useState('')
  const [carimages, setCarImages] = useState('')
  const [mainimage, setMainImage] = useState('')
  const [coverpic, setCoverPic] = useState('')

  function addCategory(e) {
    e.preventDefault()

    const formdata = new FormData()
    formdata.append('category_id', selectCategoryId)
    formdata.append('brand_id', brandId)
    formdata.append('model_id', modelID)
    formdata.append('location_id', LocationsID)
    formdata.append('city_id', CityId)
    formdata.append('color', color)
    formdata.append('year', yil)
    formdata.append('seconds', seconds)
    formdata.append('max_speed', speed)
    formdata.append('max_people', maxpeople)
    formdata.append('motor', motor)
    formdata.append('transmission', transmission)
    formdata.append('drive_side', driverside)
    formdata.append('petrol', yoqilgi)
    formdata.append('limitperday', limitperday)
    formdata.append('deposit', deposit)
    formdata.append('premium_protection', protectionprice)
    formdata.append('price_in_aed', aed)
    formdata.append('price_in_usd_sale', usdotd)
    formdata.append('price_in_aed_sale', aedotd)
    formdata.append('price_in_usd', usd)
    formdata.append('images', carimages)
    formdata.append('images', mainimage)
    formdata.append('cover', coverpic)

    fetch('https://realauto.limsa.uz/api/cars', {
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

  const [categoryGet, setCategoryGet] = useState([])
  const [categoryID, setCategoryID] = useState('')

  function getCategories() {
    axios.get('https://realauto.limsa.uz/api/categories')
      .then((res) => {
        setCategoryGet(res?.data?.data)
      })
  }
  console.log(categoryGet)

  useEffect(() => {
    getCategories()
  }, [])

  const [brandId, setBrandId] = useState('')
  const [brandGet, setBrandGet] = useState('')

  function getBrands() {
    axios.get('https://realauto.limsa.uz/api/brands')
      .then((res) => {
        setBrandGet(res?.data?.data)
        console.log(res.data.data);

      })
  }

  useEffect(() => {
    getBrands()
  }, [])

  const [modelID, setModelID] = useState('')
  const [modelGet, setModelGet] = useState('')

  function getModels() {
    axios.get('https://realauto.limsa.uz/api/models')
      .then((res) => {
        setModelGet(res?.data?.data)
      })
  }

  useEffect(() => {
    getModels()
  }, [])

  const [LocationsID, setLocationsID] = useState('')
  const [locationsGet, setLocationsGet] = useState('')

  function getLocations() {
    axios.get('https://realauto.limsa.uz/api/locations')
      .then((res) => {
        setLocationsGet(res?.data?.data)
      })
  }

  useEffect(() => {
    getLocations()
  }, [])

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  }

  const [CityId, setCityId] = useState('')
  const [CityGet, setCityGet] = useState('')

  function getCity() {
    axios.get('https://realauto.limsa.uz/api/cities')
      .then((res) => {
        setCityGet(res?.data?.data)
      })
  }

  useEffect(() => {
    getCity()
  }, [])

  const [editModalOpen, setEditModalOpen] = useState(false)

  function editHandler(e) {
    e.preventDefault()
    fetch(`https://realauto.limsa.uz/api/cars/${selectCategoryId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success(item?.message);
          getCategory();
          setEditModalOpen(false);
        } else {
          toast.error(item?.message);
        }
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  }

  function deleteHandler() {
    fetch(`https://realauto.limsa.uz/api/cars/${selectCategoryId}`, {
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

  return (
    <div>

      <div className="main-in">

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
              data.map((item) => (
                <tr key={item.id}>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.brand?.title}</td>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.model?.name}</td>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.color}</td>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.city?.name}</td>
                  <td className='w-[300px] h-[102px] p-4 border border-gray-200'>

                    <div className='flex flex-row gap-3 justify-center'>

                      <button
                        onClick={() => {
                          setEditModalOpen(true)
                          setSelectCategoryId(item?.id)
                          setSelectBrandId(item?.id)
                          getCategoryOne(item?.id)
                        }}
                        className='btn w-[52px] h-[32px] bg-[#1677FF] rounded-lg '>
                        <i className="fa-solid fa-pencil text-white text-sm"></i>
                      </button>

                      <button onClick={() => {
                        setModalInfoOpen(true)
                        setSelectCategoryId(item?.id)
                        setCategoryID(item.category_id)
                      }}
                        className='btn w-[52px] h-[32px] rounded-lg bg-red-500'>
                        <i className="fa-solid fa-trash text-white text-sm"></i>
                      </button>

                      {modalInfoOpen && (
                        <div
                          onClick={() => setModalInfoOpen(false)}
                          className='modal fixed top-0 left-0 w-full h-full z-99'>
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
          <div
            onClick={() => setAddModalOpen(false)}
            className="overlay fixed inset-0 bg-black opacity-50 z-99"></div>

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
                    value={selectCategoryId || ""}
                    onChange={(e) => setSelectCategoryId(e?.target?.value)}>
                    <option value='' disabled>
                      Select Category
                    </option>
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
                  <select
                    className='outline-none border border-gray-300 rounded-md p-1'
                    value={brandId || ''}
                    onChange={(e) => setBrandId(e?.target?.value)}>
                    <option value='' disabled>
                      Select Brand
                    </option>
                    {
                      brandGet.map((item, index) => {
                        return <option
                          className='w-[60px] h-[32px] border border-gray-300 rounded-md' key={index} value={item.id}>
                          {item.title}
                        </option>
                      })
                    }
                  </select>
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Model</h1>
                  <select
                    className='outline-none border border-gray-300 rounded-md p-1'
                    value={modelID || ""}
                    onChange={(e) => setModelID(e?.target?.value)}>
                    <option value='' disabled>
                      Select Model
                    </option>
                    {
                      modelGet.map((item, index) => {
                        return <option
                          className='w-[60px] h-[32px] border border-gray-300 rounded-md' key={index} value={item.id}>
                          {item.name}
                        </option>
                      })
                    }
                  </select>
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Location</h1>
                  <select
                    className='outline-none border border-gray-300 rounded-md p-1'
                    value={LocationsID || ''}
                    onChange={(e) => setLocationsID(e?.target?.value)}>
                    <option value='' disabled>
                      Select Location
                    </option>
                    {
                      locationsGet.map((item, index) => {
                        return <option
                          className='w-[60px] h-[32px] border border-gray-300 rounded-md' key={index} value={item.id}>
                          {item.name}
                        </option>
                      })
                    }
                  </select>
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*City</h1>
                  <select
                    className='outline-none border border-gray-300 rounded-md p-1'
                    value={CityId || ''}
                    onChange={(e) => setCityId(e?.target?.value)}>
                    <option value='' disabled>
                      Select City
                    </option>
                    {
                      CityGet.map((item, index) => {
                        return <option
                          className='w-[60px] h-[32px] border border-gray-300 rounded-md' key={index} value={item.id}>
                          {item.name}
                        </option>
                      })
                    }
                  </select>
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Color</h1>
                  <input
                    onChange={(e) => setColor(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Yil</h1>
                  <input
                    onChange={(e) => setYil(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Seconds</h1>
                  <input
                    onChange={(e) => setSeconds(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    required
                    minLength={1} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Speed</h1>
                  <input
                    onChange={(e) => setSpeed(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Max People</h1>
                  <input
                    onChange={(e) => setMaxPeople(e?.target?.value, 10)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    min={0} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Motor</h1>
                  <input
                    onChange={(e) => setMotor(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Transmission</h1>
                  <input
                    onChange={(e) => setTransmission(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Driver Side</h1>
                  <input
                    onChange={(e) => setDriverSide(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Yoqilg'i</h1>
                  <input
                    onChange={(e) => setYoqilgi(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Limit Per Day</h1>
                  <input
                    onChange={(e) => setLimitPerDay(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Deposit</h1>
                  <input
                    onChange={(e) => setDeposit(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    required
                    minLength={1} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Premium Protection Price</h1>
                  <input
                    onChange={(e) => setProtectionPrice(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    required
                    minLength={1} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in AED</h1>
                  <input
                    onChange={(e) => setAed(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in USD(Otd)</h1>
                  <input
                    onChange={(e) => setUsdOtd(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in AED (Otd)</h1>
                  <input
                    onChange={(e) => setAedOtd(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    required
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in USD</h1>
                  <input
                    onChange={(e) => setUsd(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    required
                    minLength={2} />
                </div>

                <label className='w-[65px] h-[22px] text-sm mb-7 '>
                  <h1>
                    Inclusive
                  </h1>
                  <span onClick={handleToggle}>
                    <i className={`fa-solid text-4xl ${isToggled ? "fa-toggle-on text-[#1677FF]" : "fa-toggle-off text-gray-400"
                      }`}></i>
                  </span>
                </label>

                <div className='flex flex-col gap-2'>
                  <h1>*Upload car images</h1>
                  <span className='w-[320px] h-[100px] border border-gray-300 rounded-md flex items-center justify-center'>
                    <input
                      id="file-input"
                      type="file"
                      className="file-input"
                      accept="image/png, image/jpeg"
                      required
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setCarImages(file)
                        }
                      }}
                    />
                  </span>
                </div>

                <div className='flex flex-col gap-2'>
                  <h1>*Upload the main image</h1>
                  <span className='w-[320px] h-[100px] border border-gray-300 rounded-md flex items-center justify-center'>
                    <input
                      id="file-input"
                      type="file"
                      className="file-input"
                      accept="image/png, image/jpeg"
                      required
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setMainImage(file)
                        }
                      }}
                    />
                  </span>
                </div>

                <div className='flex flex-col gap-2'>
                  <h1>*Upload the cover image</h1>
                  <span className='w-[320px] h-[100px] border border-gray-300 rounded-md flex items-center justify-center'>
                    <input
                      id="file-input"
                      type="file"
                      className="file-input"
                      accept="image/png, image/jpeg"
                      required
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setCoverPic(file)
                        }
                      }}
                    />
                  </span>
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

      {editModalOpen && (
        <>
          <div
            onClick={() => setEditModalOpen(false)}
            className="overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-99"></div>

          <div className='container fixed inset-0 z-20 flex items-center justify-center p-5'>

            <form onSubmit={editHandler} className='add-modal w-[520px] max-h-[90vh] overflow-y-auto m-auto py-10 px-5 bg-white rounded-2xl'>

              <div className='flex flex-row justify-between'>
                <h1 className='font-semibold'>Edit Category</h1>
                <button onClick={() => setEditModalOpen(false)}>
                  <i className="fa-solid fa-x text-base text-gray-600"></i>
                </button>
              </div>

              <div className='flex flex-col gap-6 mt-2'>

                <div className='flex flex-col gap-1'>
                  <h1>*Category</h1>
                  <select
                    value={selectCategoryId}
                    className='outline-none border border-gray-300 rounded-md p-1'
                    onChange={(e) => setSelectCategoryId(e?.target?.value)}>
                    {
                      categoryGet?.map((item, index) => (
                        <option
                          className='w-[120px] h-[32px] border border-gray-300 rounded-md' key={index} value={item.id}>
                          {item?.name_en}
                        </option>
                      ))
                    }
                  </select>
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Brand</h1>
                  <select
                    className='outline-none border border-gray-300 rounded-md p-1'
                    value={selectBrandId}
                    onChange={(e) => setSelectBrandId(e?.target?.value)}>
                    {
                      brandGet.map((item) => {
                        return <option
                          className='w-[60px] h-[32px] border border-gray-300 rounded-md' key={item.id} value={item.id}>
                          {item?.title}
                        </option>
                      })
                    }
                  </select>
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Model</h1>
                  <select
                    className='outline-none border border-gray-300 rounded-md p-1'
                    value={modelID || ""}
                    onChange={(e) => setModelName(e?.target?.value)}>
                    <option value='' disabled>
                      Select Model
                    </option>
                    {
                      modelGet.map((item, index) => {
                        return <option
                          className='w-[60px] h-[32px] border border-gray-300 rounded-md' key={index} value={item.id}>
                          {item.name}
                        </option>
                      })
                    }
                  </select>
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Location</h1>
                  <select
                    className='outline-none border border-gray-300 rounded-md p-1'
                    value={LocationsID || ''}
                    onChange={(e) => setLocationsName(e?.target?.value)}>
                    <option value='' disabled>
                      Select Location
                    </option>
                    {
                      locationsGet.map((item, index) => {
                        return <option
                          className='w-[60px] h-[32px] border border-gray-300 rounded-md' key={index} value={item.id}>
                          {item.name}
                        </option>
                      })
                    }
                  </select>
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*City</h1>
                  <select
                    className='outline-none border border-gray-300 rounded-md p-1'
                    value={CityId || ''}
                    onChange={(e) => setCityName(e?.target?.value)}>
                    <option value='' disabled>
                      Select City
                    </option>
                    {
                      CityGet.map((item, index) => {
                        return <option
                          className='w-[60px] h-[32px] border border-gray-300 rounded-md' key={index} value={item.id}>
                          {item.name}
                        </option>
                      })
                    }
                  </select>
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Color</h1>
                  <input
                    onChange={(e) => setColor(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    value={color}
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Yil</h1>
                  <input
                    onChange={(e) => setYil(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    value={yil}
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Seconds</h1>
                  <input
                    onChange={(e) => setSeconds(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    value={seconds}
                    minLength={1} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Speed</h1>
                  <input
                    onChange={(e) => setSpeed(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    value={speed}
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Max People</h1>
                  <input
                    onChange={(e) => setMaxPeople(e?.target?.value, 10)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    value={maxpeople}
                    min={0} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Motor</h1>
                  <input
                    onChange={(e) => setMotor(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    value={motor}
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Transmission</h1>
                  <input
                    onChange={(e) => setTransmission(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    value={transmission}
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Driver Side</h1>
                  <input
                    onChange={(e) => setDriverSide(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    value={driverside}
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Yoqilg'i</h1>
                  <input
                    onChange={(e) => setYoqilgi(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    value={yoqilgi}
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Limit Per Day</h1>
                  <input
                    onChange={(e) => setLimitPerDay(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    value={limitperday}
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Deposit</h1>
                  <input
                    onChange={(e) => setDeposit(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    value={deposit}
                    minLength={1} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Premium Protection Price</h1>
                  <input
                    onChange={(e) => setProtectionPrice(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type=""
                    value={protectionprice}
                    minLength={1} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in AED</h1>
                  <input
                    onChange={(e) => setAed(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    value={aed}
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in USD(Otd)</h1>
                  <input
                    onChange={(e) => setUsdOtd(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    value={usd}
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in AED (Otd)</h1>
                  <input
                    onChange={(e) => setAedOtd(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    value={aedotd}
                    minLength={2} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Price in USD</h1>
                  <input
                    onChange={(e) => setUsd(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="number"
                    value={usd}
                    min={0}
                    minLength={2} />
                </div>

                <label className='w-[65px] h-[22px] text-sm mb-7 '>
                  <h1>
                    Inclusive
                  </h1>
                  <span onClick={handleToggle}>
                    <i className={`fa-solid text-4xl ${isToggled ? "fa-toggle-on text-[#1677FF]" : "fa-toggle-off text-gray-400"
                      }`}></i>
                  </span>
                </label>

                <div className='flex flex-col gap-2'>
                  <h1>*Upload car images</h1>
                  <span className='w-[320px] h-[100px] border border-gray-300 rounded-md flex items-center justify-center'>
                    <input
                      id="file-input"
                      type="file"
                      className="file-input"
                      accept="image/png, image/jpeg"
                      value={carimages}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setCarImages(file)
                        }
                      }}
                    />
                  </span>
                </div>

                <div className='flex flex-col gap-2'>
                  <h1>*Upload the main image</h1>
                  <span className='w-[320px] h-[100px] border border-gray-300 rounded-md flex items-center justify-center'>
                    <input
                      id="file-input"
                      type="file"
                      className="file-input"
                      accept="image/png, image/jpeg"
                      value={mainimage}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setMainImage(file)
                        }
                      }}
                    />
                  </span>
                </div>

                <div className='flex flex-col gap-2'>
                  <h1>*Upload the cover image</h1>
                  <span className='w-[320px] h-[100px] border border-gray-300 rounded-md flex items-center justify-center'>
                    <input
                      id="file-input"
                      type="file"
                      className="file-input"
                      accept="image/png, image/jpeg"
                      value={coverpic}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setCoverPic(file)
                        }
                      }}
                    />
                  </span>
                </div>

              </div>

              <div className='w-[135px] h-[32px] p-0 flex flex-row float-right justify-between'>

                <button
                  className='w-[73px] h-[32px] py-1 px-4 border border-gray-300 rounded-md flex justify-center'
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  onClick={(e) => editHandler(e)}
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

export default Cars