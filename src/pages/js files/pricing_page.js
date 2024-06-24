import React, { useState } from 'react'
import './../css files/money-stuf.css'
import Header from '../../components/header'
import { toast } from 'react-toastify'




function Pricingpage({user}) {
  const [itemm,setitemm]=useState(null)
  const [isshowen,setisshowen]=useState(false)


 const[image,setimage]=useState(null)

const handlerecu = async (e)=>{
    e.preventDefault()
    if(image){
    const dataimage = new FormData();
    dataimage.append('file',image);
    dataimage.append('user',user);
try{
   await fetch('http://localhost:5000/upload_verification',{method:"post",body:dataimage})
    .then(res=>  res.json())
    .then((resp)=>{
        if(resp.message==="done"){toast.success("Sent successfully ,please wait verification", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });}
    })
    setimage(null)

}catch(err){  toast.error('Server error', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });}

}
setisshowen(false)

}


  return (
<>
<Header/>
<div className='general_pricing_table'>
  <div className='li_fiha_text_mlfog'>
    <h2> Find a plan that's right for you  </h2>
    <h3> we offer packet of amazing services that suit you needs .. check what works the best for u  </h3>
  </div>

  <div className='pricess_table_aligner'>

    <div className='table_itself'>
      {<Details arg={'basic'} />}
      
             <button className='table_button' >Free</button>        
    </div>
    
    <div className='table_itself'>
    {<Details arg={'pro'} />}
            <button className='table_button' onClick={()=>{setitemm('pro');setisshowen(true)}}>Purchase</button>
    </div>

    
    <div className='table_itself'>
    {<Details arg={'plus'} />}
        <button className='table_button' onClick={()=>{setitemm('plus');setisshowen(true)}}>Purchase</button>
    </div>
  </div>
</div>

{isshowen?<div className='pop_up_window'>
 
    <div className='purchasing_box'>
    <button id='cancel_subs_button_x' onClick={()=>setisshowen(false)}>X</button>
      <div className='purchaing_chooose'>    {<Details arg={itemm} />}  </div>

             <div className='purchaing_data_to_buy'> 
            <form className="purchase-form" >

                <h2>Payment details</h2>

        <div className='compte_number_and_key'>
        <input id='compte_number' type='text' defaultValue="123456"/>
        <input id='compte_number2' type='text' defaultValue="12"/>
        </div>

        <div className='compte_name'>
        <input type='text' defaultValue=" Sidi ammar , annaba"/>

        </div>
        <div className='compte_address'>
        <input type='text' defaultValue="University BMA"/>

        </div>
        <div className='detail_uploader'>
       { image ===null? <div className='upload_button_div'> <input type='file'  onChange={(e)=>{setimage(e.target.files[0])}}/> </div>
        :<button className="upload-button" onClick={handlerecu}> Send</button>}
        </div>
        </form>
      </div>



    </div>
</div>:null}
</>)}

export default Pricingpage

function Details({arg}){
  var detail;
  
  switch(arg){
    case 'basic':
     return detail = <>  <div className='table_title'>   <h2> Basic </h2></div>
    <div className='price'> <div className='little_pricing_text'> <h3> Free</h3></div> <div className='price_itself'>  <span>  0.00 </span>  </div>  </div>
    <div className='table_information_data'>  
   <ul className="pricingTable-firstTable_table__options">
       <li>Unlimited Listing</li>
       <li>Edit Your Listing</li>
       <li>Approve Reviews</li>
       <li>Take Booking Online</li>
       <li>24/7 Support Service</li>
   </ul>
     </div></>
     case 'pro':
    return detail=<><div className='table_title'> <h2> Pro</h2> </div>
    <div className='price'> <div className='little_pricing_text'> <h3> Just for</h3></div><div className='price_itself'> <span> 1000.00</span> </div></div>
    <div className='table_information_data'>
    <ul className="pricingTable-firstTable_table__options">
           <li>Unlimited Listing</li>
           <li>Edit Your Listing</li>
           <li>Approve Reviews</li>
           <li>Take Booking Online</li>
           <li>24/7 Support Service</li>
       </ul>
        </div></>

    case 'plus':
      return detail=<><div className='table_title'> <h2>Plus</h2> </div>
      <div className='price'> <div className='little_pricing_text'><h3>Just for</h3> </div><div className='price_itself'>  <span> 2000.00 </span></div>  </div>
   <div className='table_information_data'> 
   <ul className="pricingTable-firstTable_table__options">
          <li>Unlimited Listing</li>
          <li>Edit Your Listing</li>
          <li>Approve Reviews</li>
          <li>Take Booking Online</li>
          <li>24/7 Support Service</li>
      </ul> </div></>
  


    default :
    break;}

    return(<> 
    {detail} 
    
    
    </>
    )
}

