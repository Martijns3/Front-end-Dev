import { Input } from "@chakra-ui/react";

export const TextInput = ({ changeFn, ...props }) => {
    return (
        <Input
            id="searchInput"
            color="white"
            placeholder="search for recipes here"
            border="2px"
            borderColor="white"
            onChange={changeFn}
            borderRadius="3xl"
            _hover={{ borderColor: "blue.300" }}
            _placeholder={{ opacity: 1, color: "gray.300" }}
            {...props}
        ></Input>
    );
};
