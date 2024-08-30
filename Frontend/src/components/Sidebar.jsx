import React from 'react'
import Logo from "../assets/Sidebar/logo2.png"
import Toggle from "../assets/Sidebar/bx-chevron-right.svg";

const Sidebar = () => {
  return (
    <div className='h-screen w-[250px]'>
        <nav className='h-full flex flex-col bg-white border-r shadow-md p-3 z-10'>
            <div className='relative'>
                <div className='flex items-center'>
                    <span className="w-16 flex justify-center items-center ">
                    <img src={Logo} alt="" className='w-10 rounded-md'/>
                    </span>
                    <div className="flex flex-col text-sm font-medium opacity-100">
                        <p className='font-semibold text-xl text-textColor'>MIT WPU</p>
                        <p className='mt-[-2px]'>Student Portal</p>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Sidebar