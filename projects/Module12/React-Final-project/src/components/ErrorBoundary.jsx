import { useRouteError } from "react-router-dom";
import { ButtonA } from "./ui/Button1";

const ErrorBoundary = () => {
    const error = useRouteError();

    return (
        <>
            <section>
                <h2>Ooppss...Something went wrong</h2>
                <small>{error?.status}</small>
                <small>{error?.message}</small>
            </section>
            <ButtonA onClick={() => window.location.replace(`/`)}>
                Take me back!
            </ButtonA>
        </>
    );
};

export default ErrorBoundary;
