import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';


const Footer = () => {
    return (
        <div className="footer-container">
            <h1>About Us</h1>
            <div className="footer">
                <div id='J'>
                    <a href='https://github.com/jjtuttle'><FontAwesomeIcon icon={faGithub} />James</a>
                </div>
                <div id='K'>Y</div>
            </div>
        </div>
    );
};

export default Footer;