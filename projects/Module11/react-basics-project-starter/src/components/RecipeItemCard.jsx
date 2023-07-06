import { Center, Box, Flex, Image, Heading, Text } from "@chakra-ui/react";

export const RecipeItemCard = ({ selectedItemState, clickFn }) => {
    return (
        <>
            <Flex
                height="550px"
                width="350px"
                color="black"
                borderRadius="8"
                align="center"
                direction="column"
                bg="white"
                cursor={"pointer"}
                onClick={() => clickFn(selectedItemState.recipe)}
                paddingBottom={8}
                boxShadow="2xl"
            >
                <Box width="100%" height="40%">
                    <Image
                        boxSize="100%"
                        objectFit="cover"
                        borderTopRadius="8"
                        src={selectedItemState.recipe.image}
                    />
                </Box>
                <Flex direction="column" width="80%" my="7" mx="5" gap={6}>
                    <Flex height={8} justify="center">
                        <Heading align="center" fontSize={[16, 20, 20]}>
                            {selectedItemState.recipe.label}
                        </Heading>
                    </Flex>
                    <Text align="center" color="grey">
                        {" "}
                        {selectedItemState.recipe.mealType} <br />
                        Dish: {selectedItemState.recipe.dishType}
                    </Text>
                    <Flex justify="center" gap={6}>
                        {selectedItemState.recipe.dietLabels.map((label) => (
                            // eslint-disable-next-line react/jsx-key
                            <Center
                                key={label}
                                height={6}
                                width={20}
                                bgColor="green.200"
                                color="green.900"
                                fontSize={[10, 12, 12]}
                            >
                                {label}
                            </Center>
                        ))}
                    </Flex>

                    <Flex justify="center " gap={6}>
                        {selectedItemState.recipe.healthLabels
                            .filter(
                                (label) =>
                                    label == "Vegan" || label == "Vegetarian"
                            )
                            .map((label) => (
                                <Center
                                    key={label}
                                    height={6}
                                    width={20}
                                    bgColor="blue.200"
                                    color="blue.900"
                                    fontSize={[10, 12, 12]}
                                >
                                    {label}
                                </Center>
                            ))}
                    </Flex>
                </Flex>

                <Flex
                    direction="column"
                    height="30%"
                    justify="flex-end"
                    align="center"
                >
                    {!selectedItemState.recipe.cautions.length > 0 ? null : (
                        <>
                            <Text
                                align="center"
                                lineHeight="250%"
                                fontSize={[10, 10, 12]}
                            >
                                Cautions:
                            </Text>
                            <Flex wrap="wrap" justify="center" gap={6}>
                                {selectedItemState.recipe.cautions.map(
                                    (caution) => (
                                        <Center
                                            key={caution}
                                            height={6}
                                            width={20}
                                            bgColor="red.200"
                                            color="red.900"
                                            fontSize={[10, 12, 12]}
                                        >
                                            {caution}
                                        </Center>
                                    )
                                )}
                            </Flex>
                        </>
                    )}
                </Flex>
            </Flex>
        </>
    );
};
