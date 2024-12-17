import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Locations = () => {

  const token = localStorage.getItem('token');

  const [data, setData] = useState([])
  const [modalInfoOpen, setModalInfoOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [addModalOpen, setAddModalOpen] = useState(false)

  function getCategory() {
    axios.get('https://realauto.limsa.uz/api/locations')
      .then((res) => {
        setData(res?.data?.data)
      })
    console.log(data);
  }

  useEffect(() => {
    getCategory()
  }, [])

  useEffect(() => {
    if (addModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [addModalOpen]);

  const [name, SetName] = useState()
  const [text, SetText] = useState()
  const [pic, SetPic] = useState()

  function addCategory(e) {
    e.preventDefault()

    const formdata = new FormData()
    formdata.append('name', name)
    formdata.append('text', text)
    if (pic) {
      formdata.append('images', pic);
    } else {
      console.error("No image file selected.");
      return
    }

    fetch('https://realauto.limsa.uz/api/locations', {
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

    fetch(`https://realauto.limsa.uz/api/locations/${selectedCategoryId}`, {
      method: 'Delete',
      headers: {
        'Authorization': `Bearer ${token}`
      },
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
    formData.append("name", name);
    formData.append("text", text);
    if (pic) {
      formData.append("images", pic);
    }

    fetch(`https://realauto.limsa.uz/api/locations/${selectedCategoryId}`, {
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
      });
  }


  return (
    <div className='main'>

      <div className="main-in">

        <table className='container bg-white mt-5'>

          <thead className='border border-gray-200  '>

            <tr className='border border-gray-200'>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>ID</th>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Name</th>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Text</th>
              <th className='w-[140px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Images</th>
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
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{index + 1}</td>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.name}</td>
                  <td className='w-[140px] h-[101px] p-4 border border-gray-200 '>{item?.text}</td>
                  <td className='max-w-[255px] w-full h-[101px] p-4 flex justify-center border border-gray-200 '><img className='w-[100px] h-[62px] ' src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`} alt="category" /></td>
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
            className="overlay fixed top-0 left-0 w-full h-full z-99"></div>

          <div className='container'>

            <form onSubmit={addCategory} className='add-modal w-[520px] h-[432px] m-auto p-5 bg-white rounded-2xl'>

              <div className='flex flex-row justify-between'>
                <h1 className='font-semibold'>Add New Category</h1>
                <button onClick={() => setAddModalOpen(false)}>
                  <i className="fa-solid fa-x text-base text-gray-600"></i>
                </button>
              </div>

              <div className='flex flex-col gap-6 mt-2'>

                <div className='flex flex-col gap-1'>
                  <h1>*Name</h1>
                  <input
                    onChange={(e) => SetName(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Text</h1>
                  <input
                    onChange={(e) => SetText(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-2'>
                  <h1>*Upload Image</h1>
                  <span className='w-[320px] h-[100px] border border-gray-300 rounded-md flex items-center justify-center'>
                    <input
                      id="file-input"
                      type="file"
                      className="file-input"
                      accept="image/png, image/jpeg"
                      value={pic}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          SetPic(file)
                        }
                      }}
                    />
                  </span>
                </div>

              </div>

              <div className='w-[135px] h-[32px] p-0 flex flex-row float-right justify-between'>

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
            className="overlay fixed top-0 left-0 w-full h-full z-99"></div>

          <div className='container'>

            <form onSubmit={editCategory} className='add-modal w-[520px] h-[432px] m-auto p-5 bg-white rounded-2xl'>

              <div className='flex flex-row justify-between'>
                <h1 className='font-semibold'>Edit Category</h1>
                <button onClick={() => setEditModalOpen(false)}>
                  <i className="fa-solid fa-x text-base text-gray-600"></i>
                </button>
              </div>

              <div className='flex flex-col gap-6 mt-2'>

                <div className='flex flex-col gap-1'>
                  <h1>*Name</h1>
                  <input
                    onChange={(e) => SetName(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    defaultValue={data.find((d) => d.id === selectedCategoryId)?.name}
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*Text</h1>
                  <input
                    onChange={(e) => SetText(e?.target?.value)}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    defaultValue={data.find((d) => d.id === selectedCategoryId)?.text}
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-2'>
                  <h1>*Upload Image</h1>
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
                          SetPic(file)
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

export default Locations