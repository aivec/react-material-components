import React from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const ButtonContainer = styled.div`
  position: relative;
`;

export const Progress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -11px;
  margin-left: -11px;
`;

export interface LoadingButtonProps {
  buttonProps: ButtonProps;
  loading?: boolean;
  buttonText?: string;
}

const LoadingButton = ({
  buttonProps: {
    size = 'small',
    variant = 'contained',
    color = 'primary',
    disabled = false,
    onClick = (): void => {},
    ...other
  },
  loading = false,
  buttonText = '',
}: LoadingButtonProps): JSX.Element => (
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

export default LoadingButton;
