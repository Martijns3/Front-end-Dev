import { useState } from "react";
import { TextInput } from "./ui/TextInput";
import { data } from "../utils/data";
import { Flex } from "@chakra-ui/react";
import { RecipeListPage } from "../pages/RecipeListPage";

export const RecipeSearch = ({ clickFn }) => {
    const [searchField, setSearchField] = useState("");

    const handleChange = (event) => {
        setSearchField(event.target.value);
    };
    const matchedRecipes = data.hits.filter((hit) => {
        return (
            hit.recipe.label
                .toLowerCase()
                .includes(searchField.toLowerCase()) ||
            hit.recipe.healthLabels.some((item) =>
                item.toLowerCase().includes(searchField.toLowerCase())
            )
        );
    });

    return (
        <>
            <Flex direction="column" justifyContent="center" align="center">
                <TextInput changeFn={handleChange} w="300" mt="18" />
                <RecipeListPage
                    availableRecipes={matchedRecipes}
                    clickFn={clickFn}
                />
            </Flex>
        </>
    );
};
