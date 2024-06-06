import React, { useState,useEffect } from 'react'
import {useCookies} from 'react-cookie'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './urpat.css'

function Yourpatients() {
/// the main patient to follow 

const [pat_id,setpat_id]=useState('');
const [cookie,]=useCookies(['AccessToken']);
const [doc,setdoc]=useState('');
const [loading,setloading]=useState(false);

    //// get id and Role in order to search ---- 
    //-------------------------------------    rest of the programm       ----------------------//
const getpatient=async(e)=>{
    e.preventDefault()
   await setpat_id(pat_id.toString())
   setloading(true)

    try{
      

      const result= await fetch('http://localhost:5000/client',{
            method:'post',
            body:JSON.stringify({
              id_doc:doc,
              id_pat:pat_id
            }),
            headers:{
                'Content-Type': 'application/json'
              }
        })
        const info=await result.json();
           
        if(info.message==='found'){
          toast.success('Patient found and added successfuly', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });} 
          else{
            toast.error('Patient already exist in your list', {
             position: "top-right",
             autoClose: 3000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
           });
          }}

            catch{
              toast.error('Server error', {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
             });
             }
            setloading(false)}


const [result,setresult]=useState([])


 

// ------------  Select that patient --------------  //

const select=async(hdak)=>{
  try{
    console.log(hdak)
    const fetchdata2=await fetch('http://localhost:5000/post_last_patient',{method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify({ id_doc:doc,id_pat:hdak })})
    const  fetched_data2= await fetchdata2.json()
      console.log(fetched_data2)
          if(fetched_data2.message==='done'){  
            toast.success('Patient successfuly has been chosen', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });}else{alert('wrong or error')}

  }catch
  {
    toast.error('Server error', {
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
//--------------------- to delete------------------- //
const deletee=async(hdak)=>{
  try{
    console.log(hdak)
    const fetchdata2=await fetch('http://localhost:5000/delete_relation',{method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify({ id_doc:doc,id_pat:hdak })})
    const  fetched_data2= await fetchdata2.json()
      console.log(fetched_data2)
          if(fetched_data2.message==='deleted successfuly'){ toast.success('Patient successfuly deleted', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });}else{alert('wrong or error')}
  }catch
  {
    console.error('error in ur code or couldnt fetch')
  }
}

useEffect(() => {
  const realjob=async()=>{
       setloading(true)
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

  }catch{console.log('erroorr')}
  setloading(false)

}
    realjob();
    
 },[cookie.AccessToken, doc]);

useEffect(()=>{
  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_client_info',{method:'get',headers:{ id_doc:doc } });
      const data = await response.json();
      setresult(data)
    } catch (error) {console.error('Error fetching clients:', error);}};
    if(loading){
  fetchClients();
  }
},[doc, loading])
  return (
    <div className='ur_pat_body'>
   <form onSubmit={getpatient} className='get_pat_for'> 
   <div className='searching_space'>  
    <input id="search" 
   name='search' 
   type='number' 
   placeholder='Enter the key' 
   value={pat_id}
   onChange={(e)=>{ setpat_id(e.target.value) }}
   pattern='[0-9]{16}'
   title="Enter 16 digit"
   required
    /> 
  
      </div>     
  <button id='searching_button'type='submit'>Search </button>
    
</form>
<table className='your_patient_table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {result.map(client => (
          <tr key={client.ID_patient} className='row_data'>
            <td>{client.ID_patient}</td>
            <td>{client.First_name} {client.Last_name}</td>
            <td>
              <button style={{marginRight:'10px' ,cursor:'pointer'}} onClick={()=>{select(client.ID_patient)}}className='the_buttonss1'  >Select</button>
              <button style={{ cursor:'pointer' }} onClick={()=>{deletee(client.ID_patient)}} className='the_buttonss2'  >Delete</button>
            </td>
          </tr>
        ))}
       
      </tbody>
    </table>
    </div>
  )
}

export default Yourpatients