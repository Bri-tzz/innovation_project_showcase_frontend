import React from 'react'

const Footer = () => {
  return (
    <footer className='flex flex-col gap-4 px-5 pt-10 bg-blue-100'>

      <div className='border-b-2 border-red-100 px-4 flex justify-between items-center pb-4'>
        <h1 className='text-4xl font-bold text-gray-900 text-center'>Project Portal</h1>

        <ul className='flex justify-center space-x-4'>
          <li><a href='#' className='text-blue-500 hover:text-blue-700'>About</a></li>
          <li><a href='#' className='text-blue-500 hover:text-blue-700'>Contact</a></li>
        </ul>

      </div>

      <p className='text-sm text-gray-500 text-center'>&copy; 2023 Project Portal. All rights reserved.</p>
    </footer>
  )
}

export default Footer
