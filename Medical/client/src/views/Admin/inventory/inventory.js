import React, {useEffect, useState, useCallback  } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBoxes } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import Cookies from 'js-cookie'
import Axios from 'axios';


function Inventory() {
    const [value, setValue] = React.useState('1');
    const [invent, setinvent] = useState([]);
    const [search, setsearch] = useState('');
    let isAuthenticated = JSON.parse(Cookies.get('users'));

    const getStocks = async () =>{
       await Axios.get(`/invent`).then((response)=>{
           if(response.data.success === true){
                setinvent(response.data.payload);
           }
       });
    }
 
    const tabChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        getStocks();
    }, [search]);


    const filterinvent = invent.filter(invent=>{
        return invent.description.toLowerCase().includes(search.toLowerCase())
    })


    return (
        <div className="medicine">
            <div className="medititle">
                <div className="medname">
                    <FontAwesomeIcon style={{marginRight: '10px'}} icon={faBoxes} />
                    <p>Manage Inventory</p>
                </div>

                
            </div>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList style={{fontfamily: 'Poppins, sans-serif !important'}} onChange={tabChange} aria-label="lab API tabs example">
                    <Tab  label="Storage room" value="1" />
                    <Tab label="Expiration supplies" value="2" />
                    <Tab label="Delivery Arrived" value="3" />
                    <Tab label="Order History" value="4" />
                </TabList>
                </Box>
                <TabPanel value="1" style={{margin: '0', padding: '2em 0'}}>
                                <div className="tablewrap">
                                <div className="tablemain">
                                    <div className="tableinputs">
                                    <input placeholder="Search here ...." ></input>
                                        <FontAwesomeIcon style={{ color: '#626262'}} icon={faSearch} onChange={(e)=>{
                                        setsearch(e.target.value);
                                        }}/>
                                    </div>
                                    <Button variant="contained" 
                                        style={{fontSize: '.8rem', textTransform: 'capitalize'}}
                                    >Add Orders</Button>
                                </div>

                                <table>
                                    <thead>
                                        <tr>
                                            <th >Medicine Name</th>
                                            <th>ID number</th>
                                            <th>Exp Date</th>
                                            <th>Total Quantity</th>
                                            <th>Prices</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                       
                                        {filterinvent.map((data2, index)=>(
                                            <tr key={data2.stockin_id}>
                                                <td>{data2.description}</td>
                                                <td>{data2.med_id}</td>
                                                <td>{data2.exp }</td>
                                                <td>{data2.quantity }</td>
                                                <td>{data2.price }</td>
                                            </tr>
                                        ))}
                                    
                                    </tbody>
                                
                                </table>
                            </div>  
                </TabPanel>
                <TabPanel value="2">

                </TabPanel>

                <TabPanel value="3">

                </TabPanel>

                <TabPanel value="4">

                </TabPanel>

               
            </TabContext>

          
        </div>
    )
}

export default Inventory