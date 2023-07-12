import { Flex } from "@chakra-ui/react";
import { RecipeItemCard } from "../components/RecipeItemCard";

export const RecipeListPage = ({ availableRecipes, clickFn }) => {
    return (
        <>
            <Flex
                // flexDir={["column", "column", "row"]}
                justify="center"
                align="center"
                flexWrap="wrap"
                paddingTop={8}
                paddingBottom={6}
                gap={6}
            >
                {" "}
                {availableRecipes.map((recipe) => {
                    return (
                        <RecipeItemCard
                            key={recipe.recipe.label}
                            selectedItemState={recipe}
                            clickFn={clickFn}
                        />
                    );
                })}
            </Flex>
        </>
    );
};
