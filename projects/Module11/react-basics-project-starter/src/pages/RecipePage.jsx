import {
    Grid,
    GridItem,
    UnorderedList,
    ListItem,
    Center,
    Box,
    Flex,
    Image,
    Heading,
    Text,
} from "@chakra-ui/react";
import { ButtonA } from "../components/ui/Button1";

export const RecipePage = ({ selectedItemState, clickFn }) => {
    window.scrollTo(0, 0);
    const NutriList = Object.fromEntries(
        Object.entries(selectedItemState.totalNutrients).filter(
            ([key]) =>
                key == "NA" ||
                key == "FAT" ||
                key == "ENERC_KCAL" ||
                key == "PROCNT" ||
                key == "CHOLE" ||
                key == "CHOCDF"
        )
    );

    return (
        <Flex justify="center" align="center">
            <Flex
                width={["350px", "90%", "60%"]}
                height={["100%", "90%", "100%"]}
                justify="flex-start"
                align="center"
                color="black"
                bgColor="whiteAlpha.800"
                borderRadius="12"
                direction="column"
                my="7"
                gap={6}
                paddingBottom={6}
                boxShadow="2xl"
                bg="white"
            >
                <Box width="100%" height={["30vh", "30vh", "35vh"]}>
                    <Image
                        boxSize="100%"
                        objectFit="cover"
                        borderTopRadius="12"
                        src={selectedItemState.image}
                    />
                </Box>
                <Flex
                    direction={["column", "column", "column", "row"]}
                    width="100%"
                >
                    <Flex
                        direction="column"
                        width={["100", "100%", "100%", "50%"]}
                        display="border-box"
                        px={5}
                    >
                        <ButtonA marginTop="5px" onClick={() => clickFn()}>
                            ≺ Back to overview
                        </ButtonA>{" "}
                        <Heading paddingBottom={5} fontSize={[18, 22, 22]}>
                            {selectedItemState.label}
                        </Heading>
                        <Text color="grey"> {selectedItemState.mealType}</Text>
                        <Text color="grey" paddingBottom={5}>
                            Dish: {selectedItemState.dishType}
                        </Text>
                        {selectedItemState.totalTime == 0 ? (
                            <Text fontSize={[10, 12, 14]}>
                                Total preparation time: N/A
                            </Text>
                        ) : (
                            <Text fontSize={[10, 12, 14]}>
                                Total preparation time:{" "}
                                {selectedItemState.totalTime} mins
                            </Text>
                        )}
                        <Text fontSize={[10, 12, 14]} paddingBottom={5}>
                            Servings: {selectedItemState.yield}
                        </Text>
                        <Text
                            marginBottom={1}
                            fontSize={[10, 12, 14]}
                            fontWeight="bold"
                        >
                            {" "}
                            Ingredients:
                        </Text>
                        <UnorderedList paddingBottom={5}>
                            {selectedItemState.ingredientLines.map((label) => (
                                // eslint-disable-next-line react/jsx-key
                                <ListItem key={label} fontSize={[10, 10, 12]}>
                                    {label}
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </Flex>
                    <Flex
                        direction="column"
                        width={["100", "100%", "100%", "50%"]}
                        px={5}
                        gap={6}
                    >
                        <Text
                            marginBottom={-4}
                            fontSize={[10, 12, 14]}
                            fontWeight="bold"
                        >
                            {" "}
                            Health labels:
                        </Text>
                        <Flex wrap="wrap" gap={6}>
                            {selectedItemState.healthLabels.map((label) => (
                                // eslint-disable-next-line react/jsx-key
                                <Center
                                    key={label}
                                    height={6}
                                    px={2}
                                    align="center"
                                    bgColor="purple.200"
                                    color="purple.900"
                                    fontSize={[8, 10, 12]}
                                >
                                    {label}
                                </Center>
                            ))}
                        </Flex>
                        {!selectedItemState.dietLabels.length > 0 ? null : (
                            <>
                                <Text
                                    marginBottom={-4}
                                    fontSize={[10, 12, 14]}
                                    fontWeight="bold"
                                >
                                    Diet:
                                </Text>
                                <Flex wrap="wrap" gap={6}>
                                    {selectedItemState.dietLabels.map(
                                        (label) => (
                                            // eslint-disable-next-line react/jsx-key
                                            <Center
                                                key={label}
                                                height={6}
                                                px={2}
                                                align="center"
                                                bgColor="green.200"
                                                color="green.900"
                                                fontSize={[8, 10, 12]}
                                            >
                                                {label}
                                            </Center>
                                        )
                                    )}
                                </Flex>
                            </>
                        )}
                        {!selectedItemState.cautions.length > 0 ? null : (
                            <>
                                <Text
                                    marginBottom={-4}
                                    fontSize={[10, 12, 14]}
                                    fontWeight="bold"
                                >
                                    Cautions:
                                </Text>
                                <Flex wrap="wrap" gap={6}>
                                    {selectedItemState.cautions.map((label) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <Center
                                            key={label}
                                            height={6}
                                            px={2}
                                            align="center"
                                            bgColor="red.200"
                                            color="red.900"
                                            fontSize={[8, 10, 12]}
                                        >
                                            {label}
                                        </Center>
                                    ))}
                                </Flex>
                            </>
                        )}
                        <Text
                            marginBottom={-4}
                            fontSize={[10, 12, 14]}
                            fontWeight="bold"
                        >
                            Total Nutrients:
                        </Text>
                        <Grid
                            templateColumns="repeat(3, 1fr)"
                            templateRows={["50px", "50px"]}
                            fontSize={[10, 10, 12]}
                        >
                            {Object.values(NutriList).map((n) => {
                                return (
                                    <GridItem key={n.label}>
                                        {n.label}: <br />
                                        {Math.round(n.quantity)} {n.unit}
                                    </GridItem>
                                );
                            })}
                        </Grid>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
