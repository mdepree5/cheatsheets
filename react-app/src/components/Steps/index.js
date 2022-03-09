import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStep } from "../../store/steps";
import no_image from '../../images/no_image_found.png'
import './steps.css';


const Steps = ({ cheatsheetId }) => {
    const dispatch = useDispatch();
    const stepsObj = useSelector(state => state?.stepsReducer);
    const steps = Object.values(stepsObj)
    // console.log('STEPS ------------->', steps)
    // const steps = cheatsheet && Object.values(cheatsheet?.steps);


    useEffect(() => {
        dispatch(getStep(cheatsheetId))
    }, [ dispatch, cheatsheetId ])

    return (
        <div className="all-steps-container">
            {steps?.map((step) => {
                return (
                    <div className="step-container">
                        <h3 className="step-title-header">{step?.title}</h3>
                        <div className="step-wrapper">
                        <li className="step-content" key={step?.id} style={{ borderLeft: '4px solid lightGrey', padding: '10px' }}>
                            {step?.content}
                  
                            <div>
                                <img id='step_image_render'
                                    src={step?.media_url} onError={(e) => e.target.style.display = 'none'}
                                    alt='url'
                                />
                            </div>
                        </li>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Steps;

