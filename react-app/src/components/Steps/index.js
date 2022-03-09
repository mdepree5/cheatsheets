import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteStep } from "../../store/steps";
import no_image from '../../images/no_image_found.png'
import EditStepsFormModal from "../EditStep/EditStepModal";
import './steps.css';


const Steps = ({ cheatsheetId }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const stepsObj = useSelector(state => state?.stepsReducer);

    const steps = Object.values(stepsObj);
    const cheatsheet = useSelector(state => state.cheatsheet[cheatsheetId]);

    const handleDelete = async (stepId) => {
       return await dispatch(deleteStep(stepId))
    }


    // useEffect(() => {
    //     dispatch(getStep(cheatsheetId))
    // }, [dispatch])

    return (
        <div className="all-steps-container">
            {steps?.map((step) => {
                return (
                    <div className="step-container">
                        <h3 className="step-title-header">{step?.title}</h3>
                        <div className="step-wrapper">
                        <li className="step-content" key={step?.id} style={{ borderLeft: '4px solid lightGrey', padding: '10px' }}>
                            {step?.content}

                            {typeof step?.media_url === 'string' && (
                                <div>
                                    <img id='step_image_render'
                                        src={step?.media_url} onError={(e) => e.target.style.display = 'none'}
                                        alt='url'
                                    />
                                </div>
                            )}
                            {sessionUser?.id === cheatsheet?.owner_id && (
                                <div className="step-buttons-div">
                                    <div>
                                        <button onClick={() => handleDelete(step?.id)}>Delete</button>
                                    </div>
                                    <EditStepsFormModal step={step}/>
                                </div>
                            )}
                        </li>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Steps;
