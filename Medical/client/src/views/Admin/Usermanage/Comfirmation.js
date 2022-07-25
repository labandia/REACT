import React from 'react'
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';

Comfirmation.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};



function Comfirmation(props) {

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = async (confirm) => {
        if(confirm === true){
            try {
                await Axios.post(`http://localhost:5000/delete/${selectedValue.user_id}`, ).then((response)=>{
                    if(response.data.success){
                        console.log("delete success");
                        onClose(selectedValue);
                    }else{
                        console.log("failed to delete");
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return(
        <Dialog   fullWidth
        maxWidth="xs" onClose={handleClose} open={open}>
            <DialogTitle>
                <FontAwesomeIcon style={{ color: 'crimson', marginRight: "10px"}} icon={faTrashAlt} />
                <span style={{fontFamily: "Montserrat, san-serif", fontWeight: "600", fontSize: '1rem'}}>
                    Delete {selectedValue.fname+ ' ' + selectedValue.lname}
                </span>
            </DialogTitle>
            <DialogContent dividers>
                <p style={{fontSize: '1rem'}}>Are you sure you want to delete this account?</p>
            </DialogContent>
            <DialogActions>
                <div className="dialogdeleteactions">
                    <Button expand="block" style={{fontFamily: "Montserrat, san-serif", width:"100%", padding: '0 1.5em', fontSize: '.9rem', textTransform: "capitalize", background: "#f5f5f5", color:"#222"}} variant="outline"   onClick={() => handleClose({})}>
                        <span style={{fontFamily: "Montserrat, san-serif", fontWeight: "600"}}>Cancel</span>
                    </Button>
                    <Button expand="block" style={{fontFamily: "Montserrat, san-serif", width:"100%", background: "crimson"}} variant="contained"   onClick={() => handleListItemClick(true)}>
                        <span style={{fontFamily: "Montserrat, san-serif", fontWeight: "600"}}>Yes</span>
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default Comfirmation;