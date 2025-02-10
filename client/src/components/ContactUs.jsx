import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import Icon from "./Icons";

const ContactUs = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className=" flex-col font-bold text-[var(--color-neutral-light)] font-epilogue flex justify-center items-center gap-16 h-screen bg-[url('https://res.cloudinary.com/libreriaalondra/image/upload/v1729802397/mesa-llena-material-escolar_23-2147650803_mmmyor.jpg')] bg-contain">
      <p className="text-[50px] mb-4">¡DESPREOCUPATE!</p>
      <p className="text-[30px] text-center">
        SI no encontraste lo que buscabas, te contactaremos de inmediato 🫰
      </p>
      <Button
        onPress={onOpen}
        radius="full"
        size="lg"
        className="mt-2 bg-white border-[3px] border-[var(--color-primary-light)] w-80 text-[var(--color-primary-light)] hover:bg-[var(--color-primary)] hover:text-white"
      >
        Contáctanos ✉️ <strong>AQUÍ</strong>
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://res.cloudinary.com/libreriaalondra/image/upload/v1734362650/logo_fondo_azul_tt5joc.png"
                  alt="logo papeleria allas de alondra"
                />
                <p className="text-[var(--color-primary-dark) text-center text-2xl ]">
                  Dejanos tus datos de contacto AQUÍ
                </p>
              </ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <Icon
                      name="user"
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                  label="Nombre"
                  placeholder="Ingresa tu nombre"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <Icon
                      name="mail"
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                  label="Correo"
                  placeholder="Ingresa tu correo"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ContactUs;
