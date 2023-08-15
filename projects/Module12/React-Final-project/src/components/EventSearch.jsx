import { useState, useContext, useEffect } from "react";
import { TextInput } from "./ui/TextInput";

import { Flex } from "@chakra-ui/react";
import { EventsPage } from "../pages/EventsPage";
import { useLoaderData } from "react-router-dom";
import { Select1 } from "./ui/Selector";
import { UsersAndCatContext } from "../ContextProvider";

export const loader = async () => {
    const events = await fetch("http://localhost:3000/events");

    return { events: await events.json() };
};

export const EventSearch = () => {
    // const [categories, setCategories] = useState(
    //     useContext(UsersAndCatContext)
    // );
    // useEffect(() => {
    //     setCategories(useContext(UsersAndCatContext));
    // }, []);

    const { events } = useLoaderData();

    const categories = useContext(UsersAndCatContext).category;

    const [searchField, setSearchField] = useState("");
    const [selectCategory, setSelectCategory] = useState("");

    const handleChange = (event) => {
        setSearchField(event.target.value);
    };

    const filteredCategories = events.filter((event) => {
        if (!selectCategory == "0") {
            return event.categoryIds.includes(Number(selectCategory));
        } else {
            return event.title.includes("");
        }
    });

    const matchedEvents = filteredCategories.filter((event) => {
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
                <p>or choose a category:</p>
                <Select1
                    name="selectCategory"
                    defaultValue="Choose a category"
                    onChange={(e) => setSelectCategory(e.target.value)}
                >
                    <option value="">-- all Categories --</option>
                    {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Select1>

                <EventsPage matchedEvents={matchedEvents} />
            </Flex>
        </>
    );
};
