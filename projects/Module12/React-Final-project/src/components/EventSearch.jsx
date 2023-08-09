import { useState } from "react";
import { TextInput } from "./ui/TextInput";

import { Flex } from "@chakra-ui/react";
import { EventsPage } from "../pages/EventsPage";
import { Form, redirect, useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params }) => {
    const categories = await fetch("http://localhost:3000/categories");
    const events = await fetch("http://localhost:3000/events");

    return { categories: await categories.json(), events: await events.json() };
};

export const EventSearch = () => {
    const { categories, events } = useLoaderData();
    const [searchField, setSearchField] = useState("");

    const handleChange = (event) => {
        setSearchField(event.target.value);
    };
    const matchedEvents = events.filter((event) => {
        return (
            event.title.toLowerCase().includes(searchField.toLowerCase()) ||
            event.description
                .toLowerCase()
                .includes(searchField.toLowerCase()) ||
            String(
                categories
                    .filter((category) =>
                        event.categoryIds.includes(category.id)
                    )
                    .map((category) => category.name.toLowerCase())
            ).includes(searchField.toLowerCase())
        );
    });

    return (
        <>
            <Flex
                direction="column"
                justifyContent="center"
                align="center"
                gap="2em"
            >
                <TextInput changeFn={handleChange} w="300" mt="18" />
                <EventsPage matchedEvents={matchedEvents} />
            </Flex>
        </>
    );
};
