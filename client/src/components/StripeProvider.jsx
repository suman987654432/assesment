import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51ROJQFHMFrGuhLntTBCoOyrC8n5s6YnomP3t9DA8XFydsvqmrI4GrLrr9uShylj6c63Is6uKxAtiR38HQa1bWO2Y00hiCArMAk');

const StripeProvider = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
