import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';

const PaymentSuccess = () => {
    return (
        <div className='container'>
            <Header title='Payment Success' />
            <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
                
                <h2 className="text-success mt-3">Payment Success !!!</h2>
                <h4 className="text-success">Your payment has been processed successfully. Thank you for your purchase!</h4>
                <Link to="/" className='payment-button bt-sm'>Return to Home</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;