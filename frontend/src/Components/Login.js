import React from 'react';
import logo from '../Images/logo.png';
import { Button } from '@mui/material';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useStateValue } from './StateProvider';
import '../style.css';

const Login = () => {

    const [, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem('user', JSON.stringify(result.user))
                dispatch({ type: "set_user", user: result.user });
            })
            .catch((err) => {
                console.log("Error", err)
            })
    }

    return (
        <>
            <div className='login-top'></div>
            <div className='login'>
                <img src={logo} alt='error' />
                <h1>Whatsapp</h1>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </>
    )
}

export default Login;