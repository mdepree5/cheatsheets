import React from 'react';
import './Footer.css';

import githubSquare from '../../images/github-square-brands.svg';
import linkedIn from '../../images/linkedin-brands.svg';


const Footer = () => {


    return (
        <div classNme='footer-container'>
            <div className='footer'>
                <hr className='footer-bar-top' />
                <section className='footer-about-us'>
                    <h2>About Us</h2>
                </section>
                <section className='footer-info'>
                    <section className='footer-info-tuttle'>James
                        <section className='footer-github-tuttle'>
                            <a href='https://github.com/jjtuttle'><img src={githubSquare} alt='github'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }}
                            />
                            </a>
                        </section>
                        <section className='footer-linkedin-tuttle'>
                            <a href='https://www.linkedin.com/in/jamesjtuttle/'><img src={linkedIn} alt='linked'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }} />
                            </a>
                        </section>
                    </section>
                    <section className='footer-info-daniel'>
                        <section className='footer-github-daniel'>Daniel
                            <a href='https://github.com/Breadsandwich'><img src={githubSquare} alt='github'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }} />
                            </a>
                        </section>
                        <section className='footer-linkedin-daniel'>
                            <a href='https://www.linkedin.com/in/daniel--thai/'><img src={linkedIn} alt='linked'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }} />
                            </a>
                        </section>
                    </section>
                    <section className='footer-info-mitch'>
                        <section className='footer-github-mitch'>Mitch
                            <a href='https://www.linkedin.com/in/mitch-depree-4a5686155/'><img src={githubSquare} alt='github'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }} />
                            </a>
                        </section>
                        <section className='footer-linkedin-mitch'>
                            <a href='https://github.com/mdepree5'><img src={linkedIn} alt='linked'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }} />
                            </a>
                        </section>
                    </section>
                    <section className='footer-info-karl'>
                        <section className='footer-github-karl'>Karl
                            <a href='https://github.com/kbf12897'><img src={githubSquare} alt='github'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }} />
                            </a>
                        </section>
                        <section className='footer-linkedin-karl'>
                            <a href='https://www.linkedin.com/in/karl-felter-678249215/'><img src={linkedIn} alt='linked'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }} />
                            </a>
                        </section>
                        <hr className='footer-bar-bottom' />
                    </section>
                </section>
                <section className='footer-copy-right'>
                    <h4>&copy; 2022 Group 8 WebDev</h4>
                </section>
            </div>
        </div>
    );
};

export default Footer;
// James Tuttle
// Daniel Thai
// Mitch Depree
// Karl Felter