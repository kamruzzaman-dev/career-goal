import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import googleIcon from '../../Image/icons/google.png'
import './LogIn.css'


const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);

    /*  store where it from  */
    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(email, password);
        signInWithEmailAndPassword(email, password);
    }

    if (user || userGoogle) {
        navigate(from,{replace:true});
    }

    return (
        <div className='form-container'>
            <div id="login" className='d-flex mt-5 align-items-center justify-content-center'>
                <div className='w-50 from-red-onion'>
                    <Form onSubmit={handleSubmit} className='mx-auto w-75'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required/>
                        </Form.Group>
                        <p style={{ color: "red" }}>{error?.message || errorGoogle?.message}</p>
                        {
                            (loadingGoogle || loading) && <p>Loading....</p>
                        }
                        <Button className='w-100' variant="danger" type="submit">
                            Log In
                        </Button>
                    </Form>

                </div>
            </div>
            <p className='text-center mt-4'>
                Your are New Member? <Link className='' to='/signup'>Create an account</Link>
            </p>
            <div className='line-container'>
                <div className='line'></div>
                <p>OR</p>
                <div className='line'></div>
            </div>
            <button onClick={() => signInWithGoogle()} className='google-login-container px-2'><img src={googleIcon} alt="" /> <p> continue with google</p></button>
        </div>
    );
};

export default LogIn;