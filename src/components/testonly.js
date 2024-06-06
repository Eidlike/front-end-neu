import React, { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';

export default function Testt() {
  const [pricee, ] = useState("price_1PD0yQBovA5CmE7ylGjvG06i");
  const [sub, setSub] = useState({
    name: '',
    email: ''
  });

  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe.js has not loaded yet.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/paymentt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pricee
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch client secret.');
      }

      const res = await response.json();
      console.log("res is this : ", res);

      const clientSecret = res.clientSecret;

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: sub.name,
            email: sub.email,
          },
        },
      });

      if (payload.error) {
        setPaymentError(`Payment failed: ${payload.error.message}`);
        setPaymentSuccess(false);
      } else {
        setPaymentError(null);
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentError('Failed to process payment. Please try again later.');
      setPaymentSuccess(false);
    }
  };

  return (
    <>
      <form className="purchase-form" onSubmit={handleSubmit}>
        <CardNumberElement className='cardNumberElement' />
        <div className='card-ccv-expired-input-div'>
          <div className='cardcvcdiv'><CardCvcElement /></div>
          <div className='card_expr'><CardExpiryElement /></div>
        </div>
        <div className='full-name-input-div'>
          <input
            type='text'
            placeholder='Full Name'
            name='name'
            value={sub.name}
            onChange={(e) => setSub({ ...sub, [e.target.name]: e.target.value })}
          />
        </div>
        <div className='email-input-div'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={sub.email}
            onChange={(e) => setSub({ ...sub, [e.target.name]: e.target.value })}
          />
        </div>
        <button type="submit" className="submit-button">Pay</button>
      </form>
      {paymentError && <div>{paymentError}</div>}
      {paymentSuccess && <div>Payment successful!</div>}
    </>
  );
}
