import { Power3, TimelineLite } from 'gsap'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import List from './List'

const Styling = styled.aside`
  background-color: #fcfbf7;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  width: 100%;
  z-index: 2;
  left: 0;
  bottom: 0;
  height: 10rem;
`

const Sidebar = props => {
  const wrapperRef = React.useRef()

  useEffect(() => {
    const timeline = new TimelineLite()
    timeline.to(wrapperRef.current, 0.3, {
      ease: Power3.easeInOut,
      autoAlpha: 1,
    })
  }, [])
  return (
    <Styling ref={wrapperRef}>
      <List {...props} />
    </Styling>
  )
}

export default Sidebar
