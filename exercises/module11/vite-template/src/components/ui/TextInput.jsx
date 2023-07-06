// import "./TextInput.css";
import { Input } from "@chakra-ui/react";

export const TextInput = ({ changeFn, ...props }) => {
    return (
        <Input
            className="textField"
            border="2px"
            borderColor="green.600"
            onChange={changeFn}
            _hover={{ borderColor: "blue.300" }}
            borderRadius="3xl"
            {...props}
        ></Input>
    );
};
