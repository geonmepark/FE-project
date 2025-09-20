import { useState, useCallback } from "react";

const useModal = <T>() => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<T | undefined>(undefined);

  // ! 데이터를 modal로 넘기기 위해 payload를 state에 저장하기 ex) uid
  const openModal = useCallback((payload?: T) => {
    setPayload(payload);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setPayload(undefined);
  }, []);

  return { open, payload, openModal, closeModal };
};

export default useModal;
