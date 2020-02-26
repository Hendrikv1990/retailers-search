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
  flex-wrap: nowrap;
`

const List = props => {
  const { retailers } = props
  console.log(retailers)

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
