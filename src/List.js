import React from 'react'
import styled from 'styled-components'
import Retailer from './Retailer'
import { device } from './assets/Styles'

const Styling = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  overflow: scroll;
  @media ${device.tablet} {
    overflow: scroll;
    flex-direction: column;
  }
`

const List = props => {
  const { retailers } = props

  return (
    <Styling>
      {retailers && retailers.length > 0 ? (
        retailers.map(retailer => {
          return (
            <Retailer
              {...props}
              key={`retailer-${retailer.id}`}
              retailer={retailer}
            />
          )
        })
      ) : (
        <div>No retailers found in this area.</div>
      )}
    </Styling>
  )
}

export default List
