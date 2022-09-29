import {useContext} from 'react'
import {Link} from "react-router-dom"
import AuthContext from '../../../API/AuthContext'
export default function NavLinks() {
    const {creditionals}=useContext(AuthContext)
    return (
        <div className='navlink'>
            <Link className='unlink div' to={`/${creditionals.id}/profile`} >
                Profile
            </Link>
            <Link className='unlink div' to="/" >
                TimeLine
            </Link>
        </div>
    )
}
