import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <Link className='unlink'to="/" >
        <h1  className='appName'>FaceBook</h1>
        </Link>
    </div>
  )
}
