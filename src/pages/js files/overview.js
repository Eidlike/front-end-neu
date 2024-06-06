import React,{useEffect, useState} from 'react';
import './../css files/overview.css';
import Patientinfo from '../../components/patient_profil';
import Visualdocs from '../../components/visual_docs';
import { useCookies } from 'react-cookie';


function Overview() {
  const [cookie,]=useCookies(["AccessToken"]);
  const[doc,setdoc]=useState('')
  const[last_pat,setlast_pat]=useState('')
  


  useEffect(() => {
    const realjob=async()=>{
         
      const token=cookie.AccessToken
      try{
      const fetched_data= await fetch('http://localhost:5000/tstfun',{
          method:'get',
          headers:{
              'Authorization': 'Bearer ',token
  
          }
      })
      const response = await fetched_data.json()
      setdoc(response.ID_user)
      setlast_pat(response.last_patient)    
  
  
  
    }catch{console.log('erroorr')}}
      realjob();
      
   },[cookie.AccessToken, doc, last_pat]);


  return (<>
        <div className='duc_body'>

      <h1 style={{color:'rgb(31,139,204)'}}> Patien card</h1>       
      <Patientinfo Last_patient={last_pat} />
       <h1 style={{color:'rgb(31,139,204)'}}> Visual Data</h1>       
       
 <div className='V_btn'>  <button>3D Visualization</button> </div> 

            <Visualdocs Last_patient={last_pat} doctor={doc} />
        

                </div>
</>
  )
}

export default Overview