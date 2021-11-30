import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

interface Props {
  graphicData: string[];
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

const SeeGraphic = ({ graphicData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SmallAddIcon onClick={onOpen}>See</SmallAddIcon>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Graphic
              savedSimulationKeys={graphicData}
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
};

export default SeeGraphic;
