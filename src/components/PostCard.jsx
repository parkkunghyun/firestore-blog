import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'


const PostCard = ({ post }) => {
  const [user] = useAuthState(auth);
  return (
    <div className='flex items-center w-[500px] mb-4 p-4 border-2 rounded-lg shadow-lg'>
      <p className='flex-1 text-xl'>{post.title}</p>
      <div className='flex flex-col'>
        <span className='text-sm text-gray-400'>날짜: {post.createdAt?.toDate().toLocaleString()}</span>
        <span className='text-sm text-gray-400'>작성자: {user.email}</span>
      </div>
      <p></p>
    </div>
  )
}

export default PostCard