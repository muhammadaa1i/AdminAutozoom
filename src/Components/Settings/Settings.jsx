import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Settings.css'
import './DeleteModal.css';

const Settings = ({ onClose, isOpen, children }) => {

  const [data, setData] = useState([])
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [newCategory, setNewCategory] = useState({
    name_en: '',
    name_ru: '',
    image_src: ''
  });

  const submitCategory = () => {

    const nameEn = document.getElementById("name-en").value;
    const nameRu = document.getElementById("name-ru").value;
    const image = document.getElementById("file-upload").files[0];

    if (!nameEn || !nameRu || !image) {
      toast.error("Please, fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    formData.append("image", image);

    axios.post("https://autoapi.dezinfeksiyatashkent.uz/api/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res?.data?.success) {
          setData((prevData) => [...prevData, res?.data?.data]);
          toast.success("Category successfully added!");
        } else {
          toast.error("Error adding category!");
        }
      })
      .catch(() => {
        toast.error("Error adding category!");
      });
  };


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

  useEffect(() => {
    if (addModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [addModalOpen]);


  function deleteHandler(userID) {
    setData((prevData) => prevData.filter((item) => item.id !== userID));
    setModalInfoOpen(false);
  }

  function addCategory() {
    const { name_en, name_ru, image_src } = newCategory;
    if (!name_en || !name_ru || !image_src) {
      toast.error("Please fill in all the fields!");
      return;
    }
    setData((prevData) => [
      ...prevData,
      {
        id: data.length + 1,
        ...newCategory,
      }
    ]);
    setNewCategory({ name_en: '', name_ru: '', image_src: '' });
    setAddModalOpen(false);
  }

  return (
    <div className='main'>

      <span className='flex flex-row'>

        <i className="fa-solid fa-magnifying-glass w-[37px] h-[32px] text-sm flex items-center justify-center border border-gray-400 rounded-l-md "></i>
        <input type="text" placeholder='large size' className='w-[370px] h-[32px] border border-gray-400 rounded-r-md outline-none py-1 px-3 ' />

      </span>

      <div className="main-in">

        <table className='container bg-white mt-5 '>

          <thead className='border border-gray-200  '>

            <tr className='border border-gray-200'>
              <th className='w-[177px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>name_en</th>
              <th className='w-[177px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>name_ru</th>
              <th className='w-[177px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Image</th>
              <th className='w-[177px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>Action</th>
              <th className='w-[177px] h-[65px] p-4  text-sm font-sans font-normal border border-gray-200 '>
                <button onClick={() => setAddModalOpen(true)} className='add-btn w-[128px] h-[32px] bg-[#1677FF] text-white rounded-lg '>Add categories</button>
              </th>
            </tr>

          </thead>

          <tbody>
            {
              data.map((item, index) => (
                <tr key={index}>
                  <td className='w-[177px] h-[101px] p-4 border border-gray-200 '>{item?.name_en}</td>
                  <td className='w-[177px] h-[101px] p-4 border border-gray-200 '>{item?.name_ru} </td>
                  <td className='w-[255px] h-[101px] p-4 flex justify-center border border-gray-200 '><img className='w-[100px] h-[62px] ' src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`} alt="category" /></td>
                  <td className='w-[400px] h-[102px] p-4 border border-gray-200'>

                    <div className='flex flex-row gap-3 justify-center'>

                      <button className='btn w-[52px] h-[32px] bg-[#1677FF] rounded-lg '>
                        <i className="fa-solid fa-pencil text-white text-sm"></i>
                      </button>

                      <div className='container hidden'>

                        <form className='change-modal w-[520px] h-[432px] p-5 bg-white rounded-2xl '>

                          <div className='flex flex-row justify-between'>

                            <h1 className='font-semibold'>Vertically centered modal dialog</h1>

                            <button className=''><i className="fa-solid fa-x text-base text-gray-600"></i></button>

                          </div>

                          <div className='flex flex-col gap-6 mt-2 '>

                            <div className='flex flex-col gap-1'>
                              <h1>*name_en</h1>
                              <input className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none' type="text" required minLength={3} />
                            </div>

                            <div className='flex flex-col gap-1 '>
                              <h1>*name_ru</h1>
                              <input className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none' type="text" required minLength={3} />
                            </div>

                            <div className='flex flex-col gap-2'>
                              <h1>*Upload Image</h1>
                              <span className='w-[100px] h-[100px] border border-gray-300 rounded-md flex items-center justify-center'>
                                <label htmlFor="file-upload" className="custom-file-upload">
                                  Upload
                                </label>
                                <input id="file-upload" type="file" className="hidden-file-input" />
                              </span>
                            </div>

                          </div>

                          <div className='w-[135px] h-[32px] p-0 flex flex-row float-right justify-between '>
                            <button className='w-[73px] h-[32px] py-1 px-4 border border-gray-300 rounded-md flex justify-center '>Cancel</button>
                            <button className='w-[46px] h-[32px] py-1 px-4 bg-[#1677FF] text-white rounded-md flex justify-center '>OK</button>
                          </div>

                        </form>

                      </div>

                      <button onClick={() => {
                        setModalInfoOpen(true);
                        setSelectedUserId(item.id);
                      }}
                        className='btn w-[52px] h-[32px] rounded-lg bg-red-500'>
                        <i className="fa-solid fa-trash text-white text-sm"></i>
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>

      </div>

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
                onClick={() => deleteHandler(selectedUserId)}
                className='modal-ok-button w-[50px] h-[32px] text-white bg-[#1677FF] rounded-md float-right mr-20 mt-[26px]'
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {addModalOpen && (
        <>
          <div className="overlay"></div>

          <div className='container'>

            <form className='change-modal w-[520px] h-[432px] m-auto p-5 bg-white rounded-2xl'>
              
              <div className='flex flex-row justify-between'>
                <h1 className='font-semibold'>Add New Category</h1>
                <button onClick={() => setAddModalOpen(false)}>
                  <i className="fa-solid fa-x text-base text-gray-600"></i>
                </button>
              </div>

              <div className='flex flex-col gap-6 mt-2'>

                <div className='flex flex-col gap-1'>
                  <h1>*name_en</h1>
                  <input
                    value={newCategory.name_en}
                    onChange={(e) => setNewCategory({ ...newCategory, name_en: e.target.value })}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-1'>
                  <h1>*name_ru</h1>
                  <input
                    value={newCategory.name_ru}
                    onChange={(e) => setNewCategory({ ...newCategory, name_ru: e.target.value })}
                    className='w-[472px] h-[32px] py-1 px-3 border border-gray-300 rounded-md outline-none'
                    type="text"
                    required
                    minLength={3} />
                </div>

                <div className='flex flex-col gap-2'>
                  <h1>*Upload Image</h1>
                  <span className='w-[100px] h-[100px] border border-gray-300 rounded-md flex items-center justify-center'>
                    <label htmlFor="file-upload" className="custom-file-upload">
                      Upload
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden-file-input"
                      onChange={(e) => setNewCategory({ ...newCategory, image_src: e.target.files[0] })}
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

                <button onClick={addCategory} className='w-[46px] h-[32px] py-1 px-4 bg-[#1677FF] text-white rounded-md flex justify-center'>
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

export default Settings