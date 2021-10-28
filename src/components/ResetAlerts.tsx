import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import SelectFeatureContext from "../context/SelectFeaturesContext";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ResetAlerts = ({ isOpen, setIsOpen }: Props) => {
  const {
    mode,
    setCounties: setCountiesSelected,
    setStates: setStatesSelected,
  } = useContext(SelectFeatureContext);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const handleResetSelected = () => {
    setStatesSelected({ type: "reset" });
    setCountiesSelected({ type: "reset" });
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Selections
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? The selected {mode} will be deleted.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleResetSelected} ml={3}>
              Reset
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ResetAlerts;
