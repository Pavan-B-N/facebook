import React from 'react'
import "./feed.css"
import Share from './parts/Share'
import Post from './parts/posts/Post'
export default function Feed() {
  return (
    <div className='feed'>
      <Share/>
      <Post/>
    </div>
  )
}
