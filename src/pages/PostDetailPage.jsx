import React from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';
import { FaWpforms } from "react-icons/fa6";

const fetchPostById = async (postId) => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('Post not found');
  }
}

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user] = useAuthState(auth);

  const { data: post, isLoading, error } = useQuery(['post', id], () => fetchPostById(id));

  const deleteMutation = useMutation(() => deleteDoc(doc(db, 'posts', id), ), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      navigate("/posts");
    },
  });

  const updateMutation = useMutation((updatedPost) => updateDoc(doc(db, 'posts', id), updatedPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        navigate(`/posts/${id}`);
      }
    })
  
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleUpdate = () => {
    const updatedPost = {
      title,
      content,
    };
    updateMutation.mutate(updatedPost);
  }

  const handleDelete = () => {
    if (window.confirm('이 게시글을 삭제하시겠습니까?')) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) 
    return (<div className='flex flex-col items-center justify-center'>
      <h1 className='flex items-center mt-24 mb-8 text-4xl font-extrabold gap-41'>로딩중입니다...  </h1>
    </div >)
  
  if (error) 
    return (<div className='flex flex-col items-center justify-center'>
      <h1 className='flex items-center mt-24 mb-8 text-4xl font-extrabold gap-41'>로딩중입니다...  </h1>
    </div >)


  return (
    <div>
      {
        isEditing ? (
          <div className='flex flex-col items-center justify-center'> 
            <h1 className='flex items-center mt-24 mb-8 text-4xl font-extrabold gap-41'>게시글 수정 <FaWpforms /></h1>
            
            <form onSubmit={handleUpdate} className='flex flex-col w-[500px] h-[550px]   gap-4 p-4 border-2 rounded-md shadow-lg'>
              <p className='flex justify-between'> 작성자: <span className='text-gray-400'>{user.email}</span></p>
              <label className="block mb-1 font-bold">제목 </label>
              <input value={title} placeholder='제목을 작성해주세요' className='pb-2 border-b-2 rounded-md focus:outline-none' onChange={e => setTitle(e.target.value)} type="text" />
              
              <label className="block mb-1 font-bold">내용</label>
              <textarea value={content} className='flex-1 p-2 border border-gray-300 rounded-md focus:outline-none' onChange={e => setContent(e.target.value)} />

              <button type='submit' className='p-2 font-bold text-white bg-black rounded-md'>수정하기</button>
            </form >

          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'> 
              <h1 className='flex items-center mt-24 mb-8 text-4xl font-extrabold gap-41'>게시글 보기 <FaWpforms /></h1>
              <div className='flex flex-col gap-4'>
                  <p className="mb-2 text-gray-700">작성자: {post.email}</p>
                        <p className="mb-4 text-gray-500">작성일: {post.createdAt?.toDate().toLocaleString()}</p>
                        <p className="mb-8">{post.content}</p>

                        {/* 유저가 작성한 게시글일 경우 수정 및 삭제 버튼 보여주기 */}
                        {user && user.uid === post.uid && (
                            <div className='flex gap-4'>
                                <button onClick={handleDelete} className="p-2 w-[80px] mr-2 text-white bg-black hover:scale-110 rounded shadow-md">
                                    삭제
                                </button>
                                <button
                                    onClick={handleEditClick}
                                    className="p-2 text-black  w-[80px]  rounded shadow-md hover:scale-110"
                                >
                                    수정
                                </button>
                            </div>
                        )}
              </div>
          </div>
        )
     }
    </div >
  )
}

export default PostDetailPage