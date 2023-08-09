import {
    Form,
    redirect,
    useLoaderData,
    Link,
    Navigate,
    Router,
} from "react-router-dom";
import { createStandaloneToast } from "@chakra-ui/react";
import { ButtonA } from "../components/ui/Button1";
import { eventIO } from "../components/eventIO";

const { toast } = createStandaloneToast();
export const loader = async ({ params }) => {
    const users = await fetch("http://localhost:3000/users");
    const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
    const categories = await fetch("http://localhost:3000/categories");

    return {
        users: await users.json(),
        event: await event.json(),
        categories: await categories.json(),
    };
};

export const EventPage = () => {
    const { event, categories, users } = useLoaderData();
    console.log(event.eventiD);
    return (
        <div className="event-detail" align="center">
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <img
                style={{ borderRadius: "12px" }}
                width="200px"
                src={event.image}
            />
            <p>Date: {event.startTime.split("T")[0]}</p>
            {event.startTime.split("T")[1].slice(0, 5) >
            event.endTime.split("T")[1].slice(0, 5) ? (
                <p>
                    Start time: {event.endTime.split("T")[1].slice(0, 5)}
                    <br></br>
                    End time: {event.startTime.split("T")[1].slice(0, 5)}
                </p>
            ) : (
                <p>
                    Start time: {event.startTime.split("T")[1].slice(0, 5)}
                    <br></br>
                    End time: {event.endTime.split("T")[1].slice(0, 5)}
                </p>
            )}
            <p>Location: {event.location} </p>
            <p as="b"> Created by:</p>
            <div>
                {users
                    .filter((user) => event.createdBy == user.id)
                    .map((u) => (
                        <p key={u.id}>
                            {u.name}
                            <br></br>
                            <img
                                style={{ borderRadius: "100px" }}
                                width="100"
                                src={u.image}
                                border-radius="100px"
                            />
                        </p>
                    ))}
            </div>
            {
                <div className="categories">
                    <h2>categories:</h2>

                    <div>
                        {categories
                            .filter((category) =>
                                event.categoryIds.includes(category.id)
                            )
                            .map((f) => (
                                <li key={f.id}>{f.name}</li>
                            ))}
                    </div>
                </div>
            }
            <br />

            <ButtonA onClick={() => action(event.id)}>Delete Event</ButtonA>
            <ButtonA onClick={() => null}>Edit Event</ButtonA>
        </div>
    );
};
// (formData = {}, method, id = 0) => {

export const action = async (id) => {
    console.log("I shall delete events");
    eventIO({}, "DELETE", id);
    // id = id + 500;

    // try {
    //     await fetch(`http://localhost:3000/events/${id}`, {
    //         method: "DELETE",
    //     }).then((response) => {
    //         if (response.ok) {
    //             toast({
    //                 title: "Success: Event Deleted",
    //                 status: "success",
    //             });

    //         } else {
    //             toast({
    //                 title: `Error ${response.status} has occured: ${response.statusText}`,
    //                 status: "error",
    //             });
    //             const timeout = setTimeout(() => {
    //                 window.location.replace("/");
    //             }, 1500);
    //             return () => clearTimeout(timeout);
    //         }

    //     });

    // } catch {
    //     const timeout = setTimeout(() => {
    //         window.location.replace("/");
    //     }, 1500);
    //     return () => clearTimeout(timeout);
    // }
    // const timeout = setTimeout(() => {
    //     window.location.replace("/");
    // }, 1500);
    // return () => clearTimeout(timeout);
    // console.log(id);
    // eventIO({}, "DELETE", id);
};
