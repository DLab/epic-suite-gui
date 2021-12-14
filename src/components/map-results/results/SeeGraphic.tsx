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
  index: number;
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

const SeeGraphic = ({ savedKeys, index }: Props) => {
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
              <ModalContent textAlign="center" maxW="70vw" maxH="90vh">
                <ModalCloseButton />
                <ModalBody>
                  <Graphic
                    savedSimulationKeys={savedKeys}
                    width="100%"
                    height="95%"
                    index={index}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        );
      })}
    </>
  );
};

export default SeeGraphic;
