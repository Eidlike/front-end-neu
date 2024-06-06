import React from 'react'
import './appointments.css'

function Appointments() {
  return (
    <>
        <div className='bigger_rdv_container'>
            <div className='top_navigation_containers_holder'>
                <div className='navigation_container_button'>
                    <p style={{cursor:'pointer'}}>Appointments</p>
                </div>
               <span>||||</span> 
                <div className='navigation_container_button'>
                <p style={{cursor:'pointer'}}> Set appointments</p>
                </div>
            </div>
            <div className='appointments_container'>
                <ul className='appointment_list_holder'>
                    <li className='an_appointment_style'>
                        <div style={{borderRight:'1px solid gray',display:'flex',alignContent:'center',justifyContent:'center',flexDirection:'column'}}>
                           <div>march</div> 
                           <div>19</div> 
                        </div>
                        <div style={{display:'flex',flexDirection:'column'}}> 
                            <span>with the doctor : seif boulkemh</span>  
                             <span> with the patient : daas ibrahim</span>
                       </div>
                       <div className='app_btns_continer'>
                        <button> Edit</button>
                        <button> Delete</button>
                       </div>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div>
                <form>

                </form>
            </div>
        </div>
    </>
  )
}

export default Appointments