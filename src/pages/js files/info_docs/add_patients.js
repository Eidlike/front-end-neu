import React, {useState } from 'react';
import'./add_patient.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Addpatient(){
  const [formm,setform]=useState({
    first_name:'',
    last_name:'',
    email:'',
    National_identification_number:'',
    password:'',
    birthday:null,
    sexe:'',
    tele:'',
    Adress:'',
    doc_or_pat:'Patient'
 })
  const handlsinput= (e)=>{
  const {name,value}=e.target;
  setform({...formm,[name]:value})

 }
     const handlsbmit= async(e)=>{
      e.preventDefault()
      console.log(formm)

      try{
 const submitform = await fetch('http://localhost:5000/newregistering',{
  method:'post',
  body:JSON.stringify({first_name:formm.first_name,last_name:formm.last_name,email:formm.email,National_identification_number:formm.National_identification_number,password:formm.password,birthday:formm.birthday,sexe:formm.sexe,tele:formm.tele,Adress:formm.Adress,doc_or_pat:formm.doc_or_pat}),
  headers:{
    'Content-Type': 'application/json'
  }
 })
 const data = await submitform.json()
  data?toast.success(" Patient account has insearted successfully", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }):toast.error('Email already exist', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}catch{toast.error('Server error', {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});}
 }
    
  return (<>
                <div className='duc_body1'>
    <div className='text_patt' style={{color:'rgb(31,139,204)'}}> <h1> Add patient  </h1>  </div>     
<div className='form_bodyy'>
  
        <form onSubmit={handlsbmit} >

        <input id='name_p' 
        minLength={3}
        maxLength={30}
        type='text' 
        name='first_name' 
        placeholder='First name' 
        value={formm.first_name}
         onChange={handlsinput}required></input>


       <input id='name_p' 
       type='text' 
       minLength={3}
maxLength={30}
       name='last_name' 
       placeholder='Last name' 
       value={formm.last_name} 
       onChange={handlsinput}required></input> <br/>


  <input  name='National_identification_number'
   type='text'
    id='National_identification_number' 
     placeholder='National identification number'
     value={formm.National_identification_number} 
       onChange={handlsinput}
      required></input> <br/>


       <input id='email_p' 
       type='email' 
       name='email' 
       placeholder='email' 
       value={formm.email} 
       onChange={handlsinput}
       required></input><br/>
       
       
       <div name='password'>
         <input id='password_p' 
         type='text' 
         name='password' 
         placeholder='password' 
         value={formm.password} 
         onChange={handlsinput}
         required></input>
       </div>
       
       <div className="sex-container">
  <label htmlFor="maleRadio">Sexe: </label>
  <input
    id='maleRadio'
    type='radio'
    name='sexe'
    value='Male'
    checked={formm.sexe === 'Male'}
    onChange={handlsinput}
    required
  />
  <label htmlFor="maleRadio">Male </label>
  <input
    id='femaleRadio'
    type='radio'
    name='sexe'
    value='Female'
    checked={formm.sexe === 'Female'}
    onChange={handlsinput}
  />
  <label htmlFor="femaleRadio">Female</label>
</div>
       <input id='tlf_p' 
       required
       type='text' 
       pattern='[0-9]{10}' 
       name='tele' 
       placeholder='telephone' 
       value={formm.tele} 
       onChange={handlsinput}>
</input>
<br/>
       
    <DatePicker
          id='birthday_p'
          selected={formm.birthday}
          onChange={(date) => { setform({ ...formm, birthday: date });  }} 
          placeholderText='Birthday'
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'    required
        />
       <input id='adress_p' 
       required
       type='text' 
       placeholder='Adress' 
       name='Adress' 
       onChange={handlsinput} 
       value={formm.Adress}></input> <br/>
       
 <div className='sub_btnn'> <button id='add_patt' type='submit'>Add patient</button> </div>

</form>
</div>
 </div>  
  </>
   
  )
}