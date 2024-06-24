import React,{useState,useEffect} from 'react'
import { useCookies } from 'react-cookie';
import './side_nav.css'
import Logoutt from './logout_fun';
import { useNavigate } from 'react-router-dom';


function Sidenav({setcompon}) {
  const navigate=useNavigate()
  const [user,setuser]=useState(null)
  const [width,setwidth]=useState(window.innerWidth > 480 ?'230px':'0')
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
  return (<>
  <div className='menu-image_responsive'  onClick={()=>{if(width==='0'){setwidth('75%')} else{setwidth('0')}}}/>
      <div className='side_navigation_keys_background'  style={{ height: width === '0' ? '0' : '100%' }}>

   <div className='side_bar_navigationn' style={{width:width}}>
      <div className='pic_container'><div className='profil_pic'></div> </div>
      <ul>
     {  user==='admin'&&   <li onClick={()=>{navigate("/gen_info/Admin")}}      > Admin section   </li>}
     { user==='Doctor'&&   <li onClick={()=>{navigate("/gen_info/Overview")}}   > Overview        </li>}
     { user==='Doctor'&&   <li onClick={()=>{navigate("/gen_info/Addpatient")}} > Addpatient      </li>}
     { user==='Doctor'&&   <li onClick={()=>{navigate("/gen_info/Yourpatient")}}> Yourpatient     </li>}
                           <li onClick={()=>{navigate("/gen_info/Appointment")}}> Appointment     </li>
                           <li onClick={()=>{navigate("/gen_info/Account")}}    > Account         </li>
                           <li onClick={()=>{navigate("/gen_info/Feedback")}}   > Feedback        </li>
            <Logoutt/>
      </ul>
 </div>
 </div>
  </>
  )
}

export default Sidenav