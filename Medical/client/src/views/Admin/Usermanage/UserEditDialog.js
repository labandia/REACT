import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';

UserEditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
};



function UserEditDialog(props) {

    const [confirm] = useState('');
    const [isloading, setisloading] = useState(false);


    // const [usersdata, setusersdata] = useState({
    //     fname: '',
    //     lname: '',
    //     username: '',
    //     passname: '',
    //     options: '',
    //     contact_no: 0
    // });

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = () => {
        Axios.post('/register', selectedValue).then((response)=>{
            if(response.data.success == true){
                console.log(response.data.message);
                onClose(selectedValue);
            }
        })
    };

    return(
        <Dialog   fullWidth
        maxWidth="sm" onClose={handleClose} open={open}>
            <DialogTitle><FontAwesomeIcon style={{ color: '#626262', marginRight: "10px"}} icon={faUserPlus} />
            <span style={{fontFamily: "Montserrat, san-serif", fontWeight: "600"}}>Add user</span></DialogTitle>
            <DialogContent dividers>
                <div className="dialogwrapper">
                    <div className="dialogfullname">
                        <div className="dialogInput">
                            <label>First Name:</label>
                            <input type="text" onChange={(e)=>
                                {selectedValue.fname = e.target.value}}
                                value={selectedValue.fname}>   
                            </input>
                        </div>
                        <div className="dialogInput">
                            <label>Last Name:</label>
                            <input type="text" onChange={(e)=>
                                {selectedValue.lname = e.target.value}}></input>
                        </div>
                       
                    </div>
                    <label>Contact no.</label>
                    <input type="text" onChange={(e)=>
                        {selectedValue.contact_no = e.target.value}}></input>
                     <label>Roles</label>
                    <input type="text" onChange={(e)=>
                        {selectedValue.options = e.target.value}}></input>

                    <label>Username:</label>
                    <input type="text" onChange={(e)=>
                        {selectedValue.username = e.target.value}}></input>
                    <label>Password:</label>
                    <input type="text" onChange={(e)=>
                        {selectedValue.password = e.target.value}}></input>
                    <label>Comfirm Password</label>
                    <input type="text" onChange={(e)=>
                        {selectedValue.username = e.target.value}}></input>
                </div>

            </DialogContent>
            <DialogActions>
                <div className="dialogactions">
                    <Button expand="block" style={{fontFamily: "Montserrat, san-serif", width:"100%"}} variant="contained"  autoFocus onClick={() => handleListItemClick()}>
                        <span style={{fontFamily: "Montserrat, san-serif", fontWeight: "600"}}>Add</span>
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default UserEditDialog;