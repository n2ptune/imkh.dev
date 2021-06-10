import { PostContext } from '@/pages'
import React, { useContext } from 'react'
import PostCard from './PostCard'

const PostWrap: React.FC = () => {
  const { posts } = useContext(PostContext)

  return (
    <div className="grid grid-cols-12 gap-6">
      {posts.map(post => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  )
}

export default PostWrap
