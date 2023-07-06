import { Center, Image, Text, WrapItem } from "@chakra-ui/react";
export const DrinkItem = ({ props, clickFn }) => {
    return (
        <WrapItem>
            <Center
                align="center"
                width={200}
                mt="15"
                cursor={"pointer"}
                onClick={() => clickFn(props)}
                gap={8}
            >
                <Text fontSize={[12, 18]}>{props.name}</Text>
                <Image
                    src={props.imgUrl}
                    width={50}
                    height={50}
                    alt={props.alt}
                />
            </Center>
        </WrapItem>
    );
};
