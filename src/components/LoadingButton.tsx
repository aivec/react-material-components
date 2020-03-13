import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const ButtonContainer = styled.div`
  position: relative;
`;

const Progress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -11px;
  margin-left: -11px;
`;

interface LoadingButtonProps {
  buttonProps: {
    size?: 'small' | 'medium' | 'large';
    variant?: 'text' | 'contained' | 'outlined';
    color?: 'inherit' | 'default' | 'primary' | 'secondary';
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };
  loading?: boolean;
  buttonText?: string;
}

const LoadingButton = ({
  buttonProps: {
    size = 'small',
    variant = 'contained',
    color = 'primary',
    disabled = false,
    onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {},
    ...other
  },
  loading = false,
  buttonText = '',
}: LoadingButtonProps): JSX.Element => {
  return (
    <ButtonContainer>
      {/* eslint-disable react/jsx-props-no-spreading */}
      <Button
        onClick={onClick}
        size={size}
        variant={variant}
        color={color}
        disabled={disabled}
        {...other}
      >
        {buttonText}
      </Button>
      {loading && <Progress size={22} />}
    </ButtonContainer>
  );
};

export default LoadingButton;
