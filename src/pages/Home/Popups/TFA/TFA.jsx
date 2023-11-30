import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const TFA = ({ isTfaOpen }) => {
  const { isOpen, onOpenChange } = useDisclosure(false);

  useEffect(() => {
    isTfaOpen ? onOpenChange() : null;
  }, [isTfaOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Enable MFA?
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Not Now
              </Button>
              <Button color="primary" onPress={onClose}>
                Enable
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TFA;
