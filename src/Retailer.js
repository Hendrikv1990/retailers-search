import React from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as ArrowSVG } from './assets/arrow.svg'

const Styling = styled.div`
  height: 177px;
  flex: 1 247px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  ${props =>
    props.active &&
    css`
      color: #058273;
    `};

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    color: #058273;
  }

  .content-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0.5rem;
    height: 100%;
    overflow: hidden;
    .content-header {
      display: flex;
      align-items: baseline;
      width: 100%;
      h3 {
        flex: 1;
      }
      .arrow-wrapper {
        svg {
          fill: ${props => (props.active ? '#058273' : '#222')};
        }

        flex: 1;
      }
    }
    .content-main {
      flex: 1;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;

      color: ${props => (props.active ? '#058273' : '#55706c')};
    }
    .content-location {
    }
    .content-description {
      margin-top: 1rem;
      font-size: 90%;
    }
  }
`

const Retailer = ({
  setRetailer,
  onMouseLeave,
  onMouseEnter,
  hoveredRetailerId,
  selectedRetailerId,
  retailer: {
    id,
    fields: { name, address, phone_number },
  },
}) => {
  return (
    <Styling
      active={id === hoveredRetailerId || id === selectedRetailerId}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={() => onMouseLeave(null)}
      onClick={() => setRetailer(id)}
    >
      <div className="content-container">
        <div className="content-header">
          <h3>{name}</h3>
          <div className="arrow-wrapper">
            <ArrowSVG />
          </div>
        </div>

        <div className="content-main content-location">{address}</div>
        <div className="content-main content-contact">{phone_number}</div>
      </div>
    </Styling>
  )
}

export default Retailer
