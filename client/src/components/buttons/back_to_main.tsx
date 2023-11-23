import { Link } from "react-router-dom";

type BackButtonProps = {
    to: string;
};

const BackButton = (props: BackButtonProps) => {
    return (
        <div className="button-space">
            <Link to={props.to} className="btn btn-outline-secondary">
                Back
            </Link>
        </div>
    );
};

export default BackButton;
