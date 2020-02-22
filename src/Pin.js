import React from 'react'
import styled from 'styled-components'

const Styling = styled.div`
  user-select: none;
  cursor: pointer;

  svg {
    transform: translate(-12px, -9px);
    width: 35px;
    position: absolute;
    transition: all 0.5s ease-in-out;
    path {
      transition: fill 0.2s ease-in-out;
      fill: ${props => (props.active ? '#fff' : '#222')};
    }
  }

  span {
    position: relative;
    display: block;
    width: 10px;
    height: 10px;
    transition: background-color 0.2s ease-in-out;
    background-color: ${props => (props.active ? '#222' : '#fff')};
    border-radius: 50%;
  }
`

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`

const Pin = ({ onMarkerClick, onMouseEnter, onMouseLeave, active, size }) => {
  return (
    <Styling
      active={active}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onMarkerClick}
    >
      <svg viewBox="0 0 24 24" size={size}>
        <path d={ICON} />
      </svg>
      <span />
    </Styling>
  )
}

export default Pin
