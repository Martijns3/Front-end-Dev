import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { eventIO } from "./components/eventActions";
// import {
//     UsersAndCatContext,
//     UsersAndCatContextProvider,
// } from "ContextProvider.jsx";

import {
    NewEvent,
    createNewEvent as createEvent,
    loader as newEventLoader,
} from "./components/Forms/NewEvent";
import {
    EditEvent,
    editEvent as editEvent,
} from "./components/Forms/EditEvent";
import {
    EventPage,
    loader as EventLoader,
    action as deleteEvent,
} from "./pages/EventPage";

import {
    EventSearch,
    loader as EventSearchLoader,
} from "./components/EventSearch";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import {
    UsersAndCatContext,
    UsersAndCatContextProvider,
} from "./ContextProvider";

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
            //     path: "",
            //     element: <eventIO />,

            //     errorElement: <ErrorBoundary />,
            // },
            {
                path: "/event/:eventId",
                element: <EventPage />,
                action: deleteEvent,
                loader: EventLoader,
                errorElement: <ErrorBoundary />,
            },
            {
                path: "/event/edit",
                element: <EditEvent />,
                action: editEvent,
                errorElement: <ErrorBoundary />,
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
            <UsersAndCatContextProvider>
                <RouterProvider router={router} />
            </UsersAndCatContextProvider>
        </ChakraProvider>
    </React.StrictMode>
);
