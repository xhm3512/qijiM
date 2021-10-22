import React, { FC, useEffect } from 'react';
import './style/index.less';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
}
const prefixCls = 'dumi-oni-btn';
const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = 'default',
  disabled,
}) => {
  useEffect(() => {}, []);
  const className = `${prefixCls} ${prefixCls}-button ${prefixCls}-${type}`;
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
