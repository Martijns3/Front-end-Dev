import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
    NewEvent,
    createNewAndEdit as createEvent,
    loader as newEventLoader,
} from "./NewEvent";
import {
    EventPage,
    loader as EventLoader,
    action as deleteEvent,
} from "./pages/EventPage";

import { Root } from "./components/Root";
import { User, loader as userLoader } from "./User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    EventSearch,
    loader as EventSearchLoader,
} from "./components/EventSearch";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <EventSearch />,
                loader: EventSearchLoader,
                errorElement: <ErrorBoundary />,
            },
            // {
            //     path: "/",
            //     element: <EventsPage />,
            //     loader: EventListLoader,
            // },
            {
                path: "/event/:eventId",
                element: <EventPage />,
                action: deleteEvent,
                loader: EventLoader,
                errorElement: <ErrorBoundary />,
            },
            {
                path: "/user/:userId",
                element: <User />,
                loader: userLoader,
            },
            {
                path: "/event/new",
                element: <NewEvent />,
                action: createEvent,
                loader: newEventLoader,
                errorElement: <ErrorBoundary />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);
