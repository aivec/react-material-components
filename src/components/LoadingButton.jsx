import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const ButtonContainer = styled.div`
  position: relative;
`
const Progress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -11px;
  margin-left: -11px;
`

const LoadingButton = (props) => {
  const { buttonProps, loading, buttonText } = props
  return (
    <ButtonContainer>
      {/* eslint-disable-next-line */}
      <Button {...buttonProps}>{buttonText}</Button>
      {loading && <Progress size={22} />}
    </ButtonContainer>
  )
}

LoadingButton.propTypes = {
  buttonProps: PropTypes.shape({
    size: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  }),
  loading: PropTypes.bool,
  buttonText: PropTypes.string,
}

LoadingButton.defaultProps = () => ({
  buttonProps: {
    size: 'small',
    variant: 'contained',
    color: 'primary',
    disabled: false,
    onClick: () => {},
  },
  loading: false,
  buttonText: '',
})

export default LoadingButton
