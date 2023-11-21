import { Link } from "react-router-dom";

const BackToMainBtn = () => {
    return (
        <div className="button-space">
            <Link to="/" className="btn btn-outline-secondary">
                Back
            </Link>
        </div>
    );
};

export default BackToMainBtn;
