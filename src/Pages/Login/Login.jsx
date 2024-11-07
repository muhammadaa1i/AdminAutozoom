import React, { useState } from 'react'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [number, setNumber] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  function loginSubmit(e) {
    e.preventDefault();

    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          phone_number: number,
          password: password
        })
      }
    ).then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          localStorage.setItem("token", result?.data?.tokens?.accessToken?.token)
          navigate('/')
          toast.success(result?.message)
        }
        else {
          toast.error(result?.message)
        }
      }
      )

    // e.target.reset();

  }

  return (
    <div className='box mt-[220px] '>

      <form onSubmit={loginSubmit} required type="text">

        <div className='flex flex-col gap-3 mb-8'>

          <input onChange={(e) => setNumber((e?.target?.value))} type="number" placeholder='Phone Number' className='phone w-[250px] text-sm text-indigo-700 h-auto outline-none pt-2 pb-2 pl-2 rounded-lg ' />

          <input onChange={(e) => setPassword((e?.target?.value))} type="text" placeholder='Password' className='phone w-[250px] h-auto text-sm text-indigo-700 outline-none pt-2 pb-2 pl-2 rounded-lg ' />

        </div>

        <button className='max-w-[250px] w-full h-auto bg-indigo-600 text-white text-center py-3 outline-none text-xs rounded-md hover:bg-indigo-700 '>Submit</button>
        <ToastContainer />
      </form>

    </div>
  )
}

export default Login