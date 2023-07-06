import { DrinkItem } from "./DrinkItem";
import { Flex } from "@chakra-ui/react";

export const ListofDrinks = ({ availableDrinks2, clickFn }) => {
    return (
        <Flex
            gap={16}
            w={["100%", "65%", "70%"]}
            flexWrap="wrap"
            justifyContent="center"
            direction="row"
            align="center"
        >
            {availableDrinks2.map((drink) => (
                <DrinkItem key={drink.id} props={drink} clickFn={clickFn} />
            ))}
        </Flex>
    );
};
