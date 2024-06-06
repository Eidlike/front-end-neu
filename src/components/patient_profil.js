import React, { useEffect, useState } from 'react'
import './patient_profil.css'

function Patientinfo( {Last_patient} ) {
    const [data, setData] = useState([]);
    

   useEffect(()=>{
    async function  Getdata(){

        const information= await fetch('http://localhost:5000/getinfo',{ method:'get',headers:{patient:Last_patient}})
         const info=await information.json()
         setData(info)
    }      
    Getdata()
   },[Last_patient])


  return (
    <>
    {
            data.map(dd=>(<div className='display' key={dd.ID_patient}>
                 <img src={'http://localhost:5000/'+dd.patient_prof_pic} className='empty'  alt=''  ></img>
                 <table>
      <tbody className='table_pat'>
        <tr>
          <td>ID:</td>
          <td>{dd.ID_patient}</td>
        </tr>
        <tr>
          <td>Name:</td>
          <td>{dd.First_name} {dd.Last_name}</td>
        </tr>
        <tr>
          <td>Birthday:</td>
          <td>{dd.Birthday}</td>
        </tr>
        <tr>
          <td>Sex:</td>
          <td>{dd.Sexe}</td>
        </tr>
        <tr>
          <td>Telephone:</td>
          <td>{dd.Telephone}</td>
        </tr>
        <tr>
          <td>Address:</td>
          <td>{dd.Adress}</td>
        </tr>
        <tr>
          <td>Blood Type:</td>
          <td>{dd.Blood} {dd.Rhesus}</td>
        </tr>
      </tbody>
    </table>
                    </div>
            ))
    }
    </>
  )
}

export default Patientinfo