import React, { useEffect, useRef, useState } from 'react'
import'./header.css'
import { useCookies} from 'react-cookie'
import Logoutt from './logout_fun'
import { useNavigate } from 'react-router'


export default function Header() {
  const navigate = useNavigate()
  const [vis , setvis]=useState(false)
  const [height , setheight]=useState('0')
  const [trans , settrans]=useState('rotate(0deg)')

    const toggleSubmenu = () => {
        setvis(prev => !prev);
    };

  const [user,setuser]=useState(null)
  const[cookie,]=useCookies(["AccessToken"]);

  const ref1 = useRef()
  const ref2 = useRef()


useEffect(()=>{
  const Verify=async ()=>{
    try{
      const token=cookie.AccessToken;
        const response= await fetch('http://localhost:5000/tstfun',{
          method:'get',
          headers: {
            'Authorization': 'Bearer ',token
          } } );
       const data = await response.json();
         setuser(data.Role)
         console.log(user)

    }
    catch{
      setuser(null)
      
    }
      }
  if(cookie.AccessToken){ Verify();

}
 else{
  setuser(null)
}
},[ cookie.AccessToken,user]);
console.log("user is ",user)
window.addEventListener("click",(e)=>{
  if(e.target !== ref1.current && e.target !== ref2.current ){ setvis(false)}
})
const func = ()=>{
  if(height==='0'){
     setheight('350px')
     settrans('rotate(180deg)')

  }else{setheight('0')
    settrans('rotate(0deg)')

  }
}
  return (
<>
<div className="header"> 
<div className='Responsive_menu' onClick={func} style={{transform:trans}}/>
<a href='/home' style={{textDecoration:"none"}}><div className='logo_space' >
    <div className='logo_img' />

    <div className='logo_text'>  <span className='neuro'>Neuro</span><span className='soin'>Soin</span>  </div>
</div></a>
<ul className='headlist' style={{height:height}}>
    {user !== null && user !== undefined ?<li><a href='http://localhost:3000/gen_info/Overview'>Dashboard</a></li>:<li> <a  href="sign_up">Sign up </a></li> }

    <li><a href='http://localhost:3000/offers'>offers</a> </li>

<li><a href='https://niivue.github.io/niivue-ui/' >visualization</a></li> 
<li><a href='https://duzduran-brain-tumor-segmentation.hf.space/' >segmentation</a></li> 
    <li><a href='#l'> About</a></li> 
 </ul>

 {user !== null && user !== undefined ?(
  <div className='submenu'>

<div className='lil_profil_pic' tabIndex='0' onClick={toggleSubmenu} ref={ref1}/>
{vis && <div className='real_sub_menu' ref={ref2}>
      <ul className='sub_menu_list_elements'>
      {user==="Doctor"&&  <li onClick={()=>{navigate("/gen_info/Yourpatient")}}>Search a patient</li>}
        <li onClick={()=>{navigate("/gen_info/Account")}}>Account </li>
        <li onClick={()=>{navigate("/gen_info/Feedback")}}>Feedbacks</li>
        <Logoutt />
      </ul>

</div>}
</div>
):(<div className='buttonlogin'> <a href='/login'>Log in</a></div>)}</div></>)}
