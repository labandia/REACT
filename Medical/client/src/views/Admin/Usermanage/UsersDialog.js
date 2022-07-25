import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Cookies from 'js-cookie'


UsersDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};



function UsersDialog(props) {

    const [isloading, setisloading] = useState(false);
    const { onClose, selectedValue, open, type } = props;
    const [alldata, setalldata] = useState([]);


    ///ADD PROCESS
    const [username, setusername] = useState('');
    const [sfname, setsfname] = useState('');
    const [slname, setslname] = useState('');
    const [soptions, setsoptions] = useState('');
    const [sontact, setsontact] = useState('');



    const handleClose = () => {
      onClose();
    };
  
    const handleListItemClick = async () => {
        let data = {
            username: username,
            fname: sfname,
            lname: slname,
            options: soptions,
            contact_no: sontact
        }
    
        setisloading(true);
        try {
             Axios.post('/adduser', data).then((response)=>{
                if(response.data.success === true){
                    setisloading(false);
                    onClose(selectedValue);
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    const edituserClick = () => {
        setisloading(true);
        try {
            Axios.post('/edituser', alldata[0]).then((response)=>{
                if(response.data.success === true){
                    setisloading(false);
                    onClose('');
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    const handleedit = (index, event) =>{
        const values = [...alldata];
        values[index][event.target.name] = event.target.value;
        setalldata(values)
    }

    let isAuthenticated = JSON.parse(Cookies.get('users'));

    // {
    //     headers:{
    //         "authorization" : `Bearer` + isAuthenticated.token
    //     }
    // }

    const userid = () =>{
        let id = selectedValue.user_id;
        Axios.get(`/userinfo/${id}`).then((response)=>{
            setalldata(response.data.payload)
        });
    }



    useEffect(() => {
        if(type === 'edit'){
            userid();
        }
    }, [selectedValue])
    
   

    

    return(
        <Dialog   fullWidth
        maxWidth="sm" onClose={handleClose} open={open}>
            <DialogTitle>
            { type === 'add' && <FontAwesomeIcon style={{ color: '#045de9', marginRight: "10px"}} icon={faUserPlus} />}
            { type === 'edit' && <FontAwesomeIcon style={{ color: '#045de9', marginRight: "10px"}} icon={faUserPlus} />}
            { type === 'add' && <span style={{fontFamily: "Montserrat, san-serif", fontWeight: "600", fontSize: "1.1rem"}}>Add user</span>}
            { type === 'edit' && <span style={{fontFamily: "Montserrat, san-serif", fontWeight: "600", fontSize: "1.1rem"}}>Edit user</span>}
            </DialogTitle>
            <DialogContent dividers>
                { type === 'edit' && 
                    (
                        <div>
                             {alldata.map((inputfields, index)=>(
                                            
                                            <div className="dialogwrapper" key={inputfields.user_id}>
                                            <div className="dialogfullname">
                                                <div className="dialogInput">
                                                    <label>First Name:</label>
                                                    <input name="fname" type="text" onChange={event=> 
                                                    {handleedit(index, event)}
                                                    }
                                                    value={inputfields.fname }>   
                                                    </input>
                                                </div>
                                                <div className="dialogInput">
                                                    <label>Last Name:</label>
                                                    <input name="lname" type="text" onChange={event=> 
                                                        {handleedit(index, event)}
                                                        }
                                                        value={inputfields.lname}></input>
                                                </div>
                                            
                                            </div>
                                            <label>Contact no.</label>
                                            <input name="contact_no" type="text" onChange={event=> 
                                                        {handleedit(index, event)}
                                                        }
                                                value={inputfields.contact_no}></input>
                                            <label>Roles</label>
                                            <input name="options" type="text" onChange={event=> 
                                                        {handleedit(index, event)}
                                                        }
                                                value={inputfields.options}></input>
                    
                                            <label>Username:</label>
                                            <input  name="username" type="text" onChange={event=> 
                                                        {handleedit(index, event)}
                                                        }
                                                value={inputfields.username}></input>
                                            
                                            </div>
                                        ))}
                        </div>
                    )
                }


                { type === 'add' && 
                    (
                        <div>
                              <div className="dialogwrapper" >
                                            <div className="dialogfullname">
                                                <div className="dialogInput">
                                                    <label>First Name:</label>
                                                    <input name="fname" type="text" onChange={
                                                        (e) => {setsfname(e.target.value)}
                                                    }>   
                                                    </input>
                                                </div>
                                                <div className="dialogInput">
                                                    <label>Last Name:</label>
                                                    <input name="lname" type="text" onChange={
                                                        (e) => {setslname(e.target.value)}
                                                    }></input>
                                                </div>
                                            
                                            </div>
                                            <label>Contact no.</label>
                                            <input name="contact_no" type="text"  onChange={
                                                        (e) => {setsontact(e.target.value)}
                                                    }></input>
                                            <label>Roles</label>
                                            <input name="options" type="text"  onChange={
                                                        (e) => {setsoptions(e.target.value)}
                                                    }></input>
                    
                                            <label>Username:</label>
                                            <input  name="username" type="text"  onChange={
                                                        (e) => {setusername(e.target.value)}
                                            }></input>
                                            
                                </div>
                        </div>
                    )
                }


            </DialogContent>
            <DialogActions>
                <div className="dialogactions">
                    <Button expand="block" style={{fontFamily: "Montserrat, san-serif", width:"50%", background: "#f5f5f5"}}  onClick={()=>handleClose()} >
                        <span style={{fontFamily: "Montserrat, san-serif", fontWeight: "600", color: "#222", textTransform: "capitalize"}}>Cancel</span>
                    </Button>
                   {type === 'add' &&  
                        <LoadingButton
                  
                        loading={isloading}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        onClick={() => handleListItemClick()}
                        style={{fontFamily: "Montserrat, san-serif", width:"50%"}}
                        >
                        <span style={{fontFamily: "Montserrat, san-serif", fontWeight: "600", textTransform: "capitalize"}}>
                            {isloading ? 'Loading...' : 'save'}
                        </span>
                        </LoadingButton>

                    }
                   
                        

                    {type === 'edit' &&  
                      <Button expand="block" style={{fontFamily: "Montserrat, san-serif", width:"50%"}} variant="contained"   onClick={() => edituserClick()}>
                        <span style={{fontFamily: "Montserrat, san-serif", fontWeight: "600", textTransform: "capitalize"}}>Edit</span>
                    </Button>}
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default UsersDialog;