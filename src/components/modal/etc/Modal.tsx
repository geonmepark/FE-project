import FormInput from "@/components/form/input/FormInput";
import SubmitForm from "@/components/form/SubmitForm";
import ModalShell from "@/components/modal/ModalShell";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { emailPattern, phonePattern } from "@/utils/validate";
import { Button, Flex, Text } from "@radix-ui/themes";
import toast from "react-hot-toast";
import styled from "styled-components";

interface FormData {
  title?: string;
  email?: string;
  phone?: string;
}

interface IModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: FormData | null) => void;
  defaultValues?: FormData;
}

const Modal = ({ open, onOpenChange, onSubmit, defaultValues }: IModalProps) => {
  const hasData =
    defaultValues && Object.values(defaultValues).some(value => value && value.trim() !== "");

  const handleSubmit = (data: FormData) => {
    console.log("submit", data);
    toast("저장되었습니다.");
    if (onSubmit) {
      onSubmit(data);
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (onSubmit) {
      onSubmit(null);
    }
    onOpenChange(false);
  };
  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      title="사용자 정보 입력"
      subtitle="사용자 정보를 입력해 주세요."
      footer={
        <Flex gap="2" justify="end">
          <Button type="button" variant="soft" color="gray" onClick={handleCancel}>
            {hasData ? "초기화" : "취소"}
          </Button>
          <Button type="submit" form="modal-form" color="gray" highContrast>
            저장
          </Button>
        </Flex>
      }
    >
      <SubmitForm
        submitEvent={handleSubmit as any}
        formId="modal-form"
        defaultValues={defaultValues}
      >
        <Container>
          <Flex direction={"column"}>
            <Text className="title" size={"2"} weight={"medium"} style={{ width: "10rem" }}>
              제목
            </Text>

            <FormInput
              field="title"
              rules={{
                required: "제목을 입력해 주세요.",
              }}
            />
          </Flex>
          <Flex direction={"column"}>
            <Text className="title" size={"2"} weight={"medium"} style={{ width: "10rem" }}>
              이메일
            </Text>
            <FormInput
              field="email"
              rules={{
                required: "이메일을 입력해 주세요.",
                pattern: {
                  value: emailPattern,
                  message: "이메일 형식에 맞춰 입력해 주세요.",
                },
              }}
            />
          </Flex>
          <Flex direction={"column"}>
            <Text className="title" size={"2"} weight={"medium"} style={{ width: "10rem" }}>
              휴대폰 번호
            </Text>
            <FormInput
              field="phone"
              onInput={formatPhoneNumber}
              rules={{
                required: "휴대폰 번호를 입력해 주세요.",
                pattern: {
                  value: phonePattern,
                  message: "휴대폰 번호 형식에 맞춰 입력해 주세요.",
                },
              }}
            />
          </Flex>
          <div style={{ height: "500px", backgroundColor: "#f5f5f5" }}>내부 스크롤 확인</div>
        </Container>
      </SubmitForm>
    </ModalShell>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .title {
    display: block;
    font-weight: 600;
    padding: 0 0 5px;
  }
  > div {
    p {
      margin: 0 0 10px;
    }
  }
`;

export default Modal;
