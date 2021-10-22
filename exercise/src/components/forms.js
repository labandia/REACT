import React from 'react';
import './forms.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

const Forms = () =>{
    const [name, setFullname] = useState("");
    const [email, setEmail] = useState("");



    const [arraylist, info] = useState([]);

    useEffect(()=>{
        displayinfo();
        a();
    }, [])

    const a = () =>{
        fetch('http://localhost:3001/fulldetails', {
            method: 'GET'
        }).then((result)=>{
            console.log(result);
        })
    }

    const addinfo = () =>{
        // if(name === '' && email === ''){
        //     error = 'Fill the require field'
        // }else{
            
        // }
        Axios.post('http://localhost:3001/create', {
                name: name, 
                email: email
            }).then(()=>{
                displayinfo();
              
            })
    }

    const update = (e) => {
        Axios.put('http://localhost:3001/create', {
                name: name, 
                email: email
            }).then(()=>{
                console.log("Update success");
                displayinfo();
        })
    }

    const deleteinfo = (i) => {
        Axios.delete(`http://localhost:3001/del/${i}`).then((response)=>{
            info(arraylist.filter((val)=>{
                return val.id !== i;
            }))
        })
    }

    const displayinfo = async () =>{
        await Axios.get("http://localhost:3001/fulldetails").then((response)=>{
            const data = response.data;
            info(data);
        })
    }

    

    return(
        <div className="contain">
            <form>
                <div className="inputbox">
                    <label>Name:</label><br/>
                    <input type="text" placeholder="Enter your name" 
                    onChange={(event)=> {
                        setFullname(event.target.value);
                    }}></input>
                </div>
                <div className="inputbox">
                    <label>Email Address:</label>
                    <br/>
                    <input type="text" placeholder="Enter you email address" 
                    onChange={(event)=> {
                        setEmail(event.target.value);
                    }}></input>
                </div>

                <button onClick={addinfo} className="btn" type="button">Send</button>

               
            </form>

            <div className="table">
                    <div className="htable">
                        <h3>User information</h3>
                        <p>Total: {arraylist.length}</p>
                    </div>

                    <div className="bodytable">
                        {arraylist.map(list=>(
                            <div className="user" key={list.id}>
                                <div className="huser">
                                    <p>{list.id}</p>   
                                    <p>{list.email}</p>
                                </div>

                                <div className="actions">
                                    <i className="fas fa-pencil-alt"  style={{color: "rgb(67, 168, 250)"}}></i>
                                    <i onClick={()=>{deleteinfo(list.id)}}  className="fas fa-trash" style={{color: "rgb(248, 51, 51)"}}></i>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    )
};

export default Forms;