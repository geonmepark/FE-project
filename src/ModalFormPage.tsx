import Modal from "@/components/modal/etc/Modal";
import { Theme, Card, Flex, Text, Badge, Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { useState } from "react";
import useModal from "@/hooks/useModal";

interface FormData {
  title?: string;
  email?: string;
  phone?: string;
}

const ModalFormPage = () => {
  const { open, openModal, closeModal } = useModal();
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleSubmit = (data: FormData | null) => {
    setSubmittedData(data);
  };

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <Theme>
      <Flex direction="column" gap="4" p="4">
        <Button type="button" onClick={handleOpenModal} style={{ width: "fit-content" }}>
          Open Modal
        </Button>

        {submittedData && (
          <Card>
            <Flex direction="column" gap="3">
              <Text size="4" weight="bold">
                제출 데이터
              </Text>
              {Object.entries(submittedData).map(([key, value]) => (
                <Flex key={key} justify="between" align="center">
                  <Text weight="medium">{key}:</Text>
                  <Badge variant="soft">{String(value)}</Badge>
                </Flex>
              ))}
            </Flex>
          </Card>
        )}

        {open && (
          <Modal
            open={open}
            onOpenChange={open => !open && closeModal()}
            onSubmit={handleSubmit}
            defaultValues={submittedData || undefined}
          />
        )}
      </Flex>

      <div style={{ backgroundColor: "#f5f5f5", height: "100vh" }}>배경 스크롤 확인</div>
    </Theme>
  );
};

export default ModalFormPage;
