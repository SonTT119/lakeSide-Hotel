import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../layout/Footer';

const PaymentSuccess = () => {
    return (
        <div>
            <div className='container'>
                <Header title='Payment Success' />
                <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
                    
                    <h2 className="text-success mt-2">Payment Success !!!</h2>
                    <h4 className="text-success">Your payment has been processed successfully. Thank you for your reservation!</h4>
                    <h4 className="text-success">Please provide your booking confirmation code when you check in.</h4>
                    <h4 className="text-success"> Our hotel always checks in at 2:00 p.m. every day. You need to arrive at least 10 minutes before that time.</h4>
                    <h4 className="text-success">We look forward to seeing you soon!</h4>
                    <Link to="/" className='payment-button bt-sm'>Return to Home</Link>
                </div>
                
            </div>
            <Footer/>
        </div>
    );
};

export default PaymentSuccess;