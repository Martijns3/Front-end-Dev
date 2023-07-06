import { useState } from "react";
import "./App.css";
import { DrinkSearch } from "./components/DrinkSearch";
import { DrinkChoice } from "./components/ui/DrinkChoice";
import { Heading } from "@chakra-ui/react";

export const App = () => {
    const [userDrink, setUserDrink] = useState();

    const greeting = "Coffeecorner Inc.";
    return (
        <div className="App">
            {!userDrink ? (
                <>
                    <Heading mb={6} fontSize={[24, 36, 48]} color="green.700">
                        {greeting}
                    </Heading>
                    <DrinkSearch clickFn={setUserDrink} />
                </>
            ) : (
                <>
                    <DrinkChoice props={userDrink} clickFn2={setUserDrink} />
                </>
            )}
        </div>
    );
};
// dit is even een test
