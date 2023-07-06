import { Button } from "./Button";

import {
    Text,
    Flex,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";

export const DrinkChoice = ({ props, clickFn2 }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Flex direction="column" align="center" gap={4}>
                <Image
                    src={props.imgUrl}
                    alt={props.alt}
                    width="100"
                    height="100"
                    marginBottom="20px"
                ></Image>
                <Text marginBottom="20px">
                    Your {props.name.toLowerCase()} will be ready soon!
                </Text>
                <Button onClick={onOpen} mr={4}>
                    Confirm order
                </Button>
                <Button onClick={() => clickFn2()}>Reset your choice</Button>{" "}
            </Flex>
            <Modal isOpen={isOpen} size={["full", "md"]} onClose={onClose}>
                <ModalOverlay />
                <ModalContent textAlign={["center", "left"]}>
                    <ModalHeader>Confirm your order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        minWidth="360px"
                        display="flex"
                        alignItems={["center", "start"]}
                        justifyContent={["center", "start"]}
                    >
                        <Text>1x {props.name}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button bgColor="green.200" mr={4}>
                            Confirm
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
