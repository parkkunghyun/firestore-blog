import React from 'react'
import PostCard from './PostCard'
import { Link } from 'react-router-dom';

const PostList = ({posts}) => {
  return (
      <div className='flex flex-col gap-4'>
          {
              posts.map((post) => (
                  <Link key={post.id} to={`/posts/${post.id}`}>
                      <PostCard post={post} />
                  </Link>
              ))
          }
    </div>
  )
}

export default PostList