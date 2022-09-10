/* eslint-disable @next/next/no-img-element */
import Input from './Input'
import { useEffect, useState } from 'react'
import Post from './Post'
import { useRecoilState } from 'recoil'
import { handlePostState } from '../atoms/postAtom'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const responseData = await response.json()
      setPosts(responseData)
      setHandlePost(false)
    }

    fetchPosts()
  }, [handlePost])
  
  console.log(posts);
  return (
    <div className="max-w-lg pb-24 space-y-6">
      <Input />
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Feed
