import React from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as ArrowSVG } from './assets/arrow.svg'

const Styling = styled.div`
  height: 177px;

  border: 1px solid transparent;
  flex: 0 1 247px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  ${props =>
    props.active &&
    css`
      background: #fff;
      border: 1px solid #222;
      border-radius: 2px;
    `};

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    background: #fff;
    border: 1px solid #222;
    border-radius: 2px;
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
      color: #55706c;
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
  retailer: { id, title, location, description },
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
          <h3>{title}</h3>
          <ArrowSVG />
        </div>

        <div className="content-main content-location">{location}</div>
        <div className="content-main content-contact">{description}</div>
      </div>
    </Styling>
  )
}

export default Retailer
