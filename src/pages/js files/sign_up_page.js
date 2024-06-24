import Header from '../../components/header'
import'./../css files/sign_up_page.css';
import { FaLock,FaLockOpen } from "react-icons/fa";
import React, { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import {useCookies} from 'react-cookie'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Signup(){
    const [sexe,setsexe]=useState('');

    const [,setcookies]=useCookies('AccessToken')
   
    // eslint-disable-next-line no-unused-vars
    const [Role,setRole]=useState('');

    const [visible,changestatepass]=useState(false);
    const changestate=()=>{changestatepass(!visible);}
    const [showw,setshow]=useState('text');


    const first_namee=useRef()
const last_namee=useRef()
const passworde=useRef()
const emaile=useRef()
const birthdaye=useRef()
const adresse=useRef()
const telee=useRef()


const changee = ()=>{
    if(showw==='text'){setshow('date')}else {setshow('text')}

}


    async function submittt(event){
        event.preventDefault();

const first_name=first_namee.current.value
const last_name=last_namee.current.value
const password=passworde.current.value
const email=emaile.current.value
const birthday=birthdaye.current.value
const adress=adresse.current.value
const tele=telee.current.value

  try{ const respons = await fetch('http://localhost:5000/newregistering',{
    method: 'post',
    body: JSON.stringify({first_name,last_name, email, password,sexe,birthday,adress,tele,doc_or_pat:'Doctor' }),
    headers: {
        'Content-type': 'application/json'
    }
    }) 

    const dta= await respons.json()
    if (dta === true){

        const response = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': 'application/json'
            }
        }); const data = await response.json();
        console.log(data)
    
            if (data.auth === 'yes_auth'){
                    setcookies("AccessToken",data.token)
                    toast.success("Account created .. welcome here Doctor", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
             window.location.href = '/offers';
                 } }
   else{
    toast.error('Email already exist', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
   }


  } catch{
    toast.error("Server Errour", {
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
    return(
        <>
        <Header></Header>
        <div className="container111">
        <div className='sign_up_form_text' > Please fill out the following information to set up your free account. Let's get started </div> 
        <div className='content_image'/> 

     <form className="sign_up_form" onSubmit={submittt}> 
            <div className='name'><input ref={first_namee} name="first_name"type='text' placeholder='First name' required></input><input ref={last_namee} name='last_name' type='text'  placeholder='Family name' required></input></div>
            <div className='email'><input ref={emaile} name='email' type='email' id='email'  placeholder='Email' required></input> </div>

            <div className='password'><input ref={passworde} id='password' type={visible? "text":"password"} placeholder="Password" name="password" required minLength={8} /> {visible?<FaLockOpen className="iconpass" onClick={changestate}/>:<FaLock className="iconpass" onClick={changestate}/>}</div>
        <div className='sexe_label'> <label>Sexe: </label>
    <input checked={sexe === 'Male'} 
          onChange={() => setsexe('Male')}  name='sexe' type='radio' value='Male'required ></input> <label>Male </label>   
            <input checked={sexe === 'Female'} 
          onChange={() => setsexe('Female')}  name='sexe' type='radio' value='Female' ></input><label>Female</label>  </div>
        <div className='birdthday'><input ref={birthdaye} name='Birthday' type={showw} placeholder='birthday' onFocus={changee} required min="1900-01-01" max="2024-05-29"></input>   </div>
        <div className='address' ><input ref={adresse} name='Address' type='text' placeholder='Address' required></input> </div>
        <div className='tele'><input ref={telee} name='tele' type='text'  placeholder='Phone number'required pattern="(06|07|05)[0-9]{8}"></input>   </div>
        <div className='have_account'> Have not an account? <a href='/login'>Login now</a></div>
        <input id='sign_up_button'type='submit' value='Sign up' ></input>
     </form>
     </div>

        </>
    )
}