import React, {useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPills} from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
import Axios from 'axios';
import './medicine.css';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Addmedicine from './addmedicine'
import MedicationComfirmation from './meddelete'


function Medicine() {

    const [med, setmed] = useState([]);
    const [search, setsearch] = useState('');
    const [selectedValue, setselectedValue] = useState({});
    const [open, setOpen] = useState(false);

    const [type, setType] = useState('');

    

    let isAuthenticated = JSON.parse(Cookies.get('users'));

        const getmedicine = async () =>{
           await Axios.get(`/med`, {
                //    headers:{
                //        "authorization" : `Bearer` + isAuthenticated.token
                //    }
           }).then((response)=>{
               console.log(response.data);
               if(response.data.success === true){
                    setmed(response.data.payload);
               }
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

    
    const handleClose = async(value) =>{
        getmedicine();
        setOpen(false);
    }

    useEffect(() => {
        getmedicine();
    }, [search, med])


    const filterusers = med.filter(medical=>{
        return medical.med_name.toLowerCase().includes(search.toLowerCase())
    })

    return (
        <div className="medicine">
            <div className="medititle">
                <div className="medname">
                    <FontAwesomeIcon style={{marginRight: '10px'}} icon={faPills} />
                    <p>Medicines</p>
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
                        onClick={()=>{crudClickdialog('add', {})}}
                    >Add new</Button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Medicine name</th>
                            <th style={{width: "10%"}}>ID</th>
                            <th>Description name</th>
                            <th>Classification</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <div><p>No items display</p></div> */}
                        {filterusers.map((item, index)=>(
                            <tr key={item.med_id}>
                              <td>{item.med_name}</td>
                              <td>{index + 1}</td>
                              <td>{item.med_desc}</td>
                              <td>{item.class_type }</td>
                              <td >
                                <IconButton style={{ color: 'red'}} onClick={()=>crudClickdialog('delete', item)}   aria-label="upload picture" component="span">
                                  <DeleteOutlineIcon />
                                </IconButton>
                                
                                <IconButton style={{ color: '#045de9'}}  onClick={()=>crudClickdialog('edit', item)}  aria-label="upload picture" component="span">
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
                return <Addmedicine
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                type={type}
            />;
            case 'edit':
                return <Addmedicine
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                type={type}
            />;
            case 'delete':
                return <MedicationComfirmation
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

export default Medicine
