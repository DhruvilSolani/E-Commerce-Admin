import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    useEffect(()=>{
        if(auth)
        {
            navigate('/');
        }
    })

    const collectData = async () => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result));
        navigate('/');
    }

    return (
        <div className='signup'>
            <h1>Register</h1>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button onClick={collectData} type='button'>Sign Up</button>
        </div>
    )
}

export default SignUp;
