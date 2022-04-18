import { Text, Flex, Button, Heading } from "@chakra-ui/react";
import { useContext } from "react";

import { TabIndex } from "context/TabContext";

const HomePage = () => {
    const { setIndex } = useContext(TabIndex);
    return (
        <Flex w="100%" h="100%">
            <Flex
                direction="column"
                maxW="50%"
                alignItems="start"
                justifyContent="center"
                p="5% 5% 0% 5%"
            >
                <Text color="#FFFFFF" fontWeight="bold" fontSize="1.7rem">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse eleifend eu nulla pharetra rutrum. Mauris
                    tristique dui dui, et blandit ligula pretium sed. Vestibulum
                    at tincidunt est, ac varius diam.{" "}
                </Text>
                <Button
                    bg="#16609E"
                    color="#FFFFFF"
                    size="lg"
                    mt="10%"
                    onClick={() => {
                        setIndex(1);
                    }}
                >
                    Get Started
                </Button>
            </Flex>
            <Flex
                w="50%"
                direction="column"
                justifyContent="center"
                p="0 0 10% 3%"
            >
                <Flex>
                    <Heading fontSize="9rem" color="#7FA6C7">
                        EPI
                    </Heading>
                    <Heading fontSize="9rem" color="#7FA6C7">
                        c
                    </Heading>
                </Flex>
                <Heading fontSize="7rem" color="#FFFFFF" pl="15%">
                    SUITE
                </Heading>
            </Flex>
        </Flex>
    );
};

export default HomePage;
