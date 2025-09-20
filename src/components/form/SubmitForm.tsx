// hook-form
import { useEffect } from "react";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import toast from "react-hot-toast";

/**
 * @param submitEvent 폼 제출 함수
 * @param defaultValues 초기 데이터 세팅할 때 사용 ex) 수정 데이터
 */
interface IFormProps {
  useKeydown?: boolean;
  submitEvent?: (d: { [key: string]: string }) => void;
  children: React.ReactNode;
  defaultValues?: any; // 임시 처리
  // defaultValues?: { [key: string]: string };
  callbackValid?: (valid: boolean) => void;
  formId?: string;
}

/**
 * react-hook-form 사용을 위한 provider
 * formInput을 사용한다면 감싸야 합니다.
 */
const SubmitForm = (props: IFormProps) => {
  const { submitEvent, children, defaultValues, callbackValid, useKeydown = false, formId } = props;
  // hook-form
  const methods = useForm({
    mode: "onBlur",
  });

  const submitTriggerEvent = (result: { [key: string]: string }) => {
    if (typeof submitEvent === "function") {
      submitEvent(result);
    }
  };

  const onInvalidHandler = (error: FieldErrors) => {
    // 1) 배열 필드 에러가 하나라도 있으면
    if (Object.keys(error).some(key => Array.isArray((error as any)[key]))) {
      toast("입력 내용을 다시 확인해 주세요.");
      return;
    }

    const firstErrorMessage = Object.values(error)[0]?.message;

    const firstErrorField = Object.keys(error)[0]; // 에러필드 name

    if (typeof firstErrorMessage === "string") {
      methods.setFocus(firstErrorField);
      // todo 토스트 다운 후 연동
      // return;
      // toast.error(firstErrorMessage, {
      //   duration: 3000,
      //   style: {
      //     padding: "1.6rem",
      //     color: "red",
      //   },
      // });

      toast("입력 내용을 다시 확인해 주세요.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (typeof callbackValid === "function") {
      callbackValid(methods.formState.isValid);
    }
  }, [methods.formState.isValid]);

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  return (
    <FormProvider {...methods}>
      <form
        id={formId}
        onSubmit={methods.handleSubmit(submitTriggerEvent, onInvalidHandler)}
        onKeyDown={useKeydown ? handleKeyDown : undefined}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default SubmitForm;
