import "./DrinkSearch.css";
import { useState } from "react";
import { TextInput } from "./ui/TextInput";
import { availableDrinks } from "./utils/data";
import { ListofDrinks } from "./ListofDrinks";
import { Flex } from "@chakra-ui/react";

export const DrinkSearch = ({ clickFn }) => {
    const [searchField, setSearchField] = useState("");

    const handleChange = (event) => {
        setSearchField(event.target.value);
    };
    const matchedDrinks = availableDrinks.filter((drink) => {
        return drink.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return (
        <>
            <label>Search for drinks here:</label>
            <Flex justifyContent="center" align="center" direction="column">
                <TextInput changeFn={handleChange} w="300" mt="18" />
                <ListofDrinks
                    availableDrinks2={matchedDrinks}
                    clickFn={clickFn}
                />
            </Flex>
        </>
    );
};
