import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const PaymentSuccess = () => {
  const navigate = useNavigate();


  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="text-center shadow" style={{ maxWidth: '600px' }}>
        <Card.Body className="p-5">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          </div>
          <h1 className="mb-3">Payment Successful!</h1>
          <p className="mb-4 text-muted">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
