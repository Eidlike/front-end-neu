/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import'./../css files/info_page.css'
import Sidenav from '../../components/side-nav';
import Overview from './overview';
import Addpatient from './info_docs/add_patients';
import Header from './../../components/header'
import { useState } from 'react';
import Yourpatients from '../../components/yourpatient';
import Useraccount from '../../components/user_account';
import FeedbackForm from '../../components/feedback';
import Adminpage from './admin_page';
import { useParams } from 'react-router';
import Appointments from '../../components/appointments';


function navigated(locat,user){
  let compo;

  switch(locat){
    case 'Overview':
      console.log('im here too')
       compo=<Overview/>
        break;
    
        case 'Addpatient':
      console.log('Addpatient')
      compo=<Addpatient/> 
      break;
      case 'Admin':
      console.log('admin')
      compo=<Adminpage/> 
      break;

      case 'Yourpatient':
      console.log('Yourpatient')
      compo=<Yourpatients/> 
      break;

      case 'Appointment':
      compo=<Appointments user={user}/> 
      break;

      case 'Account':
      console.log('Account')
      compo=<Useraccount/> 
      break;

      case 'Feedback':
      console.log('Feedback')
      compo=<FeedbackForm/> 
      break;
      default :
      compo=<Overview/>
  }
  return compo

}

export default function Geninfo({user}){
  const [compon,setcompon]=useState()
  const {id} = useParams()

 useEffect(()=>{
  setcompon(id)
 },[id])
return (<>
      <Header/>

  <div className='generel_infoo'>
    <Sidenav setcompon={setcompon}/>

{/* /////////////// right  //////////////////////////// */}


<div className='docu_nav'>
          {navigated(compon,user)}
</div></div></>
   
  )
}