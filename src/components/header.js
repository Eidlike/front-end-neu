import React, { useEffect, useState } from 'react'
import'./header.css'
import { useCookies} from 'react-cookie'
import Logoutt from './logout_fun'







export default function Header() {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

  const [user,setuser]=useState(null)
  const[cookie,]=useCookies(["AccessToken"]);


const Verify=async ()=>{
  try{
    const token=cookie.AccessToken;
      const response= await fetch('http://localhost:5000/tstfun',{
        method:'get',
        headers: {
          'Authorization': 'Bearer ',token
        }
    
      } );
     const data = await response.json();
       setuser(data.Role)
  
  }
  catch{console.log("errour")}
    }
useEffect(()=>{
  if(cookie.AccessToken){ Verify();
}
 else{
  setuser(null)

}

// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

  return (
<>
<div className="header"> 
<a href='/home' style={{textDecoration:"none"}}><div className='logo_space' >
    <div className='logo_img' ></div>
    <div className='logo_text'>  <span className='neuro'>Neuro</span><span className='soin'>Soin</span>  </div>
</div></a>
<ul className='headlist'>
    {user!==null?<li><a href='gen_info/Overview'>Dashboard</a></li>:<li> <a  href="sign_up">Sign up </a></li> }
    <li><a href='/offers'>offers</a> </li>
    <li><a href='/visu' >visualization</a></li>
    <li><a href='/seg' >segmentation</a></li>
    <li><a href='#l'> About</a></li>
 
 </ul>

{/*  */}
 {user!==null?(<div className='submenu'>
<div className='lil_profil_pic' tabIndex='0' onClick={toggleSubmenu}></div>
<div className='real_sub_menu'>
      <ul className='sub_menu_list_elements'>
        <li>Search a patient</li>
        <li>Account settings</li>
        <li>Help and feedbacks</li>
        <Logoutt setuser={setuser}/>
      </ul>

</div>

</div>):(<div className='buttonlogin'> <a href='/login'>Log in</a></div>)}

</div>

</> 
 )

}
