export const formatPhoneNumber = (event: React.FormEvent<HTMLInputElement>) => {
  const input = event.target as HTMLInputElement;
  const value = input.value.replace(/[^0-9]/g, ""); // 숫자만 추출

  let formattedValue = "";
  if (value.startsWith("02")) {
    // 지역번호 02인 경우
    if (value.length <= 2) {
      formattedValue = value;
    } else if (value.length <= 6) {
      formattedValue = `${value.slice(0, 2)}-${value.slice(2)}`;
    } else {
      formattedValue = `${value.slice(0, 2)}-${value.slice(2, 6)}-${value.slice(6, 10)}`;
    }
  } else if (value.length <= 3) {
    // 일반 번호 (010, 031 등)
    formattedValue = value;
  } else if (value.length <= 7) {
    formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
  } else {
    formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
  }

  input.value = formattedValue; // 포맷팅된 값으로 필드 값 설정
};

export function formatBizNoString(raw: string): string {
  // 1) 숫자만 추출하고, 최대 10자리로 자르기
  const digits = raw.replace(/\D/g, "").slice(0, 10);

  // 2) 길이에 따라 하이픈 위치 다르게 삽입
  if (digits.length < 4) {
    // 1~3자리: 그대로
    return digits;
  }
  if (digits.length < 6) {
    // 4~5자리: 3자리 뒤에 하이픈
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  // 6~10자리: 3-2-나머지 포맷
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

/**
 * React `onInput` 이벤트 핸들러
 * 입력 중에도 항상 “123-45-67890” 형태를 유지하도록
 */
export const formatBizNumber = (event: React.FormEvent<HTMLInputElement>) => {
  const input = event.currentTarget;
  const oldValue = input.value;
  const newValue = formatBizNoString(oldValue);

  // 커서 위치 보정 (하이픈이 추가될 때 뒤로 밀리지 않도록)
  const prevPos = input.selectionStart ?? newValue.length;
  const diff = newValue.length - oldValue.length;

  input.value = newValue;
  const nextPos = prevPos + (diff > 0 ? diff : 0);
  input.setSelectionRange(nextPos, nextPos);
};
