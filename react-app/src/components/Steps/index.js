import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStep } from "../../store/steps";
import no_image from '../../images/no_image_found.png'

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
        <div>
            {steps?.map((step) => {
                return (
                    <div>
                        <div>{step?.title}</div>
                        <li key={step?.id}>
                            {step?.content}
                            <div>
                                <img id='step_image_render'
                                    style={{ height: '90px', width: '130px' }}
                                    src={step?.media_url} onError={(e) => e.target.style.display = 'none'}
                                    alt='url'
                                />
                            </div>
                        </li>
                    </div>
                )
            })}
        </div>
    );
}

export default Steps;
