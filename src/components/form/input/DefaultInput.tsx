import { useEffect, useState } from "react";
import styled from "styled-components";

/**
 * form 관리를 위한 input 컴포넌트
 * @param useButton input 오른쪽 버튼 사용 유무 현재는 중복확인 고정
 * @param field form에 등록하기 위한 key
 * @param rules react-hook-form의 registerOptions 객체 유효성 등등 추가할 때 사용
 * @param onClick useButton 사용 시 onClick 함수
 * @param successMessage 유효성 통과 시 보여줄 성공 메시지
 */

export type IDefaultInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  // todo ref딱히 추가할 필요 없어보이는데 불필요시 제거
  ref?: any; // ! 타입 변경 확인 필요
  prefixIcon?: React.ReactNode | null;
  suffixIcon?: React.ReactNode | null;
};

const DefaultInput = ({
  ref: inputRef,
  prefixIcon = null,
  suffixIcon = null,
  value: valueProp, // value 부모가 준 값 구분하기
  defaultValue,
  onChange,
  style,
  ...rest
}: IDefaultInputProps) => {
  // 기본값은 null이나 undefined가 아닌 첫번째 값으로
  const [value, setValue] = useState(valueProp?.toString() ?? defaultValue?.toString() ?? "");

  // 외부 valueProp 이 바뀌면 동기화
  useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp.toString());
    }
  }, [valueProp]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
    onChange?.(e);
  };

  return (
    <Wrapper style={style}>
      <CustomInput
        {...rest}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder={rest.placeholder}
        // styled
        $suffixIcon={suffixIcon}
        $prefixIcon={prefixIcon}
      />

      {/* // & prefix 아이콘 사용 */}
      {prefixIcon && <IconWrap>{prefixIcon}</IconWrap>}
      {/* // & surffix 아이콘 사용 */}
      {suffixIcon && <ClearBtn>{suffixIcon}</ClearBtn>}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
const CustomInput = styled.input<{
  $suffixIcon: null | React.ReactNode;
  $prefixIcon: null | React.ReactNode;
}>`
  flex: 1;
  width: 100%;
  padding: 7px 15px;
  font-size: 14px;
  line-height: 1;
  border: 0.1rem solid #ddd;
  border-radius: 3px;
  height: 36px;
  &:disabled {
    background-color: "";
    color: "";
  }
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:focus {
    outline: none;
    /* box-shadow: inset 0 0 0 1px #8857e3; */
    border-color: var(--primaryColor);
  }

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #999;
  }

  ${({ $suffixIcon }) => {
    if ($suffixIcon) {
      return `
          padding-right: 40px;
      `;
    }
    return ``;
  }}
  ${({ $prefixIcon }) => {
    if ($prefixIcon) {
      return `
          padding-left: 40px;
      `;
    }
    return ``;
  }}
`;

const IconWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);

  width: 100%;
  max-width: 16px;
  aspect-ratio: 1/1;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ClearBtn = styled.div`
  padding: 0;
  position: absolute;
  top: 50%;

  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0, -50%);
  cursor: pointer;
`;

export default DefaultInput;
