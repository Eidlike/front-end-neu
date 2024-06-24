import React,{useEffect, useState} from 'react';
import './../css files/admin_page.css'

function Adminpage() {
    const [doc_list,setdoc_list]=useState([])
    const [show,setshow]=useState(false)
    
useEffect(()=>{
    const getinfo=async ()=>{
        try{
        const fetchdata= await fetch('http://localhost:5000/admit_getway',{method:'get'})
        const fetcheddata= await fetchdata.json()
        setdoc_list(fetcheddata)

        }catch(err){console.log(err)}
    }
    getinfo();
},[])
useEffect(() => {
    console.log(doc_list)
}, [doc_list]);

/// ------------    getting infooos      ------------  ///
const Dropdownfun=async(pat_id)=>{
    setshow((state=> ({...state,[pat_id]:!state[pat_id]})));
 
}

  return (
    <div className='admin_page_body'>
      
    <div className="container">
        <h1>User List</h1>
        <ul className="user-list">

        { doc_list.map( (doctor) =>(<>
             <li className="user" key={doctor.ID_Doctor}>
                 
                     <span className="user-id">{doctor.ID_Doctor}</span>
                     <span className="user-name">{doctor.First_name}</span>
                     <span className="user-familyname">{doctor.Last_name}</span>
                     <span className="user-status">{doctor.subscription}</span>
                 <button className="user-button" onClick={()=>Dropdownfun(doctor.ID_Doctor)}>Action</button>
             </li>
        {    show[doctor.ID_Doctor] && <Userlist doctor={doctor.ID_Doctor}/> } 

             
             </>
             ))}
                   
       </ul>

    </div>
    
        
    </div>
  )
}

export default Adminpage


function Userlist({doctor}){
         const [patinfo,setpatinfo]=useState([])
useEffect(()=>{
    const func = async ()=>{
        const feth= await fetch('http://localhost:5000/patient_seller',{method:'get',headers:{doctor}})
        const fethed = await feth.json();
        setpatinfo(fethed);
    }
  func();

},[doctor])
   
    return(
        <ul className='user-list'>
        {
        patinfo.length > 0?patinfo.map( (patient=>(
                <li className='user_patients' key={patient.ID_patient}>  
                <span> {patient.ID_patient} </span>
                <span> {patient.First_name}</span>
                <span> {patient.Last_name}</span>
            </li>




            ))):<p style={{fontSize:'15px'}}>there is no patient yet</p>
        }
        </ul>
    )

}