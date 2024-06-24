import React, { useEffect, useState } from 'react'
import './patient_profil.css'

function Patientinfo( {Last_patient} ) {
    const [data, setData] = useState([]);
    
console.log(Last_patient)
   useEffect(()=>{
    async function  Getdata(){

        const information= await fetch('http://localhost:5000/getinfo',{ method:'get',headers:{patient:Last_patient}})
         const info=await information.json()
         console.log(info)
         setData(info)
    }      
    Getdata()
   },[Last_patient])

   const formtt = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  return (
    <>
    {
            data.map(dd=>(<div className='display' key={dd.ID_patient}>
                 <img src={'http://localhost:5000/visual_data/'+dd.user_profil_picture} className='empty'  alt=''  style={{border:"1px solid gray"}}/>
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
          <td>{formtt(dd.Birthday)}</td>
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