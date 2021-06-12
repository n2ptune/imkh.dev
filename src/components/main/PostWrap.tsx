import { PostContext } from '@/pages'
import React, { useContext } from 'react'
import PostCard from './PostCard'

const PostWrap: React.FC = () => {
  const { posts } = useContext(PostContext)

  return (
    <>
      <div className="mb-6 text-xl font-black">✏ 모든 포스트</div>
      <div className="grid grid-cols-12 gap-6">
        {posts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </>
  )
}

export default PostWrap
