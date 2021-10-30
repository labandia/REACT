import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import axios from "axios";

function Hooks() {

    const [counted, setcounted] = useState(0);

    const [inputyped, setinputyed] = useState('sdsd');

    const [data, setdata] = useState([]);

    const InputRef = useRef(null);

    const onClick = () => {
        console.log(InputRef.current.value);
        InputRef.current.value = ''; 

    }

    const increment = () =>{
        setcounted(counted + 1);
    }

    const keybind = (event) => {
        setinputyed(event.target.value);
    }

    useLayoutEffect(()=>{
        console.log('USE__EFFECTLAYOUT');
    })

    useEffect(()=>{
        axios.get("https://pokeapi.co/api/v2/pokemon/25").then((response)=>{
            // setdata(response.data[0])
            console.log(response)
        })
    }, [])

    

    return (
        <div>
            <div>
                <h2 style={{color:'#fff'}}>WELCOME {data.email}</h2>
            </div>
            <div>
                <h2 style={{color:'#fff'}}>{counted}</h2>
                <button onClick={increment}>Increment</button>
            </div>

            <div >
                <input type='text' onChange={keybind}></input>
                <span style={{color:'#fff'}}>{inputyped}</span>
            </div>


            <div >
                <h2 style={{color:'#fff'}}>WELCOME </h2>
                <input type='text' ref={InputRef}></input>
                <button onClick={onClick}>Increment</button>
            </div>
        </div>
    )
}

export default Hooks
