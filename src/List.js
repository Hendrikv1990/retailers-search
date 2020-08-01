import React from 'react'
import styled from 'styled-components'
import Retailer from './Retailer'
import { device } from './assets/Styles'

const Styling = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  flex-flow: row wrap;
  justify-content: flex-start;
  overflow: visible;
  width: 1080px;
    margin: auto;
    padding-top:20px;
    padding-bottom:20px;
    

  @media ${device.tablet} {
    padding: 0 20px;
    width:100%;
    overflow: scroll;
    flex-direction: column;
  }
`

const List = (props) => {
  const { retailers } = props

  return (
    <Styling>
      {retailers && retailers.length > 0 ? (
        retailers.map((retailer) => {
          return (
            <Retailer
              {...props}
              key={`retailer-${retailer.id}`}
              retailer={retailer}
            />
          )
        })
      ) : (
        <div className={"no-results"}>Keine Händler gefunden. Versuch bitte eine andere PLZ</div>
      )}
    </Styling>
  )
}

export default List
