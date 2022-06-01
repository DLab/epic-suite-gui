import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Heading,
} from "@chakra-ui/react";

import TableSimulations from "./TableSimulations";

const SummaryTab = () => {
    return (
        <>
            <Heading fontSize={24} as="h2" mb="1rem" color="blue.800">
                Summary
            </Heading>

            <Alert mb="1rem" status="info" p="1.3rem">
                <AlertIcon />
                <Box>
                    <AlertDescription>
                        Select all monopopulations model for to simulate.
                        Metapopulation simulations aren't implemented yet.
                    </AlertDescription>
                </Box>
            </Alert>

            <TableSimulations />
        </>
    );
};

export default SummaryTab;
