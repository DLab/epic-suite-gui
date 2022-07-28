import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Text,
    Heading,
} from "@chakra-ui/react";

import TableSimulations from "./TableSimulations";

const SummaryTab = () => {
    return (
        <>
            <Box h="5vh" mh="5vh">
                <Text color="#16609E" fontSize="18px" fontWeight="bold">
                    Summary
                </Text>
            </Box>
            {/* <Alert mb="1rem" status="info" p="1.3rem">
                <AlertIcon />
                <Box>
                    <AlertDescription>
                        Select all the models to simulate. Only monopopulation
                        models are available to simulate. Metapopulation
                        simulations aren't implemented yet.
                    </AlertDescription>
                </Box>
            </Alert> */}

            <TableSimulations />
        </>
    );
};

export default SummaryTab;
