import React from 'react';
import './Footer.css';

import githubSquare from '../../images/github-square-brands.svg';
import linkedIn from '../../images/linkedin-brands.svg';


const Footer = () => {


    return (
        <>
            <div className='footer'>
                <section className='footer-info-tuttle'><p>James</p>
                    <section className='footer-github-tuttle'>
                        <a href='https://github.com/jjtuttle' target='_blank' rel='noreferrer'><img src={githubSquare} alt='github'
                            style={{
                                paddingLeft: '15px',
                                width: '20px',
                                filter: 'brightness(0) invert(1)'
                            }}
                        />
                        </a>
                    </section>
                    <section className='footer-linkedin-tuttle'>
                        <a href='https://www.linkedin.com/in/jamesjtuttle/' target='_blank' rel='noreferrer'><img src={linkedIn} alt='linked'
                            style={{
                                paddingLeft: '15px',
                                width: '20px',
                                filter: 'brightness(0) invert(1)'
                            }} />
                        </a>
                    </section>
                </section>
                <section className='footer-info-daniel'>
                    <section className='footer-github-daniel'><p>Daniel</p>
                        <a href='https://github.com/Breadsandwich' target='_blank' rel='noreferrer'><img src={githubSquare} alt='github'
                            style={{
                                paddingLeft: '15px',
                                width: '20px',
                                filter: 'brightness(0) invert(1)'
                            }} />
                        </a>
                    </section>
                    <section className='footer-linkedin-daniel'>
                        <a href='https://www.linkedin.com/in/daniel--thai/' target='_blank' rel='noreferrer'><img src={linkedIn} alt='linked'
                            style={{
                                paddingLeft: '15px',
                                width: '20px',
                                filter: 'brightness(0) invert(1)'
                            }} />
                        </a>
                    </section>
                </section>
                <section className='footer-info-mitch'>
                    <section className='footer-github-mitch'><p>Mitch</p>
                        <a href='https://github.com/mdepree5' target='_blank' rel='noreferrer'><img src={githubSquare} alt='github'
                            style={{
                                paddingLeft: '15px',
                                width: '20px',
                                filter: 'brightness(0) invert(1)'
                            }} />
                        </a>
                    </section>
                    <section className='footer-linkedin-mitch'>
                        <a href='https://www.linkedin.com/in/mitch-depree-4a5686155/' target='_blank' rel='noreferrer'><img src={linkedIn} alt='linked'
                            style={{
                                paddingLeft: '15px',
                                width: '20px',
                                filter: 'brightness(0) invert(1)'
                            }} />
                        </a>
                    </section>
                </section>
                <section className='footer-info-karl'>
                    <section className='footer-github-karl'><p>Karl</p>
                        <a href='https://github.com/kbf12897' target='_blank' rel='noreferrer'><img src={githubSquare} alt='github'
                            style={{
                                paddingLeft: '15px',
                                width: '20px',
                                filter: 'brightness(0) invert(1)'
                            }} />
                        </a>
                    </section>
                    <section className='footer-linkedin-karl'>
                        <a href='https://www.linkedin.com/in/karl-felter-678249215/' target='_blank' rel='noreferrer'><img src={linkedIn} alt='linked'
                            style={{
                                paddingLeft: '15px',
                                width: '20px',
                                filter: 'brightness(0) invert(1)'
                            }} />
                        </a>
                    </section>
                </section>

            </div>
            <section className='footer-copy-right'>
                <h4>&copy; 2022 Group 8 WebDev</h4>
            </section>
        </>
    );
};

export default Footer;
// James Tuttle
// Daniel Thai
// Mitch Depree
// Karl Felter