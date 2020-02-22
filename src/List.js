import React from 'react'
import styled from 'styled-components'
import Retailer from './Retailer'

const Styling = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  visibility: hidden;
  opacity: 0;
  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    flex-direction: row;
    min-height: 100vh;
    padding: 0 1rem 4rem 1rem;
  }
`

const List = props => {
  console.log(props.retailers)

  const { retailers } = props
  return (
    <Styling>
      <div className="container">
        {retailers &&
          retailers.map((retailer, index) => {
            return (
              <Retailer
                {...props}
                key={`retailer-${retailer.id}`}
                retailer={retailer}
              />
            )
          })}
      </div>
    </Styling>
  )
}

export default List
