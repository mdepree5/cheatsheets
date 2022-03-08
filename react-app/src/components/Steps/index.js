import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Steps = () => {
    const { cheatsheetId } = useParams();
    const cheatsheet = useSelector(state => state?.cheatsheet[cheatsheetId]);
    const steps = cheatsheet && Object.values(cheatsheet?.steps);
    const sessionUser = useSelector(state => state?.session.user);
    console.log('ADFASFDFAFD',sessionUser.id)
    console.log(typeof cheatsheetId)

    let editDeleteAdd;
    if (sessionUser?.id === Number(cheatsheetId)) {
        editDeleteAdd = (
            <div className="submit-create-step">
                <div className="text-area-div">
                    <textarea className="create-step" rows='5' cols='100' placeholder="Enter your step here..."></textarea>
                </div>
                <div className="button-div">
                    <button className="submit-step">Submit</button>
                </div>
            </div>
        )
        } else {
        editDeleteAdd = null;
        }

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
            <div>{editDeleteAdd}</div>
        </div>
    );
}

export default Steps;
