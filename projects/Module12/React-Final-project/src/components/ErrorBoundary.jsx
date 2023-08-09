import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
    const error = useRouteError();

    return (
        <section>
            <h2>Ooppss...Something went wrong</h2>
            <small>{error?.status}</small>
            <small>{error?.message}</small>
        </section>
    );
};

export default ErrorBoundary;
