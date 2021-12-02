import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

import SeeGraphicIcon from "../../icons/SeeGraphIcon";

interface SimulationKeys {
  name: string;
  keys: [];
}

interface Props {
  savedKeys?: SimulationKeys[];
}

const Graphic = dynamic(() => import("./Graphic"), {
  loading: () => (
    <Flex justifyContent="center" alignItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ),
  ssr: false,
});

const SeeGraphic = ({ savedKeys }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Icon
        as={SeeGraphicIcon}
        onClick={onOpen}
        cursor="pointer"
        fontSize="1.4rem"
      />
      {savedKeys.map(() => {
        return (
          <>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <Graphic
                    savedSimulationKeys={savedKeys}
                    width="500"
                    height="340"
                  />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        );
      })}
    </>
  );
};

export default SeeGraphic;
