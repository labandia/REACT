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


SupplierDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};



function SupplierDialog(props) {

    const [isloading, setisloading] = useState(false);
    const { onClose, selectedValue, open, type } = props;
    const [alldata, setalldata] = useState([]);


    ///ADD PROCESS
    const [supname, setsupname] = useState('');
    const [address, setaddress] = useState('');
    const [contact_no, setcontact_noe] = useState('');




    const handleClose = () => {
      onClose();
    };
  
    const handleListItemClick = async () => {
        let data = {
            name: supname,
            address: address,
            contact: contact_no
        }
    
        setisloading(true);
        try {
             Axios.post('/addsupplier', data).then((response)=>{
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
            Axios.post('/editsupplier', alldata[0]).then((response)=>{
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

    const supid = () =>{
        let id = selectedValue.sup_id;
        Axios.get(`/getsupbyId/${id}`, {
            headers:{
                "authorization" : `Bearer` + isAuthenticated.token
            }
        }).then((response)=>{
            setalldata(response.data.data)
        });
    }



    useEffect(() => {
        if(type === 'edit'){
            supid();
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
                                            
                                            <div className="dialogwrapper" key={inputfields.sup_id}>
                                          
                                            <label>Suppliers Name:</label>
                                            <input name="sup_name" type="text" onChange={event=> 
                                                        {handleedit(index, event)}
                                                        }
                                                value={inputfields.sup_name}></input>
                                            <label>Address:</label>
                                            <input name="sup_address" type="text" onChange={event=> 
                                                        {handleedit(index, event)}
                                                        }
                                                value={inputfields.sup_address}></input>
                    
                                            <label>Contact no:</label>
                                            <input  name="sup_contact" type="text" onChange={event=> 
                                                        {handleedit(index, event)}
                                                        }
                                                value={inputfields.sup_contact}></input>
                                            
                                            </div>
                                        ))}
                        </div>
                    )
                }


                { type === 'add' && 
                    (
                        <div>
                              <div className="dialogwrapper" >
                                           
                                            <label>Supplier name</label>
                                            <input name="supname" type="text"  onChange={
                                                        (e) => {setsupname(e.target.value)}
                                                    }></input>
                                            <label>Address</label>
                                            <input name="address" type="text"  onChange={
                                                        (e) => {setaddress(e.target.value)}
                                                    }></input>
                    
                                            <label>Contact no:</label>
                                            <input  name="contact" type="text"  onChange={
                                                        (e) => {setcontact_noe(e.target.value)}
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

export default SupplierDialog;