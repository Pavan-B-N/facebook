import React from 'react'
import "./sidebar.css"

import Options from "./parts/options"
import Friends from './parts/Friends'
export default function Sidebar() {
  return (
    <div className='leftbar'>
      <Options/>
      <Friends />
    </div>
  )
}
