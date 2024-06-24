/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './appointments.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { toast } from 'react-toastify';



function Appointments({user}) {
    const [reload,setloading]=useState(true)
    const [data,setdata]=useState([])
    const [pat_id,setpat_id]=useState('');
    const[appdate,setappdate]=useState('')
    const[time,settime]=useState()
    const onchangehandler = (date) => {setappdate(date)}
    const timehandler = (e) => {settime(e.target.value);}
useEffect(()=>{
    try{
    fetch('http://localhost:5000/fetching_data_', {
        method : 'get',
        headers:{user}
    }).then(res=>res.json())
    .then(res =>{setdata(res);console.log(res)})
    .catch((err)=> console.log('couldnt fetch ur data'))
    }catch(e){
        console.log('error is ',e)
    }
},[user,reload])


    const handleappointsub = async(e)=>{
        e.preventDefault()
        try{
          const ftch = await fetch('http://localhost:5000/set_appointment',{
               method : 'post',
               headers:{
                   'Content-type':'application/json'
               },
               body:JSON.stringify({ user,pat_id, appdate,time})})
           const ress = await ftch.json()
             if(ress.message==='done'){
             toast.success('The appointment has been set successfully', {
             position: "top-right",
             autoClose: 3000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
           });
        }
           else{ toast.error('Patient ID is invalid or wrong', {
             position: "top-right",
             autoClose: 3000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
           });}

       }catch {
          toast.error('Server error check your internet connection', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setloading(pre => !pre)

    }
    const deletee=async(hdak)=>{

        try{
      
          const fetchdata2=await fetch('http://localhost:5000/delete_appointment',{method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify({appid:hdak })})
          const  fetched_data2= await fetchdata2.json()
                if(fetched_data2.message==='deleted successfuly'){
                   toast.success('Patient successfuly deleted', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });}
                else{alert('wrong or error')}
        }catch
        {
          toast.error('Server error check your internet connection', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
         setloading(pre => !pre)
      
      }

      const getMonthAndDay = (dateString) => {
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const date = new Date(dateString);
        const monthIndex = date.getMonth();
        const dayOfMonth = date.getDate();
        return dayOfMonth+' '+months[monthIndex];}
        const formatTime = (timeString) => {
            const [hours, minutes] = timeString.split(':');
            return hours+":"+minutes
          };
      
  return (
    <>
        <div className='bigger_rdv_container'>
            <div className='top_navigation_containers_holder'> <p >Appointments</p> </div>


    <div className='smaller_rdv_container'>

            <div className='appointments_container'>

                <ul className='appointment_list_holder'>
                    {data.map((data)=>(
                        <li className='an_appointment_style' key={data.ID_appointment}>
                        <div className='appointment_date'>
                        <span>{getMonthAndDay(data.Date)}</span> 
                        <span> At {formatTime(data.time)}</span> 
                        </div>
                        <div className='appointment_details'> 
                             <span> patient :{data.Last_name} {data.First_name}</span>
                       </div>
                       <div className='app_btns_continer'>
                        <button style={{ cursor:'pointer' }} className='the_buttonss2' onClick={()=>deletee(data.ID_appointment)}> Delete</button>
                       </div>
                    </li>
                    ))
                    }
                    
                </ul>
            </div>
            <div className='appointments_setter_container'>
              <form className='flex_colom' onSubmit={handleappointsub}>
                <DatePicker
                
            id="datepicker_date"
            selected={appdate}
            onChange={onchangehandler}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            placeholderText="Select Date"
           />

        <input type='time'
        name='app_time'
        id='datepicker_time'
         value={time}
        onChange={timehandler}
         />


       <input id="selector" 
   name='search' 
   type='number' 
   placeholder='Patient ID' 
   value={pat_id}
   onChange={(e)=>{ setpat_id(e.target.value.toString()) }}
   pattern='[0-9]{16}'
   title="Enter 16 digit"
   required
    />   


      <button type="submit" id='aaaaa'>Set</button>
    </form>
            </div>
            </div>
        </div>
    </>
  )
}

export default Appointments