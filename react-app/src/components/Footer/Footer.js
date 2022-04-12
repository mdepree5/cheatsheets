import React from 'react';
import './Footer.css';

import githubSquare from '../../images/github-square-brands.svg';
import linkedIn from '../../images/linkedin-brands.svg';

const Footer = ({ path }) => {


    return (
        <footer className='footer'>
            <div className="footer-container">
                <div className="footer-tuttle">
                    <p>James</p>
                    <div className='github-linkedin-links'>
                        <div className='footer-github-tuttle'>
                            <a className='link' href='https://github.com/jjtuttle' target='_blank' rel='noreferrer'><img src={githubSquare} alt='github'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }}
                                />
                                </a>
                        </div>
                        <div className="footer-linkedin-tuttle">
                            <a className='link' href='https://www.linkedin.com/in/jamesjtuttle/' target='_blank' rel='noreferrer'><img src={linkedIn} alt='linked'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-daniel">
                    <p>Daniel</p>
                    <div className='github-linkedin-links'>
                        <div className='footer-github-daniel'>
                            <a className='link' href='https://github.com/Breadsandwich' target='_blank' rel='noreferrer'><img src={githubSquare} alt='github'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }}
                                />
                                </a>
                        </div>
                        <div className="footer-linkedin-daniel">
                            <a className='link' href='https://www.linkedin.com/in/daniel--thai/' target='_blank' rel='noreferrer'><img src={linkedIn} alt='linked'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-mitch">
                    <p>Mitch</p>
                    <div className='github-linkedin-links'>
                        <div className='footer-github-mitch'>
                            <a className='link' href='https://github.com/mdepree5' target='_blank' rel='noreferrer'><img src={githubSquare} alt='github'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }}
                                />
                                </a>
                        </div>
                        <div className="footer-linkedin-mitch">
                            <a className='link' href='https://www.linkedin.com/in/mitch-depree-4a5686155/' target='_blank' rel='noreferrer'><img src={linkedIn} alt='linked'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-karl">
                    <p>Karl</p>
                    <div className='github-linkedin-links'>
                        <div className='footer-github-karl'>
                            <a className='link' href='https://github.com/kbf12897' target='_blank' rel='noreferrer'><img src={githubSquare} alt='github'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }}
                                />
                                </a>
                        </div>
                        <div className="footer-linkedin-karl">
                            <a className='link' href='https://www.linkedin.com/in/karl-felter-678249215/' target='_blank' rel='noreferrer'><img src={linkedIn} alt='linked'
                                style={{
                                    width: '20px',
                                    filter: 'brightness(0) invert(1)'
                                }} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='footer-copy-right'>
                    <h4>&copy; 2022 Group 8 WebDev</h4>
                </div>
            </div>
        </footer>
     );
}

export default Footer;
