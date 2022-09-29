import { useState, useContext } from 'react'
import AuthContext from '../../../API/AuthContext';
import { Badge, IconButton, Tooltip, Menu, MenuItem, Button } from "@mui/material"
import { Link } from "react-router-dom"

//icons
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
export default function NavIcons() {
    const user = useContext(AuthContext)
    //menu
    const [menuAnchor, setMenuAnchor] = useState(null)
    const MenuOpen = Boolean(menuAnchor)



    function openMenuBox(event) {
        setMenuAnchor(event.currentTarget)
    }
    function closeMenuBox() {
        setMenuAnchor(null)
    }
    function handleLogOut() {
        user.logout()
    }

    return (
        <>
            <div className='NavIcons'>
                <div className='NavIcons NAVICON-USER'>
                    <IconButton sx={{ color: "white" }}>
                        <PersonIcon />
                    </IconButton>
                </div>
           <Link to="/chat" >
           <IconButton sx={{ color: "white" }}>
                    <Tooltip title="Messages">
                        <Badge badgeContent="5" color="error" >
                            <MessageIcon />
                        </Badge>
                    </Tooltip>
                </IconButton>
           </Link>

                <IconButton sx={{ color: "white" }}>
                    <Tooltip title="Notifications">
                        <Badge badgeContent="5" color="error">
                            <NotificationsIcon />
                        </Badge>
                    </Tooltip>
                </IconButton>
            </div>
            <div className='NavIcons NavIcons-search '>
                <IconButton sx={{ color: "white" }}>
                    <SearchIcon />
                </IconButton>
            </div>
            <div className='NavIcons NavIcons-menu '

            >
                <IconButton sx={{ color: "white" }} onClick={openMenuBox}
                    aria-controls="menubox"
                    aria-haspopup={true}
                    aria-expanded={true}
                >
                    <MenuIcon />
                </IconButton>
            </div>

            {/* menu */}
            <Menu
                open={MenuOpen}
                anchorEl={menuAnchor}
                onClose={closeMenuBox}
                sx={{ marginTop: "20px" }}
                id="menubox"
            >
                <MenuItem>
                    <Link className='menuOption' to={`/${user.creditionals.id}/profile`}>
                        Profile
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link className='menuOption ' to="/" >
                        TimeLine
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Button
                        onClick={handleLogOut}
                        color="error"
                    >Logout</Button>
                </MenuItem>
            </Menu>


        </>
    )
}
