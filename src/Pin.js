import React from 'react'
import styled from 'styled-components'
import { ReactComponent as PinSVG } from './assets/pin.svg'

const Styling = styled.div`
  user-select: none;
  cursor: pointer;

  svg {
    transform: translate(-12px, -9px);
    width: 35px;
    position: absolute;
    transition: all 0.5s ease-in-out;
    path {
      transition: stroke 0.2s ease-in-out;
      stroke: ${props => (props.active ? '#058273' : '#00140f')};
    }
  }
`

const Pin = ({ onMarkerClick, onMouseEnter, onMouseLeave, active, size }) => {
  return (
    <Styling
      active={active}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onMarkerClick}
    >
      <PinSVG />
    </Styling>
  )
}

export default Pin
