import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth =localStorage.getItem('user');
        if(auth)
        {
            navigate("/");
        }
    });
    const handleLogin= async ()=>{
        console.log(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/");
        }else{
            alert("Email or password is incorrect!");
        }
    };

    return (
        <div className='signup'>
            <h1>Login</h1>
            <input type='text' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleLogin} type='button'>Login</button>
        </div>
    )
}

export default Login;