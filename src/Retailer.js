import React from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as ArrowSVG } from './assets/arrow.svg'
import { device } from './assets/Styles'

const Styling = styled.div`
  width:25%;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  @media ${device.tablet} {
    flex: 0 1 100%;
    width: 100%;
  }
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

.content-contact {
a {
color: #058273;
}
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
    border-bottom:1px solid ${props => (props.active ? '#058273' : '#00140f')};
      display: flex;
      align-items: baseline;
      width: 100%;
      h3 {
          flex-basis: 80%;
        
        font-size:20px;
        padding-bottom:5px;
        text-transform:uppercase;
        color:${props => (props.active ? '#058273' : '#00140f')};
      }
      .arrow-wrapper {
        @media ${device.tablet} {
          text-align: end;
        }
        svg, g {
          stroke: ${props => (props.active ? '#058273' : '#00140f')};
        }

        flex-basis:20%;
      }
      margin-bottom:30px;
    }
    .content-main {
      flex: 1;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      

     color:${props => (props.active ? '#058273' : '#00140f')};
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
    fields: { name, address, phone_number, email, website },
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
        <div className="content-main content-email">{email}</div>
        <div className="content-main content-contact">
            <a href={`${website}`} target="_blank">{website}</a>
        </div>
      </div>
    </Styling>
  )
}

export default Retailer
