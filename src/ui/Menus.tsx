import React from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useClickOutside } from '../hooks/useClickOutside';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListProps {
  position: { x: number; y: number };
}

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenusContextType = {
  openId: string;
  close: () => void;
  setPosition: (position: { x: number; y: number }) => void;
  open: (id: string) => void;
  postion: { x: number; y: number } | null;
};
const MenusContext = React.createContext<MenusContextType | undefined>(
  undefined,
);

export default function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = React.useState('');
  const [postion, setPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const close = () => setOpenId('');
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, setPosition, postion }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const context = React.useContext(MenusContext);
  if (!context) {
    throw new Error('Toggle must be used within a MenusProvider');
  }
  const { openId, close, open, setPosition } = context;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.target as HTMLElement)
      .closest('button')
      ?.getBoundingClientRect();

    if (rect) {
      setPosition({
        x: window.innerWidth - (rect.width || 0) - rect.x,
        y: rect.y + rect.height + 8,
      });
    }

    if (openId === '' || openId !== id) {
      open(id);
    } else {
      close();
    }
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const context = React.useContext(MenusContext);
  if (!context) {
    throw new Error('Toggle must be used within a MenusProvider');
  }
  const { openId, postion, close } = context;
  const ref = useClickOutside(close);

  if (openId !== id) return null;
  return createPortal(
    <StyledList ref={ref} position={postion as { x: number; y: number }}>
      {children}
    </StyledList>,
    document.body,
  );
}
function Button({
  icon,
  onClick,
  children,
  disabled,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const context = React.useContext(MenusContext);
  if (!context) {
    throw new Error('Toggle must be used within a MenusProvider');
  }
  const { close } = context;
  const handleClick = () => {
    console.log('clicked');
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>
        {icon}
        {children}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.List = List;
