import React from 'react'
import styled from 'styled-components'
import Retailer from './Retailer'

const Styling = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: row;
  justify-content: center;
`

const List = props => {
  const { retailers } = props
  return (
    <Styling>
      {retailers &&
        retailers.map(retailer => {
          return (
            <Retailer
              {...props}
              key={`retailer-${retailer.id}`}
              retailer={retailer}
            />
          )
        })}
    </Styling>
  )
}

export default List
