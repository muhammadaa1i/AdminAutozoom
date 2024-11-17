import React, { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {   
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function loginSubmit(e) {
        e.preventDefault();

        fetch('https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                phone_number: number,
                password: password
            })
        })
            .then((res) => res.json())
            .then((result) => {
                if (result?.success) {
                    toast.success(result?.message);
                    localStorage.setItem("token", result?.data?.tokens?.accessToken?.token);
                    navigate('/admin/dashboard');
                } else {
                    toast.error(result?.message);
                }
            })
    }

    return (
        <div className='box mt-[220px] '>
            <form onSubmit={loginSubmit}>
                <div className='flex flex-col gap-3 mb-8'>
                    <input
                        onChange={(e) => setNumber(e.target.value)}
                        type="number"
                        minLength={5}
                        placeholder='Phone Number'
                        className='phone w-[250px] text-sm text-[#122558] h-auto outline-none pt-2 pb-2 pl-2 rounded-lg'
                        required
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        minLength={5}
                        placeholder='Password'
                        className='phone w-[250px] h-auto text-sm text-[#122558] outline-none pt-2 pb-2 pl-2 rounded-lg'
                        required
                    />
                </div>

                <button className='max-w-[250px] w-full h-auto bg-[#122558] text-white text-center py-3 outline-none text-xs rounded-md hover:bg-[#0f2438]'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
