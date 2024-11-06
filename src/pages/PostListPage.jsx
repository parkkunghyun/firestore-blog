import React from 'react'
import { RiFileList3Fill } from "react-icons/ri";
import { query, collection, getDocs, orderBy} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useQuery } from 'react-query';
import PostList from '../components/PostList';

const fetchPosts = async () => {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

const PostListPage = () => {
  const { data: posts, isLoading, error } = useQuery('posts', fetchPosts);

  if (isLoading) 
    return (<div className='flex flex-col items-center justify-center'>
      <h1 className='flex items-center mt-24 mb-8 text-4xl font-extrabold gap-41'>로딩중입니다...  </h1>
    </div >)
  
  if (error) 
    return (<div className='flex flex-col items-center justify-center'>
      <h1 className='flex items-center mt-24 mb-8 text-4xl font-extrabold gap-41'>로딩중입니다...  </h1>
    </div >)

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='flex items-center mt-24 mb-8 text-4xl font-extrabold gap-41'>BLOG LIST <RiFileList3Fill /> </h1>

      <PostList posts={posts} />
    </div >
  )
}

export default PostListPage