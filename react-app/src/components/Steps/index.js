import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStep } from "../../store/steps";

const Steps = () => {
    const { cheatsheetId } = useParams();
    const dispatch = useDispatch();
    const cheatsheet = useSelector(state => state?.cheatsheet[cheatsheetId]);
    const steps = cheatsheet && Object.values(cheatsheet?.steps);

    // useEffect(() => {
    //     dispatch(getStep())
    // }, [dispatch])

    return (
        <div>
            {steps?.map((step) => {
                return (
                    <div>
                        <div>{step.title}</div>
                        <li key={step?.id}>
                            {step?.content}
                        </li>
                    </div>
                )
            })}
        </div>
    );
}

export default Steps;
