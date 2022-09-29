import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PeopleIcon from '@mui/icons-material/People';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
const arr=[
    {icon:<RssFeedIcon/>,label:"Feed"},
    {icon:<ChatIcon/>,label:"Chats"},
    {icon:<PlayCircleIcon/>,label:"Videos"},
    {icon:<PeopleIcon/>,label:"Groups"},
    {icon:<BookmarksIcon/>,label:"Bookmarks"},
    {icon:<ContactSupportIcon/>,label:"Questions"},
    {icon:<WorkIcon/>,label:"Jobs"},
    {icon:<CalendarMonthIcon/>,label:"Events"},
    {icon:<SchoolIcon/>,label:"Courses"}
]

function Options(){
    return (
        <>

        <div className='listParent'>
            {
                arr.map(e=>{
                  return  (
                    <div className="option" key={e.label} ><span className='optionIcon'>{e.icon}</span> {e.label}</div>
                  )
                })
            }

        </div>
        <div className='seeMore'>
            See More  
        </div>
            <hr  size="1.5" color="grey" style={{margin:"0.9em 0"}} />
        </>
    )
}
export default Options;