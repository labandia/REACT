import React, {useEffect, useState} from 'react'
import './UserManage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import Cookies from 'js-cookie'
import Button from '@mui/material/Button';
import UsersDialog from './UsersDialog';
import Comfirmation from './Comfirmation';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateIcon from '@mui/icons-material/Create';

function UserManagePage() {

    const [usersdata, setusersdata] = useState([]);


    const [open, setOpen] = useState(false);
    const [selectedValue, setselectedValue] = useState({});
    const [type, setType] = useState('');
    const [search, setsearch] = useState('');



    let isAuthenticated = JSON.parse(Cookies.get('users'));

    const getusers = () =>{
        Axios.get(`/users`, {
            //    headers:{
            //        "authorization" : `Bearer` + isAuthenticated.token
            //    }
       }).then((response)=>{
            setusersdata(response.data.payload);
       });

    }

   

    const crudClickdialog = (type, data) =>{
        if(type === 'add'){
            setselectedValue({});
            setType('add');
        }else if(type === 'edit'){
            setselectedValue(data);
            setType('edit');
        }else{
            setselectedValue(data);
            setType('delete');
        }

        setOpen(true);
    }

    
    const handleClose = (value) => {
        getusers()
        setOpen(false);
    };

    const filterusers = usersdata.filter(users=>{
        return users.fname.toLowerCase().includes(search.toLowerCase())
    })

   

    useEffect(() => {
        getusers();
    }, [search])

   


    return (
        <div className="medicine">
            <div className="medititle">
                <div className="medname">
                    <FontAwesomeIcon style={{marginRight: '10px'}} icon={faUser} />
                    <p>Manage users</p>
                </div>

                
            </div>

            <div className="tablewrap">
            <div className="tablemain">
            <div className="tableinputs">
                <input placeholder="Search here ...." onChange={(e)=>{
                    setsearch(e.target.value);
                }}></input>
                <FontAwesomeIcon style={{ color: '#626262'}} icon={faSearch} />
            </div>
            <Button variant="contained" 
                style={{fontSize: '.8rem', textTransform: 'capitalize'}}
            onClick={()=>{crudClickdialog('add', {})}}>Add new</Button>
</div>

<table>
    <thead>
        <tr>
            <th style={{width: "10%"}}>ID</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Contact</th>
            <th>Username</th>
            <th>Actions</th>
        </tr>
    </thead>

    <tbody>
        {filterusers.map((users, index)=>(
            <tr key={users.user_id}>
              <td>{index + 1}</td>
              <td>{users.fname +' '+users.lname}</td>
              <td>{users.options}</td>
              <td>{users.contact_no }</td>
              <td>{users.username }</td>
              <td >
                  <IconButton style={{ color: 'red'}} onClick={()=>crudClickdialog('delete', users)}  aria-label="upload picture" component="span">
                    <DeleteOutlineIcon />
                  </IconButton>
                  
                  <IconButton style={{ color: '#045de9'}} onClick={()=>crudClickdialog('edit', users)}   aria-label="upload picture" component="span">
                    <CreateIcon />
                  </IconButton>
              </td>
            </tr>
        ))}
      
    </tbody>
 
</table>
</div>   

    { 
      (() => {
        switch(type) {
          case 'add':
            return <UsersDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            type={type}
        />;
          case 'edit':
            return <UsersDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            type={type}
        />;
          case 'delete':
            return <Comfirmation
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            type={type}
        />;
       
        }
      })()
    }

           

         
        </div>

        
    )
}

export default UserManagePage





