// import "./Button.css";
import { Button as CButton } from "@chakra-ui/react";

export const Button = ({ ...props }) => {
    return (
        <CButton
            bgColor="white"
            className="textField"
            border="2px"
            borderColor="green.600"
            _hover={{ borderColor: "blue.300" }}
            borderRadius="3xl"
            {...props}
        >
            {props.children}
        </CButton>
    );
};
