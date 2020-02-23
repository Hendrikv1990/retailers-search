import React from 'react'
import styled, { css } from 'styled-components'

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
  margin: 0 0 0.5rem 0;

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
    height: 5rem;
    overflow: hidden;
    h3 {
      font-size: 130%;
      margin: 0;
    }
    .content-location {
      margin: 0;
      font-size: 85%;
      color: #222
      font-style: italic;
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
        <h3>{title}</h3>
        <div className="content-location">{location}</div>
        <div className="content-description">{description}</div>
      </div>
      <footer />
    </Styling>
  )
}

export default Retailer
