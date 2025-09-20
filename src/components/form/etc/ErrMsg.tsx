import styled from "styled-components";

interface IErrMsg {
  msg: string;
}

const ErrMsg = ({ msg }: IErrMsg) => {
  return <Message>{msg}</Message>;
};

const Message = styled.p`
  padding: 10px 0 0;
  color: rgba(245, 71, 73, 1);
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  word-break: keep-all;
`;

export default ErrMsg;
