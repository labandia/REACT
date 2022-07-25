import React, {useState, useEffect} from 'react'
import './header.css';
import { NavLink } from 'react-router-dom';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPills, faChartLine, faCube, faUser, faBars, faBoxes} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import { useNavigate, Link  } from "react-router-dom";
import Cookies from 'js-cookie'
import profile from '../images/irina-iriser-T9_NHo5d0pc-unsplash.jpg';
import logo from '../images/Logo.png';
import {auth} from '../services/Auth'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';


function Header() {


    
    const [user, setuser] = useState([]);
    const [time, settime] = useState(new Date());
    const [openmenu, setopenmenu] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    let history = useNavigate();

    useEffect(() => {
        let isAuthenticated = JSON.parse(Cookies.get('users'));

        const getuser = () =>{
            let id = isAuthenticated.id;
            Axios.get(`/users/${id}`).then((response)=>{
               setuser(response.data.payload[0]);
            
           });
        }
        getuser();
        displaytime();
    }, [])


    const displaytime = () =>{
        var timer = setInterval(() => settime(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer)
        }
    }





  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    const openmenubar = () =>{
      if(openmenu === true){
          setopenmenu(false);
      }else{
          setopenmenu(true);
      }
    }

    

    const logout = () => {
        auth.logout();
        history("/");
    }


    return (
        <div>
           <nav className="nav">
            <div className="nav__wrapper">
                <div className="nav__menu">
                    <div className="nav__brandname">
                        <img src={logo} alt='logo2'></img>
                        <span>Medicure</span>
                    </div>

                   
                    <p >
                        <FontAwesomeIcon style={{marginRight: '10px', color: '#626262'}} icon={faClock} />
                        {time.toLocaleTimeString()}
                    </p>
                </div>

                <div className="nav__users">
                    <FontAwesomeIcon onClick={openmenubar} className="nav__bars" id="nav-toggle" icon={faBars}  />
                    <p><strong>{user.fname +' '+user.lname}  </strong><br/><span>{user.options}</span></p>

                    <Tooltip title="Account settings">
                        <IconButton onClick={handleClick} size="small" >
                            <Avatar sx={{ width: 40, height: 40 }}><img src={profile} alt='logo23'></img></Avatar>
                        </IconButton>
                    </Tooltip>






                    <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

        style={{display: 'flex', flexDirection: 'column'}}
      >
        
        <MenuItem >
            <Link to="profile" style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}> <Avatar /> My account</Link>
        </MenuItem>
        <Divider />
      
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
                    {/* <img src={profile} onClick={logout} alt='logo23'></img> */}
                </div>
            </div>
            <div className={openmenu === true ? 'menu-open' : 'menu-close'}>

                  <div className="links__wrapper">
                        <NavLink end  to="dash" className="links__navitem" onClick={()=>setopenmenu(false)}> <FontAwesomeIcon style={{marginRight: '10px'}} icon={faChartLine} /> Dashboard</NavLink>
                        <NavLink to="medicine" className="links__navitem" onClick={()=>setopenmenu(false)}> <FontAwesomeIcon style={{marginRight: '10px'}} icon={faPills} /> Medicine</NavLink>
                        <NavLink to="supplies" className="links__navitem" onClick={()=>setopenmenu(false)}> <FontAwesomeIcon style={{marginRight: '10px'}} icon={faCube} /> Suppliers</NavLink>
                        <NavLink to="invent" className="links__navitem" onClick={()=>setopenmenu(false)}> <FontAwesomeIcon style={{marginRight: '10px'}} icon={faBoxes} /> Inventory</NavLink>
                        <NavLink to="user" className="links__navitem" onClick={()=>setopenmenu(false)}> <FontAwesomeIcon style={{marginRight: '10px'}} icon={faUser} /> Users</NavLink>  
                  </div>   
            </div>
            
        </nav>

    
        </div>
    )
}

export default Header
