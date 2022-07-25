import React, {useEffect, useState} from 'react'
import { faCube, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie'
import Axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import SupplierDialog from './addsuppliers'
import SupplierConfimation from './supplydelete';


function Suppliers() {

    const [data, setdata] = useState([]);
    const [search, setsearch] = useState('');

    const [selectedValue, setselectedValue] = useState({});
    const [open, setOpen] = useState(false);

    const [type, setType] = useState('');

    let isAuthenticated = JSON.parse(Cookies.get('users'));

    const getsuppliers = () =>{
        Axios.get(`/sup`, {
            //    headers:{
            //        "authorization" : `Bearer` + isAuthenticated.token
            //    }
       }).then((response)=>{
            setdata(response.data.payload);
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
        getsuppliers();
        setOpen(false);
    }


    useEffect(() => {
        getsuppliers()
    }, [search])

    


    const filterusers = data.filter(suppy=>{
        return suppy.sup_name.toLowerCase().includes(search.toLowerCase())
    })


    return (
        <div className="medicine">
            <div className="medititle">
                <div className="medname">
                    <FontAwesomeIcon style={{marginRight: '10px'}} icon={faCube} />
                    <p>Suppliers</p>
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
                            <th style={{width: "10%"}}>ID</th>
                            <th>Supplier Name</th>
                            <th>Address</th>
                            <th>Contact no.</th>
                            <th>actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* {filterusers.length == 0 && 
                            <div style={{width: "100%", textAlign: "center"}}>
                                <p  style={{textAlign: "center"}}>No user found</p>
                            </div>
                        } */}
                        {filterusers.map((data2, index)=>(
                            <tr key={data2.sup_id}>
                            <td>{index + 1}</td>
                            <td>{data2.sup_name}</td>
                            <td>{data2.sup_address }</td>
                            <td>{data2.sup_contact }</td>
                            <td >
                                <IconButton style={{ color: 'red'}} onClick={()=>crudClickdialog('delete', data2)}  aria-label="upload picture" component="span">
                                    <DeleteOutlineIcon />
                                </IconButton>
                                
                                <IconButton style={{ color: '#045de9'}} onClick={()=>crudClickdialog('edit', data2)}    aria-label="upload picture" component="span">
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
                return <SupplierDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                type={type}
            />;
            case 'edit':
                return <SupplierDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                type={type}
            />;
            case 'delete':
                return <SupplierConfimation
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

export default Suppliers
