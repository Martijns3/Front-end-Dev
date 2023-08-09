import { Button as Button1 } from "@chakra-ui/react";

export const ButtonA = ({ ...props }) => (
    <Button1
        border="2px"
        borderColor="green.500"
        bgColor="green.200"
        color="green.900"
        fontSize={[10, 14]}
        marginBottom={5}
        {...props}
    >
        {props.children}
    </Button1>
);
