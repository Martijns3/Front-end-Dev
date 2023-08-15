import { Select as SelectA } from "@chakra-ui/react";

export const Select1 = ({ ...props }) => (
    <SelectA
        color="blue.500"
        border="2px"
        borderColor="blue.300"
        borderRadius="3xl"
        w="400"
        mt="18"
        {...props}
    >
        {props.children}
    </SelectA>
);
