import { Input } from "@chakra-ui/react";

export const TextInput = ({ changeFn, ...props }) => {
    return (
        <Input
            // bg="blue.100"
            id="searchInput"
            color="blue.200"
            placeholder="search for events"
            border="2px"
            borderColor="blue.300"
            borderRadius="3xl"
            onChange={changeFn}
            _hover={{ borderColor: "blue.300" }}
            _placeholder={{ opacity: 1, color: "gray.400" }}
            {...props}
        ></Input>
    );
};
