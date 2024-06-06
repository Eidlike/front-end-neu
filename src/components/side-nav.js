import React,{useState,useEffect} from 'react'
import { useCookies } from 'react-cookie';
import './side_nav.css'
import {Link} from 'react-router-dom'
import Logoutt from './logout_fun';


function Sidenav({setcompon}) {
  const [user,setuser]=useState(null)
  // eslint-disable-next-line no-unused-vars
  const[cookie,setcookies]=useCookies(["AccessToken"]);


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
          <div className='side_bar_navigation'>
      <div className='pic_container'><div className='profil_pic'></div> </div>
      <ul>
     {  user==='admin'?<li onClick={()=>setcompon('Admin')}>Admin section   </li>:null}
     { user==='Doctor'&&   <li>  <Link to='http://localhost:3000/gen_info/Overview'   > Overview</Link> </li>}
     { user==='Doctor'&&   <li>  <Link to='http://localhost:3000/gen_info/Addpatient' > Addpatient</Link> </li>}
     { user==='Doctor'&&   <li>  <Link to='http://localhost:3000/gen_info/Yourpatient'> Yourpatient</Link> </li>}
                           <li><Link to='http://localhost:3000/gen_info/Appointment'> Appointment</Link>         </li>
                           <li><Link to='http://localhost:3000/gen_info/Account'    > Account</Link>         </li>
                           <li><Link to='http://localhost:3000/gen_info/Feedback'   > Feedback</Link>        </li>
            <Logoutt/>
      </ul>
 </div>
  
  
  )
}

export default Sidenav