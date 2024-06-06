// /* eslint-disable no-unused-vars */
// import React, { useState,useEffect } from 'react';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
// import { useCookies } from 'react-cookie';

// function CheckoutForm({subscriptionType,user}) {

//   const [doctor_id,setdoctor_id]=useState()
//   const [cookie] = useCookies(["AccessToken"]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = cookie.AccessToken;
//       try {
//         const fetchedData = await fetch('http://localhost:5000/tstfun',{
//           method: 'get',
//           headers: { 'Authorization': "Bearer",token }
//         });
//         const data = await fetchedData.json();
//         setdoctor_id(data.ID_user)

//       }catch(e){ console.log("error is ",e)}
//     }
//     fetchData()
//   },[cookie.AccessToken])




//   const [sub, setSub] = useState({
//     name: '',
//     email: ''
//   });


//   const stripe = useStripe();
//   const elements = useElements();
//   const [paymentError, setPaymentError] = useState(null);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [btn, setbtn] = useState("Pay");
//   const [btnonoff, setbtnonoff] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setbtn("Processing...");
//     setbtnonoff(true);
//     if (!stripe || !elements) {
//       console.log('Stripe.js has not loaded yet.');
//       setbtn("Pay");
//       setbtnonoff(false);
//       return;
//     }

//     const cardNumberElement = elements.getElement(CardNumberElement);
//     const cardExpiryElement = elements.getElement(CardExpiryElement);
//     const cardCvcElement = elements.getElement(CardCvcElement);

//     const expDateValue = cardExpiryElement.value || '';
//     const [expMonth, expYear] = expDateValue.split('/');

//     try {
//       const { paymentMethod } = await stripe.createPaymentMethod({
//           type: 'card',
//           card: cardNumberElement
//       });

//       const response = await fetch('http://localhost:5000/create_paymentt', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//               paymentMethodId: paymentMethod.id,
//               email:sub.email,
//               subscriptionType,
//               ID_Doctor:doctor_id
//           }),
//       });

//       if (response.ok) {
//           console.log('Subscription creatd successfully');
//       } else {
//           console.error('Failed to create subscription');
//       }
//   } catch (e) {
//       console.error('err creating subscription:', e);
//   }
//   setbtn("Pay");
//     setbtnonoff(false);

//   };

//   return (
//     <>
//       <form className="purchase-form" onSubmit={handleSubmit}>
//         <CardNumberElement className='cardNumberElement' />
//         <div className='card-ccv-expired-input-div'>
//           <div className='cardcvcdiv'><CardCvcElement /></div>
//           <div className='card_expr'><CardExpiryElement /></div>
//         </div>
//         <div className='full-name-input-div'>
//           <input type='text' placeholder='Full Name' name='name' value={sub.name} onChange={(e) => setSub({ ...sub, [e.target.name]: e.target.value })} />
//         </div>
//         <div className='email-input-div'>
//           <input type='email' placeholder='Email' name='email' value={sub.email} onChange={(e) => setSub({ ...sub, [e.target.name]: e.target.value })} />
//         </div>
//         <button 
//           type="submit" 
//           className="submit-button" 
//           disabled={btnonoff} 
//           style={btnonoff ? { backgroundColor: "gray" } : {}} 
//         >
//           {btn}
//         </button>
   
   
//       </form>
//       {paymentError && <div>{paymentError}</div>}
//       {paymentSuccess && <div>Payment successful!</div>}
//     </>
//   );
// }

// export default CheckoutForm;
