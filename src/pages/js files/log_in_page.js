import'./../css files/log_in_page.css'
import Header from '../../components/header';
import React, { useState,useRef } from "react";
import { FaLock,FaLockOpen } from "react-icons/fa";
import {useCookies} from 'react-cookie'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 
export default function Login(){
    const [isshowen,setisshowen]=useState(false)

    // eslint-disable-next-line no-unused-vars
    const[cookies,setcookies]=useCookies(["AccessToken"]);



    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [visible,changestatepass]=useState(false);
const changestate=()=>{changestatepass(!visible);}


async function submit_login(event) {
    
    event.preventDefault();
    const email= emailRef.current.value
    const password= passwordRef.current.value

  try{  const response = await fetch('http://localhost:5000/login', {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    const data = await response.json();
    console.log(data)

        if (data.auth === 'yes_auth'){
                setcookies("AccessToken",data.token)
                toast.success(" welcome back", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
          window.location.href = '/home';
        
        }
     else{
     toast.error('Wrong Email or password', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    }
    
    }
    catch{ toast.error('Server error check your internet connection', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });}
}
const [email,setemail]=useState('')

const restornig_pssword_emai_form = async(e)=>{
    e.preventDefault()
     const ffetch = await fetch("http://localhost:5000/restoring_password",{
            method:'post',
            headers:{'Content-type': 'application/json'},
            body:JSON.stringify({email})
        })
    const resp = await ffetch.json()
    if (resp.res==="doesnt exist"){showToast()}else{ if(resp.message==="check your email please"){ showToasts();setisshowen(false)}}
    console.log('respond from seerver is ',resp)
}


const showToast = () => {
    toast.error('Email not found', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showToasts = () => {
    toast.success('Check your email .. the link is active for an hour', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });}
    return(<>
    <div>
 <Header/>
    <div className="containerz">
        <div className='log_in_form_text' ><h1> Welcome back <br/>log in Doctor/Patient.</h1></div> 

<div className='content'>       
<div className='content_image'></div>  
<div className='log_in_form'>
    
     <form onSubmit={submit_login}>
     <div className='email'><input  ref={emailRef} id='email' type='email'  placeholder='Email' required></input> </div>
<div className='password'> <input ref={passwordRef} id='password' type={visible? "text":"password"} placeholder="Password" name="password" required /> {visible?<FaLockOpen className="iconpass" onClick={changestate}/>:<FaLock className="iconpass" onClick={changestate}/>}</div>
<div className='have_not_account' style={{color:" rgb(31,139,204)",cursor:'pointer'}} onClick={()=>setisshowen(true)}> Forgot password? </div>

<div style={{borderRadius:"10px"}}><input id='log_in_button'type='submit'value='Log in' ></input>     </div>
<div className='have_not_account'> you dont have an account? <a href='/sign_up'>Sign up now</a></div>

   
     </form>

     </div>
     
     </div>
    </div>
    </div>

      {isshowen&&<div className='restorint_pass_background_popup'>
                <div className='resorint_password_box_email_searcher'>
                <button id='cancel_subs_button_x' onClick={()=>setisshowen(false)}>X</button>
                    <h2> Restoring password</h2>
                    <form onSubmit={restornig_pssword_emai_form} >
                    <div className='restoring_email'> <input type='email' name='email' placeholder='Email' onChange={(e)=>{setemail(e.target.value)}}/>  </div>
                    <button className='restoring_pass_buttn' type='submit'> Restore </button>
                    </form>
                </div>
            </div>}

    </>)



}


