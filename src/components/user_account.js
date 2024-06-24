/* eslint-disable no-unused-vars */
import React,{useEffect, useRef, useState} from 'react';
import { useCookies } from 'react-cookie';
import './user_account.css'
import { BsTelephone } from "react-icons/bs";import { TfiWorld } from "react-icons/tfi";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import {useReactToPrint} from 'react-to-print'
import {toast} from "react-toastify"


function Useraccount() {
  const [cookie,]=useCookies(["AccessToken"]);
  const[user,setuser]=useState('')
  const[role,setrole]=useState('')

  const[userform,setuserform]=useState([])
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});

  const [cardview, setcardview] = useState(false);
const printref = useRef();

const printhandl = useReactToPrint({
  content:() => printref.current
})

  useEffect(() => {
    const realjob=async()=>{
         
      const token=cookie.AccessToken
      try{
      const fetched_data= await fetch('http://localhost:5000/tstfun',{method:'get',headers:{'Authorization': 'Bearer ',token}})
      const response = await fetched_data.json()
        setuser(response.ID_user)
        setrole(response.Role)
    }catch{console.log('erroorr')}}
      realjob();
      
   },[cookie.AccessToken]);

   useEffect(()=>{
    const getdata=async()=>{
        try{
        const fetchdata = await fetch('http://localhost:5000/get_user_data',{ method:'get',headers:{user_id:user,role:role}})
        const fetcheddata = await fetchdata.json();
        setuserform(fetcheddata);
        setUserData(fetcheddata[0]);
        console.log("user form is thissssssssss",fetcheddata)

        }catch{ alert('errour happened')}
    }
    getdata();
   },[role, user,editMode])

//----------------------------------les function------------------------------//

const handleSave = async () => {
    try {
      const fetchdata = await fetch('http://localhost:5000/ypdate_userr_data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const fetcheddata= await fetchdata.json()

      if(fetcheddata.message){
        toast.success('data is updated', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
      setEditMode(false);


    } catch {
      toast.error('Server error', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });}}
      const formtt = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

  return (
    <>
    <div className='everthinggg'>
    {userform.map(elem=>( <div className='editable_infos' key={elem.ID_users}  >
    <div className='big_pictur_container'>
<div className='pictur_container_small'>
      <img src={'http://localhost:5000/visual_data/logo.jpg'}    alt='' />
</div>

</div>

        <table className='information_table'  >
    <tbody>
         {role==='Patient'&&(<tr>
            <th>your ID</th>
                <td>{elem.ID_users}</td>
            </tr>)}
          <tr> 
            <th>First Name</th>  
            <td>{editMode ? <input type="text" value={userData.First_name} onChange={(e) => setUserData({ ...userData, First_name: e.target.value })} /> : elem.First_name} </td> 
            </tr >
          <tr> 
                <th>Last Name</th>
                <td>{editMode ? <input type="text" value={userData.Last_name} onChange={(e) => setUserData({ ...userData, Last_name: e.target.value })} /> : elem.Last_name}</td>
              </tr>
              {role==='Patient'&&(<tr>
            <th>National identification number</th><td>{elem.National_identification_number} </td>
            </tr>)}
             <tr>
                <th>Birthday</th>
                <td>{editMode ? <input type="date" value={userData.Birthday} onChange={(e) => setUserData({ ...userData, Birthday: e.target.value })} /> : formtt(elem.Birthday)}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{elem.Email}</td>
              </tr>
          <tr> 

             <th>Sexe       </th>
             <td>  {elem.Sexe} </td></tr >
          <tr> 
             <th>Telephone  </th>
             <td>  {editMode ? <input type="text"        value={userData.Telephone} onChange={(e) => setUserData({ ...userData, Telephone: e.target.value })} /> : elem.Telephone} </td></tr >
          <tr> 

             <th>Adress     </th>
             <td>  {editMode ? <input type="text"        value={userData.Adress} onChange={(e) => setUserData({ ...userData, Adress: e.target.value })} /> : elem.Adress} </td>
             </tr>
             {role==='Patient'&&(<tr>
            <th>Blood</th><td>{elem.Blood} {elem.Rhesus}</td>
            </tr>)}
            {role==='Doctor'&&(<tr>
            <th>Points </th>
                <td>{elem.Points}</td>
            </tr>)}

             </tbody>
             </table>
       
        </div>))}
        {editMode ? (
        <div className='flexflex'>
          <button id='savebutton' onClick={handleSave}>Save</button>
          <button id='cancel' onClick={() => {setEditMode(false)}}>Cancel</button>
        </div>
      ) : (<Buttons role={role} setEditMode={setEditMode} setcardview={setcardview} />
      )}
   {cardview && <div className='pop_up_card_to_print'>
        <div ref={printref} className='card_body_print'>
          <div className='decoration' />
       <h1> Doctor card </h1>
       <div className='general_docot_card'>
        { userform.map( aaa=>(
          <div className='left_part_docot_card'key={aaa.ID_users} >  
          <table>
            <tr><th><BsTelephone className='icons_details' /></th><td><h3>{aaa.Telephone}</h3></td></tr>
            <tr><th><TfiWorld className='icons_details' /></th><td><h3>http://localhost:3000/gen_info</h3></td></tr>
            <tr><th><MdOutlineEmail className='icons_details'/></th><td><h3>{aaa.Email}</h3></td></tr>
            <tr><th><IoLocationOutline className='icons_details'/></th><td><h3>{aaa.Adress}</h3></td></tr>
          </table>
              </div>
        ))}
         <div className='right_part_docot_card'>    
       </div>
        
  </div>
 
        </div>
        <div className='buttons_holder'>
          <button id="edit" onClick={printhandl}>print</button>
          <button id="edit" onClick={() => setcardview(false)} >cancel</button>
        </div>
        </div>}
        </div>
    </>
  )
}

export default Useraccount


function Buttons({role,setcardview,setEditMode}){
  console.log(role)
  return(
    <>
<div className='flexflex'>
        <button id='edit' onClick={() => setEditMode(true)}>Edit</button>
        {role==='Doctor'&&  <button id='edit' onClick={() => setcardview(true)}>show card</button>}
        </div>    </>
  )
}