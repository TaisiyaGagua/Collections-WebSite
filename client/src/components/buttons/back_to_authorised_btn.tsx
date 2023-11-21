import { Link } from "react-router-dom";

const BackToAuthorisedBtn = () => {
    return (
            <div className="button-space">
                <Link to="/authorised" className="btn btn-outline-secondary">
                    Back
                </Link>
            </div>
    );
};

export default BackToAuthorisedBtn;
