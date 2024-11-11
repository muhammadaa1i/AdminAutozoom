import React from 'react'

const SettingsModal = () => {
    return (
        <div className='container hidden'>

            <form className='w-[520px] h-[432px] p-5 bg-white rounded-2xl '>

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
    )
}

export default SettingsModal