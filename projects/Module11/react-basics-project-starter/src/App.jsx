import { RecipePage } from "./pages/RecipePage";
import { useState } from "react";
import { RecipeSearch } from "./components/RecipeSearch";
import { Flex, Heading } from "@chakra-ui/react";

export const App = () => {
    const [selectedItem, setSelectedItem] = useState();

    return (
        <>
            <Flex
                direction="column"
                color="white"
                bgGradient="linear(to-b, blue.400, blue.100)"
                align="center"
                minHeight="100vh"
            >
                <div className="App">
                    {!selectedItem ? (
                        <>
                            <Heading
                                align="center"
                                paddingBottom={4}
                                paddingTop={10}
                            >
                                Marty´s Recipe Searcher
                            </Heading>
                            <RecipeSearch clickFn={setSelectedItem} />
                        </>
                    ) : (
                        <RecipePage
                            selectedItemState={selectedItem}
                            clickFn={setSelectedItem}
                        />
                    )}
                </div>
            </Flex>
        </>
    );
};
