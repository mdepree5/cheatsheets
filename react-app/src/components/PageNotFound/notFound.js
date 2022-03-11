import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import './notFound.css';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
    const history = useHistory();

    useEffect(() => {
    setTimeout(() => {
        history.push('/')
        }, 4000)
    }, [history])


    return (
        <div className='error-container'>
            <h2 className='not-found'>404: We're sorry, code breaks sometimes</h2>
            <div className='alt-container'>
                <p className='alt-link-p'>Go home or we will redirect you shortly.</p>
                <div className='alt-button-div'>
                    <NavLink className={'alt-button'} to='/'>Home</NavLink>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
