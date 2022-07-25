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


Addmedicine.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};



function Addmedicine(props) {

    const [isloading, setisloading] = useState(false);
    const { onClose, selectedValue, open, type } = props;
    const [alldata, setalldata] = useState([]);


    ///ADD PROCESS
    const [medname, setmedname] = useState('');
    const [description, setdescription] = useState('');
    const [classified, setclassified] = useState('');

    const [file, setFile] = useState('');
    const [filename, setfilename] = useState('Choose File');
    const [uploadFile, setuploadFile] = useState({});
    const [uploadpercent, setuploadpercent] = useState(0);



    const handleClose = () => {
      onClose();
    };
  
    const handleListItemClick = async () => {
        let data = {
            med_name: medname,
            med_desc: description,
            class_id: classified,
        }

        setisloading(true);
        try {
             Axios.post('/addmed', data).then((response)=>{
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
            Axios.post('/editmed', alldata[0]).then((response)=>{
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

    const medid = () =>{
        let id = selectedValue.med_id;
        Axios.get(`/medicineid/${id}`, {
            headers:{
                "authorization" : `Bearer` + isAuthenticated.token
            }
        }).then((response)=>{
            setalldata(response.data.data)
        });
    }



    useEffect(() => {
        if(type === 'edit'){
            medid();
        }
    }, [selectedValue])
    
   
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
       });
    
      const handleInputChange = (event) => {
        setuserInfo({
          ...userInfo,
          file:event.target.files[0],
          filepreview:URL.createObjectURL(event.target.files[0]),
        });
    
      }
    
      const [isSucces, setSuccess] = useState(null);
    
      const submit = async () =>{
        const formdata = new FormData(); 
        formdata.append('avatar', userInfo.file);
    
        Axios.post("/upload", formdata,{   
                headers: { "Content-Type": "multipart/form-data" } 
        })
        .then(res => { // then print response status
          console.warn(res);
          if(res.data.success === 1){
            setSuccess("Image upload successfully");
          }
    
        })
      }

    

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
                                            
                                            <div className="dialogwrapper" key={inputfields.med_id}>
                                          
                                            <label>Medicine Name:</label>
                                            <input name="med_name" type="text" onChange={event=> 
                                                        {handleedit(index, event)}
                                                        }
                                                value={inputfields.med_name}></input>
                                            <label>Description</label>
                                            <input name="med_desc" type="text" onChange={event=> 
                                                        {handleedit(index, event)}
                                                        }
                                                value={inputfields.med_desc}></input>
                    
                                            <label>Classification</label>
                                            <select name="class_id" value={inputfields.class_id}  onChange={event=> 
                                                        {handleedit(index, event)}
                                                        }>

                                                    <option value="1">Tablet</option>
                                                    <option  value="2">Capsule</option>
                                                    <option  value="3">Syrup</option>
                                                    <option  value="4">Bottle</option>
                                                
                                                    
    
                                                </select>

                                             

                                            
                                            </div>
                                        ))}
                        </div>
                    )
                }


                { type === 'add' && 
                    (
                        <div>
                              <div className="dialogwrapper" >
                                          
                                            {/* <label>Medicine Name: </label>
                                            <input name="medname" type="text"  onChange={
                                                        (e) => {setmedname(e.target.value)}
                                                    }></input>
                                            <label>Description</label>
                                            <input name="desc" type="text"  onChange={
                                                        (e) => {setdescription(e.target.value)}
                                                    }></input>
                    
                                            <label>Classification</label>
                                            <select  onChange={
                                                        (e) => {setclassified(e.target.value)}
                                            }>
                                                <option value="1">Tablet</option>
                                                <option  value="2">Capsule</option>
                                                <option  value="3">Syrup</option>
                                                <option  value="4">Bottle</option>
                                            </select> */}

                                           
                                            <div className="container mr-60">
                                                <h3 className="text-white">React Image Upload And Preview Using Node Js - <span> codeat21.com </span> </h3>

                                                <div className="formdesign">
                                                {isSucces !== null ? <h4> {isSucces} </h4> :null }
                                                    <div className="form-row">
                                                    <label className="text-white">Select Image :</label>
                                                    <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
                                                    </div>

                                                    <div className="form-row">
                                                    <button type="submit" className="btn btn-dark" onClick={()=>submit()} > Save </button>
                                                    
                                                    </div>
                                                </div>
                                                
                                                {userInfo.filepreview !== null ? 
                                                    <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
                                                : null}

                                        </div>
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

export default Addmedicine;