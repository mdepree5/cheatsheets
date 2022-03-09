import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStep } from "../../store/steps";
import './steps.css';

const Steps = ({ cheatsheetId }) => {
    const dispatch = useDispatch();
    const stepsObj = useSelector(state => state?.stepsReducer);
    const steps = Object.values(stepsObj)

    useEffect(() => {
        dispatch(getStep(cheatsheetId))
    }, [dispatch, cheatsheetId])

    return (
        <div className="all-steps-container">
            {steps?.map((step) => {
                return (
                    <div className="step-container">
                        <h3 className="step-title">{step?.title}</h3>
                        <li className="step-content" key={step?.id}>
                            {step?.content}
                        </li>
                    </div>
                )
            })}
        </div>
    );
}

export default Steps;
