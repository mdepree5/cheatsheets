import './notFound.css';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='error-container'>
            <h2 className='not-found'>404: We're sorry, code breaks sometimes</h2>
            <div className='alt-container'>
                <p className='alt-link-p'>Why don't you try this instead.</p>
                <div className='alt-button-div'>
                    <NavLink className={'alt-button'} to='/'>Home</NavLink>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
