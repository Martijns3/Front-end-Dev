import { useLoaderData, useNavigate } from "react-router-dom";
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
} from "@chakra-ui/react";
import { ButtonA } from "../components/ui/Button1";
import { eventIO } from "../components/eventActions";
import { useContext, useEffect } from "react";
import { UsersAndCatContext } from "../ContextProvider";

export const loader = async ({ params }) => {
    const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
    // const users = await fetch(`http://localhost:3000/users`);
    return {
        event: await event.json(),
        // users: await users.json(),
    };
};
export const action = async (id) => {
    eventIO({}, "DELETE", id);
};

export const EventPage = () => {
    const navigate = useNavigate();
    const { event } = useLoaderData();

    // const data = useContext(UsersAndCatContext);
    const categories = useContext(UsersAndCatContext).category;
    const users = useContext(UsersAndCatContext).users;

    const user = users.filter((user) => event.createdBy == user.id);
    const cat = categories.filter((category) =>
        event.categoryIds.includes(category.id)
    );
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toEdit = () => {
        navigate("/event/edit", {
            state: {
                id: event.id,
                title: event.title,
                description: event.description,
                date: event.startTime.split("T")[0],
                start_time: event.startTime.split("T")[1].slice(0, 5),
                end_time: event.endTime.split("T")[1].slice(0, 5),
                event_location: event.location,
                img: event.image,
                user: user[0].id,
                selectedCategories: cat,
                users: users,
                categories: categories,
            },
        });
    };

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
                {user.map((u) => (
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
                        {cat.map((f) => (
                            <li key={f.id}>{f.name}</li>
                        ))}
                    </div>
                </div>
            }
            <br />
            <ButtonA type="submit" onClick={() => window.location.replace(`/`)}>
                Back to mainpage
            </ButtonA>
            <ButtonA onClick={onOpen}>Delete Event</ButtonA>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to delete this event?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <ButtonA colorScheme="blue" mr={3} onClick={onClose}>
                            Cancel
                        </ButtonA>
                        <ButtonA
                            variant="ghost"
                            onClick={() => action(event.id)}
                        >
                            I'm sure!
                        </ButtonA>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ButtonA
                onClick={() => {
                    toEdit();
                }}
            >
                Edit Event
            </ButtonA>
        </div>
    );
};
