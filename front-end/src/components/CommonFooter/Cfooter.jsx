import React from 'react';
import "./Cfooter.scss";


function CommonFooter() {
   
        return (
            <div className='footercontainer'>
                <div className='copyrightlink'>
                <span>Copyright © 2023 Leetify</span>
                </div>
                <div className='lists'>
                    <ul>
                        <li><a href="#">Terms |&nbsp;&nbsp;</a></li>
                        <li><a href="#">Privacy Policy&nbsp;&nbsp;</a></li>
                        
                    </ul>
                <div className='united'>
                <img
                src="us.svg"
                alt="leetify-logo"
                width="15"
                height="15"/>
                <p>United States</p></div>
                </div>
              </div>
              
              
              
            
        );
        

    
}

export default CommonFooter;
