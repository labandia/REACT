import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../../components/header';
import logo from '../../images/Logo.png'

function Admin() {
    const [isloading, setisloading] = useState(true);

    

    const loading = () =>{
        setTimeout(() => {
            setisloading(false)
        }, 3000)
    }

    useEffect(() => {
        loading();
    }, [])

    return (
        <div style={{background: '#f5f5f5'}} >
            {isloading ? 
                <div className="mainloading">
                    <img src={logo} alt={'Logo'} ></img>
                    <div className="loadingwrap">
                        <div className="dot dot1"></div>
                        <div className="dot dot2"></div>
                        <div className="dot dot3"></div>
                    </div>
                    <p>Checking the Credentials....</p>
                </div>
                : 
                <div className="wrap">   
                     <Header />

                    <div className="wrap__mainwrapper">
                        <div className="wrap__wrapper">
                            <Outlet />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Admin
