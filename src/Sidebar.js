import React from 'react'
import styled from 'styled-components'
import List from './List'

const Styling = styled.aside`
  position: fixed;
  width: 100%;
  z-index: 2;
  left: 0;
  bottom: 0;
  height: 10rem;
  background: white;
`

const Sidebar = props => {
  return (
    <Styling>
      <List {...props} />
    </Styling>
  )
}

export default Sidebar
