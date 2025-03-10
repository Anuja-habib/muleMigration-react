import React from 'react';
import "../css/card.css"
// import FooterLogo from "../assets/muleSmallLogo.png"

const Footer = ()=>{
    return(
        <div className='footer-container'>
            <div className='footer-content'>© Copyright 2025 Salesforce.com, inc. All rights reserved. Various trademarks held by their respective owners.
            Salesforce, Inc. Salesforce Tower, 415 Mission Street, 3rd Floor, San Francisco, CA 94105, United States</div>
            {/* <div className='footer-img-container'>
                <img className='footer-img' src={FooterLogo} alt="footer logo" />
            </div> */}
        </div>
    )
}

export default Footer;