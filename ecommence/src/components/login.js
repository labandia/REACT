import React from 'react'
import {useDispatch} from 'react-redux';
import { login } from '../state/reducers/userReducers'

function Login() {
    const dispatch = useDispatch()

    return (
        <div>
            <h1>Login page</h1>
            <button onClick={()=> dispatch(login())}>LOGIN</button>
        </div>
    )
}

export default Login
