import Select from "react-select";

export const MultiSelect1 = ({ ...props }) => (
    <Select
        color="blue.500"
        border="2px"
        borderColor="blue.300"
        borderRadius="3xl"
        w="400"
        mt="18"
        {...props}
    >
        {" "}
        {props.children}
    </Select>
);
