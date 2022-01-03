import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Tooltip,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import FunctionIcon from "components/icons/FunctionIcon";
import createIdComponent from "utils/createIdcomponent";

interface Props {
  name: string;
}

const VariableTimeDepenentButton = ({ name }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="Add Simulation">
        <IconButton
          color="#FFFFFF"
          fill="none"
          aria-label="Button function for variable time dependents"
          size="sm"
          cursor="pointer"
          icon={<FunctionIcon />}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="70vw" maxH="90vh">
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>asdf</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VariableTimeDepenentButton;
