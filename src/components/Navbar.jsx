import React from 'react'
import { Link } from 'react-router-dom';
import { CiViewList } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className='flex justify-between p-4 shadow-lg'>
      <Link className='text-2xl font-extrabold'>K-BLOG</Link>

      <div className='flex items-center gap-4'>
        <Link className="flex items-center gap-1 text-xl font-bold focus:border-b-2 focus:border-black" to="/posts">
          <span>블로그</span><CiViewList className='text-xl font-bold'/>
        </Link>
        <Link className="text-xl font-bold focus:border-b-2 focus:border-black" to="/add-post" >글 작성</Link>
      </div>

      <div className='flex items-center gap-4'>
        <Link to="/" className='text-xl font-bold focus:border-b-2 focus:border-black' >로그인</Link>
        <Link to="/signup" className='p-2 text-white bg-black rounded-lg shadow-md hover:scale-105' >회원가입</Link>
      </div>
    </div>
  )
}

export default Navbar