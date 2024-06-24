import React, {  useEffect, useRef,useState } from 'react'
import{useParams} from 'react-router-dom'
import Header from '../../components/header'
import { FaLock,FaLockOpen } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Passchange() {

  const [can,setcan]=useState(true)
  const [user_id,setuser_id]=useState()
  
    const passwordRef = useRef('');
    const passwordRef2 = useRef('');
    const [visible,changestatepass]=useState(false);
    const [visible2,changestatepass2]=useState(false);

    const changestate=()=>{changestatepass(!visible);}
    const changestate2=()=>{changestatepass2(!visible2);}

    const { token } = useParams()
useEffect(()=>{
  const srufff =async ()=>{
    try{
      const fet = await fetch("http://localhost:5000/restore-password",{
        method:'post',
        headers:{'Content-type': 'application/json'},
        body:JSON.stringify({token})
    })
      const ress = await fet.json() 
      if(ress.message==="token is expired"){alert('the Link is invalid or expired .. please request another link'); window.location.href="http://localhost:3000/login"}
      else{
        if(ress.ID_user!==null){ 
          setuser_id(ress.id)
          setcan(true)
        }
      }
    }catch(err){ alert(err)}
  
    }
      srufff();
})

const new_password = async(e)=>{
  e.preventDefault()
 const pass1 = passwordRef.current.value;
  const pass2 = passwordRef2.current.value;
  console.log(pass1,pass2)
  if( pass1 !== pass2){ console.log("true") ;return showToast()}
  else{
    try{
    const ffetch = await fetch('http://localhost:5000/the_new_password',{ method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id,pass1})})
    const fetched = await ffetch.json()
    if(fetched.message==="done"){showToasts();window.location.href="/home"}else{alert('error happened changing password')}
    }catch(ee){ alert(ee)}
  }
}
 

//< --------------     toast message stuff ---------------->

const showToast = () => {
  toast.error('password are not matched try againt', {
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
  toast.success('password changed successfuly', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
  return ( <>
    { can && <div>
    <Header/>
    <div>
    <div className="containerz">
        <div className='log_in_form_text' ><h1> Changing password safely.</h1> </div> 

<div className='content' style={{width:'100%'}}>       
<div className='content_image'/>

        <div className='resorint_password_box_email_searcher' style={{backgroundColor:"transparent"}}>
            <form onSubmit={new_password} style={{width:'100%'}} >
                    <div className='restoring_email'> <input ref={passwordRef}  type={visible? "text":"password"} placeholder="Password" name="password" required /> {visible?<FaLockOpen className="iconpass" onClick={changestate}/>:<FaLock className="iconpass" onClick={changestate}/>}  </div>
                    <div className='restoring_email'> <input ref={passwordRef2}  type={visible2? "text":"password"} placeholder="Repeat assword" name="password" required /> {visible2?<FaLockOpen className="iconpass" onClick={changestate2}/>:<FaLock className="iconpass" onClick={changestate2}/>}  </div>
                    <button className='restoring_pass_buttn' type='submit'> Restore</button>
                    </form>
            </div>
        </div>
</div>

    </div>
    </div>}
    </>
  )
}

export default Passchange