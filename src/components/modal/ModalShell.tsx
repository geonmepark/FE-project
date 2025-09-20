import * as Dialog from "@radix-ui/react-dialog";
import { Flex, ScrollArea, Text, Theme } from "@radix-ui/themes";
import { useRef } from "react";
import styled, { keyframes } from "styled-components";

export interface ModalShellProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  maxWidth?: string;
  position?: "center" | "right";
}

const ModalShell = ({
  open,
  onOpenChange,
  title,
  subtitle,
  children,
  footer,
  width = "90%",
  maxWidth = "40rem",
  position = "center",
}: ModalShellProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleOpenAutoFocus = (event: Event) => {
    event.preventDefault();
    if (title && titleRef.current) {
      titleRef.current.focus();
    }
    // title이 없으면 기본 동작
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Theme>
          <Overlay />
          <Content
            $width={width}
            $maxWidth={maxWidth}
            $position={position}
            onOpenAutoFocus={handleOpenAutoFocus}
          >
            {title && (
              <Header>
                <TitleBox align={"center"}>
                  <Title ref={titleRef} tabIndex={-1}>
                    {title}
                  </Title>
                  {subtitle && (
                    <SubTitle size={"2"} weight={"medium"}>
                      {subtitle}
                    </SubTitle>
                  )}
                </TitleBox>
                <Dialog.Close asChild>
                  <CloseButton aria-label="Close">×</CloseButton>
                </Dialog.Close>
              </Header>
            )}
            <Body>{children}</Body>
            {footer && <Footer>{footer}</Footer>}
          </Content>
        </Theme>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalShell;

const overlayShow = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const overlayHide = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;
const contentHide = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
`;

// prefers-reduced-motion을 고려
const contentShowReduced = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const contentHideReduced = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  &[data-state="open"] {
    animation: ${overlayShow} 200ms ease-out;
  }
  &[data-state="closed"] {
    animation: ${overlayHide} 200ms ease-in;
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-state="open"],
    &[data-state="closed"] {
      animation: none;
    }
  }
`;

const Content = styled(Dialog.Content)<{ $width: string; $maxWidth: string; $position: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  width: ${({ $width }) => $width};
  max-width: ${({ $maxWidth }) => $maxWidth};
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
  max-height: calc(100vh - 4rem); /* 뷰포트에서 상하 2rem씩 여유 */
  display: flex;
  flex-direction: column;

  &:focus-visible {
    outline: unset;
  }

  &[data-state="open"] {
    animation: ${contentShow} 200ms ease-out;
  }
  &[data-state="closed"] {
    animation: ${contentHide} 200ms ease-in;
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-state="open"] {
      animation: ${contentShowReduced} 200ms ease-out;
    }
    &[data-state="closed"] {
      animation: ${contentHideReduced} 200ms ease-in;
    }
  }

  ${({ $position }) => {
    if ($position === "right") {
      return `
        left: unset;
        transform: unset;
        max-height: unset;
        right: 10px;
        top: 10px;
        bottom: 10px;
          &[data-state="open"] {
            animation: unset;
          }
      `;
    }
    return ``;
  }}
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TitleBox = styled(Flex)`
  gap: 10px;
`;

const Title = styled(Dialog.DialogTitle)`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const SubTitle = styled(Text)`
  font-size: 14px;
  line-height: 18px;
  color: #666;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const Body = styled(ScrollArea)`
  flex: 1;
  box-sizing: content-box;
  padding-right: 15px;
`;

const Footer = styled.footer`
  padding-top: 2rem;
  text-align: right;
`;
